import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './index.css';


// ==========================================
import reportWebVitals from './tests/reportWebVitals';
// Galère 7: Le provider ne prends qu'une variable "value" et rie d'autres, tu ne peux pas le rename :)
// Galère 8: Le commentaire juste au dessus a suffit à presque péter le projet, parce que React c'est un peu à chier.
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
