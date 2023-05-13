import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Auth0Provider } from '@auth0/auth0-react';

type MainComponentProps = {text: string}

function MainComponent(props: MainComponentProps) {
    return (
        <div>{props.text}</div>
    );
}

export default MainComponent;