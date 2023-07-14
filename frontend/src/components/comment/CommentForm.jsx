import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CommentForm = () => {
	const {eventId} = useParams();
	const [comment, setComment] = useState({
		comment: '', nickname: '', userId: '', eventId: eventId});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const {name, value} = e.target;
		setComment({ ...comment, [name]: value });
	};

	const handleSubmit = async () => {
		const commentId = await axios.post("/createComment", comment)
			.then((res) => { return (res.data); })
			.catch((err) => { console.log(err); });
		console.log(commentId);
		navigate("/event/" + eventId);
	};

    return (
        <div>
            <Typography>感想を記入してください。みなさんの感想をもとに画像を生成します。</Typography>
            <Grid sx={{marginTop: 2}}>
                <div>
                    <TextField
                        sx={{width: 350}}
                        id="outlined-textarea"
                        label="感想"
                        placeholder="感想"
                        multiline
                        size="small"
                        name="comment"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        sx={{width: 350, marginTop: 1}}
                        id="outlined-textarea"
                        label="ニックネーム"
                        placeholder="ニックネーム"
                        multiline
                        size="small"
                        name="nickname"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Button
                        sx={{width: 350, top: 20}}
                        variant="contained"
                        onClick={handleSubmit}
                    >作成</Button>
                </div>
            </Grid>
        </div>
    )

};

export default CommentForm