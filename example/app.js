import React from 'react';
import ReactDOM from 'react-dom';
import ProfileHover from '../src/ProfileHover';

const appContainer = document.getElementById('reactApp');
const component = <ProfileHover />;
ReactDOM.render(component, appContainer);

