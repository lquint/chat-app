module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/cats",
        destination: "https://meowfacts.herokuapp.com",
      },
      {
        source: "/login",
        destination: "http://localhost:5000/api/user/login",
      },
    ];
  };
  return {
    rewrites,
  };
};
