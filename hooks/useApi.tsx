import axios from "axios";
import { useState } from "react";

axios.defaults.baseURL = "http://localhost:3000/api";

const useApi = (endpoint) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await axios.get(endpoint);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  const postData = async (data) => {
    try {
      const res = await axios.post(endpoint, data);
      setResponse(res);
    } catch (err) {
      setError(err);
    }
  };

  const updateData = async (data, id) => {
    try {
      const res = await axios.put(`${endpoint}/${id}`, data);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${endpoint}/${id}`);
      setResponse(null);
    } catch (err) {
      setError(err);
    }
  };

  return { response, error, loading, postData, updateData, deleteData };
};

export default useApi;
