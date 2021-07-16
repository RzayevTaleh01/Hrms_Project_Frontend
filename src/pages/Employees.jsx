import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import EmployeeService from "../services/EmployeeService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let employeeService = new EmployeeService();
    employeeService
      .getMailVerifyedEmployees()
      .then((result) => setEmployees(result.data.data));
  }, []);

  return (
    <div>
      <Card.Group>
          {
              employees.map(employee =>(
                <Card key={employee.id} fluid color={"black"}>
                <Card.Content>
                  <Card.Header>{employee.firstName+" "+employee.lastName}</Card.Header>
                  <Card.Meta>{employee.dateOfBirth}</Card.Meta>
                  <Card.Description>
                    {employee.email}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green" as={Link} to={`/cvs/${employee.id}`}>
                      Cvsinə bax
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              ))
          }
        
        
      </Card.Group>
    </div>
  );
}
