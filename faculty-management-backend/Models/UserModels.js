import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password: String,
});

export default mongoose.model("User", UserSchema);
