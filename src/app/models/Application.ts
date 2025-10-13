import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    name: String,
    registerNumber: String,
    phone: String,
    email: String,
    preference1: String,
    preference2: String,
    whyJoin: String,
    fitPref1: String,
    fitPref2: String,
    experiences: String,
    workLink: String,
    session_mail: String,
  },
  { timestamps: true }
);

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
