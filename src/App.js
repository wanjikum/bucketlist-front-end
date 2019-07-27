import React from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const Header = styled.h1`
  color: purple;
`;

const FieldWrapper = styled.div`
  margin-bottom: 2.5rem;
`;

const Label = styled.label`
  color: black;
`;

const Button = styled.button``;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
};

const handleSubmit = values => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
  }, 1000);
};

const App = () => {
  return (
    <Container>
      <Header>Welcome to the Bucketlist Application</Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <FieldWrapper>
              <Label>First Name:</Label>
              <Field name="firstName" type="text" />
            </FieldWrapper>
            <FieldWrapper>
              <Label>Last Name:</Label>
              <Field name="lastName" type="text" />
            </FieldWrapper>
            <FieldWrapper>
              <Label>Email:</Label>
              <Field name="email" type="email" />
            </FieldWrapper>
            <FieldWrapper>
              <Label>Password:</Label>
              <Field name="password" type="password" />
            </FieldWrapper>
            <Button type="submit">Sign Up</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default App;
