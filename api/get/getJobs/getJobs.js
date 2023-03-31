import axios from "axios";
import { API } from "../../config/axios";
import { baseURL } from "../../enviroments/enviroments";

export const getJobs = async () => {
  let response = null;
  //   await API({
  //     customAuthorization: token,
  //   })
  //     .get("search")
  //     .then((res) => {
  //       response = res.data;
  //       console.log("RESPONSE ", response);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/search`,
    headers: {
      "X-RapidAPI-Key": "8071bf6acbmsh065bdaa4b77f6fcp100e4ajsn570c5527e64d",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { query: "React developer", num_pages: "1" },
  };

  await axios
    .request(options)
    .then((res) => {
      response = res.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return response;
};
