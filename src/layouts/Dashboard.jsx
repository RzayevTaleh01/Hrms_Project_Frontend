import React from 'react'
import Navi from './Navi'
import { Container } from 'semantic-ui-react';
import './Dashboard.css';
import Employees from '../pages/Employees';
import Cvs from '../pages/Cvs';
import Employers from '../pages/Employers';
import { Route } from 'react-router';
import EmployerDetail from '../pages/EmployerDetail';
import Login from '../pages/Login';
import Jobs from '../pages/Jobs';
import JobCreate from '../pages/JobCreate';
import JobDetail from '../pages/JobDetail';
import FavoriJobs from '../pages/FavoriJobs';

import Register from '../pages/Register';
import CvDetail from '../pages/CvDetail';
import RegisterEmployer from '../pages/RegisterEmployer';
import Carousell from '../pages/carousel/Carousel';

export default function Dashboard() {
    return (
        <div>
            <Navi />
            <Container className="main">                
                    
                        <Route exact path="/" component={Jobs}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/registerEmployer" component={RegisterEmployer}/>
                        <Route exact path="/employees" component={Employees}/>
                        <Route exact path="/cvs" component={Cvs}/>
                        <Route exact path="/cvs/:id" component={CvDetail}/>
                        <Route exact path="/employers" component={Employers}/>
                        <Route exact path="/employers/:id" component={EmployerDetail}/>
                        <Route exact path="/jobs" component={Jobs}/>
                        <Route exact path="/jobCreate" component={JobCreate}/>
                        <Route exact path="/jobs/:id" component={JobDetail}/>
                        <Route exact path="/FavoriJobs" component={FavoriJobs}/>
                        <Route exact path="/cr" component={Carousell}/>


                  
            </Container>
        </div>
    )
}
