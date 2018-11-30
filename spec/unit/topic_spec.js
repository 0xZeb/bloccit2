const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {


  beforeEach((done) => {
  this.topic;
  this.post;
  this.user;

  sequelize.sync({force: true}).then((res) => {

// #2
    User.create({
      email: "starman@tesla.com",
      password: "Trekkie4lyfe"
    })
    .then((user) => {
      this.user = user; //store the user

// #3
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system.",

// #4
        posts: [{
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          userId: this.user.id
        }]
      }, {

// #5
        include: {
          model: Post,
          as: "posts"
        }
      })
      .then((topic) => {
        this.topic = topic; //store the topic
        this.post = topic.posts[0]; //store the post
        done();
      })
    })
  });
});





    describe("#create()", () => {

        it("When calling Topic.create with valid arguments, a topic object is created and stored in the database",
         (done) => {

         Topic.create({
           title: "Expeditions to Alpha Centauri",
           description: "A compilation of reports from recent visits to the star system."
         })
         .then((topic) => {

           expect(topic.title).toBe("Expeditions to Alpha Centauri");
           expect(topic.description).toBe("A compilation of reports from recent visits to the star system.");
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
            expect(posts[0].title).toBe("My first visit to Proxima Centauri b");
            expect(posts[0].body).toBe("I saw some rocks.");

            done();
          })

        })



    })
});
