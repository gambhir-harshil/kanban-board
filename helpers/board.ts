import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000/api"

export const fetchBoards = async () => {
    const res = await axios.get('/boards');
    return res.data.boards;
}

export const postBoards = async (data) => {
    const res = await axios.post('/boards', data);
    return res.data.boards;
}

export const deleteBoard = async (id) => {
    const res = await axios.delete(`/boards/?id=${id}`);
    return res.data.boards;
}

export const updateBoard = async ({ name, description, id }) => {
  const res = await axios.put(`/boards/${id}`, { name, description});
  console.log(res);
  return res.data.boards;
};

export const getBoardById = async (id) => {
    const res = await axios.get(`/boards/${id}`);
    return res.data.board;
}