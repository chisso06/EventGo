import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from "../../config/firebase";


function EventDetail() {
	const {event_id} = useParams();
	const [commentList, setCommentList] = useState([]);
	const [event, setEvent] = useState([]);

	const getEvent = async() => {
		const eventRef = doc(db, "events", event_id);
		const eventDoc = await getDoc(eventRef);
		if (eventDoc.exists) {
			console.log(eventDoc.data());
			setEvent(eventDoc.data());
		} else {
			console.log("No such document!");
		}
	}

	const getCommentList = async () => {
		const commentsRef = query(collection(db, "comments"), where("eventId", "==", event_id));
		try {
			const data = await getDocs(commentsRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
			}));
			setCommentList(filteredData);
		} catch (err) {
			console.error(err)
		}
	};

	useEffect(() => {
		getEvent();
		// setEvent(myEvent);
		getCommentList();
	}, []);

	return (
		<div>
			<h1>{event.title}</h1>
			<img src={event.NFTImageURL} alt="nft image"/>
			<p>{event.details}</p>
			<br />
			<br />
			<div>
				<h2>みんなの感想</h2>
				{commentList.map((comment, index) => {
					return (
						<div key={index}>
							<br />
							<p>ニックネーム：{comment.nickname}</p>
							<p>{comment.comment}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default EventDetail;