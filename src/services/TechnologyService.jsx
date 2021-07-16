import axios from "axios";

export default class TechnologyService{

    getByCvId(cvId){
        return axios.get(`http://localhost:8080/api/CvPrgSkills/getByCvId?cvId=${cvId}`)
    }

    addScholl(technology){
        return axios.post("http://localhost:8080/api/CvPrgSkills/addSkill",technology)
    }

    deleteSchool(technologyId){
        return axios.delete(`http://localhost:8080/api/CvPrgSkills/removeSkill?technologyId=${technologyId}`)
    }
}