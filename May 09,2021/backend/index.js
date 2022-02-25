const express = require("express");
const app = express();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const dbUrl =
  "mongodb+srv://Bhavish:Bhavish@cluster0.cntzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.json());

const cors = require("cors");
const res = require("express/lib/response");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome");
});

//end-point to get all the mentors present
app.get("/get-mentors", async (req, res) => {
  const client = await mongoClient.connect(dbUrl);
  try {
    const db = client.db("mentorStudent");
    const mentor = await db.collection("mentors").find().toArray();
    res.json(mentor);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  } finally {
    client.close();
  }
});

// //end-point to get all the Students present
app.get("/get-students", async (req, res) => {
  const clients = await mongoClient.connect(dbUrl);
  try {
    const db = clients.db("mentorStudent");
    const students = await db.collection("students").find().toArray();
    res.json(students);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  } finally {
    clients.close();
  }
});

//1.end-point to create a mentor
app.post("/create-mentor", async (req, res) => {
  const clients = await mongoClient.connect(dbUrl);
  try {
    const db = clients.db("mentorStudent");
    const mentor = await db.collection("mentors").insertOne(req.body);

    // mentors.push({
    //   id: mentors.length,
    //   mentorName: req.body.name,
    //   assignedStudents: [],
    // });
    res.json({
      message: "Mentor created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  } finally {
    clients.close();
  }
});

//1.end-point to create a student
app.post("/create-student", async (req, res) => {
  const clients = await mongoClient.connect(dbUrl);
  try {
    const db = clients.db("mentorStudent");
    const students = await db.collection("students").insertOne(req.body);
    // students.push({
    //   id: students.length,
    //   studentName: req.body.name,
    //   assignedMentor: null,
    // });
    res.json({
      message: "Student created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  } finally {
    clients.close();
  }
});

app.get("/show-students-of-mentor/:id", async (req, res) => {
  const clients = await mongoClient.connect(dbUrl);
  try {
    const db = clients.db("mentorStudent");
    const objId = mongodb.ObjectId(req.params.id);
    const mentor = await db.collection("mentors").findOne({ _id: objId });

    res.json(mentor.assignedStudents);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  } finally {
    clients.close();
  }
});

//Assign or change mentor
app.put("/assign-mentor", async (req, res) => {
  const clients = await mongoClient.connect(dbUrl);
  try {
    const db = clients.db("mentorStudent");
    const student = await db
      .collection("students")
      .findOne({ studentName: req.body.studentName });

    if (!student) {
      res.json({
        message: "Student not found",
      });
    } else if (student && student.assignedMentor !== req.body.mentorName) {
      var oldMentor = student.assignedMentor;
      const student1 = await db
        .collection("students")
        .findOneAndUpdate(
          { studentName: req.body.studentName },
          { $set: { assignedMentor: req.body.mentorName } }
        );

      const mentor = await db
        .collection("mentors")
        .findOneAndUpdate(
          { mentorName: req.body.mentorName },
          { $push: { assignedStudents: req.body.studentName } }
        );
      if (oldMentor != null) {
        const oldMnt = await db
          .collection("mentors")
          .findOne({ mentorName: oldMentor });
        var assignStds = oldMnt.assignedStudents;
        var newAssignedStudents = assignStds.filter(
          (nm) => nm != req.body.studentName
        );
        const updateMentor = await db
          .collection("mentors")
          .findOneAndUpdate(
            { mentorName: oldMentor },
            { $set: { assignedStudents: newAssignedStudents } }
          );
      }
      res.json({
        message: "Student mentor updated",
      });
    } else {
      res.json({
        message: "Student already has same mentor",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  } finally {
    clients.close();
  }
});

//assign students to mentor
app.post("/assign-students-to-mentor", async (req, res) => {
  const clients = await mongoClient.connect(dbUrl);
  try {
    const db = clients.db("mentorStudent");

    var stds = req.body.students;
    var mnts = req.body.mentorName;
    // var indexOfMentor = mentors.findIndex((i) => i.mentorName === mnts);
    for (let i of stds) {
      const student = await db
        .collection("students")
        .findOne({ studentName: i });

      if (student && student.assignedMentor === null) {
        const student1 = await db
          .collection("students")
          .findOneAndUpdate(
            { studentName: i },
            { $set: { assignedMentor: mnts } }
          );
        const mentor = await db
          .collection("mentors")
          .findOneAndUpdate(
            { mentorName: mnts },
            { $push: { assignedStudents: i } }
          );
      }
    }
    res.json({
      message: `Mentor assigned to students`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  } finally {
    clients.close();
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Started in port ${port}`);
});
