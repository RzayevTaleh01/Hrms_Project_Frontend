import React, { useEffect, useState } from "react";
import CityService from "../services/CityService";
import JobCategoryService from "../services/JobCategoryService";
import WorkPlaceService from "../services/WorkPlaceService";
import WorkTimeService from "../services/WorkTimeService";
import { Label, Dropdown, Segment, Checkbox, Button } from "semantic-ui-react";

export default function FilterJob({ clickEvent }) {
  const [cities, setCities] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [workPlaces, setWorkPlaces] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);

  useEffect(() => {
    let cityService = new CityService();
    cityService.getCitys().then((result) => setCities(result.data.data));

    let jobCategoryService = new JobCategoryService();
    jobCategoryService
      .getJobPositions()
      .then((result) => setJobCategories(result.data.data));

    let workPlaceService = new WorkPlaceService();
    workPlaceService
      .getWorkPlaces()
      .then((result) => setWorkPlaces(result.data.data));

    let workTimeService = new WorkTimeService();
    workTimeService
      .getWorkTimes()
      .then((result) => setWorkTimes(result.data.data));
  }, []);

  const [cityIndex, setCityIndex] = useState([]);
  const handleChangeCity = (e, { value }) => {
    setCityIndex(value);
  };

  const [jobCategoryIndex, setJobCategoryIndex] = useState([]);
  const handleChangeJobCategory = (e, { value }) => {
    setJobCategoryIndex(value);
  };

  const [workPlaceIndex] = useState([]);
  const handleChangeWorkPlace = (e, { value, checked }) => {
    if (checked) {
      workPlaceIndex.push(value);
    } else {
      let index = workPlaceIndex.indexOf(value);
      if (index > -1) {
        workPlaceIndex.splice(index, 1);
      }
    }
  };

  const [workTimeIndex] = useState([]);
  const handleChangeWorkTime = (e, { value, checked }) => {
    if (checked) {
      workTimeIndex.push(value);
    } else {
      let index = workTimeIndex.indexOf(value);
      if (index > -1) {
        workTimeIndex.splice(index, 1);
      }
    }
  };

  return (
    <div>
      <Segment color="black" raised>
        <Label size="large" attached="top">
          Şəhər
        </Label>
        <Dropdown
          placeholder="Şəhər Seçin"
          selection
          search
          multiple
          clearable
          options={cities.map((city, index) => {
            return { text: city.name, key: city.index, value: city.id };
          })}
          onChange={handleChangeCity}
          value={cityIndex}
        />
      </Segment>
      <Segment color="black" raised>
        <Label attached="top" size="large">
          Kateqoriya
        </Label>

        <Dropdown
          placeholder="Kateqoriya Seçin"
          selection
          search
          multiple
          clearable
          options={jobCategories.map((jobCategory, index) => {
            return {
              text: jobCategory.name,
              key: jobCategory.index,
              value: jobCategory.id,
            };
          })}
          onChange={handleChangeJobCategory}
          value={jobCategoryIndex}
        />
      </Segment>
      <Segment color="black" raised>
        <Label attached="top" size="large">
          İşin Formatı
        </Label>
        {workPlaces.map((workPlace) => (
          <Checkbox
            key={workPlace.id}
            label={workPlace.name}
            onChange={handleChangeWorkPlace}
            value={workPlace.id}
          />
        ))}
      </Segment>
      <Segment color="black" raised>
        <Label attached="top" size="large">
          İş Saatı
        </Label>
        {workTimes.map((workTime) => (
          <Checkbox
            key={workTime.id}
            label={workTime.name}
            onChange={handleChangeWorkTime}
            value={workTime.id}
          />
        ))}
      </Segment>
      <Button
        type="button"
        fluid
        color="green"
        onClick={() =>
          clickEvent({
            cityId: cityIndex,
            jobCategoryId: jobCategoryIndex,
            workPlaceId: workPlaceIndex,
            workTimeId: workTimeIndex,
          })
        }
      >
        Elan Axtar
      </Button>
    </div>
  );
}
