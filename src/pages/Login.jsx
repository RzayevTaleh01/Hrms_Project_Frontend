import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'
import UserService from "../services/UserService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/actions/authActions";
import { toast } from "react-toastify";

export default function Login() {

  const dispatch = useDispatch()

  const handleLogin=(user)=>{
    dispatch(userLogin(user))
  }

  const history = useHistory();

  let userService = new UserService();
  const userLoginSchema = Yup.object().shape({
    email: Yup.string().required("Bu alan doldurulmak zorundadır").email("Geçerli bir email adresi giriniz"),
    password: Yup.string().required("Bu alan doldurulmak zorundadır")
  })

  const formik = useFormik({
    initialValues: {
      email:"",
      password:""
    },
    validationSchema: userLoginSchema,
    onSubmit:(values) => {
      userService.login(values).then((result) => {
        handleLogin(result.data.data)
        history.push("/")
      }).catch((result) => {
        toast.info(result.response.data.message)
        alert(result.response.data.message)
      })
    }
  })

  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://hrms.ph/img/logo-large.png" /> Daxil Ol
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <div>
          <label><b>Email</b></label>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail ünvanı"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.errors.email && formik.touched.email && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.email}
              </div>
            )
          }
          </div>
          <div style={{marginTop:"1em"}}>
          <label><b>Şifrə</b></label>
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Şifre"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.errors.password && formik.touched.password && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.password}
              </div>
            )
          }
          </div>

          <Button color="teal" fluid size="large" type="submit" style={{marginTop:"1em"}}>
            Daxil ol
          </Button>
        </Segment>
      </Form>
      <Message info>
        Hesabın yoxdur? <b><Link to={"/register"}>Qeydiyyatdan keç!</Link></b>
      </Message>
    </div>
  );
}
