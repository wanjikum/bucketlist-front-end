import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Alert
} from "reactstrap";
import { Formik, Field, ErrorMessage } from "formik";
import request from "superagent";

import Button from "../../../components/button/button";
import CustomInputComponent, {
  CustomRadioComponent
} from "../../../components/custom-input/custom-input";

import baseUrl from "../../../base-url";
import AuthContext from "../../auth";

import { setHeaders } from "../../../utils/useFetchable";
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

const handleSubmit = ({
  setIsLoading,
  setHasError,
  handleToggle,
  token,
  setFetchFlag,
  bucketlistId
}) => async values => {
  const uri = `${baseUrl}api/v1/bucketlists/${bucketlistId}/bucketlistItems/`;
  try {
    setIsLoading(true);
    setHasError(false);
    const payload = await request
      .post(uri)
      .set(setHeaders(token))
      .send(values);

    const { body } = payload;
    setIsLoading(false);
    setFetchFlag(true);
    if (body.success) {
      handleToggle();
    }
  } catch (e) {
    setIsLoading(false);
    setHasError(true);
  }
};

const renderFormFeedback = (touched, errors) => {
  if (touched["status"]) {
    return !!errors["status"];
  }
  return false;
};

const AddBucketlistItem = ({ setFetchFlag, bucketlistId }) => {
  const [isModalOpen, setIsModalOpenFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { authData } = useContext(AuthContext);

  const handleToggle = () => {
    setHasError(false);
    setIsModalOpenFlag(!isModalOpen);
  };

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
          onSubmit={handleSubmit({
            handleToggle,
            setIsLoading,
            setHasError,
            token: authData.token,
            setFetchFlag,
            bucketlistId
          })}
          render={props => {
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
                  {hasError && (
                    <Alert color="danger">Please try again later</Alert>
                  )}
                </ModalBody>
                <ModalFooter>
                  <CustomButton type="submit" onClick={handleSubmit}>
                    {isLoading ? "Submitting..." : "Submit"}
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
