import RoomModel from "../models/roomModel.js"

export  const createRoom = async (req, res) => {
  const roomCreator = req.user.id;
  const { roomName } = req.body;

  if(!roomName || !roomCreator) {
    return res.status(400).json({ error: "Your request did not include all required fields!"});
  }

  try {
    const newRoom = await RoomModel.create({ roomName, users: [roomCreator] });
    if(!newRoom) {
      return res.status(500).json({ error: "Something went wrong, try again later!"});
    }

    return res.status(200).json({ newRoom });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong, try again later!"});
  }
}

export const getRoom = async (req, res) => {
  const roomId = req.params.id;
  if(!roomId) return res.status(400).json({ error: "Your request did not include all required fields!"});

  try {
    const room = await RoomModel.findById(roomId).populate("users").populate("messages");
    if(!room) return res.status(400).json({ error: "Your request did not include a valid room id!"});

    const formattedRoom = { roomName: room.roomName, messages: room.messages, users: room.users.map(user => {
      return { 
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        orgType: user.orgType
      }
    })};

    return res.status(200).json({ room: formattedRoom });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong, try again later!"});
  }
}

export const getRooms = async(req, res) => {
  try {
    const rooms = await RoomModel.find().select("-messages").sort({ _id: -1 });
    if(!rooms) return res.status(500).json({ message: "An internal error had occurred. Please, try later!" });

    res.status(200).json({rooms});
  } catch (error) {
    return res.status(500).json({ message: "An internal error had occurred. Please, try later!" });
  }
}

export const deleteRoom = async (req, res) => {
  
}
