import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import {
  Button,
  Form as ReactstrapForm,
  FormGroup,
  Label,
  Input,
  Col
} from "reactstrap";
import img from "../../public/images/beauti-1.jpg";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

const Header = styled.h1`
  color: black;
`;

const SubHeader = styled.h5`
  color: black;
`;

const FieldWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const InputLabel = styled(Label)`
  color: black;
`;

const ErrorMessageWrapper = styled.div`
  margin-bottom: 1rem;
  color: red;
`;

const Container1 = styled.div`
  flex: 1;
  background-image: url(${img});
  background-size: cover;
`;

const Container2 = styled.div`
  flex: 1;
  background: white;
  padding: 2.5rem;
`;

const ButtonWrapper = styled(Button)`
  margin-left: 1rem;
  color: white;
  background: white;
`;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const handleSubmit = values => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
  }, 1000);
};

const validateEmail = value => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  } else if (value.length < 5) {
    error = "Email too short";
  } else if (value.length >= 30) {
    error = "Email too long";
  }
  return error;
};

const validateName = value => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[a-zA-Z ]+$/.test(value)) {
    error = "Invalid Name";
  } else if (value.length < 2) {
    error = "Name too short";
  } else if (value.length >= 15) {
    error = "Name too long";
  }
  return error;
};

const validatePassword = value => {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length < 6) {
    error = "Password too short";
  } else if (value.length >= 15) {
    error = "Password too long";
  }
  return error;
};

const validateConfirmPassword = currentPassword => value => {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length < 6) {
    error = "Password too short";
  } else if (value.length >= 15) {
    error = "Password too long";
  } else if (value !== currentPassword) {
    error = "Passwords do not much";
  }
  return error;
};

const App = () => {
  return (
    <Container>
      <Container1>This is the image</Container1>
      <Container2>
        <Header>Sign up</Header>
        <SubHeader>Already a member? Sign in here</SubHeader>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, errors }) => {
            console.log("matches>>>>", values);
            return (
              <ReactstrapForm>
                <Form>
                  <FormGroup>
                    <InputLabel for="firstName" sm={2}>
                      First Name:
                    </InputLabel>
                    <Col md={6}>
                      <Field
                        name="firstName"
                        validate={validateName}
                        component={Input}
                        id="firstName"
                      />
                    </Col>
                    <ErrorMessageWrapper>
                      <ErrorMessage name="firstName" />
                    </ErrorMessageWrapper>
                  </FormGroup>
                  <FormGroup>
                    <FieldWrapper>
                      <InputLabel for="lastName" sm={2}>
                        Last Name:
                      </InputLabel>
                      <Col md={6}>
                        <Field
                          name="lastName"
                          id="lastName"
                          validate={validateName}
                          component={Input}
                        />
                      </Col>
                    </FieldWrapper>
                    <ErrorMessageWrapper>
                      <ErrorMessage name="lastName" />
                    </ErrorMessageWrapper>
                  </FormGroup>
                  <FormGroup>
                    <FieldWrapper>
                      <InputLabel sm={2}>Email:</InputLabel>
                      <Col md={6}>
                        <Field
                          name="email"
                          validate={validateEmail}
                          component={Input}
                        />
                      </Col>
                    </FieldWrapper>
                    <ErrorMessageWrapper>
                      <ErrorMessage name="email" />
                    </ErrorMessageWrapper>
                  </FormGroup>
                  <FormGroup>
                    <FieldWrapper>
                      <InputLabel sm={2}>Password:</InputLabel>
                      <Col md={6}>
                        <Field
                          name="password"
                          type="password"
                          validate={validatePassword}
                          component={Input}
                        />
                      </Col>
                    </FieldWrapper>
                    <ErrorMessageWrapper>
                      <ErrorMessage name="password" />
                    </ErrorMessageWrapper>
                  </FormGroup>
                  <FormGroup>
                    <FieldWrapper>
                      <InputLabel sm={6}>Confirm Password:</InputLabel>
                      <Col md={6}>
                        <Field
                          name="confirmPassword"
                          type="password"
                          validate={validateConfirmPassword(values.password)}
                          component={Input}
                        />
                      </Col>
                    </FieldWrapper>
                    <ErrorMessageWrapper>
                      <ErrorMessage name="confirmPassword" />
                    </ErrorMessageWrapper>
                  </FormGroup>
                  <ButtonWrapper>
                    <Button type="submit" size="lg" outline color="secondary">
                      Create Account
                    </Button>
                  </ButtonWrapper>
                </Form>
              </ReactstrapForm>
            );
          }}
        </Formik>
      </Container2>
    </Container>
  );
};

export default App;
