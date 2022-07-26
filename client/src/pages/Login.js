import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authenticateUser} from '../services/index';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import {Row, Col, Card, InputGroup, FormControl, Button, FormGroup, Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faEnvelope, faLock, faUndo} from '@fortawesome/free-solid-svg-icons';
import Home from "./Home";


class Login extends Component
    {
        constructor(props)
        {
            super(props);
            this.state = this.initState;
        }

        initState = {
            email: '', password: '', error: ''
        };


        //return this.props.history.push('/');
        validateUser = () => {
            this.props.authenticateUser(this.state.email, this.state.password);

            setTimeout(() => {
                if (this.props.auth.isLoggedIn) {
                    window.location.assign("/");
                    return <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home/>}/>

                        </Routes>

                    </BrowserRouter>


                } else {
                    this.resetLoginForm();
                    this.setState({'error': 'Invalid email or password'});
                }
            }, 500);
        };

        credentialChange = event => {
            this.setState({
                [event.target.name]: event.target.value
            });
        }

        resetLoginForm = () => {
            this.setState(() => this.initState);
        }


        render()
        {
            const {email, password, error} = this.state;

            return (
                <Row className="justify-content-md-center">
                    <Col xs={5}>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Card className={"border border-dark bg-dark text-white"}>
                            <Card.Header>
                                <FontAwesomeIcon icon={faSignInAlt}/> Login
                            </Card.Header>
                            <Card.Body>
                                <FormGroup as={Col}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text> <FontAwesomeIcon icon={faEnvelope}/> </InputGroup.Text>

                                        <FormControl required autoComplete="off" type="email" name="email" value={email}
                                                     className="bg-dark text-white" onChange={this.credentialChange}
                                                     placeholder="Enter email"/>
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup as={Col}>
                                    <InputGroup className="mb-3">

                                        <InputGroup.Text> <FontAwesomeIcon icon={faLock}/> </InputGroup.Text>

                                        <FormControl required autoComplete="off" type="password" name="password"
                                                     value={password}
                                                     className="bg-dark text-white" onChange={this.credentialChange}
                                                     placeholder="Enter password"/>
                                    </InputGroup>
                                </FormGroup>

                            </Card.Body>
                            <Card.Footer style={{"textAlign": "right"}}>
                                <Button size="sm" type="button" variant="success" onClick={this.validateUser}
                                        disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                    <FontAwesomeIcon icon={faSignInAlt}/> Login
                                </Button> {' '}
                                <Button size="sm" type="button" variant="info" onClick={this.resetLoginForm}
                                        disabled={this.state.email.length === 0 && this.state.password.length === 0 && this.state.error.length === 0}>
                                    <FontAwesomeIcon icon={faUndo}/> Reset
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            );
        }
    }


const mapStateToProps = (state) =>
    {
        return {
            auth: state.auth
        }
    }
;

const mapDispatchToProps = (dispatch) =>
    {
        return {
            authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
        };
    }
;

export default connect(mapStateToProps, mapDispatchToProps)(Login);