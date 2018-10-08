const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000";

const sequelize = require("../..src/db/models/index").sequelize;
const Advert = require("../../src/db/models").Advert;

beforeEach((done) => {

  this.advert;

  sequelize.sync({ force: true }).then((res) => {

      Advert.create({
        title: "YOU NEED THIS!",
        description: "advertisement"
      })
      .then((advert) => {
        this.advert = advert;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

  });
});






describe("routes : advert", () => {

  describe("GET /advert", () => {

    it("should return a status code 200", (done) => {
      request.get(`${base}/advert`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });

});
