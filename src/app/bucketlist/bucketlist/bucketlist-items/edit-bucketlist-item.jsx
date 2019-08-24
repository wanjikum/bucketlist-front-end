import React, { useContext, useState } from "react";
import request from "superagent";

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

import Button from "../../../components/button/button";
import CustomInputComponent, {
  CustomRadioComponent
} from "../../../components/custom-input/custom-input";

import { CHERRY_RED, BLUE, PINK_RED } from "../../../utils/colors";

import AuthContext from "../../auth";
import baseUrl from "../../../base-url";

import { setHeaders } from "../../../utils/useFetchable";

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
  setFetchFlag,
  token
}) => async ({
  _id: bucketlistItemId,
  bucketlistId,
  userId,
  __v: v,
  ...rest
}) => {
  const uri = `${baseUrl}api/v1/bucketlists/${bucketlistId}/bucketlistItems/${bucketlistItemId}`;

  try {
    setIsLoading(true);
    setHasError(false);
    const payload = await request
      .put(uri)
      .set(setHeaders(token))
      .send(rest);

    const { body } = payload;
    setIsLoading(false);
    if (body.success) {
      setFetchFlag(true);
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

const EditBucketlist = ({
  isModalOpen,
  handleToggle,
  bucketlistItemDetails,
  setFetchFlag
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { authData } = useContext(AuthContext);

  console.log("bucketlistDetails", bucketlistItemDetails._id);

  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle} charCode="X">
          Edit A Bucketlist Item
        </ModalHeader>
        <Formik
          initialValues={bucketlistItemDetails}
          onSubmit={handleSubmit({
            handleToggle,
            setIsLoading,
            setHasError,
            token: authData.token,
            setFetchFlag
          })}
          render={props => {
            console.log(">>>>props", props.values);
            return (
              <Form onSubmit={props.handleSubmit}>
                <ModalBody>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    label="Bucketlist Name:"
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
                      checked={props.values.status === "to do"}
                    />

                    <Field
                      type="radio"
                      name="status"
                      id="in-prog"
                      value="in progress"
                      label="In Progress"
                      validate={validateStatus}
                      component={CustomRadioComponent}
                      checked={props.values.status === "in progress"}
                    />
                    <Field
                      type="radio"
                      name="status"
                      id="done"
                      value="done"
                      label="Done"
                      validate={validateStatus}
                      component={CustomRadioComponent}
                      checked={props.values.status === "done"}
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

export default EditBucketlist;
