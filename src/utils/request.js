import axios from "axios";

const request = (options, requestOptions = {}) => {
  return axios(options);
};

export default request;
