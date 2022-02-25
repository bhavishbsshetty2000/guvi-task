import React, { useEffect, useState } from "react";
import {
  addMentor,
  addStudent,
  assignStudent,
  changeMentor,
  getMentor,
  getStudent,
} from "./module";

export const App = () => {
  const [mentors, setMentors] = useState([]);
  const [mentor, setMentor] = useState({ name: "" });
  const [isMentorAddOpen, toggleAddOpen] = useState(false);
  const [isStudentAddOpen, toggleStudentAddOpen] = useState(false);
  const [isAddStudentOpen, toggleAddStudentOpen] = useState(false);
  const [isChangeMentorAddOpen, toggleChangeMentorOpen] = useState(false);

  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({ name: "" });
  const [studentsList, setStudentsList] = useState([]);

  const handleMentor = () => {
    getMentor().then((data) => {
      setMentors(data);
    });
  };
  const handleStudent = () => {
    getStudent().then((data) => {
      setStudents(data);
    });
  };

  const handleMentorAddClose = () => {
    setMentor({ name: "" });
    toggleAddOpen(!isMentorAddOpen);
  };

  const handleStudentAddClose = () => {
    setStudent({ name: "" });
    toggleStudentAddOpen(!isStudentAddOpen);
  };

  const handleAssignStudentAddClose = () => {
    setStudentsList([]);
    setMentor({ name: "" });
    toggleAddStudentOpen(!isAddStudentOpen);
  };

  const handleChangeMentorAddClose = () => {
    setMentor({ name: "" });
    setStudent({ name: "" });
    toggleChangeMentorOpen(!isChangeMentorAddOpen);
  };

  const handleMentorCreate = () => {
    const { name } = mentor;
    addMentor(name).then((data) => {
      handleMentor();
      handleMentorAddClose();
    });
  };

  const handleStudentCreate = () => {
    const { name } = student;
    addStudent(name).then((data) => {
      handleStudent();
      handleStudentAddClose();
    });
  };

  const handleChangeMentorCreate = () => {
    const mname = mentor.name;
    const sname = student.name;
    console.log(mname, sname);
    changeMentor(sname, mname).then((data) => {
      handleStudent();
      handleMentor();
      handleChangeMentorAddClose();
    });
  };

  const handleStudentAssign = () => {
    const { name } = mentor;
    const stds = studentsList.split(",");
    console.log(name, stds);
    // const st = ["student-1", "student-2", "student-3"];
    assignStudent(stds, name).then((data) => {
      handleMentor();
      handleStudent();
      handleAssignStudentAddClose();
    });
  };

  useEffect(() => {
    handleMentor();
    handleStudent();
  }, []);

  if (isMentorAddOpen) {
    return (
      <div className="container m-5">
        <h1 className="m-2 mb-3">Create new mentor</h1>
        <input
          type="text"
          name="name"
          className="form-control m-2"
          placeholder="Enter mentors name"
          value={mentor.name}
          onChange={(e) => {
            setMentor((mtr) => ({ ...mtr, name: e.target.value }));
          }}
        />
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={handleMentorCreate}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={handleMentorAddClose}
        >
          Cancel
        </button>
      </div>
    );
  }

  if (isStudentAddOpen) {
    return (
      <div className="container m-5">
        <h1 className="m-2 mb-3">Create new student</h1>
        <input
          type="text"
          name="name"
          className="form-control m-2"
          placeholder="Enter students name"
          value={student.name}
          onChange={(e) => {
            setStudent((mtr) => ({ ...mtr, name: e.target.value }));
          }}
        />
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={handleStudentCreate}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={handleStudentAddClose}
        >
          Cancel
        </button>
      </div>
    );
  }
  if (isChangeMentorAddOpen) {
    return (
      <div className="container m-5">
        <h1 className="m-2 mb-3">Update mentor</h1>
        <input
          type="text"
          name="name"
          className="form-control m-2"
          placeholder="Enter students name"
          value={student.name}
          onChange={(e) => {
            setStudent((std) => ({ ...std, name: e.target.value }));
          }}
        />
        <input
          type="text"
          name="name"
          className="form-control m-2"
          placeholder="Enter mentors name"
          value={mentor.name}
          onChange={(e) => {
            setMentor((mtr) => ({ ...mtr, name: e.target.value }));
          }}
        />

        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={handleChangeMentorCreate}
        >
          Update mentor
        </button>
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={handleChangeMentorAddClose}
        >
          Cancel
        </button>
      </div>
    );
  }
  if (isAddStudentOpen) {
    return (
      <div className="container m-5">
        <h1 className="m-2 mb-3">Add multiple students to a mentor</h1>
        <input
          type="text"
          name="name"
          className="form-control m-2"
          placeholder="Enter mentor name"
          value={mentor.name}
          onChange={(e) => {
            setMentor((mtr) => ({ ...mtr, name: e.target.value }));
          }}
        />
        <input
          type="text"
          name="name"
          className="form-control m-2"
          placeholder="Enter students names (seperated by comma)"
          value={studentsList.name}
          onChange={(e) => {
            setStudentsList(e.target.value);
          }}
        />

        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={handleStudentAssign}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={handleAssignStudentAddClose}
        >
          Cancel
        </button>
        <table className="table mt-2 mb-3">
          <thead>
            <tr>
              <th>Mentor</th>
            </tr>
          </thead>
          <tbody>
            {mentors.map((mentor, index) => (
              <tr key={index}>
                <td>{mentor.mentorName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="table mt-2 mb-2">
          <thead>
            <tr>
              <th>Students with no mentor</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              if (student.assignedMentor === null)
                return (
                  <tr key={index}>
                    <td>{student.studentName}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="App container">
      <h1 className="mt-5 mb-3">Student-Mentor details</h1>
      <table className="table mb-5">
        <thead>
          <tr>
            <th>Mentor name</th>
            <th>Students assigned</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor, index) => (
            <tr key={index}>
              <td>{mentor.mentorName}</td>
              <td>{mentor.assignedStudents.join(",")}</td>
            </tr>
          ))}

          <tr>
            <td>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  toggleAddOpen(!isMentorAddOpen);
                }}
              >
                Add mentor
              </button>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  toggleAddStudentOpen(!isAddStudentOpen);
                }}
              >
                Add multiple student to a mentor
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table">
        <thead>
          <tr>
            <th>Students name</th>
            <th>Mentors</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.studentName}</td>
              <td>{student.assignedMentor}</td>
            </tr>
          ))}

          <tr>
            <td>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  toggleStudentAddOpen(!isStudentAddOpen);
                }}
              >
                Add student
              </button>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  toggleChangeMentorOpen(!isChangeMentorAddOpen);
                }}
              >
                Change Mentor
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
