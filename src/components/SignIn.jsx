import React, {useState} from "react";
import {Link} from "@reach/router";
import {Col, Row, Button, Form, Container} from "react-bootstrap";
import {signInWithGoogle} from "../firebase";
import {auth} from "../firebase";
import GoogleButton from "react-google-button";


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
        });
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if (name === 'userEmail') {
            setEmail(value);
        } else if (name === 'userPassword') {
            setPassword(value);
        }
    };


    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="text-center mt-5">
                    <h2>Sign In</h2>
                    {error !== null && <div>{error}</div>}
                    <Form>
                        <Form.Group controlId="userEmail" className="floating-label">
                            <Form.Control
                                onChange={(event) => onChangeHandler(event)}
                                type="text"
                                name="userEmail"
                                value={email}/>
                            <Form.Label>Email</Form.Label>
                        </Form.Group>

                        <Form.Group controlId="userPassword" className="floating-label">
                            <Form.Control
                                onChange={(event) => onChangeHandler(event)}
                                type="password"
                                name="userPassword"
                                value={password}/>
                            <Form.Label>Password</Form.Label>
                        </Form.Group>


                        <Button className="btn btn-success"
                                onClick={(event) => {
                                    signInWithEmailAndPasswordHandler(event, email, password)
                                }}>
                            Sign in
                        </Button>
                    </Form>

                    <p className="text-center">or</p>

                    <Col lg={12} className="text-center">
                        <GoogleButton
                            onClick={() => {
                                signInWithGoogle();
                            }}
                        >
                            Sign in with Google
                        </GoogleButton>
                    </Col>

                    <p className="text-center">
                        Don't have an account?{" "}
                        <Link to="signUp">
                            Sign up here
                        </Link>{" "}
                        <br/>{" "}
                        <Link to="passwordReset">
                            Forgot Password?
                        </Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;