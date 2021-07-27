const Schema = require("mongoose").Schema;

const sprayerSchema = Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String, required: [true, "Description is required"] },
  },
  { timestamps: true }
);

const Sprayer = require("mongoose").model("Sprayer", sprayerSchema);

module.exports = Sprayer;
