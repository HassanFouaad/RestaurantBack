const express = require("express");
const bodyParser = require("body-parser");
const leaderRouter = express.Router();
const Leaders = require("../models/leaders");
leaderRouter.use(bodyParser.json());
const cors = require("./cors");
const authenticate = require("../authenticate");
leaderRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus = 200;
  })
  .get(cors.cors, (req, res, next) => {
    Leaders.find(req.query)
      .then(
        (leaders) => {
          res.statusCode = 200;
          res.setHeader("ContentType", "application/json");
          res.json(leaders);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(cors.corsWithOptions, (req, res, next) => {
    Leaders.create(req.body).then((leader) => {
      res.statusCode = 200;
      res.setHeader("ConentType", "application/json");
      res.json(leader);
    });
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.send("PUT operation not supported");
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    Leaders.remove({})
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

leaderRouter
  .route("/:leaderId")
  .get(cors.cors, (req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("ContentType", "application/json");
          res.json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end("post Operation not supported in " + req.params.leaderId);
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("ContentType", "application/json");
          res.json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    Leaders.findByIdAndDelete(req.params.leaderId)
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
module.exports = leaderRouter;
