import React, { useEffect, useState } from "react";
import request from "superagent";

const setHeaders = token => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/json"
});

function useFetchable({ uri, qs, method = "get", token }) {
  const [response, setResponse] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let didCancel = false;

    function unsubscribe() {
      didCancel = true;
    }

    if (!didCancel) {
      if (method === "get") {
        request
          .get(uri)
          .query(qs)
          .set(setHeaders(token))
          .then(res => {
            setIsLoading(false);
            setResponse(res.body);
          })
          .catch(err => {
            setIsLoading(false);
            setHasError(true);
          });
      } else if (method === "post") {
        request
          .post(uri)
          .send(qs)
          .set(setHeaders(token))
          .then(res => {
            setIsLoading(false);
            setResponse(res.body);
          })
          .catch(err => {
            setIsLoading(false);
            setHasError(true);
          });
      }
    }

    return unsubscribe;
  }, [method, qs, token, uri]);

  return [response, isLoading, hasError];
}

export default useFetchable;
