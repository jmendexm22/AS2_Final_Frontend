import React, { Component } from 'react';
//import './App.css';
import { DiseaseService } from '../service/DiseaseService';
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


export default class DiseaseComponents extends Component{


  
  constructor(){
    super();
    this.state = {
      visible : false,
      disease: {

        id: null,
        diseaseName: null,
        description: null

      },
      selectedDisease : {

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

   
   
    this.diseaseService = new DiseaseService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }


  


  componentDidMount(){
    this.diseaseService.getAll().then(data => this.setState({diseases: data}))
  }

  save() {
    this.diseaseService.save(this.state.disease).then(data => {
      this.setState({
        visible : false,
        disease: {
          
            id: null,
            diseaseName: null,
            description: null

        }
      });
     
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.diseaseService.getAll().then(data => this.setState({diseases: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.diseaseService.delete(this.state.selectedDisease.id).then(data => {   
      this.toast.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.diseaseService.getAll().then(data => this.setState({diseases: data}));
      });
    }
  }

  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Enfermedades">
            <DataTable value={this.state.diseases} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedDisease} onSelectionChange={e => this.setState({selectedDisease: e.value})}>
              
              <Column field="id" header="Codigo Enfermedad"></Column>
              <Column field="diseaseName" header="Nombre Enfermedades"></Column>
              <Column field="description" header="Descripción"></Column>
              

 
            </DataTable>
        </Panel>
        <Dialog header="Nueva Enfermedad" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="persona-form">
              <span className="p-float-label">
                <InputText value={this.state.disease.diseaseName} style={{width : '100%'}} id="diseaseName" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let disease = Object.assign({}, prevState.disease);
                        disease.diseaseName = val;

                        return { disease };
                    })}
                  } />
                <label htmlFor="diseaseName">Nombre Enfermedad </label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.disease.description} style={{width : '100%'}} id="description" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let disease = Object.assign({}, prevState.disease);
                        disease.description = val;

                        return { disease };
                    })}
                  } />
                <label htmlFor="description">Descripcion </label>
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
      disease : {
       
        id: null,
        diseaseName: null,
        description: null

      }
    });
   // document.getElementById('persona-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      disease : {
        /*
        id: this.state.selectedPersona.id,
        nombre: this.state.selectedPersona.nombre,
        apellido: this.state.selectedPersona.apellido,
        direccion: this.state.selectedPersona.direccion,
        telefono : this.state.selectedPersona.telefono*/

        id: this.state.selectedDisease.id,
        diseaseName: this.state.selectedDisease.firstName,
        description: this.state.selectedDisease.middleName
        
      }
    })
  }
}
