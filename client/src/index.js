import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './login'
import Dashboard from './Dashboard'
import Register from './Register'
import AddPet from './AddPet'
import UpdateProfile from './UpdateProfile'
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {/* Setting up the Router component from react-router-dom */}
      <Router>
        {/* Defining different Routes using Routes and Route components */}
        <Routes>
          {/* Route for the Home component */}
          <Route exact path='/' element={<App/>} />
          {/* Route for the Login component */}
          <Route exact path="/login" element={<Login/>} />
           {/* Route for the Dashboard component */}
          <Route exact path="/dashboard" element={<Dashboard/>} />
          {/* Route for the Adding new Pet component */}
          <Route exact path="/dashboard/add" element={<AddPet/>} />
          {/* Route for the updating the profile component */}
          <Route exact path="/dashboard/update" element={<UpdateProfile/>} />
           {/* Route for the Register component */}
          <Route exact path="/register" element={<Register/>} />
        </Routes>
      </Router>
  </React.StrictMode>
);


