import React from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEye, FaPencilAlt } from "react-icons/fa";

import { BLUE, CHERRY_RED } from "../../utils/colors";

const ActionsIcons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ViewIcon = styled(FaEye)`
  color: ${BLUE};
`;

const DeleteIcon = styled(FaTrashAlt)`
  color: ${CHERRY_RED};
`;

const Actions = ({
  handleEdit,
  handleDelete,
  handleView,
  canView,
  bucketlistIndex
}) => {
  const handleEyeClick = () => {
    console.log(">>>>>>>>", bucketlistIndex);
    handleView(bucketlistIndex);
  };

  const handlePencilClick = () => {
    console.log(">>>>>>>>", bucketlistIndex);
    handleEdit(bucketlistIndex);
  };

  const handleDeleteIconClick = () => {
    console.log(">>>>>>>>>", bucketlistIndex);
    handleDelete(bucketlistIndex);
  };
  return (
    <ActionsIcons>
      {canView && (
        <div onClick={handleEyeClick}>
          <ViewIcon />
        </div>
      )}
      <div onClick={handlePencilClick}>
        <FaPencilAlt />
      </div>
      <div onClick={handleDeleteIconClick}>
        <DeleteIcon />
      </div>
    </ActionsIcons>
  );
};

Actions.defaultProps = {
  canView: true
};

export default Actions;
