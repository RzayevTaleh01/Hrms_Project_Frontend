import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import * as Yup from "yup";
import EmployerService from "../services/EmployerService";

export default function RegisterEmployer() {
  let employerService = new EmployerService();
  const employerRegisterSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Bu xana boş saxlanıla bilməz!")
      .min(2, "Şirkət adı ən az 2 simvol uzunluğunda olmalıdır"),
    phoneNumber: Yup.string()
      .required("Bu xana boş saxlanıla bilməz!")
      .length(10, "Telefon nömrəsində səhv var! '0' olmadan daxil edin!")
      .matches(/^[0-9]+$/, "Sadəcə rəqəm daxil edilməlidir!"),
    password: Yup.string()
      .required("Bu xana boş saxlanıla bilməz!")
      .min(8, "Şifrə ən az 8 simvol uzunluğunda olmalıdır"),
    rePassword: Yup.string()
      .required("Bu xana boş saxlanıla bilməz!")
      .oneOf([Yup.ref("password"), null], "Şifrələr eyni deyil!"),
    webSite: Yup.string()
      .required("Bu xana boş saxlanıla bilməz!")
      .test("Http olmadan daxil edin!", function () {
        let site = this.parent["webSite"];
        if (site) {
          return site.startsWith("http") ? false : true;
        }
      }),
    email: Yup.string()
      .required("Bu xana boş saxlanıla bilməz!")
      .email("Email ünvanını düzgün daxil edin!")
      .test("Email domeni ilə web sayt domeni eyni olmalıdır", function () {
        let site = this.parent["webSite"];
        let email = this.parent["email"];
        if (site && email) {
          return email.endsWith(site) ? true : false;
        }
      }),
    reEmail: Yup.string()
      .required("Bu xana boş saxlanıla bilməz!")
      .oneOf(
        [Yup.ref("email"), null],
        "Email ünvanları eyni deyil!"
      ),
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      password: "",
      rePassword: "",
      webSite: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: employerRegisterSchema,
    onSubmit: (values) => {
      console.log(values);
      employerService
        .registerEmployer(values)
        .then((result) => alert(result.message));
      history.push("/login");
    },
  });

  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://hrms.ph/img/logo-large.png" /> Şirkət Hesab
        Qeydiyyatı
      </Header>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment stacked>
          <div style={{ marginTop: "1em" }}>
            <label>
              <b>Şirkət Adı</b>
            </label>
            <Form.Input
              fluid
              icon="building"
              iconPosition="left"
              placeholder="Şirkət Adı"
              type="text"
              value={formik.values.companyName}
              name="companyName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.companyName && formik.touched.companyName && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.companyName}
              </div>
            )}
          </div>
          <Grid stackable>
            <Grid.Column width={8}>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Telefon nömrəsi</b> (Sıfır olmadan yazın)
                </label>
                <Form.Input
                  fluid
                  icon="phone"
                  iconPosition="left"
                  placeholder="Telefon nömrəsi"
                  type="text"
                  value={formik.values.phoneNumber}
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.phoneNumber}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Email</b> (Web sayt domeni ilə eyni domenə malik olmalıdır)
                </label>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  type="email"
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Şifrə</b>
                </label>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifrə"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </Grid.Column>

            <Grid.Column width={8}>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Web Sayt</b> (http:// olmadan daxil edin!)
                </label>
                <Form.Input
                  fluid
                  icon="world"
                  iconPosition="left"
                  placeholder="Web Sayt"
                  type="text"
                  name="webSite"
                  value={formik.values.webSite}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.webSite && formik.touched.webSite && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.webSite}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Email Təkrar</b>
                </label>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail ünvanı təkrar"
                  type="email"
                  name="reEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.reEmail && formik.touched.reEmail && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.reEmail}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <label>
                  <b>Şifrə Təkrar</b>
                </label>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifrə Təkrar"
                  type="password"
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.rePassword}
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid>

          <br />
          <Button color="teal" fluid size="large" type="submit">
            Qeydiyyatdan Keç
          </Button>
        </Segment>
      </Form>
      <Message error>
        Diqqət! Şirkət Hesablarının qeydiyyatı Admin tərəfindən təsdiqləndikdən
        sonra aktiv edilir!
      </Message>
    </div>
  );
}
