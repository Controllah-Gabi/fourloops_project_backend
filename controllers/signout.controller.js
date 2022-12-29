module.exports = {
    signout: async (req, res) => {
      return res.clearCookie('token')
        .json({
            status: 200,
            message: "User signout successful",
            redirect: "/api/login",
        });
    }
};