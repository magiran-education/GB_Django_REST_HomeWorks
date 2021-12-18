const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.created_user}</td>
            <td>{todo.status}</td>
        </tr>
    )
}

const ToDoList = ({todo}) => {
    return (
        <table>
            <th>Проект</th>
            <th>Описание</th>
            <th>Кто создал</th>
            <th>Статус</th>
            {todo.map((t) => < ToDoItem todo={t} />)}
        </table>
    )
}

export default ToDoList
