
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Inicio from './components/Navigation';
import PacientComponents from './components/PacientComponents';
import DoctorComponents from './components/DoctorComponents';
import ConsultationComponents from './components/ConsultationComponents';
import Specialization from './components/SpecializationEntity';
import DoctorSpecialization from './components/DoctorSpecializationEntity';
import 'bootstrap/dist/css/bootstrap.css';

function App(){
  return(

    
    <Router>
        <div>
            <h1>Sistema Hospital </h1>
        </div>
        <a path={'/App'} href={'/PacientComponents'} component={PacientComponents} className="btn btn-primary">Persona</a>
        <a path={'/App'} href={'/DoctorComponents'} component={DoctorComponents} className="btn btn-outline-secondary">Doctor</a>
        <a path={'/App'} href={'/ConsultationComponents'} component={ConsultationComponents} className="btn btn-outline-secondary">Consultas</a>
        <a path={'/App'} href={'/SpecializationEntity'} compont={Specialization} className="btn btn-outline-secondary">Specialization</a>
        <a path={'/App'} href={'/DoctorSpecializationEntity'} component={DoctorSpecialization} className="btn btn-outline-secondary">Doctor Especializacion</a>
        <Switch>
          <Route path={'/Navigation'} component={Inicio}></Route>
          <Route path={'/PacientComponents'} component={PacientComponents}></Route>
          <Route path={'/DoctorComponents'} component={DoctorComponents}></Route>
          <Route path={'/ConsultationComponents'} component={ConsultationComponents}></Route>
          <Route path={'/SpecializationEntity'} component={Specialization}></Route>
          
         
        </Switch>

    </Router>
  );
}

export default App;