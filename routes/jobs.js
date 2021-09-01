const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const Jobs = require("../models/Jobs");

router.post(
  "/",
  body("website")
    .matches(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    )
    .withMessage("Please enter a valid website url"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const jobs = await Jobs.create(req.body);
      if (!jobs) {
        return res.status(400).json({
          success: false,
          errors: [
            {
              msg: "Couldn't create a job",
            },
          ],
        });
      }

      res.status(200).json({
        success: true,
        msg: "Job created",
      });
    } catch (err) {
      next(err);
    }
  }
);

// get all jobs
router.get("/", async (req, res, next) => {
  let queryStr;

  const filters = { ...req.query };

  // select type values
  if (req.query.type) {
    queryStr = Jobs.find({ type: req.query.type });
  }

  // select category values
  if (req.query.category) {
    queryStr = Jobs.find({ category: req.query.category });
  }

  try {
    let jobs;
    if (!req.query.type && !req.query.category) {
      jobs = await Jobs.find();
    } else jobs = await queryStr;

    if (!jobs) {
      return res.status(400).json({
        success: false,
        msg: "Could not get jobs",
      });
    }

    res.status(200).json({
      count: jobs.length,
      success: true,
      msg: jobs,
    });
  } catch (err) {
    next(err);
  }
});

// get only one job
router.get("/:id", async (req, res, next) => {
  try {
    const jobs = await Jobs.findById(req.params.id);

    if (!jobs) {
      return res.status(400).json({
        success: false,
        msg: "Could not find job",
      });
    }

    res.status(200).json({
      success: true,
      msg: jobs,
    });
  } catch (err) {
    next(err);
  }
});

// update jobs
router.put("/:id", async (req, res, next) => {
  try {
    const jobs = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!jobs) {
      return res.status(400).json({
        success: false,
        msg: "Could not update jobs",
      });
    }

    res.status(200).json({
      success: true,
      msg: jobs,
    });
  } catch (err) {
    next(err);
  }
});

// delete jobs
router.delete("/:id", async (req, res, next) => {
  try {
    const jobs = await Jobs.findByIdAndRemove(req.params.id);

    if (!jobs) {
      return res.status(400).json({
        success: false,
        msg: "Could not delete jobs",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Job Deleted",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
