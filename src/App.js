import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav class="panel">
        <p class="panel-tabs">
        <a href="/" class="is-active">커피</a>
        <a href="/">점심</a>
        </p>
        <div class="panel-block">
          <input class="input" type="text" placeholder="?" /> &nbsp;
          <div class="button is-primary is-fullwidth"><span class="title is-6">이거요</span></div>
        </div>
        <div class="panel-block">
          <div class="button is-success is-fullwidth"><span class="title is-6">핫아메리카노</span></div>&nbsp;
          <div class="button is-outlined is-1"><span class="title is-6">3</span></div>&nbsp;
          <div class="button is-danger is-1"><span class="title is-6">X</span></div>
        </div>
        <div class="panel-block">
          <div class="button is-success is-fullwidth"><span class="title is-6">아이스아메리카노</span></div>&nbsp;
          <div class="button is-outlined is-1"><span class="title is-6">3</span></div>&nbsp;
          <div class="button is-danger is-1"><span class="title is-6">X</span></div>
        </div>
      </nav>
    </div>
  );
}

export default App;
