import React, { useState } from "react";
import styled from "styled-components";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import { Formik, Field, ErrorMessage } from "formik";

import Button from "../../../components/button/button";
import CustomInputComponent, {
  CustomRadioComponent
} from "../../../components/custom-input/custom-input";
import { CHERRY_RED, BLUE, PINK_RED } from "../../../utils/colors";

const CustomButton = styled(Button)`
  height: 3rem;
  font-size: 1rem;
  margin: 1.2rem 0;
  width: 50%;
  float: right;
  justify-self: flex-end;
  background: ${props => (props.cancelButton ? CHERRY_RED : BLUE)};
`;

const ErrorMessageWrapper = styled.div`
  color: ${PINK_RED};
  font-size: 80%;
  margin-top: ${props => (props.hasError ? "-0.5rem" : 0)};
`;

const initialValues = {
  name: "",
  status: ""
};

const validateBucketlistName = value => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[a-zA-Z ]+$/.test(value)) {
    error = "Invalid Name";
  } else if (value.length < 3) {
    error = "Name too short";
  } else if (value.length >= 30) {
    error = "Name too long";
  }
  return error;
};

const validateStatus = value => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const handleSubmit = handleToggle => values => {
  setTimeout(() => {
    // alert(JSON.stringify(values, null, 2));
    console.log("niko na values>>>>>", values);
    handleToggle();
  }, 1000);
};

const renderFormFeedback = (touched, errors) => {
  if (touched["status"]) {
    return !!errors["status"];
  }
  return false;
};

const AddBucketlistItem = () => {
  const [isModalOpen, setIsModalOpenFlag] = useState(false);

  const handleToggle = () => setIsModalOpenFlag(!isModalOpen);

  return (
    <div>
      <CustomButton type="button" onClick={handleToggle}>
        Add An Item
      </CustomButton>
      <Modal isOpen={isModalOpen} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle} charCode="X">
          Create A Bucketlist Item
        </ModalHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit(handleToggle)}
          render={props => {
            console.log(">>>>props", props.values);
            return (
              <Form onSubmit={props.handleSubmit}>
                <ModalBody>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    label="Item Name:"
                    validate={validateBucketlistName}
                    component={CustomInputComponent}
                  />
                  <FormGroup tag="fieldset">
                    <Label>Status:</Label>
                    <ErrorMessageWrapper
                      hasError={renderFormFeedback(props.touched, props.errors)}
                    >
                      <ErrorMessage name="status" />
                    </ErrorMessageWrapper>
                    <Field
                      type="radio"
                      name="status"
                      id="to-do"
                      value="to do"
                      label="To do"
                      validate={validateStatus}
                      component={CustomRadioComponent}
                    />

                    <Field
                      type="radio"
                      name="status"
                      id="in-prog"
                      value="in progress"
                      label="In Progress"
                      validate={validateStatus}
                      component={CustomRadioComponent}
                    />
                    <Field
                      type="radio"
                      name="status"
                      id="done"
                      value="done"
                      label="Done"
                      validate={validateStatus}
                      component={CustomRadioComponent}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <CustomButton type="submit" onClick={handleSubmit}>
                    Submit
                  </CustomButton>{" "}
                  <CustomButton
                    type="button"
                    onClick={handleToggle}
                    cancelButton
                  >
                    Cancel
                  </CustomButton>
                </ModalFooter>
              </Form>
            );
          }}
        />
      </Modal>
    </div>
  );
};

export default AddBucketlistItem;
