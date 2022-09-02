import React from 'react';
import './App.css';
import AddUser from './components/AddUser';
import { Route,  Routes } from "react-router-dom";
import Admin from './components/Admin';
import Page404 from './components/Page404';
import { BrowserRouter } from "react-router-dom";
import QuestionPage from './components/QuestionPage';
import Result from './components/Result';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/question/:id" element={<QuestionPage/>} />
        <Route path="/result/:id" element={<Result/>} />
        <Route  path="*" element={<Page404/>} />
      </Routes>
    </BrowserRouter>
      </div>
    );
}

export default App;
