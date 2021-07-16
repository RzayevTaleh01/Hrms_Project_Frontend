import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Image, Table, Button, Icon } from "semantic-ui-react";
import CvService from "../services/CvService";

export default function Cvs() {
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    let cvService = new CvService();
    cvService.getCvs().then((result) => setCvs(result.data.data));
  }, []);

  return (
    <div>
      <Table celled color={"black"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>İş Axtaran</Table.HeaderCell>
            <Table.HeaderCell>Texnologiyalar</Table.HeaderCell>
            <Table.HeaderCell>Dillər</Table.HeaderCell>
            <Table.HeaderCell>Github</Table.HeaderCell>
            <Table.HeaderCell>Linkedin</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cvs.map((cv) => (
            <Table.Row key={cv.id}>
              <Table.Cell>
                <Header as="h4" image>
                  <Image src={cv.cvImgs[0].imageUrl} rounded size="mini" />
                  <Header.Content>
                    {cv.employee.firstName + " " + cv.employee.lastName}
                    <Header.Subheader>
                      {cv.employee.dateOfBirth}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                {cv.cvPrgSkills.map((tech) => (
                  <p key={tech.id}>{tech.name}</p>
                ))}
              </Table.Cell>

              <Table.Cell>
                {cv.languages.map((lang) => (
                  <p key={lang.id}>{lang.name + " Seviye: " + lang.level}</p>
                ))}
              </Table.Cell>

              <Table.Cell>
                <a href={cv.github} target={"_blank"} rel="noopener noreferrer">
                  <Button secondary disabled={!cv.github}>
                    <Icon name="github" /> Github
                  </Button>
                </a>
              </Table.Cell>

              <Table.Cell>
                <a href={cv.linkedin} target={"_blank"} rel="noopener noreferrer">
                  <Button color="linkedin" disabled={!cv.linkedin}>
                    <Icon name="linkedin" /> LinkedIn
                  </Button>
                </a>
              </Table.Cell>

              <Table.Cell>
                <Button animated as={Link} to={`/cvs/${cv.employee.id}`}>
                  <Button.Content visible>Ətraflı</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}