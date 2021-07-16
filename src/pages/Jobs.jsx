import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Header,
  Icon,
  Grid,
  Pagination,
} from "semantic-ui-react";
import JobsService from "../services/JobsService";
import FilterJob from "../layouts/FilterJob";

import { useSelector } from "react-redux";
import FavoriteService from "../services/FavoriteService";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const { authItem } = useSelector((state) => state.auth);

  const [activePage, setActivePage] = useState(1);
  const [filterOption, setFilterOption] = useState({});
  const [pageSize] = useState(10);
  const [totalPageSize, setTotalPageSize] = useState(0);

  useEffect(() => {
    let jobsService = new JobsService();
    jobsService
      .getPageableAndFilterJobPostings(activePage, pageSize, filterOption)
      .then((result) => {
        setJobs(result.data.data);
        setTotalPageSize(parseInt(result.data.message));
      });
  }, [filterOption, activePage, pageSize]);

  const handleFilterClick = (filterOption) => {
    if (filterOption.cityId.length === 0) {
      filterOption.cityId = null;
    }
    if (filterOption.jobCategoryId.length === 0) {
      filterOption.jobCategoryId = null;
    }
    if (filterOption.workPlaceId.length === 0) {
      filterOption.workPlaceId = null;
    }
    if (filterOption.workTimeId.length === 0) {
      filterOption.workTimeId = null;
    }
    setFilterOption(filterOption);
    setActivePage(1);
  };

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  let favoriteService = new FavoriteService();
  const handleAddFavorite = (jobAdId) => {
    favoriteService
      .addFavorite(authItem[0].user.id, jobAdId)
      .then((result) => {
        alert(result.data.message);
      })
      .catch((result) => {
        alert(result.response.data.message);
      });
  };

  return (
    <div>
      <Grid stackable>
        <Grid.Column width={12}>
          <Header as="h2">
            <Icon name="bullhorn" />
            <Header.Content>İş Elanları</Header.Content>
          </Header>

          <Table color="black" celled>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Elan Adı</Table.HeaderCell>
                <Table.HeaderCell>Şirkət Adı</Table.HeaderCell>
                <Table.HeaderCell>Kategoriya</Table.HeaderCell>
                <Table.HeaderCell>Şəhər</Table.HeaderCell>
                <Table.HeaderCell>Maaş Aralığı</Table.HeaderCell>
                <Table.HeaderCell>İş Saatı</Table.HeaderCell>
                <Table.HeaderCell>İş Formatı</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                {authItem[0].loggedIn && authItem[0].user.userType === 1 && (
                  <Table.HeaderCell>Favorilərə Əlavə Et</Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {jobs?.map((job) => (
                <Table.Row key={job.id}>
                  <Table.Cell>{job.name}</Table.Cell>
                  <Table.Cell>{job.employer.companyName}</Table.Cell>
                  <Table.Cell>{job.jobCategory.name}</Table.Cell>
                  <Table.Cell>{job.city.name}</Table.Cell>
                  <Table.Cell>
                    {job.minSalary} - {job.maxSalary}
                  </Table.Cell>
                  <Table.Cell>{job.workTime.name}</Table.Cell>
                  <Table.Cell>{job.workPlace.name}</Table.Cell>
                  
                  <Table.Cell>
                    <Button
                      as={Link}
                      to={`/jobs/${job.id}`}
                      content="Ətraflı"
                      icon="right arrow"
                      labelPosition="right"
                    />
                  </Table.Cell>
                  {authItem[0].loggedIn && authItem[0].user.userType === 1 && (
                    <Table.Cell>
                      <Button
                        icon="heart"
                        color="red"
                        onClick={() => handleAddFavorite(job.id)}
                      />
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <Pagination
            firstItem={null}
            lastItem={null}
            activePage={activePage}
            onPageChange={handlePaginationChange}
            totalPages={Math.ceil(totalPageSize / pageSize)}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <FilterJob clickEvent={handleFilterClick} />
        </Grid.Column>
      </Grid>
    </div>
  );
}
