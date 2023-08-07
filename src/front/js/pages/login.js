import React from "react";
import { Link } from "react-router-dom";


export const Login = () => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form>
                        <h1>Login</h1>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email"
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   placeholder="Enter email"/>
                                <small id="emailHelp"
                                       className="form-text text-muted">We'll never share your email with anyone
                                    else.
                                </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password"
                                   className="form-control"
                                   id="exampleInputPassword1"
                                   placeholder="Password"/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox"
                                   className="form-check-input"
                                   id="exampleCheck1"/>
                                <label className="form-check-label"
                                       htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit"
                                className="btn btn-primary">Submit
                        </button>
                        <Link to="/signup">
                        <button type="button"
                        className="btn btn-secondary">
                            No account? Sign up!
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
