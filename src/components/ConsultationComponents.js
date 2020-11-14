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



import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
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
        dateRecorded: null,
        tbPrescription: null
       
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

  state1={
    ciudades:[]
  }

  

  componentDidMount(){
    this.consultaService.getAll().then(data => this.setState({consultas: data}));
    //////
    this.DoctorService.getAll().then(data => this.setState({countries:data}));
    ////
    /*
    axios
    .get("http://localhost:8080/api/v1/doctors")
    .then((response) =>{
      console.log(response);
      this.setState({ciudades: response.data})
    })
    .catch((error)=>{
      console.log(error);
    });
  */
    
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
                return country.firstName.toLowerCase().startsWith(event.query.toLowerCase());
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
          dateRecorded: null,
          tbPrescription: null

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

  


  
  render(){
    return (
      <div style={{width:'300%', margin: '0 auto', marginTop: '0 auto'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="React CRUD Consultas">
            <DataTable value={this.state.consultas} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedConsulta} onSelectionChange={e => this.setState({selectedConsulta: e.value})}>
              <Column field="id" header="ID_consulta" ></Column>
              <Column field="patientId" header="Fecha de consulta" style={{width:'6%'}} ></Column>
              <Column field="doctorId" header="Diagnostico"></Column>
              <Column field="complaints" header="Tratamiento"></Column>
              <Column field="diagnosis" header="Observacion"></Column>
              <Column field="treatment" header="Quejas"></Column>
              <Column field="dateRecorded" header="Otros Detalles"></Column>
              <Column field="tbPrescription" header="Siguientes Visitas"  style={{width:'6%'}}></Column>
              
              
              <Column field="idDoctor.firstName" header="Nombre Doctor"></Column>
              <Column field="idDoctor.middleName" header="Segundo Nombre Doctor"></Column>
              <Column field="idDoctor.lastName" header="Apellido Doctor"></Column>
              <Column field="idDoctor.maidenName" header="Segundo Apellido Doctor"></Column>
              <Column field="idDoctor.address1" header="Direccion"></Column>
              <Column field="idDoctor.address2" header="Segundo Direccion"></Column>
              <Column field="idDoctor.gender" header="Genero"></Column>
              <Column field="idDoctor.birthdate" header="Fecha Nacimiento"  style={{width:'6%'}}></Column>
              <Column field="idDoctor.collegiateNumber" header="Colegiado"></Column>
              <Column field="idDoctor.isActive" header="Estado"></Column>
              <Column field="idDoctor.phone1" header="Telefono"></Column>
              <Column field="idDoctor.phone2" header="Telefono2"></Column>
              
              <Column field="idPatient.firstName" header="Nombre Paciente"></Column>
              <Column field="idPatient.middleName" header="Segundo Nombre Paciente"></Column>
              <Column field="idPatient.lastName" header="Apellido Doctor"></Column>
              <Column field="idPatient.maidenName" header="Segundo Apellido Paciente"></Column>
              <Column field="idPatient.address1" header="Direccion Paciente"></Column>
              <Column field="idPatient.address2" header="Segundo Direccion paciente"></Column>
              <Column field="idPatient.phone1" header="Telefono paciente"></Column>
              <Column field="idPatient.phone2" header="Telefono2 paciente"></Column>
              <Column field="idPatient.gender" header="Genero"></Column>
              <Column field="idPatient.birthdate" header="Fecha Nacimiento"  style={{width:'6%'}}></Column>
            
           
              
              
              
    
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
                <label htmlFor="patientId">Fecha consulta</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.consulta.diagnosis} style={{width : '100%'}} id="diagnosis" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.diagnosis = val;

                        return { consulta };
                    })}
                  } />
                <label htmlFor="diagnosis">Diagnostico</label>
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
                <label htmlFor="treatment">Tratamiento</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.consulta.observations} style={{width : '100%'}} id="observations" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.observations = val

                        return { consulta };
                    })}
                  } />
                <label htmlFor="observations">Observaciones</label>
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
                <label htmlFor="complaints">Quejas</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.consulta.otherDetails} style={{width : '100%'}} id="otherDetails" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.otherDetails = val

                        return { consulta };
                    })}
                  } />
                <label htmlFor="otherDetails">otros detalles</label>
              </span>

              <br/>
              <span className="p-float-label">
                <InputText value={this.state.consulta.nextVisit} style={{width : '100%'}} id="nextVisit" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.nextVisit = val

                        return { consulta };
                    })}
                  } />
                <label htmlFor="nextVisit">Siguiente Visita</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.consulta.idDoctor} style={{width : '100%'}} id="idDoctor" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.idDoctor = parseInt(val);

                        return { consulta };
                    })}
                  } />
                <label htmlFor="idDoctor">id doctor</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.consulta.idPatient} style={{width : '100%'}} id="idPatient" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.idPatient = parseInt(val) ;

                        return { consulta };
                    })}
                  } />
                <label htmlFor="idPatient">id paciente</label>
              </span>
              
              
              <span className="p-float-label">
              <div className="card">
                <h5>Basic</h5>
                <AutoComplete value={this.state.selectedCountry1} suggestions={this.state.filteredCountries} completeMethod={this.searchCountry} field="firstName" onChange={(e) => this.setState({ selectedCountry1: e.value })} />

                <h5>Dropdown and Templating</h5>
                <AutoComplete value={this.state.selectedCountry2} suggestions={this.state.filteredCountries} completeMethod={this.searchCountry} field="firstName" dropdown itemTemplate={this.itemTemplate} onChange={(e) => this.setState({ selectedCountry2: e.value })} />

                <h5>Multiple</h5>
                <span className="p-fluid">
                    <AutoComplete value={this.state.selectedCountries} suggestions={this.state.filteredCountries} completeMethod={this.searchCountry} field="firstName" multiple onChange={(e) => this.setState({ selectedCountries: e.value })} />
                </span>
            </div>
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
          dateRecorded: null,
          tbPrescription: null
        
       
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
        dateRecorded: this.state.selectedConsulta.dateRecorded,
        tbPrescription: this.state.selectedConsulta.tbPrescription
       
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
