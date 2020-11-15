import React, { Component } from 'react';
//import './App.css';
import { SpecializationsService } from '../service/SpecializationsService';
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


export default class SpecializationsComponents extends Component{


  
  constructor(){
    super();
    this.state = {
      visible : false,
      specialization: {

        id: null,
        specializationName: null,
        description: null

      },
      selectedSpecializations : {

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

   
   
    this.specializationsService = new SpecializationsService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }


  


  componentDidMount(){
    this.specializationsService.getAll().then(data => this.setState({specializations: data}))
  }

  save() {
    this.specializationsService.save(this.state.specialization).then(data => {
      this.setState({
        visible : false,
        specialization: {
          
            id: null,
            specializationName: null,
            description: null

        }
      });
     
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.specializationsService.getAll().then(data => this.setState({specializations: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.specializationsService.delete(this.state.specializationsService.id).then(data => {   
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.specializationsService.getAll().then(data => this.setState({specializations: data}));
      });
    }
  }

  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Especialidades">
            <DataTable value={this.state.specializations} paginator={true} rows="4" selectionMode="single" selection={this.state.specializationsService} onSelectionChange={e => this.setState({specializationsService: e.value})}>
              
              <Column field="id" header="Codigo Especialidades"></Column>
              <Column field="specializationName" header="Nombre de Especialidad"></Column>
              <Column field="description" header="Descripcion"></Column>
              

 
            </DataTable>
        </Panel>
        <Dialog header="New specialization" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="persona-form">
              <span className="p-float-label">
                <InputText value={this.state.specialization.specializationName} style={{width : '100%'}} id="specializationName" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let specialization = Object.assign({}, prevState.specialization);
                        specialization.specializationName = val;

                        return { specialization };
                    })}
                  } />
                <label htmlFor="specializationName"> Nombre Especializacion</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.specialization.description} style={{width : '100%'}} id="description" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let specialization = Object.assign({}, prevState.specialization);
                        specialization.description = val;

                        return { specialization };
                    })}
                  } />
                <label htmlFor="description">Descripcion</label>
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
      specialization : {
       
        id: null,
        specializationName: null,
        description: null

      }
    });
   // document.getElementById('persona-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      specialization : {
       

        id: this.state.specializationsService.id,
        specializationName: this.state.specializationsService.specializationName,
        description: this.state.specializationsService.description
        
      }
    })
  }
}
