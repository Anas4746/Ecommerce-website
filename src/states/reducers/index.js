
import ItemReducer from "./ItemReducer";
import PriceReducer from "./PriceReducer"
import { combineReducers } from 'redux'

const reducers = combineReducers({
    PriceReducer, ItemReducer
})

export default reducers