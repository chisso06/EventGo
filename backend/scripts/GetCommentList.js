import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase.js";

const GetCommentList = async (eventId) => {
	console.log("GetCommentList");
	const commentsRef = query(collection(db, "comments"), where("eventId", "==", eventId));
	try {
		const data = await getDocs(commentsRef);
		const commentList = data.docs.map((doc) => ({
			...doc.data(),
		}));
		return commentList;
	} catch (err) {
		console.error(err)
	}
};

export default GetCommentList;