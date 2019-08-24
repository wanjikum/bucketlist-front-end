import React, { useEffect, useState } from "react";
import request from "superagent";

export const setHeaders = token => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/json"
});

function useFetchable({
  uri,
  qs,
  method = "get",
  token,
  fetchFlag,
  setFetchFlag
}) {
  const [response, setResponse] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let didCancel = false;

    function unsubscribe() {
      didCancel = true;
    }

    if (!didCancel) {
      if (method === "get" && fetchFlag) {
        request
          .get(uri)
          .query(qs)
          .set(setHeaders(token))
          .then(res => {
            setIsLoading(false);
            setResponse(res.body);
            setFetchFlag(false);
          })
          .catch(err => {
            setIsLoading(false);
            setHasError(true);
            setFetchFlag(false);
          });
      } else if (method === "post" && fetchFlag) {
        request
          .post(uri)
          .send(qs)
          .set(setHeaders(token))
          .then(res => {
            setIsLoading(false);
            setResponse(res.body);
            setFetchFlag(false);
          })
          .catch(err => {
            setIsLoading(false);
            setHasError(true);
            setFetchFlag(false);
          });
      }
    }

    return unsubscribe;
  }, [fetchFlag, method, qs, setFetchFlag, token, uri]);

  return [response, isLoading, hasError];
}

export default useFetchable;
