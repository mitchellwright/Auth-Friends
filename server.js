const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const app = express();
const token =
  "esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ";

let nextId = 7;

let friends = [
  {
    id: 1,
    name: "Rachel Green",
    age: 30,
    email: "rachel@friends.com",
    photoUrl:
      "https://vignette.wikia.nocookie.net/friends/images/d/d8/Rachel-Season-2.png/revision/latest?cb=20180127171825",
  },
  {
    id: 2,
    name: "Joey Tribbiani",
    age: 34,
    email: "joey@friends.com",
    photoUrl:
      "https://vignette.wikia.nocookie.net/friends/images/7/77/Holden_McGroin.jpg/revision/latest?cb=20200712200359",
  },
  {
    id: 3,
    name: "Chandler Bing",
    age: 32,
    email: "chandler@friends.com",
    photoUrl:
      "https://vignette.wikia.nocookie.net/friends/images/9/99/Season_2_chandler.png/revision/latest?cb=20200326151017",
  },
  {
    id: 4,
    name: "Ross Geller",
    age: 32,
    email: "ross@friends.com",
    photoUrl:
      "https://vignette.wikia.nocookie.net/friends/images/f/fc/Ross-Season-3.png/revision/latest?cb=20180123220853",
  },
  {
    id: 5,
    name: "Monica Bing",
    age: 31,
    email: "monica@friends.com",
    photoUrl:
      "https://vignette.wikia.nocookie.net/friends/images/f/f6/1675c88baf466d3aa35435018dc4ead1.jpg/revision/latest/scale-to-width-down/220?cb=20200114220119",
  },
  {
    id: 6,
    name: "Phoebe Buffay-Hannigan",
    age: 30,
    email: "phoebe@friends.com",
    photoUrl:
      "https://vignette.wikia.nocookie.net/friends/images/e/e8/Phoebe_Buffay_1.jpg/revision/latest/scale-to-width-down/200?cb=20160529170821",
  },
];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "lambda" && password === "school") {
    req.loggedIn = true;
    res.status(200).json({
      payload: token,
    });
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

app.get("/api/friends", authenticator, (req, res) => {
  setTimeout(() => {
    res.send(friends);
  }, 1000);
});

app.get("/api/friends/:id", authenticator, (req, res) => {
  const friend = friends.find((f) => f.id == req.params.id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).send({ msg: "Friend not found" });
  }
});

app.post("/api/friends", authenticator, (req, res) => {
  const friend = { id: getNextId(), ...req.body };

  friends = [...friends, friend];

  res.send(friends);
});

app.put("/api/friends/:id", authenticator, (req, res) => {
  const { id } = req.params;

  const friendIndex = friends.findIndex((f) => f.id == id);

  if (friendIndex > -1) {
    const friend = { ...friends[friendIndex], ...req.body };

    friends = [
      ...friends.slice(0, friendIndex),
      friend,
      ...friends.slice(friendIndex + 1),
    ];
    res.send(friends);
  } else {
    res.status(404).send({ msg: "Friend not found" });
  }
});

app.delete("/api/friends/:id", authenticator, (req, res) => {
  const { id } = req.params;

  friends = friends.filter((f) => f.id !== Number(id));

  res.send(friends);
});

function getNextId() {
  return nextId++;
}

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
