
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Inicio from './components/Navigation';
import Persona from './components/App';
import Doctor from './components/DoctorEntity';
import Consultation from './components/ConsultationEntity';
import Specialization from './components/SpecializationEntity';
import DoctorSpecialization from './components/DoctorSpecializationEntity';
import 'bootstrap/dist/css/bootstrap.css';

function App(){
  return(

    
    <Router>
        <div>
            <h1>Sistema Hospital </h1>
        </div>
        <a path={'/App'} href={'/App'} component={Persona} className="btn btn-primary">Persona</a>
        <a path={'/App'} href={'/DoctorEntity'} component={Doctor} className="btn btn-outline-secondary">Doctor</a>
        <a path={'/App'} href={'/ConsultationEntity'} component={Consultation} className="btn btn-outline-secondary">Consultas</a>
        <a path={'/App'} href={'/SpecializationEntity'} compont={Specialization} className="btn btn-outline-secondary">Specialization</a>
        <a path={'/App'} href={'/DoctorSpecializationEntity'} component={DoctorSpecialization} className="btn btn-outline-secondary">Doctor Especializacion</a>
        <Switch>
          <Route path={'/Navigation'} component={Inicio}></Route>
          <Route path={'/App'} component={Persona}></Route>
          <Route path={'/DoctorEntity'} component={Doctor}></Route>
          <Route path={'/ConsultationEntity'} component={Consultation}></Route>
          <Route path={'/SpecializationEntity'} component={Specialization}></Route>
          
         
        </Switch>

    </Router>
  );
}

export default App;