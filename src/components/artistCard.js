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
        color: '#1976d2',
        '&:visited': {
            color: '#1976d2'
        }
    }
})

export default function ArtistCard (props) {
    const classes = useStyles();
    return (
        <Card sx={{ width: 300, margin: '20px auto' }}>
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
        </CardContent>
        <CardActions>
            <Button size="small"><a className={classes.anchorLink} href={props.hrefOne}>{props.buttonOneCopy}</a></Button>
        </CardActions>
        </Card>
    );
}
