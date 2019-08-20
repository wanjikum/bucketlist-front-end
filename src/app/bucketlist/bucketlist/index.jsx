import React, { useState } from "react";
import { Table } from "reactstrap";
import styled from "styled-components";
import MediaQuery from "react-responsive";

import media from "../../utils/media";
import { SILVER_GREY, WHITE_GREY, WHITE } from "../../utils/colors";

import Actions from "../../components/actions/actions";
import CustomNav from "../../components/custom-nav/custom-nav";
import AddBucketlist from "./add-bucketlist";
import EditBucketlist from "./edit-bucketlist";
import DeleteBucketlist from "./delete-bucketlist";

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

const TableMobile = ({ handleView, bucketlists, handleEdit, handleDelete }) => {
  return (
    <Table bordered responsive hover>
      <thead>
        <tr>
          <th>Bucketlist</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bucketlists.map((item, index) => (
          <tr key={index}>
            <CapitilizedTableData>{item.name}</CapitilizedTableData>
            <CapitilizedTableData>{item.status}</CapitilizedTableData>
            <td>
              <Actions
                handleView={handleView}
                bucketlistIndex={index}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const DesktopMobile = ({
  handleView,
  bucketlists,
  handleEdit,
  handleDelete
}) => {
  return (
    <Table bordered responsive hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Bucketlist</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bucketlists.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <CapitilizedTableData>{item.name}</CapitilizedTableData>
            <td>{item.description}</td>
            <CapitilizedTableData>{item.status}</CapitilizedTableData>
            <td>
              <Actions
                handleView={handleView}
                bucketlistIndex={index}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Bucketlist = ({ history, match }) => {
  // console.log("openCreateBucketlistModal", openCreateBucketlistModal);
  const bucketlists = [
    {
      name: "Go to Nairobi",
      status: "done",
      description: "Visit all the parks near nairobi"
    },
    {
      name: "Go to Kitale",
      status: "in progress",
      description: "Visit some of the maize farms"
    },
    {
      name: "Go to Kakamega",
      status: "to do",
      description: "Visit the crying stone"
    }
  ];

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bucketlistDetails, setBucketlistDetails] = useState({});

  const handleView = bucketlistIndex => {
    // remember to fetch data
    // remember to use `/bucketlist/${bucketlistIndex}/bucketlist-item`
    const bucketlistData = bucketlists[bucketlistIndex];
    console.log("nimeclickiwa", bucketlistData, bucketlistIndex);
    // history.push(`${match.url}/${bucketlistIndex}/bucketlist-item/`);
    history.push(`/bucketlist-item/`);
  };

  const handleEditToggle = () => setEditModalOpen(!isEditModalOpen);
  const handleDeleteToggle = () => setDeleteModalOpen(!isDeleteModalOpen);

  const handleEdit = bucketlistIndex => {
    // render modal
    console.log("Hello niko kwa handleEdit", bucketlistIndex);
    handleEditToggle();
    setBucketlistDetails(bucketlists[bucketlistIndex]);
    console.log("niko kwa function ya parent");
  };

  const handleDelete = bucketlistIndex => {
    console.log("Hello niko kwa handleDelete", bucketlistIndex);
    setBucketlistDetails(bucketlists[bucketlistIndex]);
    handleDeleteToggle();
  };

  return (
    <Container>
      <CustomNav isUserVerified />
      <FormContainer>
        <AddBucketlist />
        <MediaQuery maxDeviceWidth={767}>
          <TableMobile
            handleView={handleView}
            bucketlists={bucketlists}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <DesktopMobile
            handleView={handleView}
            bucketlists={bucketlists}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </MediaQuery>
      </FormContainer>
      {isEditModalOpen && (
        <EditBucketlist
          isModalOpen={isEditModalOpen}
          handleToggle={handleEditToggle}
          bucketlistDetails={bucketlistDetails}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteBucketlist
          isModalOpen={isDeleteModalOpen}
          handleToggle={handleDeleteToggle}
          bucketlistDetails={bucketlistDetails}
        />
      )}
    </Container>
  );
};

export default Bucketlist;
