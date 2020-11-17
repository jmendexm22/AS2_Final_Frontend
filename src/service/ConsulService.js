import axios from 'axios';

export class ConsulService {
    baseUrl = "http://157.230.5.231:8080/as2final-backend-0.0.1-SNAPSHOT/api/v1/";
/*
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      const personas = res.data;
      this.setState({ personas });
    })
*/
    getAll(){
       return axios.get(this.baseUrl + "consultations").then(res => res.data).catch(function (error) {
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

   
    save(consulta) {
        return axios.post(this.baseUrl + "consultations", consulta).then(res => res.data).catch(function (error) {
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

    delete(idConsultation) {
        return axios.delete(this.baseUrl + "consultations/"+ idConsultation).then(res => res.data).catch(function (error) {
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