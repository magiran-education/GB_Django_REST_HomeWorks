function GetSiteHeader() {
  return (
    <header className="header">
        <ul className="menuList">
          <a href={'#'}><li className="menuItem">Главная</li></a>
          <a href={'#'}><li className="menuItem">Авторы</li></a>
          <a href={'#'}><li className="menuItem">Книги</li></a>
        </ul>
    </header>
  );
}

export default GetSiteHeader
