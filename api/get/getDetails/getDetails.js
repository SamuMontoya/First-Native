import axios from "axios";

export const getJobs = () => {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/job-details",
    params: {
      job_id: "hO4waEcPOOsAAAAAAAAAAA==",
      extended_publisher_details: "false",
    },
    headers: {
      "X-RapidAPI-Key": "8071bf6acbmsh065bdaa4b77f6fcp100e4ajsn570c5527e64d",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log(response["data"]["data"][0]);
      return response;
    })
    .catch(function (error) {
      console.error(error);
      throw error;
    });
};
