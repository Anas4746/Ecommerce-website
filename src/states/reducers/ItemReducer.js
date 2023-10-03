
const ItemReducer = (state = 1, action) => {

    if (action.type === 'AddItem') {
        return state + 1

    } else if (action.type === 'RemoveItem') {
        if (state > 1) {
            return state - 1
        } else {
            return state
        }

    } else {
        return state
    }

}

export default ItemReducer