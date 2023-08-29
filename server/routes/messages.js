const { addMessage, getMessages, getLastMessageByUserIds, getLastMessage } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get("/", getLastMessageByUserIds);
router.get("/getmsg/:id", getLastMessage);

module.exports = router;
