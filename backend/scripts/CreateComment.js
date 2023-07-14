import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase.js";

const CreateComment = async (comment) => {
	console.log("CreateComment");
	try {
		const docRef = await addDoc(collection(db, "comments"), comment);
		console.log("Document written with ID: ", docRef.id);
		return docRef.id;
	} catch (err) {
		console.error("Error adding document: ", err);
		return "error";
	};
};

export default CreateComment;