const express = require("express");
const router = express.Router();
const Message = require("./models/message");

//

router.post("/test", async (req, res) => {
  let id = req.body.id;

  Message.findOne({ id: id }).then((docs) => {
    if (docs) {
      let lastDate = docs.date;

      Message.find({ date: { $gte: new Date(lastDate) } }).then(
        (newMessages) => {
          let newMessagesItem = newMessages[newMessages.length - 1];
          if (newMessagesItem.id == req.body.id) {
            this.notify;
            res.send("No new messages");
          } else {
            res.send(newMessages);
          }
        }
      );
    } else {
      res.send("error");
    }
  });
});

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const message = new Message({
    name: req.body.name,
    text: req.body.text,
    id: req.body.id,
    image: req.body.image,
  });

  try {
    const newMessage = await message.save();
    setTimeout(() => {
      res.status(201).json(newMessage);
    }, 1000);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
