import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import EmployerService from "../services/EmployerService";
import { Header, Table, Icon, Card, Button } from "semantic-ui-react";
import JobAdService from "../services/JobsService";
import { Link } from "react-router-dom";

export default function EmployerDetail() {
  let { id } = useParams();

  const [employer, setEmployer] = useState({});
  const [jobAds, setJobAds] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    let jobAdService = new JobAdService();
    employerService
      .getEmployerById(id)
      .then((result) => setEmployer(result.data.data));
    jobAdService
      .getActiveAdsByCompanyId(id)
      .then((result) => setJobAds(result.data.data));
  },[id]);

  return (
    <div>
      <Table celled color={"black"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Şirkət</Table.HeaderCell>
            <Table.HeaderCell>Məlumatlar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="building" />
                  Şirkət Adı
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.companyName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="world" />
                  Web Sayt
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.webSite}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="mail" />
                  Email
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.email}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="phone" />
                  Telefon
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.phoneNumber}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Card fluid color={"black"}>
        <Card.Content header="Bu Şirkətə Aid İş Elanları" />
        <Card.Content>
          <Table color={"black"}>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Başlıq</Table.HeaderCell>
                <Table.HeaderCell>Kategoriya</Table.HeaderCell>
                <Table.HeaderCell>Şəhər</Table.HeaderCell>
                <Table.HeaderCell>Vakant Yer Sayı</Table.HeaderCell>
                <Table.HeaderCell>İşin Formatı</Table.HeaderCell>
                <Table.HeaderCell>İş Saatı</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {jobAds.map((jobAd) => (
                <Table.Row key={jobAd.id}>
                  <Table.Cell>{jobAd.name}</Table.Cell>
                  <Table.Cell>{jobAd.jobCategory?.name}</Table.Cell>
                  <Table.Cell>{jobAd.city?.name}</Table.Cell>
                  <Table.Cell>{jobAd.openPositions}</Table.Cell>
                  <Table.Cell>{jobAd.workPlace?.name}</Table.Cell>
                  <Table.Cell>{jobAd.workTime?.name}</Table.Cell>
                  <Table.Cell>
                    <Button animated as={Link} to={`/jobs/${jobAd.id}`}>
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
        </Card.Content>
        <Card.Content extra>
          <Icon name="list" />
          Sistemdə bu şirkətə məxsus {jobAds?.length} ədəd İş Elanı mövcuddur.
        </Card.Content>
      </Card>
    </div>
  );
}
