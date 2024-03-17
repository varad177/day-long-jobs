import mongoose, { Schema } from "mongoose";

const blogSchema = mongoose.Schema(
  {
    blog_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    locationLink: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    numberOfDays: {
      type: Number,
      required: true,
    },
    banner: {
      type: String,
      // required: true,
    },
    des: {
      type: String,
      maxlength: 200,
      // required: true
    },
    jobType : {
      type: String,
      maxlength: 200,
      // required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    lat:{
      type : String
    },
    long:{
      type : String
    },
    activity: {
      total_comments: {
        type: Number,
        default: 0,
      },
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "comments",
    },
    draft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "publishedAt",
    },
  }
);

export default mongoose.model("blogs", blogSchema);
