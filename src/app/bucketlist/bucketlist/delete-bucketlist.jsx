import React from "react";
import styled from "styled-components";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Button from "../../components/button/button";
import { CHERRY_RED, BLUE } from "../../utils/colors";

const CustomButton = styled(Button)`
  height: 3rem;
  font-size: 1rem;
  margin: 1.2rem 0;
  width: 50%;
  float: right;
  justify-self: flex-end;
  background: ${props => (props.cancelButton ? CHERRY_RED : BLUE)};
`;

const DeleteBucketlist = ({
  isModalOpen,
  handleToggle,
  bucketlistDetails,
  isBucketlistItem
}) => {
  const handleDelete = () => {
    setTimeout(() => {
      // alert(JSON.stringify(values, null, 2));
      console.log("niko na values>>>>>", bucketlistDetails);
      const val = isBucketlistItem
        ? "utafanya code ya bucketlist item"
        : "code ya bucketlist";

      console.log("val>>>>>>", val);
      handleToggle();
    }, 1000);
  };
  console.log(">>>>>", bucketlistDetails);
  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle} charCode="X">
          Delete A {isBucketlistItem ? "Bucketlist Item" : "Bucketlist"}
        </ModalHeader>
        <ModalBody>
          Do you want to delete bucketlist with bucketlist name{" "}
          {<b>{bucketlistDetails.name}</b>}?
        </ModalBody>
        <ModalFooter>
          <CustomButton type="submit" onClick={handleDelete}>
            Yes
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
