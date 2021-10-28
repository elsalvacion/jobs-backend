const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const Jobs = require("../models/Jobs");
const nodemailer = require("nodemailer");
const path = require("path");
const { nanoid } = require("nanoid");

router.post(
  "/",
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),
  async (req, res, next) => {
    console.log(req.body);
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
    queryStr = Jobs.find({ type: req.query.type }).sort({ createdAt: -1 });
  }

  // select category values
  if (req.query.category) {
    queryStr = Jobs.find({ category: req.query.category }).sort({
      createdAt: -1,
    });
  }

  try {
    let jobs;
    if (!req.query.type && !req.query.category) {
      jobs = await Jobs.find().sort({ createdAt: -1 });
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

// router

router.post("/apply/:id", async (req, res, next) => {
  try {
    console.log(req.files);
    const file = req.files.file;

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ success: false, msg: "Upload only pdfs" });
    }

    if (file.size > process.env.MAX_SIZE) {
      return res
        .status(400)
        .json({ success: false, msg: "File greater than 5MB" });
    }

    const job = await Jobs.findById(req.params.id);

    if (!job) {
      return res
        .status(400)
        .json({ success: false, msg: "No Job of this category" });
    }
    const id = nanoid(6);
    const name = `${id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_PATH}/${name}`, async (err) => {
      if (err) console.log(err);
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: `Jobs <${process.env.EMAIL}>`,
      to: "alieukeita201@gmail.com",
      subject: "New Job applicant",
      text: `You have a new applicant for the job you posted at jobs.com with the title: ${job.title} and overview of: 
${job.overview}
      `,
      attachments: [
        {
          path: `${process.env.FILE_PATH}/${name}`,
        },
      ],
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw err;
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(200)
          .json({ success: true, msg: "Application sent successfully" });
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
