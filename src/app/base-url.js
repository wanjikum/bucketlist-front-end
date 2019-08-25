const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002/"
    : "https://bucketlist-node-api.herokuapp.com/";

export default baseUrl;
