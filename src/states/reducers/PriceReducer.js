

const PriceReducer = (state = 0, action) => {

    if (action.type === 'AddItem') {
        return state + action.price

    } else if (action.type === 'RemoveItem') {
        if (state > 0) {
            return state - action.price
        } else {
            return state
        }

    } else {
        return state
    }

}

export default PriceReducer