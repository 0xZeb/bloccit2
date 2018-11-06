const Flair = require("./models").Flair;
const Topic = require("./models").Topic


module.exports = {


    addFlair(newFlair, callback){
      return Flair.create(newFlair)
        .then((flair) => {
          callback(null, flair);
        })
        .catch((err) => {
          callback(err);
        })
    },

    getFlair(id, callback){
      return Flair.findById(id)
        .then((flair) => {
          callback(null, flair);
        })
        .catch((err) => {
          callback(err);
        })
    },

    deleteFlair(id, callback){
      return Flair.destroy({
        where: {id}
      })
      .then((flair) => {
        callback(null, flair);
      })
      .catch((err) => {
        callback(err);
      })
    },

    updateFlair(id, updatedFlair, callback){
      return Post.findById(id)
      .then((post) => {

        if(!post){
          return callback("Post not found");
        }

        flair.update(updatedFlair, {
          fields: Object.keys(updatedFlair)
        })
        .then(() => {
          callback(null, post);
        })
        .catch((err) => {
          callback(err);
        });
      });
    },





}
