import axios from "axios";

const apiClient = () => {
  const client = axios.create({
    baseURL: "https://fakestoreapi.com/",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    getAllProducts: () => client.get(`/products`),
  };
};

const Api = apiClient();
export default Api;
