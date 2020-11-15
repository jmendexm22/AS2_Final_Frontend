import React, { Component } from 'react';
//import './App.css';
import { DoctorSpecializationService } from '../service/DoctorSpecializationService';
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
import { InputMask } from 'primereact/inputmask';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default class DoctorSpecializationComponents extends Component{


  
  constructor(){
    super();
    this.state = {
      visible : false,
      doctorSpecialization: {

        id: null,
        doctorId: null,
        description: null

      },
      selectedDoctorSpecialization : {

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

   
   
    this.doctorSpecializationService = new DoctorSpecializationService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }


  


  componentDidMount(){
    this.doctorSpecializationService.getAll().then(data => this.setState({doctorspecializations: data}))
  }

  save() {
    this.doctorSpecializationService.save(this.state.doctorSpecialization).then(data => {
      this.setState({
        visible : false,
        doctorSpecialization: {
          
            id: null,
            doctorId: null,
            specializationId: null

        }
      });
     
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.doctorSpecializationService.getAll().then(data => this.setState({doctorspecializations: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.doctorSpecializationService.delete(this.state.selectedDoctorSpecialization.id).then(data => {   
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.doctorSpecializationService.getAll().then(data => this.setState({doctorspecializations: data}));
      });
    }
  }

  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Especializaciones Doctor ">
            <DataTable value={this.state.doctorspecializations} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedDoctorSpecialization} onSelectionChange={e => this.setState({selectedDoctorSpecialization: e.value})}>
              
              <Column field="id" header="Codigo Especializaciones Doctor "></Column>

              <Column field="doctorId" header="Codigo Doctor"></Column>
              <Column field="tbDoctor.firstName" header="Nombre"></Column>
              <Column field="tbDoctor.lastName" header="Apellido"></Column>

              <Column field="specializationId" header="Codigo Especializaciones"></Column>
              <Column field="tbSpecialization.specializationName" header="Nombre Especializacion"></Column>
              <Column field="tbSpecialization.description" header="Descripcion"></Column>

              

 
            </DataTable>
        </Panel>
        <Dialog header="New Doctor Specializations" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="persona-form">
              <span className="p-float-label">
                <InputText value={this.state.doctorSpecialization.doctorId} style={{width : '100%'}} id="doctorId" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctorSpecialization = Object.assign({}, prevState.doctorSpecialization);
                        doctorSpecialization.doctorId = val;

                        return { doctorSpecialization };
                    })}
                  } />
                <label htmlFor="doctorId">doctor Id</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.doctorSpecialization.specializationId} style={{width : '100%'}} id="specializationId" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let doctorSpecialization = Object.assign({}, prevState.doctorSpecialization);
                        doctorSpecialization.specializationId = val;

                        return { doctorSpecialization };
                    })}
                  } />
                <label htmlFor="specializationId">specializationId </label>
              </span>
              <br/>
            </form>
        </Dialog>
       
        <Toast ref={(el) => this.toast = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      doctorSpecialization : {
       
        id: null,
        doctorId: null,
        specializationId: null

      }
    });
   // document.getElementById('persona-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      doctorSpecialization : {
      
        id: this.state.selectedDoctorSpecialization.id,
        doctorId: this.state.selectedDoctorSpecialization.doctorId,
        specializationId: this.state.selectedDoctorSpecialization.specializationId
        
      }
    })
  }
}
