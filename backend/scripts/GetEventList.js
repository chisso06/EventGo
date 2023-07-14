import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase.js";

const GetEventList = async () => {
	console.log("GetEventList");
	const eventsRef = query(collection(db, "events"));
	try {
		const data = await getDocs(eventsRef);
		const eventList = data.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return eventList;
	} catch (err) {
		console.error(err)
	}
};

export default GetEventList;