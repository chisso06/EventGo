import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase.js";

const CreateEvent = async (event) => {
	console.log("CreateEvent");
	try {
		const docRef = await addDoc(collection(db, "events"), event);
		console.log("Document written with ID: ", docRef.id);
		return docRef.id;
	} catch (err) {
		console.error("Error adding document: ", err);
	};
};

export default CreateEvent;