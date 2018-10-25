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
  }
}
