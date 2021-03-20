const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { body, validationResult } = require("express-validator");

router.get("/blog-data", (req, res, next) => {
  Blog.find({})
    .select("_id")
    .exec((err, result) => {
      console.log(result, result);
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result);
      }
    });
});

router.get("/:blogid", (req, res, next) => {
  Blog.findById(req.params.blogid, (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json(result);
    }
  });
});

router.post("/", [
  body("title", "title cannot be empty").trim().isLength({ min: 1 }),
  body("content", "content cannot be empty").trim().isLength({ min: 1 }),
  (req, res, next) => {
    console.log("hello");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const blog = new Blog({ title: req.body.title, content: req.body.content });

    blog.save((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json("post saved");
      }
    });
  },
]);

module.exports = router;
