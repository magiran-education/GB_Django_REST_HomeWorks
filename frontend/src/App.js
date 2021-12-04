import logo from './logo.svg';
import './App.css';
import GetSiteHeader from "./components/header";
import GetSiteFooter from "./components/footer";
import UserList from "./components/users";
import React from "react";
import axios from "axios";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'users': []}
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {this.setState({'users': response.data})})
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="container">
                {GetSiteHeader()}

                <div className="content">
                    <UserList users={this.state.users}/>
                </div>

                {GetSiteFooter()}
            </div>
        );
    }
}

export default App;
