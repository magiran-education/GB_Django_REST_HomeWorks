import {useParams} from "react-router-dom";


const View = ({project}) => {
    return(
        <div>
            <h2>Проект: {project.name}</h2>
            <p>Пользователи: {project.users.length}</p>
            <p>Репозиторий: {project.repository}</p>
        </div>
    )
}


const ProjectView = ({projects}) => {
    let {id} = useParams()
    id = parseInt(id)
    let project = projects.filter(p => p.id === id)
    // project = project[0]

    return (
        <div>
            {project.map((p) => < View project={p}/>)}
        </div>
    )

}


export default ProjectView
