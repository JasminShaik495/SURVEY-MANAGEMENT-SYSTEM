import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import CreateSurvey from './components/CreateSurvey';
import ViewForm from './components/ViewForm';

function App() {

  return (
   <div>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/form/:id" element={<Form />}/>
        <Route path="/createsurvey" element={<CreateSurvey />} />
        <Route path="/view/form" element={<ViewForm />} />
      </Routes>
    </Router>
   </div>
  )
}

export default App
