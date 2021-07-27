const router = require("express").Router();
const calendarController = require("../controllers/calendar.controller");

/**
 * @route GET api/calendar
 * @description Create new calendar
 * @access Public
 */
router.post("/", calendarController.createCalendar);

/**
 * @route GET api/calendar?page=1&limit=10
 * @description Get calendar with pagination
 * @access Public
 */
router.get("/", calendarController.getListOfCalendars);

/**
 * @route GET api/calendar/custom
 * @description Get custom calendar
 * @access Public
 */
router.get("/custom", calendarController.getCustomList);

/**
 * @route DELETE api/calendar/:id
 * @description Delete single calendar
 * @access Admin
 */
router.delete("/:id", calendarController.deleteSingleCalendar);

module.exports = router;
