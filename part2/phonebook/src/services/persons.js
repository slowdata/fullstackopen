import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAll = () => axios.get(BASE_URL).then(response => response.data);

const createPerson = newPerson =>
  axios.post(BASE_URL, newPerson).then(response => response.data);

const updatePerson = (id, newPerson) =>
  axios.put(`${BASE_URL}/${id}`, newPerson).then(response => response.data);

const deletePerson = id =>
  axios.delete(`${BASE_URL}/${id}`).then(response => response.status);

export default { getAll, createPerson, updatePerson, deletePerson };
