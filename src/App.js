import React, { useState, useCallback } from 'react';
import './App.css';

function getJsonFromUrl(qs) {
  if (!qs) return {};
  try {
    let a = qs.split('?')[1].split('#')[0].split('&');
    let prop;
    let arg;
    let args = {};

    for (prop in a) {
      if (a.hasOwnProperty(prop)) {
        arg = a[prop].split('=');
        args[arg[0]] = arg[1];
      }
    }
    return args;
  } catch (e) {
    console.log('Parsing Error', qs);
    return {};
  }
}


function getMenus() {
  const menuStr = getJsonFromUrl(window.location.search).menus;
  if (menuStr) {
    const menuList = menuStr.split(',');
    return menuList.map(menu => ({ name: decodeURIComponent(menu), count: 0 }));
  } else {
    return [
      { name: '아이스 라떼'      , count: 0 },
      { name: '아이스 아메리카노', count: 0 },
      { name: '핫 라떼'          , count: 0 },
      { name: '핫 아메리카노'    , count: 0 }
    ];
  }
}

function App() {
  const [ menuList, setMenuList ] = useState(getMenus());

  const increment = menuName => {
    setMenuList(menuList.map(m => {
      if (m.name === menuName) {
        m.count = m.count + 1;
      }
      return m;
    }));
  };

  const decrement = menuName => {
    setMenuList(menuList.map(m => {
      if (m.name === menuName) {
        m.count = m.count - 1;
      }
      return m;
    }).filter(m => {
      return m.count !== -1;
    }));
  };

  function getUrlParameter(menuList) {
    return '?menus=' + menuList.map(m => m.name).join(',');
  }

  function Link({ menuList }) {
    const commaSeperatedMenus = getUrlParameter(menuList);
    console.log(commaSeperatedMenus);
    const { origin, pathname } = window.location;
    const url = origin + pathname + commaSeperatedMenus;
    return (
      <a href={url}>{url}</a>
    );
  }

  function Menu({ menu }) {
    const m = menu.menu;
    const index = menu.index;

    const menuName = m.name;
    const inc = useCallback(
      () => {
        increment(menuName);
      },
      [menuName]
    );

    const dec = useCallback(
      () => {
        decrement(menuName);
      },
      [menuName]
    );

    return (
      <div key={ index } className="panel-block">
        <div className="button is-success is-fullwidth" onClick={ inc }><span className="title is-6">{ `${m.name} x ${m.count}`  }</span></div>&nbsp;
        <div className="button is-danger is-1" onClick={ dec }><span className="title is-6">X</span></div>
      </div>
    );
  }

  const [ newMenuName, setNewMenuName ] = useState('');

  function addMenu() {
    if (newMenuName) {
      menuList.push({ name: newMenuName, count: 0 });
      setMenuList(menuList);
      setNewMenuName('');
    }
  }

  return (
    <div className="App">
      <nav className="panel">
        <p className="panel-tabs">
          <a href="/" className="is-active">커피</a>
        </p>
        <div className="panel-block">
          <input onChange={e => setNewMenuName(e.target.value)} value={newMenuName} className="input" type="text" /> &nbsp;
          <div className="button is-primary is-fullwidth" onClick={ addMenu }><span className="title is-6">이거요</span></div>
        </div>
        {
          menuList && menuList.filter(m => {
            return newMenuName ? m.name.includes(newMenuName) : true;
          }).map((m, index) => {
            const menu = { menu: m, index };
            return <Menu key={index} menu={menu} />;
          })
        }
        <Link menuList={menuList} />
      </nav>
    </div>
  );
}

export default App;
