import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}`;
document.body.appendChild(script);

ReactDOM.render(<App />, document.getElementById('root'));
