import { combineReducers } from "redux";
import airportState from "./airportState";

const rootReducer = combineReducers({
    airport: airportState
});

export default rootReducer;