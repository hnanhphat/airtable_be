const router = require("express").Router();

const authApi = require("./auth.api");
const calendarApi = require("./calendar.api");
const droneApi = require("./drone.api");
const requesterApi = require("./requester.api");
const sprayerApi = require("./sprayer.api");

router.get("/", function (req, res, next) {
  res.send({ status: "ok", data: "Hello World!" });
});

router.use("/auth", authApi);
router.use("/calendar", calendarApi);
router.use("/drone", droneApi);
router.use("/requester", requesterApi);
router.use("/sprayer", sprayerApi);

module.exports = router;
