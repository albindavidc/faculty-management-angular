import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  faculty_number: { type: Number },
  faculty_name: { type: String, trim: true },
  department: { type: String },
  mobile_number: { type: Number },
  aadhaar_number: { type: Number },
  email: { type: String },
  password: { type: String },
  date_of_birth: { type: String },
  joining_year: { type: Number },
});

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
