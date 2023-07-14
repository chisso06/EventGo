import { Card, CardActions, CardContent, CardMedia, Grid, Grow, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const EventCard = ({event}) => {
    return(
        <Grid item minWidth={210} sx={{marginRight: 2, marginBottom: 2}}>
            <Paper elevation={2}>
                <div>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="event photo"
                            height="200"
                            image={event.imageURL}
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h5' sx={{fontWeight: 'bold'}}>{event.title}</Typography>
                            <Typography variant='subtitle2'>{event.location}</Typography>
                            <Typography id="modal-modal-title" variant='subtitle2'>
                                {new Date(event.startTime).toLocaleDateString('ja-JP')}
                                ~{new Date(event.endTime).toLocaleDateString('ja-JP')}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to={"/event/" + event.id}>詳細を確認</Link>
                        </CardActions>
                    </Card>
                </div>
            </Paper>
        </Grid>
    )
}


const EventCards = ({eventList}) => {
    return (
    <div>
        <Grow in>
            <Grid container justify="center" alignItems='flex-start' spacing={1} >{
                eventList.map((event, i) => {
                    return (<div key={i}><EventCard event={event} /></div>);
            })}
            </Grid>
        </Grow>
    </div>
    )
};

export default EventCards;