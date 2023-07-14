import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const EventForm = () => {
    const [event, setEvent] = useState({
        title: '',
        location: '',
        startTime: new Date(),
        endTime: new Date(),
        type: '',
        userId: '',
        userName: '',
        details: '',
        status: 'collecting_comments',
        imageURL: ''
    });
    const navigate = useNavigate();
    const types = [
        { label: '音楽', category: 'music'},
        { label: '映像', category: 'film'},
        { label: 'お祭り', category: 'festival'},
        { label: '食べもの', category: 'food'},
        { label: '展示会', category: 'expo'},
        { label: 'テクノロジー', category: 'tech'},
        { label: 'ビジネス', category: 'business'},
        { label: 'ゲーム', category: 'game'},
        { label: 'スポーツ', category: 'sports'},
        { label: '教育', category: 'education'},
        { label: 'その他', category: 'others'}
    ];

    function handleStartTime (time) {
        setEvent({ ...event, startTime: time.toString() })
    };
    function handleEndTime (time) {
        setEvent({ ...event, endTime: time.toString() })
    };

    const handleChange = (e) => {
		const {name, value} = e.target;
		setEvent({ ...event, [name]: value });
	};

    const handleSubmit = async () => {
        await axios.post("/createEvent", event)
            .then((res) => {
                console.log(res.data.eventId);
                navigate("/event/" + res.data.eventId);
            })
            .catch((err) => { console.log(err); });
    };

    return (
        <div>
            <Typography>下記のイベント情報を入力してください</Typography>
            <Grid sx={{marginTop: 2}}>
                <div>
                    <TextField
                        sx={{width: 350}}
                        id="outlined-textarea"
                        label="イベント名"
                        placeholder="イベント名"
                        multiline
                        size="small"
                        name="title"
                        onChange={handleChange}
                    />
                </div>
                <div>
                <Autocomplete
                    disablePortal
                    loading
                    options={types}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: 350, marginTop: 1 }}
                    renderInput={(params) => <TextField {...params} label="カテゴリー" />}
                    size="small"
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    name="type"
                    onChange={(e, value) => {
                        setEvent({ ...event, type: value?.category })
                    }}
                />
                </div>
                <div>
                    <TextField
                        sx={{width: 350, marginTop: 1}}
                        id="outlined-textarea"
                        label="場所"
                        placeholder="場所"
                        multiline
                        size="small"
                        name="location"
                        onChange={handleChange}
                    />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div>
                        <DateTimePicker
                            label="開始日時"
                            value={event.startTime}
                            onChange={handleStartTime}
                            disablePast
                            renderInput={(params) => <TextField {...params} sx={{width: 350, marginTop: 1}} size="small" />}
                        />
                    </div>
                    <div>
                        <DateTimePicker
                            label="終了日時"
                            value={event.endTime}
                            onChange={handleEndTime}
                            disablePast
                            renderInput={(params) => <TextField {...params} sx={{width: 350, marginTop: 1}} size="small" />}
                        />
                    </div>
                </LocalizationProvider>
                <div>
                    <TextField
                        sx={{width: 350, top: 10}}
                        id="outlined-textarea"
                        label="概要"
                        placeholder="概要"
                        multiline
                        rows={10}
                        size="small"
                        name="details"
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

export default EventForm;