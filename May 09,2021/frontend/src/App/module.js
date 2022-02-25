import axios from "axios";

const serverUrl = "http://localhost:5000";
const productionUrl = "https://backendmentors.herokuapp.com";

export const getMentor = () => {
  return axios.get(`${productionUrl}/get-mentors`).then((res) => res.data);
};

export const getStudent = () => {
  return axios.get(`${productionUrl}/get-students`).then((res) => res.data);
};

export const addMentor = (name) => {
  return axios
    .post(`${productionUrl}/create-mentor`, {
      mentorName: name,
      assignedStudents: [],
    })
    .then((res) => res.data);
};

export const addStudent = (name) => {
  return axios
    .post(`${productionUrl}/create-student`, {
      studentName: name,
      assignedMentor: null,
    })
    .then((res) => res.data);
};

export const assignStudent = (students, mentorName) => {
  return axios
    .post(`${productionUrl}/assign-students-to-mentor`, {
      students: students,
      mentorName: mentorName,
    })
    .then((res) => res.data);
};

export const changeMentor = (studentName, mentorName) => {
  return axios
    .put(`${productionUrl}/assign-mentor`, {
      studentName: studentName,
      mentorName: mentorName,
    })
    .then((res) => res.data);
};
