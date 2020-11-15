import axios from 'axios';

export class PersonaService {
    baseUrl = "http://157.230.5.231:8080/as2final-backend-0.0.1-SNAPSHOT/api/v1/";

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