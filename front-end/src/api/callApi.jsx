import axios from "axios";
const BASE_URL = 'http://localhost:3100/';
export async function callApi(path, method, data, token) {
  console.log('BASE_URL: ', BASE_URL)
  try {
    const result = await axios.request({ 
      baseURL: BASE_URL,
      url: path,
      method,
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
    if ([200, 201].includes(result.status)) return result.data;
  } catch (error) { 
    if (!error.response) alert("Something Went Wrong !!!");
    else if (error.response.data.statusCode === 400 ) {
      if(!Array.isArray(error.response.data.message)) {
        alert(error.response.data.message);
      }else {
        
        alert(error.response.data.message.join(',\n'));
      }
    } 
    else if (error.response.data.statusCode === 401)
      window.location = "/login";
  }
}
