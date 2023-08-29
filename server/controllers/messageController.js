const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to, senderId, receiverId } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt: msg.createdAt,
        senderId: senderId,
        receiverId: receiverId,
      };
    });

    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getLastMessageByUserIds = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.query;

    const message = await Messages.findOne({
      users: {
        $all: [senderId, receiverId],
      },
    }).sort({ updatedAt: -1 });

    if (message) {
      const projectedMessage = {
        senderId: message.sender.toString(),
        receiverId: receiverId,
        fromSelf: message.sender.toString() === senderId,
        message: message.message.text,
        createdAt: message.createdAt,
      };

      res.json(projectedMessage);
    } else {
      res.json({ message: "No message found between the users." });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.getLastMessage = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const uniqueReceiverIds = await Messages.distinct("users", {
      $or: [{ sender: userId }, { receiver: userId }],
    });

    const lastMessages = [];

    for (const receiverId of uniqueReceiverIds) {
      const message = await Messages.findOne({
        users: { $all: [userId, receiverId] },
      }).sort({ updatedAt: -1 });

      if (message) {
        const lastMessage = {
          senderId: message.sender.toString(),
          receiverId: receiverId.toString(),
          fromSelf: message.sender.toString() === userId,
          message: message.message.text,
          createdAt: message.createdAt,
        };

        lastMessages.push(lastMessage);
      }
    }

    const filteredMessages = lastMessages.filter((message) => message.receiverId !== userId);

    if (filteredMessages.length > 0) {
      res.json(filteredMessages);
    } else {
      res.json({ message: "No messages found for the user." });
    }
  } catch (ex) {
    next(ex);
  }
};