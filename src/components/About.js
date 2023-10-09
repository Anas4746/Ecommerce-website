
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
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/">Action</a>
                                <a className="dropdown-item" href="/">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">Something else here</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/">Disabled</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <h1>This is about page </h1>
            <div className="container text-center">
                <h2>{state}</h2>
                <button className="btn btn-primary mx-3" onClick={() => dispacth({ type: 'Decrement' })}>Decrement</button>

                <button className="btn btn-primary mx-3" onClick={() => dispacth({ type: 'Increment' })}>Increment</button>

            </div>

        </div>
    )
}
