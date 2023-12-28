let PORT = 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const links = require("./model/link");
const hashFunction = require("./model/mhash-func");
const ejs = require("ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const linkDB = "LinkBreak";
mongoose.connect("mongodb://localhost:27017/" + linkDB).then(() => {
  console.log(`Succesfully connected to ${linkDB}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/hero-form", (req, res) => {
  const givenParam = req.body.heroLink;

  const newlink = new links({
    redirectUrl: givenParam,
    uniqueID: hashFunction(givenParam),
  });
  newlink.save();

  const revealFunc = function () {
    links.findOne({ redirectUrl: givenParam }).then((success) => {
      if (success) {
        let file = {
          headingMessage: "URL has been enhanced",
          headingText: `localhost:${PORT}/rdr/${success.uniqueID}`,
          imgID: `https://api.qrserver.com/v1/create-qr-code/?data=${success.redirectUrl}&amp;size=50x50"`,
        };
        return res.render("linkPage", file);
      } else {
        let file = {
          headingMessage: "An Error Occurred",
          headingText: "There is an issue in generating your redirect URL",
        };
        res.render("search404", file);
      }
    });
  };

  setTimeout(revealFunc, 1500);
});

app.get("/rdr/:link", (req, res) => {
  const query = req.params.link;

  links.findOne({ uniqueID: query }).then((isArrayFound) => {
    if (isArrayFound) {
      let redirectUrl = isArrayFound.redirectUrl;
      let printed = redirectUrl.substring(0, 5);

      // Checking if URL begins with https
      if (printed.includes("http")) {
        res.redirect(redirectUrl);
      } else {
        res.redirect(`https://${redirectUrl}`);
      }
    } else {
      let data = {
        headingMessage: "You've submitted a wrong URL",
        headingText:
          "The submitted URL does not match with any queries made to our server. Check your URL closely and try again.",
      };
      res.render("search404", data);
    }
  });
});
app.listen(PORT, console.log(`Server is running on ${PORT}`));
