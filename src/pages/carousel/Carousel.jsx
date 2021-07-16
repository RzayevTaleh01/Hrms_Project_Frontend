import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "../../App.css";
import { useState } from "react";
import { useEffect } from "react";
import JobsService from "../../services/JobsService";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function Carousell() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        let jobsService = new JobsService();
        jobsService
          .getActiveJobAds()
          .then((result) => setJobs(result.data.data));
      }, []);
    return (
        <>
          <h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1>
          <div className="Carousel">
            <Carousel breakPoints={breakPoints}>
                {jobs.map((job)=> (
              <Item key={job.id}>{job.employer.companyName}</Item>
              ))}
            </Carousel>
          </div>
        </>
      )
}
