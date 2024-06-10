let userLogin = null;

export const setUserLogin = (login) => {
  userLogin = login;
};

export const getUserLogin = () => {
  return userLogin;
};
