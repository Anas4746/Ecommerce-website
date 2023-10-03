

export const AddItem = (price) => {
    return {
        type: 'AddItem',
        'price': price
    }
}

export const RemoveItem = (price) => {
    return {
        type: 'RemoveItem',
        'price': price
    }
}

