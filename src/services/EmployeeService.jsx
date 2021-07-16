import axios from "axios";

export default class EmployeeService{
    getEmployees(){
        return axios.get("http://localhost:8080/api/employee/getall");
    }
    registerEmployee(values){
        return axios.post("http://localhost:8080/api/employee/add",values)
    }

    getMailVerifyedEmployees(){
        return axios.get("http://localhost:8080/api/employee/getMailVerifyTrue")
    }
}