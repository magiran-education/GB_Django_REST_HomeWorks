const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.lastname}</td>
            <td>{user.firstname}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>Логин</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Эл.почта</th>
            {users.map((user) => < UserItem user={user} />)}
        </table>
    )
}

export default UserList
