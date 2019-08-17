import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import img from "../../public/images/beauti-1.jpg";

import media from "../../utils/media";
import {
  COOL_GREY,
  DARK_GREY,
  SILVER_GREY,
  WHITE,
  WHITE_GREY,
  BLACK
} from "../../utils/colors";

import PageWrapper from "../../components/page-wrapper/page-wrapper";
import CustomNav from "../../components/custom-nav/custom-nav";
import { Header, SubHeader } from "../../components/typography/typography";

const Container = styled.div`
  background-image: url(${img});
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: center;
  padding: 2rem;
`;

const BucketlistsHeader = styled(Header)`
  margin-bottom: 1rem;
  text-align: left;
  ${media.small`
    text-align: center;
    font-size: 3rem;
  `};
`;

const BucketlistSubHeader = styled(SubHeader)`
  ${media.small`
    text-align: center;
    font-size: 2.5rem;
  `};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2.5rem;
  width: 100%;

  ${media.small`
    flex-direction: row;
  `};
`;

const CustomButtonLink = styled(Link)`
  align-items: center;
  background: ${WHITE};
  border-radius: 0.5rem;
  color: ${BLACK};
  display: flex;
  justify-content: center;
  height: 3.5rem;
  width: 100%;
  font-size: 1.5rem;

  ${media.small`
    border-radius: 1rem;
    height: 4rem;
    width: 14rem;
  `};

  ${media.large`
    font-size: 2rem;
    height: 4rem;
    width: 16rem;
  `};

  &:hover {
    background: ${SILVER_GREY};
    cursor: ${props => (props.disabled ? "cursor" : "pointer")};
    transition: all 0.3s ease;
  }

  &:active {
    background: ${DARK_GREY};
    outline: none;
  }

  &:disabled {
    background-color: ${SILVER_GREY};
    color: ${COOL_GREY};
    box-shadow: none;
  }
`;

const SignInButton = styled(CustomButtonLink)`
  margin-top: 1.5rem;

  ${media.small`
    margin: 0 0 0 1.5rem;
  `};
`;

const HomePage = () => (
  <PageWrapper>
    <Container>
      <CustomNav />
      <ContentContainer>
        <BucketlistsHeader>Bucketlists Tracking Made Easier</BucketlistsHeader>
        <BucketlistSubHeader>
          You can create online bucketlists that keeps track of your life goals.
        </BucketlistSubHeader>
        <ButtonContainer>
          <CustomButtonLink to="/sign-up/">Sign Up</CustomButtonLink>
          <SignInButton to="/sign-in/">Sign In</SignInButton>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  </PageWrapper>
);

export default HomePage;
