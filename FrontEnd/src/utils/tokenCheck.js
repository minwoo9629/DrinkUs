export const tokenCheck = () => {
  return sessionStorage.getItem("ACCESS_TOKEN") ? true : false;
};
