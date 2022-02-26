const Router = require("koa-router");
const router = new Router();
const controller = require("../controller/getData.js");

router.post("/getData", controller.getData);

router.get("/saveData", controller.saveData);

router.get("/getTestData", controller.getTestData);
router.post("/postTestData", controller.postTestData);
router.put("/putTestData", controller.putTestData);
router.del("/delTestData", controller.delTestData);
router.get("/timeoutTestData", controller.timeoutTestData);

module.exports = router;
