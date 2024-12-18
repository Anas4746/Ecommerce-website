
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
        <div className='container my-5'>
            <div className="container"><h1>About</h1></div>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <b>Create Your Account: </b>
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>Users can create a new account to access the platform.</strong>
                            Required fields during sign-up: Full Name, Email Address, Password <code>.accordion-body</code> Users can log in to their account using:
                            Email Address and Password.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <b>Create Your Shop: </b>
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>After logging in, users can create their shop.</strong>
                            Required details for shop creation: Shop Name, Shop Description, Contact Information, Shop Logo or Banner. Allow users to: Update shop details (name, description, logo).
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <b>Sell Your Products: </b>
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>Users can add products to their shop.</strong>Required product details: Product Name, Product Description, Product Price, Product Images. Users can:
                            Edit product details (name, price, description, etc.), Delete products if they are no longer available.
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center mt-2">
                <h2>{state}</h2>
                <button className="btn btn-primary mx-3" onClick={() => dispacth({ type: 'Decrement' })}>Decrement</button>

                <button className="btn btn-primary mx-3" onClick={() => dispacth({ type: 'Increment' })}>Increment</button>

            </div>

        </div>
    )
}
