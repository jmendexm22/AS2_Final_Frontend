import axios from 'axios';

export class PersonaService {
    baseUrl = "http://localhost:8080/api/v1/";

    getAll(){
        return axios.get(this.baseUrl + "patients").then(res => res.data);
    }

    save(persona) {
        return axios.post(this.baseUrl + "patients", persona).then(res => res.data);
    }

    delete(idPatient) {
        return axios.delete(this.baseUrl + "patients/"+ idPatient).then(res => res.data);
    }
}