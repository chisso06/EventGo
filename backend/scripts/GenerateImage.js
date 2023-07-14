const GenerateImage = (commentList, event) => {
	const {event_id} = useParams();

	// const getCommentList = async () => {
	//   const commentsRef = query(collection(db, "comments"), where("eventId", "==", event_id));
	// 	try {
	// 		const data = await getDocs(commentsRef);
	// 		const filteredData = data.docs.map((doc) => ({
	// 			...doc.data(),
	// 		}));
	// 		setCommentList(filteredData);
	// 	} catch (err) {
	// 		console.error(err)
	// 	}
	// };
  
	// const baseURL = "https://api-free.deepl.com/v2/translate";
	// const headers = {
	// 	Authorization: "DeepL-Auth-Key " + APIKEY
	// };
	// const parameter = {
	// 	text: "Hello%2C%20world!",
	// 	target_lang: "JA"
	// };

	// commentList.map((obj) => {
	// 	console.log(parameter.body + ' ' + obj.comment);
	// 	if ((parameter.body + ' ' + obj.comment).length > 51200) {
	// 		return ;
	// 	} else {
	// 		parameter.body += ' ' + obj.comment;
	// 	}
	// });

	// var keywords = "";

	// axios.post(baseURL, parameter, { headers: headers })
	// 	.then((res) => {
	// 		// res.data.keywords.map((keyObj) => {
	// 		// 	const keyword = Object.keys(keyObj)[0];
	// 		// 	if (keywords + ',' + keyword > 1000) {
	// 		// 		return ;
	// 		// 	} else {
	// 		// 		keywords += ',' + keyword;
	// 		// 	}
	// 		// });
	// 		console.log(res);
	// 	})
	// 	.catch(err => {
	// 		console.log("err:", err.response.data);
	// 	});

	console.log("GenerateImage");
	// console.log(event.title);
	return ("");
}

export default GenerateImage;