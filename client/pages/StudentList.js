import React, {Component} from 'react';
import {Container, Card, Table} from 'react-bootstrap';
import {Button, ButtonGroup} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faList, faUserLarge, faEnvelope, faPhone, faTrash} from '@fortawesome/free-solid-svg-icons';

import {connect } from 'react-redux';
import { deleteStudent } from '../services/index';
import api from '../services/instance';


class StudentList extends Component {

    constructor(props) {
        super(props);
        this.state = {pupils: []};
        this.remove = this.deleteStudent.bind(this);
    }

    componentDidMount() {
        api.get('/pupil')
            .then(response => this.setState({pupils: response.data.data}));
    }

    deleteStudent = (id) => {
        this.props.deleteStudent(id);
        setTimeout(() => {
            if(this.props.studentObject != null) {
                this.setState({show: true});
                setTimeout(() => this.setState({ show: false }), 3000);
                let updatePupils = [...this.state.pupils].filter(i => i.id !== id);
                this.setState({pupils: updatePupils});
            }else {
                this.setState({ show: false });
            }
        }, 500);
    };

    render() {
        console.log('this.state:', this.state.pupils);

        const {pupils} = this.state;
        const pupilList = pupils.map(pupil => {
            return <tr key={pupil.id} align="center">
                <td style={{whiteSpace: 'nowrap'}}>{pupil.name}</td>
                <td>{pupil.email}</td>
                <td>{pupil.phone}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.deleteStudent(pupil.id)}><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <Container>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header> <FontAwesomeIcon icon={faList} /> Student List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th style={{"textAlign": "center"}}><FontAwesomeIcon icon={faUserLarge} /> Name</th>
                                <th style={{"textAlign": "center"}}><FontAwesomeIcon icon={faEnvelope} /> Email</th>
                                <th style={{"textAlign": "center"}}><FontAwesomeIcon icon={faPhone} /> Phone</th>
                                <th style={{"textAlign": "center"}}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>{pupilList}</tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
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
        deleteStudent: (id) => dispatch(deleteStudent(id)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps) (StudentList);


/*
        return (
            <div>
                <AppNavbar />
                <Container fluid >

                    <h3>Pupils</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="25%">Name</th>
                            <th width="25%">Email</th>
                            <th width="25%">Phone</th>
                            <th width="25%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>{pupilList}</tbody>
                    </Table>
                </Container>
            </div>
        );*/


/*
* <div className="">
                        <Button color="success" tag={Link} to="/pupils/add">Add Pupil</Button>
                    </div>
* */