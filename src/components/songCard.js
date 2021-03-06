import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    anchorLink: {
        textDecoration: 'none',
        color: '#1DB954',
        '&:visited': {
            color: '#1DB954'
        }
    }
})

export default function SongCard (props) {
    const classes = useStyles();
    return (
        <Card sx={{ width: 300, margin: '20px auto', "@media (max-width: 690px)": {
            width: '250px'
          } }}>
        <CardMedia
            component="img"
            alt={props.alt}
            height="140"
            image={props.img}
        />
        <CardContent>
            <Typography gutterBottom variant="h6" component="div" sx={{ width: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {props.body}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small"><a className={classes.anchorLink} href={props.hrefOne}>{props.buttonOneCopy}</a></Button>
            <Button size="small" sx={{ color: '#1DB954' }} type={props.type} onClick={props.onClick}>{props.buttonTwoCopy}</Button>
        </CardActions>
        </Card>
    );
}
