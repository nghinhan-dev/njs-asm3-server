const User = require("../../models/User");

module.exports = (io, socket) => {
  io.engine.use(async (req, res, next) => {
    try {
      if (req.session.userID) {
        const user = await User.findById(req.session.userID);

        if (user) {
          req.user = user;
          return next();
        } else {
          res.end();
        }
      } else {
        res.end();
      }
    } catch (error) {
      console.error("Error in loginAuth:", error);
    }
  });

  console.log("Pass through");

  socket.on("chat:send", (msg, user) => {
    socket.broadcast.emit("chat:send", msg, user);
  });
};
