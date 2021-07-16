import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container,Button, Menu, Icon } from 'semantic-ui-react';
import "../App.css";
import SingedIn from "./SingedIn";
import SingedOut from "./SingedOut";

export default function Navi() {

  const {authItem} = useSelector(state => state.auth)

  return (
    <div>
      <Menu size="large" inverted stackable>
        <Container>
          <Menu.Item name="Ana Səhifə" as={Link} to={"/"}>
          <Icon name="home" />Ana Səhifə
          </Menu.Item>
          <Menu.Item name="İş Elanları" as={Link} to={"/jobs"} />
          <Menu.Item name="İş Axtaranlar" as={Link} to={"/employees"} />
          <Menu.Item name="Cvlər" as={Link} to={"/cvs"} />
          <Menu.Item name="Şirkətlər" as={Link} to={"/employers"} />


          <Menu.Menu position="right" style={{ margin: '0.5em' }}>
            {authItem[0].loggedIn && authItem[0].user.userType===2 &&  <Button primary as={Link} to={"/jobCreate"}>
              Elan Əlavə Et
            </Button>}
            {authItem[0].loggedIn && authItem[0].user.userType===1 &&  <Button color="red" as={Link} to={`/FavoriJobs`}>
              <Icon name='heart' />
              Favori Elanlar
            </Button>}
            
            {authItem[0].loggedIn?<SingedIn/>:<SingedOut/>}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
