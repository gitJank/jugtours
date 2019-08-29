export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api"
    : "http://jugtours.cfapps.io/api";
};
