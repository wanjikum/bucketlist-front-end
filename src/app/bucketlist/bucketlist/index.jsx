import React, { useState, useContext, Fragment } from "react";
import { Table, Alert } from "reactstrap";
import styled from "styled-components";
import MediaQuery from "react-responsive";
// import request from "superagent";

import media from "../../utils/media";
import useFetchable from "../../utils/useFetchable";
import { SILVER_GREY, WHITE_GREY, WHITE } from "../../utils/colors";

import Actions from "../../components/actions/actions";
import CustomNav from "../../components/custom-nav/custom-nav";

import baseUrl from "../../base-url";
import AuthContext from "../auth";

import AddBucketlist from "./add-bucketlist";
import EditBucketlist from "./edit-bucketlist";
import DeleteBucketlist from "./delete-bucketlist";

const Container = styled.div`
  background: ${WHITE};
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  ${media.small`
    align-self: center;
    background: ${WHITE_GREY};
    border: 1px solid ${SILVER_GREY};
    margin-top: 4rem;
    padding: 2.5rem;
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
  const uri = `${baseUrl}api/v1/bucketlists/`;
  const { authData } = useContext(AuthContext);

  const [data, hasError, isLoading] = useFetchable({
    uri,
    token: authData.token
  });

  console.log(">>>data>>>", data);
  console.log(">>>hasError>>>", hasError);
  console.log(">>>isLoading>>>", isLoading);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bucketlistDetails, setBucketlistDetails] = useState({});

  const handleView = bucketlistIndex => {
    // remember to fetch data
    // remember to use `/bucketlist/${bucketlistIndex}/bucketlist-item`
    const bucketlistData = data.bucketListData[bucketlistIndex];
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
    setBucketlistDetails(data.bucketListData[bucketlistIndex]);
    console.log("niko kwa function ya parent");
  };

  const handleDelete = bucketlistIndex => {
    console.log("Hello niko kwa handleDelete", bucketlistIndex);
    setBucketlistDetails(data.bucketListData[bucketlistIndex]);
    handleDeleteToggle();
  };

  return (
    <Container>
      <CustomNav isUserVerified />
      <FormContainer>
        <AddBucketlist />
        {data && data.bucketListData.length !== 0 ? (
          <Fragment>
            <MediaQuery maxDeviceWidth={767}>
              <TableMobile
                handleView={handleView}
                bucketlists={data.bucketListData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </MediaQuery>
            <MediaQuery minDeviceWidth={768}>
              <DesktopMobile
                handleView={handleView}
                bucketlists={data.bucketListData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </MediaQuery>
          </Fragment>
        ) : (
          <Alert color="secondary">No bucketlists available</Alert>
        )}
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
