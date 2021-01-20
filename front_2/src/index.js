import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'


axios.get('http://localhost:3001/api/names').then(response => {
  const names = response.data
  console.log('received data')

  ReactDOM.render(
    <App names={names} />,
    document.getElementById('root')
  )
})
