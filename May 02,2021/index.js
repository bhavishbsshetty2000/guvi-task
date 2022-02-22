const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome",
  });
});

const rooms = [];
const customers = [];
const bookedRooms = [];

//end-point to get all the rooms present
app.get("/rooms", (req, res) => {
  try {
    res.json(rooms);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

//1.end-point to create a room
app.post("/create-room", (req, res) => {
  try {
    rooms.push({
      id: rooms.length,
      roomName: `Room : ${rooms.length + 1}`,
      seatsAvailable: Math.floor(Math.random() * 100 + 50),
      pricePerHour: Math.floor(Math.random() * 10000),
      amenities: Math.floor(Math.random() * 10),
      available: true,
      customerName: null,
    });
    res.json({
      message: "Room created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

//2.end-point to book a room
app.post("/book-room/:id", (req, res) => {
  try {
    if (rooms[req.params.id - 1] && rooms[req.params.id - 1].available) {
      rooms[req.params.id - 1].available = false;
      rooms[req.params.id - 1].customerName = req.body.name;

      customers.push({
        customerId: req.body.customerId,
        customerName: req.body.name,
        roomName: rooms[req.params.id - 1].roomName,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      });
      res.json({
        message: "Room booked",
      });
    } else {
      res.json({
        message: "Room not available",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

//3.List of all rooms with Booked data
app.get("/booked-rooms", (req, res) => {
  try {
    for (let room of rooms) {
      if (!room.available) {
        const roomCustomerDetails = customers.find((customer) => {
          return customer.roomName === room.roomName;
        });
        // console.log(roomCustomerDetails, room);
        bookedRooms.push({
          roomName: room.roomName,
          bookedStatus: "Booked",
          customerName: roomCustomerDetails.customerName,
          date: roomCustomerDetails.date,
          startTime: roomCustomerDetails.startTime,
          endTime: roomCustomerDetails.endTime,
        });
      }
    }
    res.json(bookedRooms);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

//4.List of all customers with booked data
app.get("/all-customers", (req, res) => {
  res.json(customers);
});

//get single room
app.get("/get-room/:id", (req, res) => {
  try {
    if (rooms[req.params.id - 1]) {
      res.json(rooms[req.params.id - 1]);
    } else {
      res.json({
        message: "Room not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong",
    });
  }
});

const port = 3030;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
