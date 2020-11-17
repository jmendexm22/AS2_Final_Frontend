import axios from 'axios';

export class DoctorService {
    baseUrl = "http://157.230.5.231:8080/as2final-backend-0.0.1-SNAPSHOT/api/v1/";

    getAll(){
        return axios.get(this.baseUrl + "doctors").then(res => res.data).catch(function (error) {
            if (error.response) { ////manejo de erro
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        });
    }

    save(doctor) {
        return axios.post(this.baseUrl + "doctors", doctor).then(res => res.data).catch(function (error) {
            if (error.response) { ////manejo de erro
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        });
    }

    delete(idDoctor) {
        return axios.delete(this.baseUrl + "doctors/"+ idDoctor).then(res => res.data).catch(function (error) {
            if (error.response) { ////manejo de erro
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        });
    }
}