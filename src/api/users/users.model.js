const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    rol: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      trim: true,
      required: true,
    },
  },
  { timestamps: true, collection: "users" }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
const User = mongoose.model("users", userSchema);
module.exports = User;
