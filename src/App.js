import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [ menuList, setMenuList ] = useState([
    { name: '아이스 라떼'      , count: 0 },
    { name: '아이스 아메리카노', count: 0 },
    { name: '핫 라떼'          , count: 0 },
    { name: '핫 아메리카노'    , count: 0 }
  ]);

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

  const [ newMenuName, setNewMenuName ] = useState('');

  function Menu({ menu }) {
    const m = menu.menu;
    const index = menu.index;

    const menuName = m.name;
    const inc = useCallback(
      () => {
        increment(menuName)
      },
      [menuName]
    );

    const dec = useCallback(
      () => {
        decrement(menuName)
      },
      [menuName]
    );

    return (
      <div key={ index } className="panel-block">
        <div className="button is-success is-fullwidth" onClick={ inc }><span className="title is-6">{ m.name }</span></div>&nbsp;
        <div className="button is-outlined is-1"><span className="title is-6">{ m.count }</span></div>&nbsp;
        <div className="button is-danger is-1" onClick={ dec }><span className="title is-6">X</span></div>
      </div>
    );
  }

  function addMenu() {
    if (newMenuName) {
      menuList.push({ name: newMenuName, count: 0 });
      setMenuList(menuList);
      clearMenuName();
    }
  }

  function handleChange(event) {
    setNewMenuName(event.target.value);
  }

  function clearMenuName() {
    setNewMenuName('');
  }

  function Title() {
    return  (
      <div className="panel-block">
        <input onChange={ handleChange } value={ newMenuName } className="input" type="text" /> &nbsp;
        <div className="button is-danger is-1" onClick={ clearMenuName }><span className="title is-6">X</span></div> &nbsp;
        <div className="button is-primary is-fullwidth" onClick={ addMenu }><span className="title is-6">이거요</span></div>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="panel">
        <p className="panel-tabs">
          <a href="/" className="is-active">커피</a>
        </p>
        { <Title /> }
        {
          menuList && menuList.filter(m => {
            return newMenuName ? m.name.includes(newMenuName) : true;
          }).map((m, index) => {
            const menu = { menu: m, index };
            return <Menu key={index} menu={menu} />;
          })
        }
      </nav>
    </div>
  );
}

export default App;
