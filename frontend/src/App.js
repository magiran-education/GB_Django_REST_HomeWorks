import './App.css';
import GetSiteHeader from "./components/header";
import GetSiteFooter from "./components/footer";
import UserList from "./components/users";
import ProjectList from "./components/projects";
import ProjectView from "./components/project_view";
import ToDoList from "./components/todo";
import React from "react";
import axios from "axios";
import {BrowserRouter, Switch, Route} from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {this.setState({'users': response.data})})
            .catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {this.setState({'projects': response.data})})
            .catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {this.setState({'todo': response.data})})
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    {GetSiteHeader()}

                    <Switch>
                        <Route exact path={'/'} render={''} />
                        <Route exact path={'/users'} component={() => <UserList users={this.state.users}/> }/>
                        <Route exact path={'/projects'} component={() => <ProjectList projects={this.state.projects}/> }/>
                        <Route exact path={'/todo'} component={() => <ToDoList todo={this.state.todo}/> }/>
                        <Route path={'/projects/:id'}>
                            <ProjectView projects={this.state.projects}/>
                        </Route>
                    </Switch>

                    {GetSiteFooter()}
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
