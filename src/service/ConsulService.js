import axios from 'axios';

export class ConsulService {
    baseUrl = "http://localhost:8080/api/v1/";

    getAll(){
        return axios.get(this.baseUrl + "consultations").then(res => res.data);
    }

   
    save(consulta) {
        return axios.post(this.baseUrl + "consultations", consulta).then(res => res.data);
    }

    delete(idConsultation) {
        return axios.delete(this.baseUrl + "consultations/"+ idConsultation).then(res => res.data);
    }
    
}