import RoomModel from "../models/roomModel";
import MessageModel from "../models/messageModel";

export const sendMessageToRoom = async (req, res) => {
  const roomId = req.params.roomId;
  const authorId = req.user.id;
  const { text, type } = req.body;

  if(!roomId || !authorId || !text || !type) {
    return res.status(400).json({ error: "Your request did not include all required fields!"});
  }

  try {
    const room = await RoomModel.findById({ roomId });
    if(!room) {
      return res.status(400).json({ error: "The room informed does not exist!"});
    }
    const newMessage = new MessageModel({authorId, message: text, type });
    if(newMessage) {
      room.messages.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), room.save()]);

    //WebSocket...

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong, try again later!"});
  }

}