const initialState = {
  isLoading: false,
  data: [],
};

const airportReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOCATION":
      return {
        ...state,
        isLoading: true,
        data: action.payload.data,
      };
    default:
      return { ...state };
  }
};

export default airportReducer;
