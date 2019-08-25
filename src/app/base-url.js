const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bucketlist-node-api.herokuapp.com/"
    : "http://localhost:3002/";

export default baseUrl;
