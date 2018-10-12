const adQueries = require("../db/queries.ads.js");

module.exports = {

    ads(req, res, next){
      adQueries.getAllAds((err, ads) => {

        if(err){
          res.redirect(500, "/");
        } else {
          res.render("ads/ads", {ads});
        }

      });
    },

    new(req, res, next){
      res.render("ads/new");
    },


    create(req, res, next){

         let newAd = {
           title: req.body.title,
           description: req.body.description
       };

       adQueries.addAd(newAd, (err, ad) => {
           if(err){
             console.log(err);
             res.redirect(500, "/ads/new");
           } else {
             res.redirect(303, `/ads/${ad.id}`);
           }

       });
     },

     show(req, res, next){
       adQueries.getAd(req.params.id, (err, ad) => {

        if(err || ad == null){
          res.redirect(404, "/");
        } else {
          res.render("ads/show", { ad });
        }
      });
    },

    destroy(req, res, next){
      adQueries.deleteAd(req.params.id, (err, ad) =>{
        if(err){
          res.redirect(500, `/ads/${ad.id}`)
        } else {
          res.redirect(303, `/ads`);
        }
      });
    },

    edit( req, res, next){

      adQueries.getAd(req.params.id, (err, ad) => {
        if(err||ad == null){
          res.redirect(404, "/");
        } else {
          res.render("ads/edit", {ad});
        }
      });

    },

    update(req, res, next){

      adQueries.updateAd(req.params.id, req.body, (err, topic) => {

        if(err|| ad == null){
          res.redirect(400, `/ads/${req.params.id}/edit`);
        } else {
          res.redirect(`/ads/${ad.id}`);
        }
      });


    }

}
