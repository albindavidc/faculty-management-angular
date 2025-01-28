import mongoose from "mongoose";

const Faculty = mongoose.model("Faculty", {
  faculty_number: { type: Number },
  faculty_name: { type: String },
  departement: { type: String },
  mobile_number: { type: Number },
  aadhaar_number: { type: Number },
  email: { type: String },
  password: { type: String },
  date_of_birth: { type: String },
  joining_year: { type: Number },
});

module.exports = Faculty;
