import React from "react";
import { Table } from "reactstrap";
import styled from "styled-components";
import MediaQuery from "react-responsive";

import media from "../../utils/media";
import { SILVER_GREY, WHITE_GREY, WHITE } from "../../utils/colors";

import Actions from "../../components/actions/actions";
import CustomNav from "../../components/custom-nav/custom-nav";
import AddBucketlists from "./add-bucketlist";

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

const TableMobile = () => {
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
        <tr>
          <td>Go to Nairobi</td>
          <td>Done</td>
          <td>
            <Actions />
          </td>
        </tr>
        <tr>
          <td>Go to Kitale</td>
          <td>In Progress</td>
          <td>
            <Actions />
          </td>
        </tr>
        <tr>
          <td>Go to Kakamega</td>
          <td>To do</td>
          <td>
            <Actions />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

const DesktopMobile = () => {
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
        <tr>
          <td>1</td>
          <td>Go to Nairobi</td>
          <td>Visit all the parks near nairobi</td>
          <td>Done</td>
          <td>
            <Actions />
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Go to Kitale</td>
          <td>Visit some of the maize farms</td>
          <td>In Progress</td>
          <td>
            <Actions />
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Go to Kakamega</td>
          <td>Visit the crying stone</td>
          <td>To do</td>
          <td>
            <Actions />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

const Bucketlist = ({ history }) => {
  // console.log("openCreateBucketlistModal", openCreateBucketlistModal);

  return (
    <Container>
      <CustomNav isUserVerified />
      <FormContainer>
        <AddBucketlists />
        <MediaQuery maxDeviceWidth={767}>
          <TableMobile />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <DesktopMobile />
        </MediaQuery>
      </FormContainer>
    </Container>
  );
};

export default Bucketlist;
