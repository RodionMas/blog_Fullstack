export const storageUser = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    return user;
  } else {
    const user = {
      email: "",
      password: "",
      fullName: "",
      token: '',
    };
    return user;
  }
};
