import React, { Component } from 'react';
//import './App.css';
import { ConsulService } from '../service/ConsulService';
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




export default class ConsultationEntity extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      consulta: {

        idConsultation: null,
        consultationDate: null,
        diagnosis: null,
        treatment: null,
        observations: null,
        complaints: null,
        otherDetails: null,
        nextVisit: null,
        idDoctor: null,
         idPatient : null
        ///////////////////////////

        
      }
      
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
   
    this.consultaService = new ConsulService();
    
    
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount(){
    this.consultaService.getAll().then(data => this.setState({consultas: data})) 
    
  }

 
  save() {
    this.consultaService.save(this.state.consulta).then(data => {
      this.setState({
        visible : false,
        consulta: {
          
          idConsultation: null,
         consultationDate: null,
          diagnosis: null,
          treatment: null,
          observations: null,
          complaints: null,
          otherDetails: null,
          nextVisit: null,
          idDoctor: null,
          idPatient : null

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
              <Column field="idConsultation" header="ID_consulta" ></Column>
              <Column field="consultationDate" header="Fecha de consulta" style={{width:'6%'}} ></Column>
              <Column field="diagnosis" header="Diagnostico"></Column>
              <Column field="treatment" header="Tratamiento"></Column>
              <Column field="observations" header="Observacion"></Column>
              <Column field="complaints" header="Quejas"></Column>
              <Column field="otherDetails" header="Otros Detalles"></Column>
              <Column field="nextVisit" header="Siguientes Visitas"  style={{width:'6%'}}></Column>
              
              
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
                <InputText value={this.state.consulta.consultationDate} style={{width : '100%'}} id="consultationDate" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let consulta = Object.assign({}, prevState.consulta);
                        consulta.consultationDate = val;

                        return { consulta };
                    })}
                  } />
                <label htmlFor="consultationDate">Fecha consulta</label>
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
        
        idConsultation: null,
        consultationDate: null,
        diagnosis: null,
        treatment: null,
        observations: null,
        complaints: null,
        otherDetails: null,
        nextVisit: null,
        idDoctor: null,
        idPatient : null
        
       
         ///////////////////////////
      }
    });
   // document.getElementById('persona-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      consulta : {
   
        idConsultation: this.state.selectedConsulta.idConsultation,
        consultationDate: this.state.selectedConsulta.consultationDate,
        diagnosis: this.state.selectedConsulta.diagnosis,
        treatment: this.state.selectedConsulta.treatment,
        observations: this.state.selectedConsulta.observations,
        complaints: this.state.selectedConsulta.complaints,
        otherDetails: this.state.selectedConsulta.otherDetails,
        nextVisit: this.state.selectedConsulta.nextVisit,
        idDoctor: this.state.selectedConsulta.idDoctor.idDoctor,
        idPatient : this.state.selectedConsulta.idPatient.idPatient
       
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
