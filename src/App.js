import React from 'react';
import './App.css';

const menuList = [
  'apple',
  'banana',
  'melon',
];

function menu(menuName, index) {
  return (
    <div key={ index } className="panel-block">
      <div className="button is-success is-fullwidth"><span className="title is-6">{ menuName }</span></div>&nbsp;
      <div className="button is-outlined is-1"><span className="title is-6">3</span></div>&nbsp;
      <div className="button is-danger is-1"><span className="title is-6">X</span></div>
    </div>
  );
}

function addMenu() {
  menuList.push("jfdjf");
  console.log(menuList);
}

function title() {
  return  (
    <div className="panel-block">
      <input className="input" type="text" placeholder="?" /> &nbsp;
      <div className="button is-primary is-fullwidth" onClick={ addMenu }><span className="title is-6">이거요</span></div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="panel">
        <p className="panel-tabs">
          <a href="/" className="is-active">커피</a>
          <a href="/">점심</a>
        </p>
        { title() }
        {
          menuList.map((menuName, index) => {
            return menu(menuName, index);
          })
        }
      </nav>
    </div>
  );
}

export default App;
