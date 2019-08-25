import React, { useState, useContext } from "react";
import { Table, Alert } from "reactstrap";
import styled from "styled-components";

import media from "../../../utils/media";
import { SILVER_GREY, WHITE_GREY, WHITE } from "../../../utils/colors";
import useFetchable from "../../../utils/useFetchable";

import Actions from "../../../components/actions/actions";
import CustomNav from "../../../components/custom-nav/custom-nav";

import AddBucketlists from "./add-bucketlist-item";
import EditBucketlistItem from "./edit-bucketlist-item";
import DeleteBucketlist from "../delete-bucketlist";

import baseUrl from "../../../base-url";
import AuthContext from "../../auth";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${WHITE};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const BucketlistItem = ({ match, history }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bucketlistItemDetails, setBucketlistItemDetails] = useState({});
  const uri = `${baseUrl}api/v1/bucketlists/${match.params.id}/bucketlistItems/`;
  const { authData } = useContext(AuthContext);
  const [fetchFlag, setFetchFlag] = useState(true);

  const [data, hasError, isLoading] = useFetchable({
    uri,
    token: authData.token,
    fetchFlag,
    setFetchFlag
  });

  console.log(">>>data>>>", data);
  console.log(">>>hasError>>>", hasError);
  console.log(">>>isLoading>>>", isLoading);

  const handleEditToggle = () => setEditModalOpen(!isEditModalOpen);
  const handleDeleteToggle = () => setDeleteModalOpen(!isDeleteModalOpen);

  const handleEdit = bucketlistItemId => {
    handleEditToggle();
    setBucketlistItemDetails(data.bucketListItemData[bucketlistItemId]);
  };

  const handleDelete = bucketlistItemId => {
    setBucketlistItemDetails(data.bucketListItemData[bucketlistItemId]);
    handleDeleteToggle();
  };

  return (
    <Container>
      <CustomNav isUserVerified history={history} />
      <FormContainer>
        <AddBucketlists
          setFetchFlag={setFetchFlag}
          bucketlistId={match.params.id}
        />
        {data && data.bucketListItemData.length !== 0 ? (
          <BucketlistItemsTable
            bucketlistsItems={data.bucketListItemData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setFetchFlag={setFetchFlag}
          />
        ) : (
          <Alert color="secondary">No bucketlists available</Alert>
        )}
        {isEditModalOpen && (
          <EditBucketlistItem
            isModalOpen={isEditModalOpen}
            handleToggle={handleEditToggle}
            bucketlistItemDetails={bucketlistItemDetails}
            setFetchFlag={setFetchFlag}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteBucketlist
            isModalOpen={isDeleteModalOpen}
            handleToggle={handleDeleteToggle}
            bucketlistItemDetails={bucketlistItemDetails}
            setFetchFlag={setFetchFlag}
            isBucketlistItem
          />
        )}
      </FormContainer>
    </Container>
  );
};

export default BucketlistItem;
