import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "../app/bucketlist/sign-in/sign-in";
import SignUp from "../app/bucketlist/sign-up/sign-up";
import HomePage from "../app/bucketlist/home-page/home-page";
import Bucketlist from "../app/bucketlist/bucketlist";
import BucketlistItem from "../app/bucketlist/bucketlist/bucketlist-items";

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const App = () => (
  <Container>
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/sign-up/" component={SignUp} />
      <Route path="/sign-in/" component={SignIn} />
      <Route path="/bucketlists/" component={Bucketlist} />
      <Route path="/bucketlist-item/" component={BucketlistItem} />
    </Router>
  </Container>
);

export default App;
