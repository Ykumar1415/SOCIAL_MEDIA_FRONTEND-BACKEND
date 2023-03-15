const sgMail = require("@sendgrid/mail");
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
router.post("/register", async (req, res, next) => {
  try {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);

    const user = await new User({
      name: req.body.username || "hek",
      password: hashedpassword,
      email: req.body.email,
      // profilePicture: req.body.profilePicture,
    });
    try {
      await user.save();
      var transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "YORG153@outlook.com",
          pass: "987654321aA@",
        },
      });
      var mailOptions = {
        from: '"SocialMe" <YORG153@outlook.com>', // sender address
        to: "yogeshsaini1415@gmail.com", // list of receivers
        subject: "Success!",
        template: "You are successfully Signed up", // the name of the template file i.e email.handlebars
        // text: "Thank you for registering with us. We are glad to have you on board.",
        html: "<b>Thank you for registering with us. We are glad to have you on board.</b>",
        context: {
          name: "Adebola", // replace {{name}} with Adebola
          company: "My Company", // replace {{company}} with My Company
        },
      };

      // trigger the sending of the E-mail
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: " + info.response);
        res.status(200).json(user._id);
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const flag = true;

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("Email is not found");
      flag = false;
    }
    const passauthenticate = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passauthenticate) {
      return res.status(404).send("password not matched");
      flag = false;
    }
    if (flag) {
    //  localStorage.setItem("user", user.email);
      return res.status(200).json(user._id);

    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
