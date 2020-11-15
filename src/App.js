
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Inicio from './components/Navigation';
import PacientComponents from './components/PacientComponents';
import DoctorComponents from './components/DoctorComponents';
import ConsultationComponents from './components/ConsultationComponents';

import DiseaseComponents from './components/DiseaseComponents';
import SpecializationsComponents from './components/SpecializationsComponents';

import DoctorSpecialization from './components/DoctorSpecializationComponents';

import 'bootstrap/dist/css/bootstrap.css';

function App(){
  return(

    
    <Router>
        <div>
            <h1>Sistema Hospital </h1>
        </div>
        <a path={'/App'} href={'/PacientComponents'} component={PacientComponents} className="btn btn-outline-secondary">Paciente</a>
        <a path={'/App'} href={'/DoctorComponents'} component={DoctorComponents} className="btn btn-outline-secondary">Doctores</a>
        <a path={'/App'} href={'/ConsultationComponents'} component={ConsultationComponents} className="btn btn-outline-secondary">Doctor Consultas</a>

        <a path={'/App'} href={'/DiseaseComponents'} compont={DiseaseComponents} className="btn btn-outline-secondary">Enfermedades</a>
        <a path={'/App'} href={'/SpecializationsComponents'} component={SpecializationsComponents} className="btn btn-outline-secondary">Especializaciones</a>
        <a path={'/App'} href={'/DoctorSpecialization'} compont={DoctorSpecialization} className="btn btn-outline-secondary">Doctor Specialization</a>
          


        <Switch>
          <Route path={'/Navigation'} component={Inicio}></Route>
          <Route path={'/PacientComponents'} component={PacientComponents}></Route>
          <Route path={'/DoctorComponents'} component={DoctorComponents}></Route>
          <Route path={'/ConsultationComponents'} component={ConsultationComponents}></Route>

          <Route path={'/DiseaseComponents'} component={DiseaseComponents}></Route>
          <Route path={'/SpecializationsComponents'} component={SpecializationsComponents}></Route>
          <Route path={'/DoctorSpecialization'} component={DoctorSpecialization}></Route>
          
         
        </Switch>

    </Router>
  );
}

export default App;