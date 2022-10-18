import axios from "axios";

export const getLocation = () => (dispatch) => {
  // axios(
  //   `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_API_KEY}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // )
  //   .then((res) => {
  //     console.log(res.data);
  //     dispatch({
  //       type: "GET_LOCATION",
  //       payload: {
  //         data: res.data,
  //       },
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${process.env.REACT_APP_API_KEY}`,
      {
        headers: { },
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
