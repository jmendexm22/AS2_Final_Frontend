import axios from 'axios';

export class DoctorService {
    baseUrl = "http://157.230.5.231:8080/as2final-backend-0.0.1-SNAPSHOT/api/v1/";

    getAll(){
        return axios.get(this.baseUrl + "doctors").then(res => res.data);
    }

    save(doctor) {
        return axios.post(this.baseUrl + "doctors", doctor).then(res => res.data);
    }

    delete(idDoctor) {
        return axios.delete(this.baseUrl + "doctors/"+ idDoctor).then(res => res.data);
    }
}