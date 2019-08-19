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

const Actions = ({ handleEdit, handleDelete, handleView }) => (
  <ActionsIcons>
    <ViewIcon onClick={handleView} />
    <FaPencilAlt onClick={handleEdit} />
    <DeleteIcon onClick={handleDelete} />
  </ActionsIcons>
);

export default Actions;
