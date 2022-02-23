const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome",
  });
});

const mentors = [];
const students = [];

//end-point to get all the mentors present
app.get("/get-mentors", (req, res) => {
  try {
    res.json(mentors);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

//1.end-point to create a mentor
app.post("/create-mentor", (req, res) => {
  try {
    mentors.push({
      id: mentors.length,
      mentorName: req.body.name,
      assignedStudents: [],
    });
    res.json({
      message: "Mentor created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

//1.end-point to create a student
app.post("/create-student", (req, res) => {
  try {
    students.push({
      id: students.length,
      studentName: req.body.name,
      assignedMentor: null,
    });
    res.json({
      message: "Student created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

app.get("/show-students-of-mentor/:id", (req, res) => {
  try {
    res.json(mentors[req.params.id].students);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

//Assign or change mentor
app.put("/assign-mentor", (req, res) => {
  try {
    var indexOfStudent = students.findIndex(
      (i) => i.studentName === req.body.studentName
    );
    // console.log(indexOfStudent);
    if (
      students[indexOfStudent] &&
      students[indexOfStudent].assignedMentor !== req.body.mentorName
    ) {
      var oldMentor = students[indexOfStudent].assignedMentor;
      students[indexOfStudent].assignedMentor = req.body.mentorName;
      var indexOfMentor = mentors.findIndex(
        (i) => i.mentorName === req.body.mentorName
      );
      mentors[indexOfMentor].assignedStudents.push(req.body.studentName);

      if (oldMentor != null) {
        var indexOfOldMentor = mentors.findIndex(
          (i) => i.mentorName === oldMentor
        );

        var abc = mentors[indexOfOldMentor].assignedStudents;

        mentors[indexOfOldMentor].assignedStudents = abc.filter(
          (nm) => nm != "student-1"
        );
      }

      res.json({
        message: "Student mentor updated",
      });
    } else if (!students[indexOfStudent]) {
      res.json({
        message: "Student not found",
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
  }
});

//end-point to get all the Students present
app.get("/get-students", (req, res) => {
  try {
    res.json(students);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

//assign students to mentor
app.post("/assign-students-to-mentor", (req, res) => {
  try {
    var stds = req.body.students;
    var mnts = req.body.mentorName;
    var indexOfMentor = mentors.findIndex((i) => i.mentorName === mnts);
    for (let i of stds) {
      var indexOfStudent = students.findIndex((j) => j.studentName === i);
      if (
        students[indexOfStudent] &&
        students[indexOfStudent].assignedMentor === null
      ) {
        students[indexOfStudent].assignedMentor = mnts;

        mentors[indexOfMentor].assignedStudents.push(i);
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
  }
});

const port = 5050;

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
