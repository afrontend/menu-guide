import React, { useState } from 'react';
import './App.css';

function App() {
  const [ menuList, setMenu ] = useState([
    { name: '아이스 라떼'      , count: 0 },
    { name: '아이스 아메리카노', count: 0 },
    { name: '핫 라떼'          , count: 0 },
    { name: '핫 아메리카노'    , count: 0 }
  ]);

  const [ newMenuName, setNewMenuName ] = useState('');

  function menu(m, index) {

    const menuName = m.name;

    const increment = () => {
      setMenu(menuList.map(m => {
        if (m.name === menuName) {
          m.count = m.count + 1;
        }
        return m;
      }));
    };

    const decrement = () => {
      setMenu(menuList.map(m => {
        if (m.name === menuName) {
          m.count = m.count - 1;
        }
        return m;
      }).filter(m => {
        return m.count !== -1;
      }));
    };

    return (
      <div key={ index } className="panel-block">
        <div className="button is-success is-fullwidth" onClick={ increment }><span className="title is-6">{ m.name }</span></div>&nbsp;
        <div className="button is-outlined is-1"><span className="title is-6">{ m.count }</span></div>&nbsp;
        <div className="button is-danger is-1" onClick={ decrement }><span className="title is-6">X</span></div>
      </div>
    );
  }

  function addMenu() {
    if (newMenuName) {
      menuList.push({ name: newMenuName, count: 0 });
      setMenu(menuList);
      clearMenuName();
    }
  }

  function handleChange(event) {
    setNewMenuName(event.target.value);
  }

  function clearMenuName() {
    setNewMenuName('');
  }

  function title() {
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
        { title() }
        {
          menuList && menuList.filter(m => {
            return newMenuName ? m.name.includes(newMenuName) : true;
          }).map((m, index) => {
            return menu(m, index);
          })
        }
      </nav>
    </div>
  );
}

export default App;
