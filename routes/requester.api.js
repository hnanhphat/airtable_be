const router = require("express").Router();
const authMiddleware = require("../middlewares/authentication");
const requesterController = require("../controllers/requester.controller");

/**
 * @route POST api/requester
 * @description Create new requester
 * @access Public
 */
router.post("/", requesterController.createRequester);

/**
 * @route GET api/requester?page=1&limit=10
 * @description Get list of requesters with pagination
 * @access Public
 */
router.get("/", requesterController.getListOfRequesters);

/**
 * @route GET api/requester/me
 * @description Get current requester info
 * @access Login required
 */
router.get(
  "/me",
  authMiddleware.loginRequired,
  requesterController.getCurrentRequester
);

/**
 * @route GET api/requester/:id
 * @description Get single requester info
 * @access Public
 */
router.get("/:id", requesterController.getSingleRequester);

/**
 * @route PUT api/requester/me
 * @description Update current requester profile
 * @access Login required
 */
router.put(
  "/me",
  authMiddleware.loginRequired,
  requesterController.updateCurrentRequester
);

/**
 * @route PUT api/requester:id
 * @description Update single requester profile
 * @access Admin
 */
router.put("/:id", requesterController.updateSingleRequester);

module.exports = router;
