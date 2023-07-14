import express from "express";
import CreateComment from "./scripts/CreateComment.js";
import CreateEvent from "./scripts/CreateEvent.js";
import GenerateImage from "./scripts/GenerateImage.js";
import GetCommentList from "./scripts/GetCommentList.js";
import GetEvent from "./scripts/GetEvent.js";
import GetEventList from "./scripts/GetEventList.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// CORS対策
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader(
	  "Access-Control-Allow-Methods",
	  "GET, POST, PUT, PATCH, DELETE, OPTION"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
})

app.get("/", (req, res) => {
	res.send({ message: 'Hello World!' });
});

app.get("/event", async (req, res) => {
	const event = await GetEvent(req.query.eventId);
	console.log(event);
	res.send(event);
})

app.get("/commentList", async (req, res) => {
	const commentList = await GetCommentList(req.query.eventId);
	console.log(commentList);
	res.send(commentList);
})

app.get("/eventList", async (req, res) => {
	const eventList = await GetEventList();
	console.log(eventList);
	res.send(eventList);
})

app.post("/createEvent", async (req, res, next) => {
	try {
		const eventId = await CreateEvent(req.body);
		res.send({eventId: eventId});
	} catch(err) {
		console.error(err);
		next(err);
	}
});

app.post("/createComment", async (req, res, next) => {
	try {
		const commentId = await CreateComment(req.body);
		res.send({commentId: commentId});
	} catch(err) {
		console.error(err);
		next(err);
	}
});

app.post("/generateImage", async (req, res, next) => {
	try {
		const imageURL = await GenerateImage(req.query.eventId);
		res.send({imageURL: imageURL});
	} catch(err) {
		console.error(err);
		next(err);
	}
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});