import React, {Component} from 'react';
import '../App.css';

class Home extends Component {

    render() {
        return (
            <div className="jumbotron m-3 bg-dark text-white">
                <h3 className="display-4">WELCOME TO E-SCHOOL</h3>
                <p className="lead">“The most important day of a person’s education is the first day of school, not Graduation Day.”</p>
                <hr className="my-4"/>
                <p className="lead">– Harry Wong</p>

            </div>
        );
    }
}

export default Home;