import mongoose, { Schema, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    provider: { type: String, default: "google" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof UserSchema>;

export default mongoose.models.User || mongoose.model("User", UserSchema);
