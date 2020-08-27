// eslint-disable-next-line max-classes-per-file
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import Page from './templates/Page';
import './App.scss';

const element = (
    <Router>
        <Page/>
    </Router>
);

ReactDOM.render(element, document.getElementById('content'));

if (module.hot) {
    module.hot.accept();
}
