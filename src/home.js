import "./app.css";
import { React, useState } from 'react';
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
        fontFamily: '"Roboto", sans-serif',
        width: '30%',
        margin: '0 auto'
    },
    resetButton: {
        border: 0,
        margin: '30px auto',
        borderRadius: '10px',
        backgroundColor: '#1DB954',
        color: '#fff',
        padding: '10px 30px',
        width: '100%',
        animation: '$test 3s forwards',
        cursor: 'pointer',
        "@media (max-width: 560px)": {
            width: '90%'
        }
    },
    imgSetting: {
        margin: '0 auto',
        animation: '$test 2s forwards',
        width: '30%',
        "@media (max-width: 560px)": {
            width: '90%'
        }
    },
    loading: {
        height: '100px',
        display: 'flex',
        justifyContent: 'center'
    },
    loadingDots: {
        width: '20px',
        backgroundColor: '#1DB954',
        height: '20px',
        borderRadius: '50%'
    },
    dotOne: {
        animation: '$dotone 1s infinite'
    },
    dotTwo: {
        animation: '$dottwo 2s infinite'
    },
    dotThree: {
        animation: '$dotthree 3s infinite'
    },
    "@keyframes dotone": {
        "0%": {
            opacity: 1,
        },
        "100%": {
            opacity: 0,
        }
    },
    "@keyframes dottwo": {
        "0%": {
            opacity: 1,
        },
        "100%": {
            opacity: 0,
        }
    },
    "@keyframes dotthree": {
        "0%": {
            opacity: 1,
        },
        "100%": {
            opacity: 0,
        }
    },
    "@keyframes test": {
        "0%": {
            opacity: 0,
            transform: 'translateY(-10px)'
        },
        "100%": {
            opacity: 1,
            transform: 'translateY(10px)'
        }
    }

});

function Home () {
         const [isLoading, setIsLoading] = useState(false);

         function handleLoader() {
             setIsLoading(true)
         }

      const classes = useStyles();
        return (
            <>
            <div className={classes.container}>
                <img src={Logo} alt="spotify logo" className={classes.imgSetting} />
                <a className={classes.primary} href="https://carmelitapp.herokuapp.com/login" onClick={handleLoader}><Button kind={classes.resetButton}>Entrar com sua conta Spotify</Button></a>
                {isLoading && <div className={classes.loading}>
                    <div className={`${classes.loadingDots} ${classes.dotOne}`}/>
                    <div className={`${classes.loadingDots} ${classes.dotTwo}`}/>
                    <div className={`${classes.loadingDots} ${classes.dotThree}`}/>
                </div>}
            </div>
            </>
        );
}

export default Home;