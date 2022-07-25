import React, {Component} from "react";

import {connect} from "react-redux";
import {saveStudent} from '../services/index';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faPlusSquare, faUser, faEnvelope, faPhone,} from '@fortawesome/free-solid-svg-icons';


class CreateNewStudent extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState;
        this.studentChange = this.studentChange.bind(this);
        this.studentSubmit = this.studentSubmit.bind(this);
    }

    initState = {name: '', email: '', phone: ''}

    studentSubmit = event => {
        event.preventDefault();
        const student = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        };

        this.props.saveStudent(student);
        setTimeout(() => {
            if (this.props.studentObject.student != null) {
                this.setState({show: true, method: "post"});
                setTimeout(() => this.setState({show: false}), 3000);
            } else {
                this.setState({show: false});
            }
        }, 1500);

        this.setState(this.initState);

    }

    studentChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {name, email, phone} = this.state;

        return (

            <div className="react-select form-control p-0">

                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header> <FontAwesomeIcon icon={faPlusSquare}/> Add Student</Card.Header>
                    <Form onSubmit={this.studentSubmit} id="studentFormId">
                        <Card.Body>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label> <FontAwesomeIcon icon={faUser}/> Name</Form.Label>
                                <Form.Control required autoComplete="off"
                                              type="text" name="name"
                                              value={name}
                                              onChange={this.studentChange}
                                              className={"bg-dark text-white"}
                                              placeholder="Enter name"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label><FontAwesomeIcon icon={faEnvelope}/> Email</Form.Label>
                                <Form.Control required autoComplete="off"
                                              name="email" type="email"
                                              value={email}
                                              onChange={this.studentChange}
                                              className={"bg-dark text-white"}
                                              placeholder="Enter email"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label><FontAwesomeIcon icon={faPhone}/> Phone</Form.Label>
                                <Form.Control required autoComplete="off"
                                              name="phone" type="phone"
                                              value={phone}
                                              onChange={this.studentChange}
                                              className={"bg-dark text-white"}
                                              placeholder="Enter phone number"/>
                            </Form.Group>

                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button
                                variant="success"
                                size="sm"
                                type="submit">
                                <FontAwesomeIcon icon={faSave}/> Submit
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>

            </div>

        );

    }
}

const mapStateToProps = (state) => {
    return {
        studentObject: state.student,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        saveStudent: (student) => dispatch(saveStudent(student)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewStudent);