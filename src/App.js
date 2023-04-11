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
    return menuList.map(menu => ({ name: decodeURIComponent(menu), count: 1 }));
  } else {
    return [
      { name: '아아', count: 0 },
      { name: '아라', count: 0 },
      { name: '따아', count: 0 },
      { name: '따라', count: 0 },
    ];
  }
}

export function App() {
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
      <span>test</span>
      // <div key={ index } >
        // <button className="button"><span className="title is-6">{ `${m.name} (${m.count})` }</span></button>&nbsp;
        // <button className="button" onClick={ inc }><span className="title is-6">+</span></button>
        // <button className="button" onClick={ dec }><span className="title is-6">-</span></button>
      // </div>
    );
  }

  const [ newMenuName, setNewMenuName ] = useState('');

  function addMenu() {
    if (newMenuName) {
      menuList.push({ name: newMenuName, count: 1 });
      setMenuList(menuList);
      setNewMenuName('');
    }
  }

  function keyPress(e) {
    if (e.key === 'Enter') {
      addMenu();
    }
  }

  return (
    <div className="App">
      <input type="text" value={newMenuName} onKeyPress={ keyPress } onChange={e => setNewMenuName(e.target.value)} id="standard-basic" label="Menu Name" />
      <button variant="contained" color="primary" onClick={ addMenu }>이거요</button>
      {
        menuList && menuList.filter(m => {
          return newMenuName ? m.name.includes(newMenuName) : true;
        }).map((m, index) => {
          const menu = { menu: m, index };
          return <Menu key={index} menu={menu} />;
        })
      }
      <Link menuList={menuList} />
    </div>
  );
}

