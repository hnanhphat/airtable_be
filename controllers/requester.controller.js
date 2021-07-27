const Requester = require("../models/Requester");
const bcrypt = require("bcrypt");

const requesterController = {};

// Create new requester
requesterController.createRequester = async (req, res, next) => {
  try {
    const { avatar, firstname, lastname, email, password } = req.body;

    let requester = await Requester.findOne({ email });
    console.log(requester);
    if (requester) {
      throw new Error("Requester already exists!");
    }

    // Encode password first
    const salt = await bcrypt.genSalt(10);
    const encodedPassword = await bcrypt.hash(password, salt);

    requester = new Requester({
      avatar,
      firstname,
      lastname,
      email,
      password: encodedPassword,
    });
    await requester.save();

    res.status(200).json({
      success: true,
      data: { requester },
      message: "Create new requester successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get list of requesters with pagination
requesterController.getListOfRequesters = async (req, res, next) => {
  try {
    // 1. Read the query information
    let { page, limit, sortBy, email, ...filter } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // 2. Get total requesters number
    const totalRequester = await Requester.countDocuments({
      email: new RegExp(email, "i"),
      ...filter,
    });

    // 3. Calculate total page number
    const totalPage = Math.ceil(totalRequester / limit);

    // 4. Calculate how many data you will skip (offset)
    const offset = (page - 1) * limit;

    // 5. Get requesters based on query info
    const requesters = await Requester.find({
      email: new RegExp(email, "i"),
      ...filter,
    })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);

    // 6. Send requesters + totalPage info
    res.status(200).json({
      success: true,
      data: { requesters, totalPage },
      message: "Get list of requesters successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get current requester
requesterController.getCurrentRequester = async (req, res, next) => {
  try {
    const requesterId = req.requesterId;
    const requester = await Requester.findById(requesterId);
    if (!requester) {
      throw new Error("Requester not found");
    }

    res.status(200).json({
      success: true,
      data: requester,
      message: "Get current requester successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single requester
requesterController.getSingleRequester = async (req, res, next) => {
  try {
    const requesterId = req.params.id;
    const requester = await Requester.findById(requesterId);
    if (!requester) {
      throw new Error("Requester not found");
    }

    res.status(200).json({
      success: true,
      data: requester,
      message: "Get single requester successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update current requester
requesterController.updateCurrentRequester = async (req, res, next) => {
  try {
    const requesterId = req.requesterId;
    const findRequester = await Requester.findById(requesterId);
    if (!findRequester) {
      throw new Error("Requester not found");
    }

    const { avatar, firstname, lastname } = req.body;
    const requester = await Requester.findByIdAndUpdate(
      requesterId,
      { avatar, firstname, lastname },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: requester,
      message: "Update requester profile successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update single requester
requesterController.updateSingleRequester = async (req, res, next) => {
  try {
    const findRequester = await Requester.findById(req.params.id);
    if (!findRequester) {
      throw new Error("Requester not found");
    }

    const { avatar, firstname, lastname } = req.body;
    const requester = await Requester.findByIdAndUpdate(
      req.params.id,
      { avatar, firstname, lastname },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: requester,
      message: "Update requester profile successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = requesterController;
