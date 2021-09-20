import "./app.css";
import { React } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from "./button";
import Logo from "./assets/spotify-logo.svg";

const useStyles = makeStyles({
    container: {
        border: 0,
        color: 'white',
        padding: '0 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%'
    },
    primary: {  
        textDecoration: 'none',
        color: '#fff',
        fontFamily: '"Roboto", sans-serif'
    },
    resetButton: {
        border: 0,
        margin: '30px auto',
        borderRadius: '10px',
        backgroundColor: '#1DB954',
        color: '#fff',
        padding: '10px 30px',
        width: '30%',
        "@media (max-width: 560px)": {
            width: '90%'
        }
    },
    imgSetting: {
        margin: '0 auto',
        width: '30%',
        "@media (max-width: 560px)": {
            width: '90%'
        }
    }
  });

function Home () {
      const classes = useStyles();
        return (
            <>
            <div className={classes.container}>
                <img src={Logo} alt="spotify logo" className={classes.imgSetting} />
                <Button kind={classes.resetButton}><a className={classes.primary} href="http://localhost:8888/login">Entrar com sua conta Spotify</a></Button>
            </div>
            </>
        );
}

export default Home;