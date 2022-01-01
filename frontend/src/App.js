import './App.css';
import GetSiteHeader from "./components/header";
import GetSiteFooter from "./components/footer";
import UserList from "./components/users";
import ProjectList from "./components/projects";
import ProjectView from "./components/project_view";
import ToDoList from "./components/todo";
import LoginForm from "./components/LoginForm";
import React from "react";
import axios from "axios";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Cookies from "universal-cookie/lib";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
            'token': '',
            'login': '',
        }
    }

    set_token(token) {
        // записываем токен в стейт и в куки
        let cookies = new Cookies()
        cookies.set('token', token, {'path': '/'})
        this.setState({'token': token}, () => this.load_data())
    }

    set_login(login) {
        // записываем логин в стейт и в куки
        let cookies = new Cookies()
        cookies.set('login', login, {'path': '/'})
        this.setState({'login': login})
    }

    auth(username, password) {
        this.get_token(username, password)
        this.set_login(username)
    }

    get_token(username, password) {
        // первоначальное полученние токена с сервера
        let data = {username: username, password: password}
        axios.post('http://localhost:8000/api-token-auth/', data)
            .then(response => {
                this.set_token(response.data['token'])
            })
            .catch(error => console.log(error))
    }

    is_auth() {
        // проверяем залогинен ли пользователь
        // !! - преобразование любого значения в Boolean
        return !!this.state.token
    }

    logout() {
        this.set_token('')
        this.set_login('')
    }

    get_token_from_storage() {
        // чтобы пароль не запрашивать, берём токен из куки
        let cookies = new Cookies()
        let token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_login_from_storage() {
        // чтобы логин не запрашивать, берём его из куки
        let cookies = new Cookies()
        let login = cookies.get('login')
        this.setState({'login': login})
    }

    get_headers() {
        // формируем заголовки для отправки на сервер с запросом
        let headers = {'Content-Type': 'application/json'}
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        // загрузка данных с сервера
        let headers = this.get_headers() // имя переменной только headers, иначе axios не примет её
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState({'users': response.data})
            })
            .catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({'projects': response.data})
            })
            .catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                this.setState({'todo': response.data})
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
        this.get_login_from_storage()
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    {GetSiteHeader(this)}

                    <Switch>
                        <Route exact path={'/'} render=''/>
                        <Route exact path={'/users'} component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path={'/projects'}
                               component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path={'/todo'} component={() => <ToDoList todo={this.state.todo}/>}/>
                        <Route path={'/projects/:id'}>
                            <ProjectView projects={this.state.projects}/>
                        </Route>
                        <Route exact path={'/login'} component={() => <LoginForm
                            auth={(username, password) => this.auth(username, password)}/>}/>
                    </Switch>

                    {GetSiteFooter()}
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
