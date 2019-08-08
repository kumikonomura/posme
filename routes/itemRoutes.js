const { Item, Tab } = require("../models");
var sign_s3 = require("../s3");

module.exports = app => {
  // app.get("/item", (req, res) => {
  //   Item.find({ where: req.body.tabs })
  //     .then(item => res.json(item))
  //     .catch(e => console.log(e));
  // });

  app.get("/item", (req, res) => {
    Item.find({})
      .populate("tab")
      .then(items => res.json(items))
      .catch(e => console.log(e));
  });

  app.get("/item/:_id", (req, res) => {
    Item.findById(req.params._id)
      .populate("tab")
      .then(item => res.json(item))
      .catch(e => console.log(e));
  });

  // app.post("/item", (req, res) => {
  //   let name = req.body.name;
  //   let desc = req.body.desc;
  //   let price = req.body.price;
  //   let inventory = req.body.inventory;
  //   console.log(name);
  //   console.log(desc);
  //   console.log(price);
  //   console.log(inventory);
  //   Item.create({ name, desc, price, inventory })
  //     .then(response => console.log(response))
  //     .catch(err => console.log(err));
  // });

  // app.post("/item", (req, res) => {
  //   let img = req.body.img;
  //   console.log("this is your handler, aka, controller");
  //   Item.create({ img })
  //     .then(response => console.log(response))
  //     .catch(err => console.log(err));
  // });

  app.post("/item-upload", sign_s3.sign_s3);

  app.post("/item", (req, res) => {
    Item.create(req.body)
      .then(({ _id, tab }) => {
        Tab.updateOne({ _id: tab }, { $push: { items: _id } })
          .then(res.sendStatus(200))
          .catch(e => res.json(e));
      })
      .catch(e => console.log(e));
  });
  app.put("/item/:_id", (req, res) => {
    Item.findByIdAndUpdate({ _id: req.params._id }, { $set: req.body })
      .then(res.sendStatus(200))
      .catch(e => console.log(e));
  });
  app.delete("/item/:_id", (req, res) => {
    Item.findByIdAndDelete(req.params._id)
      .then(res.sendStatus(200))
      .catch(e => console.log(e));
  });
};

// This is the code to upload images into the database
// app.post(‘/api/photo’, function (req, res) {
//     var newItem = new Item();
//     newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//     newItem.img.contentType = ‘image / png’;
//     newItem.save();
// });

// This website explains how to upload photos into the database https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
