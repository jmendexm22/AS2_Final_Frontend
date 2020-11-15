
import axios from 'axios';

export class DoctorSpecializationService {
    baseUrl = "http://157.230.5.231:8080/as2final-backend-0.0.1-SNAPSHOT/api/v1/";

    getAll(){
        return axios.get(this.baseUrl + "doctorspecializations").then(res => res.data);
    }

   
    save(doctorspecializations) {
        return axios.post(this.baseUrl + "doctorspecializations", doctorspecializations).then(res => res.data);
    }

    delete(iddoctorspecializations) {
        return axios.delete(this.baseUrl + "doctorspecializations/"+ iddoctorspecializations).then(res => res.data);
    }
    
}