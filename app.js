//jslint esversion:6
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const port = 3000;

//works on both Heroku and Localhost
// when developing locally, I used port = 3000
// when delpying to Heroku, you need to use the port Heroku assigns dynamically

app.use(express.static("public"));


app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port " + port);
});



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res) {

  const fN = req.body.firstName;
  const lN = req.body.lastName;
  const email = req.body.email;
  console.log(fN, lN, email);

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fN,
        LNAME: lN
      }
    }]
  };


  const jsonData = JSON.stringify(data);


  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      //      res.send("<h1>Thank you for signing up, " + fN + " " + lN + "</h1>");
      res.sendFile(__dirname + "/success.html");

    } else {
      //      res.send("something went really bad! try again later");
      res.sendFile(__dirname + "/failure.html");

    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

  //  res.send;

});



app.post("/failure", function(req, res) {
  res.redirect("/")
})



// curl --request POST \
// --url 'https://usX.api.mailchimp.com/3.0/lists' \
// --user 'anystring:apikey' \
// --header 'content-type: application/json' \
// --data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \
// --include


// Make a new folder called Newsletter-Signup on your Desktop
// Change Directory to this new folder
// Inside the ewsletter-Signup folder, create four new files
//         Enter::: touch signup.html success.html failure.html app.js     // creates 2 files
// Set up a new NPM package
//         // 1.  on Hyper, run::: npm init
// Using NPM install the express module
//        // 2. On Hyper: run::: npm install express
//             // or npm i express
//        // 2A. Also, install ::: npm i body-parser
//        // 2B. Also, install ::: npm i request
// Open the project folder in Atom
// Run server with nodemon
//      //  3. On Hyper: run::: nodemon app.js


// 1. Install Heroku package to mac
//      check npm --version; node --version; git --version
// 2. Run::  git init
// 3. Run:: git add .
// 4. Run:: git commit -m "first commit"
// 5. Run:: heroku create
//   created a brand new server: https://murmuring-beyond-95386.herokuapp.com/
   // container --> https://git.heroku.com/murmuring-beyond-95386.git
// immense-mesa-17179
// https://immense-mesa-17179.herokuapp.com/ |
//   https://git.heroku.com/immense-mesa-17179.git
//Creating app... done, ⬢ desolate-reef-23469
//https://desolate-reef-23469.herokuapp.com/ | https://git.heroku.com/desolate-reef-23469.git
// 6. Run:: git push heroku master
//
