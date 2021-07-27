const Schema = require("mongoose").Schema;

const droneSchema = Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    category: { type: String, required: [true, "Category is required"] },
  },
  { timestamps: true }
);

const Drone = require("mongoose").model("Drone", droneSchema);

module.exports = Drone;
