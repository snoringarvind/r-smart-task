const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { body, validationResult } = require("express-validator");

router.get("/blog", (req, res, next) => {
  Blog.find({}, (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json(result);
    }
  });
});

router.post("/blog", [
  body("title").trim().isLength({ min: 1 }),
  body("content").trim().isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const blog = new Blog({ title: req.body.title, content: req.body.content });

    blog.save((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result);
      }
    });
  },
]);

module.exports = router;
