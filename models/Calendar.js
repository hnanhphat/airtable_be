const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requester",
      required: true,
    },
    sprayer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprayer",
      required: true,
    },
    drones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drone",
        required: true,
      },
    ],
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Calendar = require("mongoose").model("Calendar", calendarSchema);

module.exports = Calendar;
