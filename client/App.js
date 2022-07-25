import './App.css';
import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import StudentList from "./pages/StudentList";
import CreateNewStudent from "./pages/CreateNewStudent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppNavbar from "./components/AppNavbar";

const marginTop = {
    marginTop:"20px"
};

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <AppNavbar/>
                <Container>
                    <Row>
                        <Col lg={12} style={marginTop}>
                            <Routes>
                                <Route path='/' element={<Home/>}/>
                                <Route path='/pupils' element={<StudentList/>}/>
                                <Route path='/pupils/add' element={<CreateNewStudent/>}/>
                                <Route path='/register' element={<Register/>}/>
                                <Route path='/login' element={<Login/>}/>
                                <Route path='/logout' element={<Login/>}/>
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        );
    }
}

export default App;


