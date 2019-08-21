import querystring from "querystring";
import React, { useContext, useEffect, useMemo, useState } from "react";
import request from "superagent";

const setToken = token => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/json"
});
const buildUrl = (url, path) => `${url}${path}`;

const initialState = {};
// http://localhost:3002/api/v1/auth/signup
function makeFetchableStore() {
  const context = React.createContext(initialState);
  // eslint-disable-next-line
  const Provider = ({ token, apiUrl, children }) => {
    const [state, setState] = useState({ token, apiUrl });

    const contextValue = useMemo(() => [state, setState], [state, setState]);

    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };

  const useFetchableStore = () => useContext(context);

  return [Provider, useFetchableStore];
}

export const [FetchableProvider, useFetchableStore] = makeFetchableStore();

const GET = "get";

export const generatefetchKey = ({ method, uri, qs }) => {
  let methodString = `${method || GET}__${uri}`;
  if (qs) methodString += `?${querystring.encode(qs)}`;
  return methodString;
};

export function useFetchable({ uri, qs, method = "get" }) {
  const [state, setFetchableState] = useFetchableStore();
  const { token, apiUrl } = state;

  const fetchKey = generatefetchKey({ method, uri, qs });
  const url = buildUrl(apiUrl, uri);

  const fetchableItem = state[fetchKey] || {};

  useEffect(() => {
    let didCancel = false;

    function unsubscribe() {
      didCancel = true;
    }
    // todo: time to live
    if (fetchableItem.loading || fetchableItem.payload) {
      return unsubscribe;
    }

    setFetchableState(current => ({
      ...current,
      [fetchKey]: { loading: true }
    }));

    if (!didCancel) {
      if (method === "get") {
        request
          .get(url)
          .query(qs)
          .set(setToken(token))
          .then(res =>
            setFetchableState(current => ({
              ...current,
              [fetchKey]: { payload: res.body }
            }))
          )
          .catch(err =>
            setFetchableState(current => ({
              ...current,
              [fetchKey]: { error: err }
            }))
          );
      } else if (method === "post") {
        request
          .post(url)
          .send(qs)
          .set(setToken(token))
          .then(res =>
            setFetchableState(current => ({
              ...current,
              [fetchKey]: { payload: res.body }
            }))
          )
          .catch(err =>
            setFetchableState(current => ({
              ...current,
              [fetchKey]: { error: err }
            }))
          );
      }
    }

    return unsubscribe;
  }, [
    token,
    fetchKey,
    fetchableItem.loading,
    fetchableItem.payload,
    method,
    qs,
    setFetchableState,
    url
  ]);

  return [fetchableItem.payload, fetchableItem.error, fetchableItem.loading];
}
