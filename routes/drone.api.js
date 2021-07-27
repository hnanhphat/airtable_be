const router = require("express").Router();
const droneController = require("../controllers/drone.controller");

/**
 * @route GET api/drone
 * @description Create new drone
 * @access Public
 */
router.post("/", droneController.createDrone);

/**
 * @route GET api/drone?page=1&limit=10
 * @description Get drone with pagination
 * @access Public
 */
router.get("/", droneController.getListOfDrones);

/**
 * @route GET api/drone/:id
 * @description Get single drone
 * @access Public
 */
router.get("/:id", droneController.getSingleDrone);

/**
 * @route PUT api/drone:id
 * @description Update single drone
 * @access Admin
 */
router.put("/:id", droneController.updateSingleDrone);

/**
 * @route DELETE api/drone/:id
 * @description Delete single drone
 * @access Admin
 */
router.delete("/:id", droneController.deleteSingleDrone);

module.exports = router;
