const express = require("express");
const bodyParser = require("body-parser");
const promoRouter = express.Router();
const Promos = require("../models/promotions");
promoRouter.use(bodyParser.json());
const cors = require("./cors");
const authenticate = require("../authenticate");
promoRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus = 200;
  })
  .get(cors.cors, (req, res, next) => {
    Promos.find(req.query)
      .then(
        (promos) => {
          res.statusCode = 200;
          res.setHeader("ContentType", "application/json");
          res.json(promos);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Promos.create(req.body).then((promo) => {
      res.statusCode = 200;
      res.setHeader("ConentType", "application/json");
      res.json(promo);
    });
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.send("PUT operation not supported");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Promos.remove({})
      .then(
        (response) => {
          res.statusCode = 200;
          res.setHeader("ContentType", "application/json");
          res.json(response);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

promoRouter
  .route("/:promoId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus = 200;
  })
  .get(cors.cors, (req, res, next) => {
    Promos.findById(req.params.promoId)
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("ContentType", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      "post Operation not supported in " + req.params.promoId,
      {
        $set: req.body,
      },
      { new: true }
    );
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Promos.findByIdAndUpdate(
      req.params.promoId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("ContentType", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Promos.findByIdAndDelete(req.params.promoId)
      .then(
        (response) => {
          res.statusCode = 200;
          res.setHeader("ContentType", "application/json");
          res.json(response);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
module.exports = promoRouter;
