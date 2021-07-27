const router = require("express").Router();
const sprayerController = require("../controllers/sprayer.controller");

/**
 * @route GET api/sprayer
 * @description Create new sprayer
 * @access Public
 */
router.post("/", sprayerController.createSprayer);

/**
 * @route GET api/sprayer?page=1&limit=10
 * @description Get sprayer with pagination
 * @access Public
 */
router.get("/", sprayerController.getListOfSprayers);

/**
 * @route GET api/sprayer/:id
 * @description Get single sprayer
 * @access Public
 */
router.get("/:id", sprayerController.getSingleSprayer);

/**
 * @route PUT api/sprayer:id
 * @description Update single sprayer
 * @access Admin
 */
router.put("/:id", sprayerController.updateSingleSprayer);

/**
 * @route DELETE api/sprayer/:id
 * @description Delete single sprayer
 * @access Admin
 */
router.delete("/:id", sprayerController.deleteSingleSprayer);

module.exports = router;
