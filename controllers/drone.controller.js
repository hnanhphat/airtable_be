const Drone = require("../models/Drone");

const droneController = {};

// Create new drone
droneController.createDrone = async (req, res, next) => {
  try {
    const { name, description, category } = req.body;

    const drone = new Drone({ name, description, category });
    await drone.save();

    res.status(200).json({
      success: true,
      data: drone,
      message: "Create new drone successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get list of drones with pagination
droneController.getListOfDrones = async (req, res, next) => {
  try {
    // 1. Read the query information
    let { page, limit, sortBy, name, ...filter } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // 2. Get total drones number
    const totalDrone = await Drone.countDocuments({
      name: new RegExp(name, "i"),
      ...filter,
    });

    // 3. Calculate total page number
    const totalPage = Math.ceil(totalDrone / limit);

    // 4. Calculate how many data you will skip (offset)
    const offset = (page - 1) * limit;

    // 5. Get drones based on query info
    const drones = await Drone.find({ name: new RegExp(name, "i"), ...filter })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);

    // 6. Send drones + totalPage info
    res.status(200).json({
      success: true,
      data: { drones, totalPage },
      message: "Get list of drones successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single drone
droneController.getSingleDrone = async (req, res, next) => {
  try {
    const droneId = req.params.id;
    const drone = await Drone.findById(droneId);
    if (!drone) {
      throw new Error("Drone not found");
    }

    res.status(200).json({
      success: true,
      data: drone,
      message: "Get single drone successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update single drone
droneController.updateSingleDrone = async (req, res, next) => {
  try {
    const findDrone = await Drone.findById(req.params.id);
    if (!findDrone) {
      throw new Error("Drone not found");
    }

    const { name, description, category } = req.body;
    const drone = await Drone.findByIdAndUpdate(
      req.params.id,
      { name, description, category },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: drone,
      message: "Update drone successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete single drone
droneController.deleteSingleDrone = async (req, res, next) => {
  try {
    const drone = await Drone.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: drone,
      message: "Delete drone successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = droneController;
