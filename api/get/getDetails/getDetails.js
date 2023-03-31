import axios from "axios";
import { API } from "../../config/axios";
import { baseURL } from "../../enviroments/enviroments";

export const getDetails = async (params) => {
  let response = null;

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/job-details",
    params: {
      job_id: "VtN0OMHj2lIAAAAAAAAAAA==",
      extended_publisher_details: "false",
    },
    headers: {
      "X-RapidAPI-Key": "8071bf6acbmsh065bdaa4b77f6fcp100e4ajsn570c5527e64d",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  await axios
    .request(options)
    .then((res) => {
      response = res;
      console.log("RES -> ", response);
      return response;
    })
    .catch(function (error) {
      console.error(error);
    });
};
