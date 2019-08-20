import React from "react";
import { Form } from "reactstrap";
import { Formik, Field } from "formik";
import styled from "styled-components";
import { Link } from "react-router-dom";

import media from "../../utils/media";
import { SILVER_GREY, WHITE_GREY, BLUE } from "../../utils/colors";

import img from "../../public/images/beauti-1.jpg";

import Button from "../../components/button/button";
import CustomNav from "../../components/custom-nav/custom-nav";
import CustomInputComponent from "../../components/custom-input/custom-input";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  ${media.small`
    background-image: url(${img});
    background-size: cover;  
  `};
`;

const FormContainer = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;

  ${media.small`
    align-self: center;
    border: 1px solid ${SILVER_GREY};
    margin-top: 4rem;
    padding: 2.5rem;
    width: 40rem;
    background: ${WHITE_GREY};
  `};
`;

const Header = styled.h3`
  margin-bottom: 1rem;
`;

const CustomButton = styled(Button)`
  height: 3rem;
  font-size: 1rem;
  margin-top: 2rem;
`;

const SubHeader = styled.h5`
  margin-bottom: 1rem;
`;

const SignInLink = styled(Link)`
  color: ${BLUE};
`;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const handleSubmit = history => values => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    history.push("/bucketlists/");
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
  } else if (value.length < 3) {
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

// Add cancel button
const SignIn = ({ history }) => {
  return (
    <Container>
      <CustomNav />
      <FormContainer>
        <Header>Sign up</Header>
        <SubHeader>
          Already a member? <SignInLink to="/sign-in">Sign in here</SignInLink>
        </SubHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit(history)}
          render={props => {
            console.log(">>>>props", props.values);
            return (
              <Form onSubmit={props.handleSubmit}>
                <Field
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  label="First Name:"
                  validate={validateName}
                  component={CustomInputComponent}
                />
                <Field
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  label="Last Name:"
                  validate={validateName}
                  component={CustomInputComponent}
                />
                <Field
                  type="email"
                  name="email"
                  id="email"
                  label="Email:"
                  validate={validateEmail}
                  component={CustomInputComponent}
                />
                <Field
                  type="password"
                  name="password"
                  id="password"
                  label="Password:"
                  validate={validatePassword}
                  component={CustomInputComponent}
                />
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  label="Confirm Password:"
                  validate={validateConfirmPassword(props.values.password)}
                  component={CustomInputComponent}
                />
                <CustomButton type="submit">Create An Account</CustomButton>
              </Form>
            );
          }}
        />
      </FormContainer>
    </Container>
  );
};

export default SignIn;
