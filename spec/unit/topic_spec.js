const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {


  beforeEach((done) => {

    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

        Topic.create({
          title: "Which band has the best concerts?",
          description: "Energy, performance, sound quality, venue, crowd..."
        })
        .then((topic) => {

          this.topic = topic;


          Post.create({
              title: "Heavy metal never disappoints.",
              body: "It rocked my socks.",

              topicId: this.topic.id
            })
            .then((post) => {
              this.post = post;
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

        it("When calling Topic.create with valid arguments, a topic object is created and stored in the database",
         (done) => {

         Topic.create({
           title: "Which band has the best concerts?",
           description: "Energy, performance, sound quality, venue, crowd..."
         })
         .then((topic) => {

           expect(topic.title).toBe("Which band has the best concerts?");
           expect(topic.description).toBe("Energy, performance, sound quality, venue, crowd...");
           done();

         })
         .catch((err) => {
           console.log(err);
           done();
         });
      });


    })


    describe("#getPosts()", () => {

        it("should create and associate a post with a topic in scope.", (done) => {
          this.topic.getPosts()
          .then((posts) => {
            expect(posts[0].topicId).toBe(this.topic.id);
            done();
          });
        });

        it("should confirm that the associated post is returned when that method is called", (done) => {
          this.topic.getPosts()
          .then((posts) => {
            expect(posts[0].title).toContain("Heavy metal never disappoints.");
            expect(posts[0].body).toContain("It rocked my socks.");

            done();
          })

        })



    })
});
