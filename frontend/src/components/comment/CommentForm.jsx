import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

function CommentForm() {
	const {event_id} = useParams();
	const [formData, setFormData] = useState({
		comment: '', nickname: '', userId: '', eventId: event_id});
	// const [comment, setComment] = useState('');
	// const [nickname, setNickname] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		try {
			const docRef = await addDoc(collection(db, 'comments'), formData);
			console.log("Document written with ID: ", docRef.id);
		} catch (err) {
			console.log("Error adding document: ", err);
		}
	};

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='comment'>
						感想を記入してください。みなさんの感想をもとに画像を生成します。<br/>
					</label>
					<input id="comment" name="comment" value={formData.comment} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor='nickname'>
						ニックネーム<br/>
					</label>
					<input id="nickname" name="nickname" value={formData.nickname} onChange={handleChange} />
				</div>
				<div>
					<button type="submit">Send</button>
				</div>
			</form>
		</div>
	)
}

export default CommentForm