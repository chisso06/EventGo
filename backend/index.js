import express from "express";
export { default as GenerateImage } from './scripts/GenerateImage.js';

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
	res.send('Hello World!');
});

app.post("/", function(req, res) {
	try {
		res.json(req.body);
	} catch(error) {
		console.error(error);
	}
});

app.get('/api', (req, res) => {
	res.json({ message: 'This is backend-api' });
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});