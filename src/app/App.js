import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "../app/bucketlist/sign-in/sign-in";
import SignUp from "../app/bucketlist/sign-up/sign-up";
import HomePage from "../app/bucketlist/home-page/home-page";

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
    </Router>
  </Container>
);

export default App;
