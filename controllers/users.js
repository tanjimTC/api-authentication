module.exports = {
  signup: async (req, res, next) => {
    //   Validate email & pass
    console.log("content of req.value.body", req.value.body);
  },
  signin: async (req, res, next) => {
    //   Generate token
    console.log("userController.signin called");
  },
  secrets: async (req, res, next) => {
    console.log("userController.secrets called");
  },
};
