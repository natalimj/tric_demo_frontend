import React from 'react';
import './App.css';
import { Route,  Routes } from "react-router-dom";
import Admin from './components/Admin';
import Page404 from './components/Page404';
import { BrowserRouter } from "react-router-dom";
import MainPage from './components/MainPage';
import StartPage from './components/StartPage';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route  path="*" element={<Page404/>} />
      </Routes>
    </BrowserRouter>
      </div>
    );
}

export default App;
