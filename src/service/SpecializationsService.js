import axios from 'axios';

export class SpecializationsService {
    baseUrl = "http://157.230.5.231:8080/as2final-backend-0.0.1-SNAPSHOT/api/v1/";

    getAll(){
        return axios.get(this.baseUrl + "specializations").then(res => res.data).catch(function (error) {
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

    save(specializations) {
        return axios.post(this.baseUrl + "specializations", specializations).then(res => res.data).catch(function (error) {
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

    delete(idspecializations) {
        return axios.delete(this.baseUrl + "specializations/"+ idspecializations).then(res => res.data).catch(function (error) {
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