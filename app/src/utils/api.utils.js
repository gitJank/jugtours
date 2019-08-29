export const getUrl = () => {
  return process.env.NODE_ENV === "production"
    ? "http://jugtours.cfapps.io/api"
    : "http://localhost:8080/api";
};
