import axios from "axios";

export const getData = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    return response.data;
  } catch (ex) {
    return null;
  }
};
