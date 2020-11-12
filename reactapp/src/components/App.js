import React, { Component } from 'react';
//import './App.css';
import { PersonaService } from '../service/PersonaService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';

import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { Toast } from 'primereact/toast';

import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      persona: {
        idPatient: null,
        firstName: null,
        middleName: null,
        lastName: null,
        maidenName: null,
        address1: null,
        address2: null,
        phone1: null,
        phone2: null,
        gender: null,
        birthdate: null
      },
      selectedPersona : {

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
   
    this.personaService = new PersonaService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount(){
    this.personaService.getAll().then(data => this.setState({personas: data}))
  }

  save() {
    this.personaService.save(this.state.persona).then(data => {
      this.setState({
        visible : false,
        persona: {
          idPatient: null,
          firstName: null,
          middleName: null,
          lastName: null,
          maidenName: null,
          address1: null,
          address2: null,
          phone1: null,
          phone2: null,
          gender: null,
          birthdate: null
        }
      });
     
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.personaService.getAll().then(data => this.setState({personas: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.personaService.delete(this.state.selectedPersona.idPatient).then(data => {   
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.personaService.getAll().then(data => this.setState({personas: data}));
      });
    }
  }

  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="React CRUD App">
            <DataTable value={this.state.personas} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedPersona} onSelectionChange={e => this.setState({selectedPersona: e.value})}>
              <Column field="idPatient" header="ID"></Column>
              <Column field="firstName" header="Nombre"></Column>
              <Column field="middleName" header="Nombre2"></Column>
              <Column field="lastName" header="Primer Apellido"></Column>
              <Column field="maidenName" header="Segundo Apellido"></Column>
              <Column field="address1" header="Direccion1"></Column>
              <Column field="address2" header="Direccion2"></Column>
              <Column field="phone1" header="Telefono1"></Column>
              <Column field="phone2" header="Telefono2"></Column>
              <Column field="gender" header="Genero"></Column>
              <Column dateFormat="dd/mm/yy" field="birthdate" header="Fecha Nacimiento" style={{width:'20%', margin: '0 auto', marginTop: '20px'}}></Column>


 
            </DataTable>
        </Panel>
        <Dialog header="Crear persona" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="persona-form">
              <span className="p-float-label">
                <InputText value={this.state.persona.firstName} style={{width : '100%'}} id="firstName" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.firstName = val;

                        return { persona };
                    })}
                  } />
                <label htmlFor="firstName">Nombre 1</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.middleName} style={{width : '100%'}} id="maidenName" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.middleName = val;

                        return { persona };
                    })}
                  } />
                <label htmlFor="maidenName">Nombre 2</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.lastName} style={{width : '100%'}} id="lastName" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.lastName = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="lastName">Apellido</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.maidenName} style={{width : '100%'}} id="maidenName" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.maidenName = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="maidenName">Apellido 2</label>
              </span>

              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.address1} style={{width : '100%'}} id="address1" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.address1 = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="address1">Direccion1</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.address2} style={{width : '100%'}} id="address2" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.address2 = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="address2">Direccion2</label>
              </span>

              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.phone1} style={{width : '100%'}} id="phone1" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.phone1 = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="phone1">Telefono1</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.phone2} style={{width : '100%'}} id="phone2" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.phone2 = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="phone2">Telefono2</label>
              </span>

              <br/>

              <span className="p-float-label">

                
                <InputText value={this.state.persona.gender} style={{width : '100%'}} id="gender" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.gender = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="gender">Genero</label>
              </span>

              
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.birthdate} style={{width : '100%'}} id="birthdate" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.birthdate = val

                        return { persona };
                    })}
                  } />
                <label htmlFor="birthdate">Fecha Nacimiento</label>
              </span>


            </form>
        </Dialog>
       
        <Toast ref={(el) => this.toast = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      persona : {
        idPatient: null,
        firstName: null,
        middleName: null,
        lastName: null,
        maidenName: null,
        address1: null,
        address2: null,
        phone1: null,
        phone2: null,
        gender: null,
        birthdate: null
      }
    });
   // document.getElementById('persona-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      persona : {
        /*
        id: this.state.selectedPersona.id,
        nombre: this.state.selectedPersona.nombre,
        apellido: this.state.selectedPersona.apellido,
        direccion: this.state.selectedPersona.direccion,
        telefono : this.state.selectedPersona.telefono*/

        idPatient: this.state.selectedPersona.idPatient,
        firstName: this.state.selectedPersona.firstName,
        middleName: this.state.selectedPersona.middleName,
        lastName: this.state.selectedPersona.lastName,
        maidenName: this.state.selectedPersona.maidenName,
        address1: this.state.selectedPersona.address1,
        address2: this.state.selectedPersona.address2,
        phone1: this.state.selectedPersona.phone1,
        phone2:this.state.selectedPersona.phone2,
        gender: this.state.selectedPersona.gender,
        birthdate:this.state.selectedPersona.birthdate
      }
    })
  }
}
