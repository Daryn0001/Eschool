import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {
    Row,
    Col,
    Card,
    Form,
    InputGroup,
    FormControl,
    Button,
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLock,
    faUndo,
    faUserPlus,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import {userRegister} from '../services/index'
import MyToast from "../components/MyToast";


const Register = (props) => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const initialState = {
        name: "",
        email: "",
        password: "",
        role: "ADMIN"
    };

    const [user, setUser] = useState(initialState);

    const userChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    const dispatch = useDispatch();


    const saveUser = () => {
        dispatch(userRegister(user.name, user.email, user.password, user.role))
            .then((response) => {
                setShow(true);
                setMessage(response.message);
                resetRegisterForm();
                setTimeout(() => {
                    setShow(false);
                    window.location.href = "/login";
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const resetRegisterForm = () => {
        setUser(initialState);
    };

    return (
        <div>
            <div style={{display: show ? "block" : "none"}}>
                <MyToast show={show} message={message} type={"success"}/>
            </div>
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faUserPlus}/> Register
                        </Card.Header>
                        <Card.Body>
                            <Form.Group as={Col}>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faUser}/>
                                    </InputGroup.Text>
                                    <FormControl
                                        autoComplete="off"
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Name"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faEnvelope}/>
                                    </InputGroup.Text>

                                    <FormControl
                                        required
                                        autoComplete="off"
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Email Address"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <InputGroup>

                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faLock}/>
                                    </InputGroup.Text>
                                    <FormControl
                                        required
                                        autoComplete="off"
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Password"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer style={{textAlign: "right"}}>
                            <Button
                                size="sm"
                                type="button"
                                variant="success"
                                onClick={saveUser}
                                disabled={user.email.length === 0 || user.password.length === 0}
                            >
                                <FontAwesomeIcon icon={faUserPlus}/> Register
                            </Button>{" "}
                            <Button
                                size="sm"
                                type="button"
                                variant="info"
                                onClick={resetRegisterForm}
                            >
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default Register;