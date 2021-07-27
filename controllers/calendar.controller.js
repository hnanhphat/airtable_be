const Calendar = require("../models/Calendar");
const Sprayer = require("../models/Sprayer");
const Drone = require("../models/Drone");

const calendarController = {};

// Create new calendar
calendarController.createCalendar = async (req, res, next) => {
  try {
    const { requester, sprayer, drones, start, end, date } = req.body;

    const calendar = new Calendar({
      requester,
      sprayer,
      drones,
      start,
      end,
      date,
    });
    await calendar.save();

    res.status(200).json({
      success: true,
      data: calendar,
      message: "Create new calendar successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get list of calendars with pagination
calendarController.getListOfCalendars = async (req, res, next) => {
  try {
    // 1. Read the query information
    let { page, limit, sortBy, date, ...filter } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // 2. Get total calendars number
    const totalCalendar = await Calendar.countDocuments({
      date: new RegExp(date, "i"),
      ...filter,
    });

    // 3. Calculate total page number
    const totalPage = Math.ceil(totalCalendar / limit);

    // 4. Calculate how many data you will skip (offset)
    const offset = (page - 1) * limit;

    // 5. Get calendars based on query info
    const calendars = await Calendar.find({
      date: new RegExp(date, "i"),
      ...filter,
    })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("requester")
      .populate("sprayer");

    // 6. Send calendars + totalPage info
    res.status(200).json({
      success: true,
      data: { calendars, totalPage },
      message: "Get list of calendars successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

calendarController.getCustomList = async (req, res, next) => {
  try {
    const { date, start, end } = req.query;
    const custom = await Calendar.find(
      {
        date,
        start: { $gte: start },
        end: { $lte: end },
      },
      { sprayer: 1, drones: 1, _id: 0 }
    );

    let listSprayerId = [],
      listDroneId = [];
    custom.forEach((pr) => {
      listSprayerId.push(pr.sprayer.toString());
      pr.drones.forEach((c) => {
        listDroneId.push(c.toString());
      });
    });

    const allSprayer = await Sprayer.find();
    const customSprayer = allSprayer.filter(
      (sprayer) => !listSprayerId.includes(sprayer._id.toString())
    );

    const allDrone = await Drone.find();
    const customDrone = allDrone.filter(
      (drone) => !listDroneId.includes(drone._id.toString())
    );

    res.status(200).json({
      success: true,
      data: {
        customSprayer,
        customDrone,
      },
      message: "Get list of calendars successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete single calendar
calendarController.deleteSingleCalendar = async (req, res, next) => {
  try {
    const calendar = await Calendar.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: calendar,
      message: "Delete calendar successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = calendarController;
