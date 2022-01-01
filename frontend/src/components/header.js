function GetSiteHeader(main_this) {
  return (
    <header className="header">
        <ul className="menuList">
          <a href={'/'}><li className="menuItem">Главная</li></a>
          <a href={'/users/'}><li className="menuItem">Пользователи</li></a>
          <a href={'/projects/'}><li className="menuItem">Проекты</li></a>
          <a href={'/todo/'}><li className="menuItem">Заметки</li></a>
          <a href={'/login/'}>
              <li className="menuItem">
                  {
                      main_this.is_auth() ?
                          <button onClick={() => main_this.logout()}>Logout ({main_this.state.login})</button> :
                          "Страница входа"
                  }
              </li>
          </a>
        </ul>
    </header>
  );
}

export default GetSiteHeader
