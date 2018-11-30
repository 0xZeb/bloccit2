module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    app.use(staticRoutes);

    const topicRoutes = require("../routes/topics");
    app.use(topicRoutes);

    const adsRoutes = require("../routes/ads");
    app.use(adsRoutes);

    const postRoutes = require("../routes/posts");
    app.use(postRoutes);


    const flairRoutes = require("../routes/flairs");
    app.use(flairRoutes);

    const userRoutes = require("../routes/users");

    if(process.env.NODE_ENV === "test"){
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    app.use(userRoutes);
  }
}
