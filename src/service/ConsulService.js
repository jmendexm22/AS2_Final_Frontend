
import axios from 'axios';

export class ConsulService {
    baseUrl = "http://157.230.5.231:8080/as2final-backend-0.0.1-SNAPSHOT/api/v1/";

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