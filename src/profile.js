import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/styles';
import SongCard from "./components/songCard";
import ArtistCard from "./components/artistCard";
import DefaultImg from "./assets/unnamed.png";

export default function Profile() {
  const [user, setUser] = useState("");
  const [userImg, setUserImg] = useState("");
  const [artistOrTrack, setArtistOrTrack] = useState("");
  const [artists, setArtists] = useState();
  const [tempArtists, setTempArtists] = useState();
  const [tracks, setTracks] = useState();
  const [tempTracks, setTempTracks] = useState();
  const [userPlaylist, setUserPlaylist] = useState();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isArtistBtnActive, setIsArtistBtnActive] = useState(false);
  const [isTrackBtnActive, setIsTrackBtnActive] = useState(false);
  const [isBothBtnActive, setIsBothBtnActive] = useState(false);
  const [playlist, setPlaylist] = useState(() => {
    const localPlaylist = localStorage.getItem("Playlist");

    if (localPlaylist) {
      console.log("local playlist", localPlaylist)
      return JSON.parse(localPlaylist);
    }

    return [];
  });

  const token = window.location.hash.replace(`#access_token=`, "");

  const api = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    async function getUserName() {
      const response = await api.get(`/me`);
      setUser(response.data.display_name);
      setUserImg(response.data.images[0]?.url ? response.data.images[0].url : DefaultImg);
    }

    getUserName();
  }, []);

  useEffect(() => {
    localStorage.setItem("Playlist", JSON.stringify(playlist));
    console.log("use effect")
  });

  console.log(playlist)

  function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    try {
      async function searchInput() {
        const response = await api.get(
          `/search?q=${artistOrTrack}&type=track,artist`
        );
        setArtists(response.data.artists.items);
        setTracks(response.data.tracks.items);
        setTempArtists(response.data.artists.items);
        setTempTracks(response.data.tracks.items);
        setArtistOrTrack("");
      }
      setUserPlaylist(undefined);
      searchInput();
    } catch (error) {
      console.error(error)
    } finally {
      setArtists();
      setTracks();
      setLoading(false);
      setToggle(true);
      setIsBothBtnActive(true);
    }
  }


  function handlePlaylist(data) {
    const playlistInfo = {
      data: {
        image: data.album.images[0].url,
        name: data.name,
        href: data.external_urls.spotify,
        contribuitors: data.artists.map((artist) => artist),
        id: data.id
      },
    };

    setPlaylist([...playlist, playlistInfo]);
  }

  function showPlaylist() {
    setTracks(undefined);
    setArtists(undefined);
    // const myPlaylist = JSON.parse(localStorage.getItem("Playlist"));
    // console.log("myplaylist", myPlaylist)
    setUserPlaylist(playlist);
    setToggle(false);
  }

  function showArtistsOnly() {
    setTracks(undefined)
    setArtists(tempArtists)
    setIsArtistBtnActive(true)
    setIsTrackBtnActive(false)
    setIsBothBtnActive(false)
  }

  function showTracksOnly() {
    setArtists(undefined)
    setTracks(tempTracks)
    setIsArtistBtnActive(false)
    setIsTrackBtnActive(true)
    setIsBothBtnActive(false)
  }

  function showBoth() {
    setArtists(tempArtists)
    setTracks(tempTracks)
    setIsArtistBtnActive(false)
    setIsTrackBtnActive(false)
    setIsBothBtnActive(true)
  }

  function handleDelete(id) {
    setPlaylist((prevState) => prevState.filter((song) => song.data.id !== id))
    localStorage.setItem("Playlist", JSON.stringify(playlist));
    console.log("playlsit handle", playlist)
  }

  const useStyles = makeStyles({
    inputButton: {
        border: 0,
        borderRadius: '0px 10px 10px 0px',
        backgroundColor: '#1DB954',
        color: '#fff',
        padding: '10px 30px',
        width: '100px',
        cursor: 'pointer',
        transition: '0.3s ease-in-out',
        "@media (max-width: 690px)": {
          borderRadius: '10px',
          marginTop: '30px'
        },
        "&:hover": {
          backgroundColor: "#19803d"
        }
    },
    input: {
        width: '300px',
        padding: '10px 30px',
        border: 0,
        borderRadius: '10px 0 0 10px',
        "@media (max-width: 690px)": {
          borderRadius: '10px',
          width: '150px'
        }
    },
    playlistButton: {
      border: 0,
      borderRadius: '10px',
      backgroundColor: '#1DB954',
      color: '#fff',
      padding: '10px 30px',
      width: '100px',
      cursor: 'pointer',
      transition: '0.3s ease-in-out',
      "&:hover": {
        backgroundColor: "#19803d"
      }
    },
    toggleContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      "@media (max-width: 560px)": {
        flexDirection: 'column',
        alignItems: 'center'
      }
    },
    filterH3: {
      alignSelf: 'center'
    },
    toggleButtons: {
      border: 0,
      borderRadius: '10px',
      backgroundColor: '#1DB954',
      color: '#fff',
      padding: '10px 30px',
      width: '100px',
      cursor: 'pointer',
      transition: '0.3s ease-in-out',
      margin: '10px',
      "&:hover": {
        backgroundColor: "#19803d"
      }
    },
    activeToggleButtons: {
      border: 0,
      borderRadius: '10px',
      backgroundColor: '#19803d',
      color: '#fff',
      padding: '10px 30px',
      width: '100px',
      cursor: 'pointer',
      margin: '10px'
    },
    margins: {
      marginTop: '30px',
      marginBottom: '30px'
    },
    main: {
        margin: '0 auto',
        width: '90%'
    },
    highlight: {
      color: '#1DB954'
    },
    img: {
      borderRadius: '50%',
      height: '100px',
      marginLeft: '20px'

    },
    userContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

  const classes = useStyles();

  return (
    <>
      <header className="header">
        <div className={classes.userContainer}>
          <h1>Olá, {user}</h1>
          <img src={userImg} alt={user} className={classes.img}/>
        </div>
        <h2 className={classes.margins}>Faça sua busca:</h2>
        <form onSubmit={handleSearch}>
          <p>
            <input
              value={artistOrTrack}
              required
              onChange={(e) => setArtistOrTrack(e.target.value)}
              className={classes.input}
            />
          </p>
          <p>
            <button className={classes.inputButton} type="submit">
              Buscar
            </button>
          </p>
        </form>
        <h2 className={classes.margins}>Veja sua playlist:</h2>
        <button type="button" className={classes.playlistButton} onClick={showPlaylist}>
          Ver playlist
        </button>
        <h2>{loading ? "carregandle" : ""}</h2>
      </header>

      
      
      {toggle === true && 
        <div className={classes.toggleContainer}>
        <h3 className={classes.filterH3}>Filtrar por:</h3>
        <button type="button" onClick={showArtistsOnly} className={isArtistBtnActive ? classes.activeToggleButtons : classes.toggleButtons}>Artista</button>
        <button type="button" onClick={showTracksOnly} className={isTrackBtnActive ? classes.activeToggleButtons : classes.toggleButtons}>Música</button>
        <button type="button" onClick={showBoth} className={isBothBtnActive ? classes.activeToggleButtons : classes.toggleButtons}>Ambos</button>
      </div>}

      <main className={classes.main}>
        {artists !== undefined &&
         <> <h2><span className={classes.highlight}>///</span>Artistas</h2>
          <section className="artists-section">
            {artists.map((artist) => {
              return (
              <ArtistCard
                key={artist.id}
                title={artist.name}
                img={artist.images[0]?.url ? artist.images[0].url : DefaultImg}
                alt={artist.name}
                hrefOne={artist.external_urls.spotify}
                buttonOneCopy="Ir para o artista"
              />
            );
          })}
          </section>
          </>
        }

           {tracks !== undefined &&
          <> <h2><span className={classes.highlight}>///</span>Músicas</h2>
           <section className="tracks-section">
              
            {tracks.map((track) => {
            return (
              <SongCard
                key={track.id}
                title={track.name}
                alt={track.album.name}
                img={track.album.images[0].url}
                body={track.artists[0].name}
                hrefOne={track.external_urls.spotify}
                buttonOneCopy="Tocar música"
                buttonTwoCopy="Add a playlist"
                type="submit"
                onClick={() => handlePlaylist(track)}
              />
            );
          })}
          </section>
          </>
          }

        {userPlaylist !== undefined &&
        <><h2><span className={classes.highlight}>///</span>Minha playlist</h2>
          <section className="playlist-section">
            {userPlaylist.map((item) => {
            return (
              <SongCard
                key={item.data.id}
                title={item.data.name}
                alt={item.data.name}
                img={item.data.image}
                body={item.data.contribuitors[0].name}
                hrefOne={item.data.href}
                buttonOneCopy="Tocar música"
                buttonTwoCopy="Deletar música"
                onClick={() => handleDelete(item.data.id)}
                type="button"
              />
            );
          })}
            </section>
            </>}
      </main>
    </>
  );
}
