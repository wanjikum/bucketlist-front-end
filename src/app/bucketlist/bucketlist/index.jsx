import React from "react";
import { Table } from "reactstrap";
import styled from "styled-components";
import MediaQuery from "react-responsive";

import media from "../../utils/media";
import { SILVER_GREY, WHITE_GREY, WHITE } from "../../utils/colors";

import Actions from "../../components/actions/actions";
import CustomNav from "../../components/custom-nav/custom-nav";
import AddBucketlist from "./add-bucketlist";

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

const TableMobile = ({ handleView, bucketlists }) => {
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
              <Actions handleView={handleView} bucketlistIndex={index} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const DesktopMobile = ({ handleView, bucketlists }) => {
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
              <Actions handleView={handleView} bucketlistIndex={index} />
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

  const handleView = bucketlistIndex => {
    // remember to fetch data
    // remember to use `/bucketlist/${bucketlistIndex}/bucketlist-item`
    const bucketlistData = bucketlists[bucketlistIndex];
    console.log("nimeclickiwa", bucketlistData, bucketlistIndex);
    // history.push(`${match.url}/${bucketlistIndex}/bucketlist-item/`);
    history.push(`/bucketlist-item/`);
  };

  return (
    <Container>
      <CustomNav isUserVerified />
      <FormContainer>
        <AddBucketlist />
        <MediaQuery maxDeviceWidth={767}>
          <TableMobile handleView={handleView} bucketlists={bucketlists} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <DesktopMobile handleView={handleView} bucketlists={bucketlists} />
        </MediaQuery>
      </FormContainer>
    </Container>
  );
};

export default Bucketlist;
