import React, { Component } from 'react';
//import './App.css';
import { ConsulService } from '../service/ConsulService';
import { DoctorService } from '../service/DoctorService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';

import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { Toast } from 'primereact/toast';

import { Dropdown } from 'primereact/dropdown';

import { InputMask } from 'primereact/inputmask';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import { AutoComplete } from 'primereact/autocomplete';



export default class ConsultationComponents extends Component{

 

  constructor(){
    super();

    

    this.state = {
      visible : false,
      consulta: {

        id: null,
        patientId: null,
        doctorId: null,
        complaints: null,
        diagnosis: null,
        treatment: null,
        dateRecorded: null
       
        //////////////////////////
      
    }
    };

    this.state1 = {
      countries: [],
      selectedCountry1: null,
      selectedCountry2: null,
      selectedCountries: null,
      filteredCountries: null
  };

  
    
   


    this.items = [
      {
        label : 'Nuevo',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon  : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
   
///////////////
this.searchCountry = this.searchCountry.bind(this);
///this.itemTemplate = this.itemTemplate.bind(this);
///////////////////////



    this.consultaService = new ConsulService();
    this.DoctorService = new DoctorService();
    
    

    
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }


  

  componentDidMount(){
    this.consultaService.getAll().then(data => this.setState({consultas: data}));
    //////
    //this.DoctorService.getAll().then(data => this.setState({countries:data}));
    ////
    
    axios
    .get("http://157.230.5.231:8080/as2final-backend-0.0.1-SNAPSHOT/api/v1/doctors")
    .then((response) =>{
      console.log(response);
      this.setState({countries: response.data})
    })
    .catch((error)=>{
      console.log(error);
    });
  
    
  }

  ///////////////////////
  searchCountry(event) {
    setTimeout(() => {
        let filteredCountries;
        if (!event.query.trim().length) {
            filteredCountries = [...this.state.countries];
        }
        else {
            filteredCountries = this.state.countries.filter((country) => {
                return country.id.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }

        this.setState({ filteredCountries });
    }, 250);
}


  //////////////////
 
  save() {
    this.consultaService.save(this.state.consulta).then(data => {
      this.setState({
        visible : false,
        consulta: {
          
          id: null,
          patientId: null,
          doctorId: null,
          complaints: null,
          diagnosis: null,
          treatment: null,
          dateRecorded: null
         

//////////////////////////////////////////
          
        }
      });
     
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.consultaService.getAll().then(data => this.setState({consultas: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.consultaService.delete(this.state.selectedConsulta.idConsultation).then(data => {   
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.consultaService.getAll().then(data => this.setState({consultas: data}));
      });
    }
  }

  
  state2 = {
    ciudades:[]
  };

  
  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '0 auto'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Consultas">
            <DataTable value={this.state.consultas} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedConsulta} onSelectionChange={e => this.setState({selectedConsulta: e.value})}>
              <Column field="id" header="Codigo Consulta" ></Column>

              <Column field="patientId" header="Codigo Paciente " style={{width:'6%'}} ></Column>
              <Column field="tbPatient.firstName" header="Primer Nombre Paciente"></Column>
              <Column field="tbPatient.middleName" header="Apellido Doctor"></Column>


              <Column field="doctorId" header="Codigo doctor"></Column>
              <Column field="tbDoctor.firstName" header="Primer Nombre Doctor"></Column>
              <Column field="tbDoctor.middleName" header="Apellido Doctor"></Column>

              <Column field="complaints" header="Queja"></Column>
              <Column field="diagnosis" header="diagnóstico"></Column>
              <Column field="treatment" header="tratamiento"></Column>
              <Column field="dateRecorded" header="Fecha Grabada Detalles"></Column>      
              
    
            </DataTable>
        </Panel>
        <Dialog header="Crear Consulta" visible={this.state.visible} style={{width: '800px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="persona-form">

              <div>
              <span className="p-float-label">
                <InputText value={this.state.consulta.patientId} style={{width : '100%'}} id="patientId" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.patientId = val;

                        return { consulta };
                    })}
                  } />
                <label htmlFor="patientId">Codigo Paciente</label>
               
                
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.consulta.doctorId} style={{width : '100%'}} id="doctorId" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.doctorId = val;

                        return { consulta };
                    })}
                  } />
                <label htmlFor="diagnosis">Codigo Doctor</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.consulta.complaints} style={{width : '100%'}} id="complaints" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.complaints = val

                        return { consulta };
                    })}
                  } />
                <label htmlFor="complaints">Queja</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.consulta.diagnosis} style={{width : '100%'}} id="diagnosis" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.diagnosis = val

                        return { consulta };
                    })}
                  } />
                <label htmlFor="diagnosis">diagnóstico</label>
              </span>

              <br/>
              <span className="p-float-label">
                <InputText value={this.state.consulta.treatment} style={{width : '100%'}} id="treatment" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.treatment = val

                        return { consulta };
                    })}
                  } />
                <label htmlFor="treatment">tratamiento</label>
              </span>
              <br/>
              
              <span className="p-float-label">
              
<label htmlFor=""></label>
<InputMask id="date" mask="9999-99-99" value={this.state.consulta.dateRecorded} placeholder="9999-99-99" 
slotChar="yyyy-mm-dd" onChange={(e) => {
  let val = e.target.value;
  this.setState(prevState => {
      let consulta = Object.assign({}, prevState.consulta);
      consulta.dateRecorded = val

      return { consulta };
  })}
}>
  
</InputMask>

<label htmlFor="dateRecorded">fecha de grabación</label>


</span>
              
                         
              </div>
              <br/>
              <hr/>
              <hr/>
            </form>

            
        </Dialog>
       
        <Toast ref={(el) => this.toast = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      consulta : {
        
          id: null,
          patientId: null,
          doctorId: null,
          complaints: null,
          diagnosis: null,
          treatment: null,
          dateRecorded: null
          
        
       
         ///////////////////////////
      }
    });
   // document.getElementById('persona-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      consulta : {
   
        id: this.state.selectedConsulta.id,
        patientId: this.state.selectedConsulta.patientId,
        doctorId: this.state.selectedConsulta.doctorId,
        complaints: this.state.selectedConsulta.complaints,
        diagnosis: this.state.selectedConsulta.diagnosis,
        treatment: this.state.selectedConsulta.treatment,
        dateRecorded: this.state.selectedConsulta.dateRecorded
     
       
        //////////////////////
       //pasfirstName: this.state.selectedPersona.pasfirstName,
       ///pasmiddleName: this.state.selectedPersona.pasmiddleName,
       //paslastName: this.state.selectedPersona.paslastName,
       //pasmaidenName: this.state.selectedPersona.pasmaidenName,
       //pasaddress1: this.state.selectedPersona.pasaddress1,
       //pasaddress2: this.state.selectedPersona.pasaddress2,
       //pasphone1: this.state.selectedPersona.pasphone1,
       //pasphone2: this.state.selectedPersona.pasphone2,
       ///pasgender: this.state.selectedPersona.pasgender,
       //pasbirthdate: this.state.selectedPersona.pasbirthdate
         ///////////////////////////
      }
    })
  }
}

 