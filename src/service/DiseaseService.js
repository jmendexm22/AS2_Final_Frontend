import axios from 'axios';

export class DiseaseService {
    baseUrl = "http://157.230.5.231:8080/as2final-backend-0.0.1-SNAPSHOT/api/v1/";

    getAll(){
        return axios.get(this.baseUrl + "diseases").then(res => res.data);
    }

    save(diseases) {
        return axios.post(this.baseUrl + "diseases", diseases).then(res => res.data);
    }

    delete(iddiseases) {
        return axios.delete(this.baseUrl + "diseases/"+ iddiseases).then(res => res.data);
    }
}