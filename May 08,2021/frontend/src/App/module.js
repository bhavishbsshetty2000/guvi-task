import axios from "axios";

const serverUrl = "http://localhost:5050";
export const getMentor = () => {
  return axios.get(`${serverUrl}/get-mentors`).then((res) => res.data);
};

export const getStudent = () => {
  return axios.get(`${serverUrl}/get-students`).then((res) => res.data);
};

export const addMentor = (name) => {
  return axios
    .post(`${serverUrl}/create-mentor`, { name })
    .then((res) => res.data);
};

export const addStudent = (name) => {
  return axios
    .post(`${serverUrl}/create-student`, { name })
    .then((res) => res.data);
};

export const assignStudent = (students, mentorName) => {
  return axios
    .post(`${serverUrl}/assign-students-to-mentor`, { students, mentorName })
    .then((res) => res.data);
};

export const changeMentor = (studentName, mentorName) => {
  return axios
    .put(`${serverUrl}/assign-mentor`, { studentName, mentorName })
    .then((res) => res.data);
};
