const Schema = require("mongoose").Schema;
const jwt = require("jsonwebtoken");

const requesterSchema = Schema(
  {
    avatar: { type: String, required: false, default: "" },
    firstname: { type: String, required: [true, "First Name is required"] },
    lastname: { type: String, required: [true, "Last Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: true, select: false },
    role: { type: String, required: false, default: "Requester" },
  },
  { timestamps: true }
);

// Generate token
requesterSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const Requester = require("mongoose").model("Requester", requesterSchema);

module.exports = Requester;
