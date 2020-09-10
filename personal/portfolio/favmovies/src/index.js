import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Detail from './detail';
import Favs from './favs';

const AppNew = <Switch>
  <Route path="/:type/:id" component={Detail} />
  <Route path="/favs" component={Favs} />
  <Route exact path="/" component={App} />

</Switch>

ReactDOM.render(
  <BrowserRouter>
    {AppNew}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
