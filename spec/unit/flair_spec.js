const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

  describe("Flair", () => {


    beforeEach((done) => {

      this.topic;
      this.flair;
      sequelize.sync({ force: true }).then((res) => {

      Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the start system."
      })
      .then((topic) => {
          this.topic = topic;

          Flair.create({
            name: "Hot",
            color: "Red",
            topicId: this.topic.id
          })
          .then((flair) => {
            this.flair = flair;
            done();
          });
      })
      .catch((err) => {
          console.log(err);
          done();
      });

      });

    });

  describe("#create()", () => {

    it("should create a flair object with a name, color and assigned topic", (done) => {

        Flair.create({
          name: "Cool",
          color: "Light Blue",
          topicId: this.topic.id
        })
        .then((flair) => {

          expect(flair.name).toBe("Cool");
          expect(flair.color).toBe("Light Blue");
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        });

    });


    it("should not create any flair with missing name or color", (done) => {

      Flair.create({
        name: "Exciting"
      })
      .then((post) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Flair.color cannot be null");
        expect(err.message).toContain("Flair.topicId cannot be null");
        done();
      });
    });



  }); //#create()

  describe("#setTopic()", () => {

    it("should associate flair with a topic", (done) => {


      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the start system."
      })
      .then((newTopic) => {

        expect(this.flair.topicId).toBe(this.topic.id);

        this.flair.setTopic(newTopic)
        .then((flair) => {
          expect(flair.topicId).toBe(newTopic.id);
          done();
        });

      });
    });
  });


  describe("#getTopic()", () => {

    it("should return the associated topic, with associated flair", (done) => {
      this.flair.getTopic()
      .then((associatedTopic) => {
        expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
        done();
      })


    })



  })




  })
