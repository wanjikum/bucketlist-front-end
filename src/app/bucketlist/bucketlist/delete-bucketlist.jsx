import React, { useState, useContext, Fragment } from "react";
import styled from "styled-components";
import request from "superagent";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";

import Button from "../../components/button/button";

import { CHERRY_RED, BLUE } from "../../utils/colors";
import { setHeaders } from "../../utils/useFetchable";

import baseUrl from "../../base-url";
import AuthContext from "../auth";

const CustomButton = styled(Button)`
  height: 3rem;
  font-size: 1rem;
  margin: 1.2rem 0;
  width: 50%;
  float: right;
  justify-self: flex-end;
  background: ${props => (props.cancelButton ? CHERRY_RED : BLUE)};
`;

const ErrorAlert = styled(Alert)`
  margin-top: 1rem;
`;

const DeleteBucketlist = ({
  isModalOpen,
  handleToggle,
  bucketlistDetails,
  isBucketlistItem,
  setFetchFlag,
  bucketlistItemDetails
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { authData } = useContext(AuthContext);

  const handleDelete = async () => {
    if (isBucketlistItem) {
      const { bucketlistId, _id: bucketlistItemId } = bucketlistItemDetails;
      const uri = `${baseUrl}api/v1/bucketlists/${bucketlistId}/bucketlistItems/${bucketlistItemId}`;

      try {
        setIsLoading(true);
        setHasError(false);
        const payload = await request.del(uri).set(setHeaders(authData.token));

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
    } else {
      // not bucketlist item.
      const uri = `${baseUrl}api/v1/bucketlists/${bucketlistDetails.id}`;

      try {
        setIsLoading(true);
        setHasError(false);
        const payload = await request.del(uri).set(setHeaders(authData.token));

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
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle} charCode="X">
          Delete A {isBucketlistItem ? "Bucketlist Item" : "Bucketlist"}
        </ModalHeader>
        <ModalBody>
          <Fragment>
            Do you want to delete{" "}
            {isBucketlistItem ? "bucketlist item" : "bucketlist"} with the name{" "}
            {
              <b>
                {isBucketlistItem
                  ? bucketlistItemDetails.name
                  : bucketlistDetails.name}
              </b>
            }
            ?
          </Fragment>
          {hasError && (
            <ErrorAlert color="danger">Please try again later</ErrorAlert>
          )}
        </ModalBody>
        <ModalFooter>
          <CustomButton type="submit" onClick={handleDelete}>
            {isLoading ? "Deleting..." : "Yes"}
          </CustomButton>{" "}
          <CustomButton type="button" onClick={handleToggle} cancelButton>
            Cancel
          </CustomButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};

DeleteBucketlist.defaultProps = {
  isBucketlistItem: false
};

export default DeleteBucketlist;
