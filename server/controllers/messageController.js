const messageModel = require("../models/messageModel");

const messageController = async (req, res) => {
  try {
    const { receiver, content } = req.body;

    if (!receiver || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields.",
      });
    }

    const newMessage = new messageModel({
      receiver,
      content,
      messageBy: req.auth._id,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message created successfully",
      newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create a message. Please try again later.",
      error: error.message,
    });
  }
};

const getAllMessagesController = async (req, res) => {
  try {
    const messages = await messageModel.find();
    res.status(200).json({
      success: true,
      message: "All Messages Data",
      messages,
    });
  } catch (error) {
    console.error(`Error getting messages: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

const getUserMessagesController = async (req, res) => {
  try {
    const userId = req.auth._id;
    const { otherUserId } = req.params;

    if (!otherUserId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the other user's ID",
      });
    }

    const userMessages = await messageModel.find({
      $or: [
        { messageBy: userId, receiver: otherUserId },
        { messageBy: otherUserId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      message: "User Messages Data",
      userMessages,
    });
  } catch (error) {
    console.error(`Error getting user messages: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getChatListController = async (req, res) => {
  try {
    const userId = req.auth._id;

    // Fetch distinct users the logged-in user has interacted with
    const interactedUsers = await messageModel.aggregate([
      {
        $match: {
          $or: [
            { messageBy: userId },
            { receiver: userId },
          ],
        },
      },
      {
        $group: {
          _id: null,
          users: { $addToSet: '$messageBy' },
        },
      },
    ]);

    // Get messages for each user in the interactedUsers list
    const chatList = await Promise.all(
      interactedUsers[0]?.users.map(async (otherUserId) => {
        const messages = await messageModel.find({
          $or: [
            { messageBy: userId, receiver: otherUserId },
            { messageBy: otherUserId, receiver: userId },
          ],
        }).sort({ createdAt: -1 }).limit(1); // Limit to the latest message for each user

        return {
          otherUserId,
          latestMessage: messages[0] || null,
        };
      }) || []
    );

    res.status(200).json({
      success: true,
      message: "Chat List Data",
      chatList,
    });
  } catch (error) {
    console.error(`Error getting chat list: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { messageController,getChatListController, getAllMessagesController, getUserMessagesController };
