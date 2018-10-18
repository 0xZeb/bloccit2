const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/ads";
const sequelize = require("../../src/db/models/index").sequelize;
const Ads = require("../../src/db/models").Advertisement;





describe ("routes : ads", () => {


    beforeEach((done) => {
      this.ad;
      sequelize.sync({ force: true }).then((res) => {

        Ads.create({
          title: "Gaucho Football",
          description: "Nationally recognized brand"
        })
        .then((ad) => {
          this.ad = ad;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });


    describe("GET /ads", () => {

        it("should return a status code 200 and all the ads", (done) => {
          request.get(base, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(body).toContain("Gaucho Football");
            expect(body).toContain("Nationally recognized brand");
            done();
          });
        });

    });

    describe("POST /ads/create", () => {

      const options ={
        url: `${base}/create`,
        form: {
          title: "Gaucho Football",
          description: "Nationally recognized brand"
        }
      };

      it("should create a new ad and redirect", (done) => {

        request.post(options,
          (err, res, body) => {
            Ads.findOne({where: {title: "Gaucho Football"}})
            .then((ad) => {
              expect(res.statusCode).toBe(303);
              expect(ad.title).toBe("Gaucho Football");
              expect(ad.description).toBe("Nationally recognized brand");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

    describe("GET /ads/new",  () => {

      it("should render a new topic form", (done) => {
        request.get(`${base}/new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Ad");
          done();
        });
      });
    });

    describe("GET /ads/:id", () => {

      it("should render a view with the selected ad", (done) => {
        request.get(`${base}/${this.ad.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Nationally recognized brand");
          done();
        });
      });
    });

    describe("POST /ads/:id/destroy", () => {

        it("should delete the ad with the associated ID", (done) => {

          Ads.all()
          .then((ads) => {

              const adCountBeforeDelete = ads.length;

              expect(adCountBeforeDelete).toBe(1);

              request.post(`${base}/${this.ad.id}/destroy`, (err, res, body) => {
                Ads.all()
                .then((ads) => {
                  expect(err).toBeNull();
                  expect(ads.length).toBe(adCountBeforeDelete -1);
                  done();
                })
              });
            });

        });

      });

      describe("GET /ads/:id/edit", () => {

        it("should render a view with an edit topic form", (done) => {
          request.get(`${base}/${this.ad.id}/edit`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Gaucho Football");
            expect(body).toContain("Nationally recognized brand");
            done();
          });
        });

      });

      describe("POST /ads/:id/update", () => {


          it("should update the topic with the given values", (done) => {

            const options = {
              url: `${base}/${this.ad.id}/update`,
              form: {
                title: "Go Gauchos!",
                description: "Mission Viejo, CA"
              }
            };

            request.post(options,
              (err, res, body) => {

                expect(err).toBeNull();
                Ads.findOne({
                  where: { id: this.ad.id }
                })
                .then((ad) => {
                  expect(ad.title).toBe("Go Gauchos!");
                  done();
                });
              });
            });
      });




});
