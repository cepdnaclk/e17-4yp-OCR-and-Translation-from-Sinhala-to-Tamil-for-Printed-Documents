import axios from 'axios';
export const uploadImg = async () => {
  try {
    const response = await axios.post('http://localhost:4000/api/upload');
    return await response.data;
  } catch (error) {
    console.log('There is an error uploading the img');
    return error;
  }
};
