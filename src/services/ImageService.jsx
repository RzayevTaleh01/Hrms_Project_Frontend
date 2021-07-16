import axios from "axios";

export default class ImageService{

    upload(cvId,file){
        return axios.post(`http://localhost:8080/api/Cv-Img/upload?cvId=${cvId}`,file)
    }

}