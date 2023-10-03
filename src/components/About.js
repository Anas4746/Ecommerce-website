
import React, { useReducer } from 'react'

const reducer = (state, action) => {
    if (action.type === 'Increment') {
        return state + 5
    }
    else if (action.type === 'Decrement') {
        return state - 5
    }
    else {
        return state
    }
}

export default function About() {
    const IntialState = 10

    const [state, dispacth] = useReducer(reducer, IntialState)

    return (
        <div className='container'>
            <h1>This is about page </h1>
            <div className="container text-center">
                <h2>{state}</h2>
                <button className="btn btn-primary mx-3" onClick={() => dispacth({ type: 'Decrement' })}>Decrement</button>

                <button className="btn btn-primary mx-3" onClick={() => dispacth({ type: 'Increment' })}>Increment</button>

            </div>

        </div>
    )
}
