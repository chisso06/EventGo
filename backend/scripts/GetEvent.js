import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

const GetEvent = async (eventId) => {
	console.log("GetEvent");
	const eventRef = doc(db, "events", eventId);
	try {
		const eventDoc = await getDoc(eventRef);
		const event = eventDoc.data();
		return event;
	} catch(err) {
		console.log(err);
	}
}

export default GetEvent;