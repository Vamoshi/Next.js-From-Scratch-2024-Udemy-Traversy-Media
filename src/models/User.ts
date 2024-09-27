import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  { timestamps: true }
);

// check if the User model has already been compiled and exists in mongoose.models
// If it does exist (models.User is truthy), it assigns that existing model to User
// If it doesn’t exist (models.User is falsy), it creates a new model using model("User", UserSchema)
// and stores it in User
const User = models.User || model("User", UserSchema);

export default User;
