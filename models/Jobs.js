const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required"],
  },
  overview: {
    type: String,
    required: [true, "Job Overview is required"],
  },
  location: {
    type: String,
    required: [true, "Please enter a valid contenent"],
    enum: [
      "asia",
      "africa",
      "europe",
      "usa",
      "south-america",
      "antartica",
      "australia",
    ],
  },
  country: {
    type: String,
    required: [true, "Enter a valid country"],
  },
  type: {
    type: String,
    required: [true, "Job type is required"],
    enum: [
      "full-time",
      "part-time",
      "contract",
      "temporary",
      "internship",
      "volunteer",
      "remote",
    ],
  },
  reponsibilities: {
    type: Array,
    required: [true, "Reponsibilities is required"],
  },
  qualifications: {
    type: Array,
    required: [true, "Qualifications is required"],
  },
  optionalQualifications: {
    type: Array,
  },
  benefits: {
    type: Array,
    required: [true, "Benefits is required"],
  },
  minSalary: {
    type: Number,
    required: [true, "Minimum salary is required"],
  },
  maxSalary: {
    type: Number,
    required: [true, "Maximum salary is required"],
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
  },
  numberofVacancies: {
    type: Number,
    required: [true, "Number od vacancies is required"],
  },
  category: {
    type: String,
    enum: [
      "health",
      "law",
      "government",
      "education",
      "communications",
      "engineering",
      "sales",
    ],
    required: [true, "Category is required"],
  },
  website: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Jobs", JobsSchema);
