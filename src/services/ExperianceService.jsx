import axios from "axios";

export default class ExperianceService{

    add(experiance){
        return axios.post("http://localhost:8080/api/CvExperiance/add",experiance)
    }

    delete(experianceId){
        return axios.delete(`http://localhost:8080/api/CvExperiance/delete?experianceId=${experianceId}`)
    }

    getByCvId(cvId){
        return axios.get(`http://localhost:8080/api/CvExperiance/getByCvId?id=${cvId}`)
    }
}