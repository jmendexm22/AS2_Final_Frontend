import axios from 'axios';

export class SpecializationsService {
    baseUrl = "http://157.230.5.231:8080/as2final-backend-0.0.1-SNAPSHOT/api/v1/";

    getAll(){
        return axios.get(this.baseUrl + "specializations").then(res => res.data);
    }

    save(specializations) {
        return axios.post(this.baseUrl + "specializations", specializations).then(res => res.data);
    }

    delete(idspecializations) {
        return axios.delete(this.baseUrl + "specializations/"+ idspecializations).then(res => res.data);
    }
}