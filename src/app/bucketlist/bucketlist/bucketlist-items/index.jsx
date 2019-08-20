import React, { useState } from "react";
import { Table } from "reactstrap";
import styled from "styled-components";

import media from "../../../utils/media";
import { SILVER_GREY, WHITE_GREY, WHITE } from "../../../utils/colors";

import Actions from "../../../components/actions/actions";
import CustomNav from "../../../components/custom-nav/custom-nav";
import AddBucketlists from "./add-bucketlist-item";
import EditBucketlistItem from "./edit-bucketlist-item";
import DeleteBucketlist from "../delete-bucketlist";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${WHITE};
`;

const FormContainer = styled.div`
  margin-top: 0.5rem;

  ${media.small`
    align-self: center;
    border: 1px solid ${SILVER_GREY};
    margin-top: 4rem;
    padding: 2.5rem;
    background: ${WHITE_GREY};
  `};

  ${media.small`
    width: 90%;
  `};
`;

const CapitilizedTableData = styled.td`
  text-transform: capitalize;
`;

const BucketlistItemsTable = ({
  handleView,
  handleEdit,
  bucketlistsItems,
  handleDelete
}) => {
  return (
    <Table bordered responsive hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Bucketlist Item</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bucketlistsItems.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <CapitilizedTableData>{item.name}</CapitilizedTableData>
            <CapitilizedTableData>{item.status}</CapitilizedTableData>
            <td>
              <Actions
                handleView={handleView}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                bucketlistIndex={index}
                canView={false}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const BucketlistItem = ({ history, bucketlistData, match }) => {
  console.log("match", match);
  const bucketlistsItems = [
    {
      name: "Go to Nairobi",
      status: "done"
    },
    {
      name: "Go to Kitale",
      status: "in progress"
    },
    {
      name: "Go to Kakamega",
      status: "to do"
    }
  ];

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bucketlistItemDetails, setBucketlistItemDetails] = useState({});

  const handleEditToggle = () => setEditModalOpen(!isEditModalOpen);
  const handleDeleteToggle = () => setDeleteModalOpen(!isDeleteModalOpen);

  const handleEdit = bucketlistItemId => {
    console.log("Niko kwa handleEdit", bucketlistItemId);
    handleEditToggle();
    setBucketlistItemDetails(bucketlistsItems[bucketlistItemId]);
  };

  const handleDelete = bucketlistItemId => {
    console.log("Hello niko kwa handleDelete", bucketlistItemId);
    setBucketlistItemDetails(bucketlistsItems[bucketlistItemId]);
    handleDeleteToggle();
  };

  return (
    <Container>
      <CustomNav isUserVerified />
      <FormContainer>
        <AddBucketlists />
        <BucketlistItemsTable
          bucketlistsItems={bucketlistsItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        {isEditModalOpen && (
          <EditBucketlistItem
            isModalOpen={isEditModalOpen}
            handleToggle={handleEditToggle}
            bucketlistDetails={bucketlistItemDetails}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteBucketlist
            isModalOpen={isDeleteModalOpen}
            handleToggle={handleDeleteToggle}
            bucketlistDetails={bucketlistItemDetails}
            isBucketlistItem
          />
        )}
      </FormContainer>
    </Container>
  );
};

export default BucketlistItem;
