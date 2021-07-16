import axios from "axios";

export default class FavoriteService{

    getByCandidateId(candidateId){
        return axios.get(`http://localhost:8080/jobFavorites/getByEmployeeId?employeeId=${candidateId}`)
    }

    addFavorite(candidateId,jobAdId){
        return axios.post(`http://localhost:8080/jobFavorites/addFavorite?employeeId=${candidateId}&jobsId=${jobAdId}`)
    }

    removeFavorite(favoriteId){
        return axios.delete(`http://localhost:8080/jobFavorites/removeFavorite?favoriteId=${favoriteId}`)
    }

}