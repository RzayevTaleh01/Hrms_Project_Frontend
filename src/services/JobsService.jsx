import axios from "axios";

export default class JobAdService{
    getActiveJobAds(){
        return axios.get("http://localhost:8080/api/Jobs/getActiveJobs");
    }

    getByJobAdId(id){
        return axios.get("http://localhost:8080/api/Jobs/getByJobId?id="+id)
    }

    getActiveAdsByCompanyId(id){
        return axios.get("http://localhost:8080/api/Jobs/getActiveAndCompanyId?companyId="+id)
    }

    add(values){
        return axios.post("http://localhost:8080/api/Jobs/create",values)
    }

    getPageableAndFilterJobPostings(pageNo, pageSize, filterOption){
        return axios.post(`http://localhost:8080/api/Jobs/getByActiveAndFilter?pageNo=${pageNo}&pageSize=${pageSize}`,filterOption);
    }

    
}