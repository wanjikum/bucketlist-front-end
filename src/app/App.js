import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "../app/bucketlist/sign-in/sign-in";
import SignUp from "../app/bucketlist/sign-up/sign-up";
import HomePage from "../app/bucketlist/home-page/home-page";
import Bucketlist from "../app/bucketlist/bucketlist";
import BucketlistItem from "../app/bucketlist/bucketlist/bucketlist-items";
import AuthContext from "../app/bucketlist/auth";

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const App = () => {
  const [authInfo, setAuthInfo] = useState({ success: false, token: "" });
  const handleAuthInfo = authData => setAuthInfo(authData);

  const value = {
    authData: authInfo,
    handleAuthDataChange: handleAuthInfo
  };

  return (
    <Container>
      <Router>
        <AuthContext.Provider value={value}>
          <Route path="/" exact component={HomePage} />
          <Route path="/sign-up/" component={SignUp} />
          <Route path="/sign-in/" component={SignIn} />
          <Route path="/bucketlists/" component={Bucketlist} />
          <Route
            path="/bucketlist/:id/bucketlist-item/"
            component={BucketlistItem}
          />
        </AuthContext.Provider>
      </Router>
    </Container>
  );
};

export default App;
