import axios from "axios";

const fetchData = async () => {
  const url = "http://localhost:8000/";
  try {
    const response = await axios.get(url);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null or an error object in case of failure
  }
};

export default fetchData;
