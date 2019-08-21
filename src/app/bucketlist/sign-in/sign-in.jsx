import React, { useState, useContext } from "react";
import { Form } from "reactstrap";
import { Formik, Field } from "formik";
import styled from "styled-components";
import request from "superagent";

import media from "../../utils/media";
import {
  COOL_GREY,
  SILVER_GREY,
  WHITE_GREY,
  PINK_RED
} from "../../utils/colors";

import img from "../../public/images/beauti-1.jpg";
import baseUrl from "../../base-url";
import AuthContext from "../auth";

import Button from "../../components/button/button";
import CustomNav from "../../components/custom-nav/custom-nav";
import CustomInputComponent from "../../components/custom-input/custom-input";
import ButtonLink from "../../components/button/button-link";

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

const SeparatorContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const Separator = styled.hr`
  background: ${SILVER_GREY};
  border: none;
  flex: 1;
  height: 1px;
`;

const SeparatorText = styled.span`
  font-size: 1rem;
  color: ${COOL_GREY};
  margin: 0 1rem;

  ${media.large`
    margin: 0 0.5rem;
  `};
`;

const CustomButton = styled(Button)`
  height: 3rem;
  font-size: 1rem;
`;

const SignUpLink = styled(ButtonLink)`
  height: 3rem;
  font-size: 1rem;
  background: ${SILVER_GREY};

  ${media.small`
    border-radius: 1rem;
  `};
`;

const ErrorLabel = styled.h3`
  color: ${PINK_RED};
  font-size: 1rem;
`;

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

const initialValues = {
  email: "",
  password: ""
};

const handleSubmit = ({
  history,
  handleAuthDataChange,
  setIsLoading,
  setHasError
}) => async values => {
  const url = `${baseUrl}api/v1/auth/signin`;
  try {
    setIsLoading(true);
    const payload = await request
      .post(url)
      .send(values)
      .set("Accept", "application/json");

    const { body } = payload;
    setIsLoading(false);
    if (body.success) {
      handleAuthDataChange({
        token: body.userData.token,
        success: body.success
      });
      history.push("/bucketlists/");
    }
  } catch (e) {
    setIsLoading(false);
    setHasError(true);
  }
};

const SignIn = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { handleAuthDataChange } = useContext(AuthContext);

  return (
    <Container>
      <CustomNav />
      <FormContainer>
        <Header>Sign In With Bucketlists</Header>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit({
            history,
            setIsLoading,
            setHasError,
            handleAuthDataChange
          })}
          render={({ handleSubmit, isSubmitting }) => {
            return (
              <Form onSubmit={handleSubmit}>
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
                {hasError && (
                  <ErrorLabel>Please click the below button again</ErrorLabel>
                )}
                <CustomButton type="submit" disabled={isSubmitting}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </CustomButton>
                <SeparatorContainer>
                  <Separator />
                  <SeparatorText>OR</SeparatorText>
                  <Separator />
                </SeparatorContainer>
                <SignUpLink to="/sign-up/">Sign Up</SignUpLink>
              </Form>
            );
          }}
        />
      </FormContainer>
    </Container>
  );
};

export default SignIn;
