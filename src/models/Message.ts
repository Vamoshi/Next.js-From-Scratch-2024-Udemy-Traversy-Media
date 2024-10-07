import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    phone: { type: String },
    body: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// check if the Message model has already been compiled and exists in mongoose.models
// If it does exist (models.Message is truthy), it assigns that existing model to Message
// If it doesn’t exist (models.Message is falsy), it creates a new model using model("Message", UserSchema)
// and stores it in Message
const Message = models.Message || model("Message", MessageSchema);

export default Message;
