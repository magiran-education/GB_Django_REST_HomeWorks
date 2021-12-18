import {Link} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td><Link to={`/projects/${project.id}`}>{project.name}</Link></td>
            <td>{project.repository}</td>
            <td>{project.users.length}</td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
    return (
        <table>
            <th>Id</th>
            <th>Название</th>
            <th>Репозиторий</th>
            <th>Кол-во участников</th>
            {projects.map((project) => < ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectList
