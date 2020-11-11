import React, { Component } from 'react';
//import './App.css';
import { DoctorService  } from '../service/DoctorService';
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


export default class DoctorEntity extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      doctor: {
        idDoctors: null,
        firstName: null,
        middleName: null,
        lastName: null,
        maidenName: null,
        address1: null,
        address2: null,
        gender: null,
        birthdate: null,
        collegiateNumber: null,
        isActive: null,
        phone1: null,
        phone2: null
      },
      selectedDoctor : {

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
   
    

   
  

    this.doctorService = new DoctorService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount(){
    this.doctorService.getAll().then(data => this.setState({doctores: data}))
  }

  save() {
    this.doctorService.save(this.state.doctor).then(data => {
      this.setState({
        visible : false,
        doctor: {
          idDoctor: null,
          firstName: null,
          middleName: null,
          lastName: null,
          maidenName: null,
          address1: null,
          address2: null,
          gender: null,
          birthdate: null,
          collegiateNumber: null,
          isActive: null,
          phone1: null,
          phone2: null
        }
      });
     
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.doctorService.getAll().then(data => this.setState({doctores: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.doctorService.delete(this.state.selectedDoctor.idDoctor).then(data => {   
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.doctorService.getAll().then(data => this.setState({doctores: data}));
      });
    }
  }

  render(){
    return (
      <div style={{width:'100%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="React CRUD Doctor">
            <DataTable value={this.state.doctores} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedDoctor} onSelectionChange={e => this.setState({selectedDoctor: e.value})}>
              <Column field="idDoctor" header="ID"></Column>
              <Column field="firstName" header="Nombre"></Column>
              <Column field="middleName" header="Nombre2"></Column>
              <Column field="lastName" header="Primer Apellido"></Column>
              <Column field="maidenName" header="Segundo Apellido"></Column>
              <Column field="address1" header="Direccion1"></Column>
              <Column field="address2" header="Direccion2" style={{width:'10%'}}></Column>
              <Column field="gender" header="Genero" style={{width:'5%', margin: '0 auto', marginTop: '0 auto'}}></Column>
              <Column field="birthdate" header="Fecha" style={{width:'20%', margin: '0 auto', marginTop: '0 auto'}}></Column>
              <Column field="collegiateNumber" header="numero colegiado"></Column>
              <Column field="isActive" header="Activo"></Column>
              <Column field="phone1" header="Telefono1"></Column>
              <Column field="phone2" header="Telefono2"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear Doctor33" visible={this.state.visible} style={{width: '500px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="persona-form">
              <span className="p-float-label">
                <InputText value={this.state.doctor.firstName} style={{width : '100%'}} id="firstName" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.firstName = val;

                        return { doctor };
                    })}
                  } />
                <label htmlFor="firstName">Nombre 1</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctor.middleName} style={{width : '100%'}} id="middleName" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.middleName = val;

                        return { doctor };
                    })}
                  } />
                <label htmlFor="middleName">Nombre 1</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctor.itemslastName} style={{width : '100%'}} id="lastName" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.lastName = val

                        return { doctor };
                    })}
                  } />
                <label htmlFor="lastName">Apellido</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctor.maidenName} style={{width : '100%'}} id="maidenName" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.maidenName = val

                        return { doctor };
                    })}
                  } />
                <label htmlFor="maidenName">Apellido</label>
              </span>

              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctor.address1} style={{width : '100%'}} id="address1" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.address1 = val

                        return { doctor };
                    })}
                  } />
                <label htmlFor="address1">Direccion1</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctor.address2} style={{width : '100%'}} id="address2" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.address2 = val

                        return { doctor };
                    })}
                  } />
                <label htmlFor="address2">Direccion2</label>
              </span>

              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctor.gender} style={{width : '100%'}} id="gender" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.gender = val

                        return { doctor };
                    })}
                  } />
                <label htmlFor="gender">Genero</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctor.birthdate} style={{width : '100%'}} id="birthdate" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.birthdate = val

                        return { doctor };
                    })}
                  } />
                <label htmlFor="birthdate">Fecha</label>
              </span>

              <br/>

              <span className="p-float-label">
                <InputText value={this.state.doctor.collegiateNumber} style={{width : '100%'}} id="collegiateNumber" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.collegiateNumber = val

                        return { doctor };
                    })}
                  } />
                <label htmlFor="collegiateNumber">numero Colegiado</label>
              </span>

              
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctor.isActive} style={{width : '100%'}} id="isActive" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.isActive = val

                        return { doctor };
                    })}
                  } />
                <label htmlFor="isActive">Estado</label>
              </span>

              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctor.phone1} style={{width : '100%'}} id="phone1" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.phone1 = val

                        return { doctor };
                    })}
                  } />
                <label htmlFor="phone1">Telefono1</label>
              </span>

              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctor.phone2} style={{width : '100%'}} id="phone2" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctor = Object.assign({}, prevState.doctor);
                        doctor.phone2 = val

                        return { doctor };
                    })}
                  } />
                <label htmlFor="phone2">Telefono2</label>
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
      doctor : {
        idDoctor: null,
        firstName: null,
        middleName: null,
        lastName: null,
        maidenName: null,
        address1: null,
        address2: null,
        gender: null,
        birthdate: null,
        collegiateNumber: null,
        isActive: null,
        phone1: null,
        phone2: null
      }
    });
   // document.getElementById('persona-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      doctor : {
        idDoctor: this.state.selectedDoctor.idDoctor,
        firstName: this.state.selectedDoctor.firstName,
        middleName: this.state.selectedDoctor.middleName,
        lastName: this.state.selectedDoctor.lastName,
        maidenName: this.state.selectedDoctor.maidenName,
        address1: this.state.selectedDoctor.address1,
        address2: this.state.selectedDoctor.address2,
        gender: this.state.selectedDoctor.gender,
        birthdate: this.state.selectedDoctor.birthdate,
        collegiateNumber:this.state.selectedDoctor.collegiateNumber,
        isActive: this.state.selectedDoctor.isActive,
        phone1: this.state.selectedDoctor.phone1,
        phone2: this.state.selectedDoctor.phone2
        
      }
    })
  }
}
