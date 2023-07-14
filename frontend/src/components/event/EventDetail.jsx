const EventDetail = ({ event, commentList }) => {
	console.log("EventDetail");
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
};

export default EventDetail;