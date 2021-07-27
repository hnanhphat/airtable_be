const Sprayer = require("../models/Sprayer");

const sprayerController = {};

// Create new sprayer
sprayerController.createSprayer = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const sprayer = new Sprayer({ name, description });
    await sprayer.save();

    res.status(200).json({
      success: true,
      data: sprayer,
      message: "Create new sprayer successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get list of sprayers with pagination
sprayerController.getListOfSprayers = async (req, res, next) => {
  try {
    // 1. Read the query information
    let { page, limit, sortBy, name, ...filter } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // 2. Get total sprayers number
    const totalSprayer = await Sprayer.countDocuments({
      name: new RegExp(name, "i"),
      ...filter,
    });

    // 3. Calculate total page number
    const totalPage = Math.ceil(totalSprayer / limit);

    // 4. Calculate how many data you will skip (offset)
    const offset = (page - 1) * limit;

    // 5. Get sprayers based on query info
    const sprayers = await Sprayer.find({
      name: new RegExp(name, "i"),
      ...filter,
    })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);

    // 6. Send sprayers + totalPage info
    res.status(200).json({
      success: true,
      data: { sprayers, totalPage },
      message: "Get list of sprayers successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single sprayer
sprayerController.getSingleSprayer = async (req, res, next) => {
  try {
    const sprayerId = req.params.id;
    const sprayer = await Sprayer.findById(sprayerId);
    if (!sprayer) {
      throw new Error("Sprayer not found");
    }

    res.status(200).json({
      success: true,
      data: sprayer,
      message: "Get single sprayer successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update single sprayer
sprayerController.updateSingleSprayer = async (req, res, next) => {
  try {
    const findSprayer = await Sprayer.findById(req.params.id);
    if (!findSprayer) {
      throw new Error("Sprayer not found");
    }

    const { name, description } = req.body;
    const sprayer = await Sprayer.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: sprayer,
      message: "Update sprayer successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete single sprayer
sprayerController.deleteSingleSprayer = async (req, res, next) => {
  try {
    const sprayer = await Sprayer.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: sprayer,
      message: "Delete sprayer successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = sprayerController;
