import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/styles';
import SongCard from "./components/songCard";
import ArtistCard from "./components/artistCard";
import DefaultImg from "./assets/unnamed.png";

export default function Profile() {
  const [user, setUser] = useState("");
  const [artistOrTrack, setArtistOrTrack] = useState("");
  const [artists, setArtists] = useState();
  const [tracks, setTracks] = useState();
  const [userPlaylist, setUserPlaylist] = useState();
  const [playlist, setPlaylist] = useState(() => {
    const localPlaylist = localStorage.getItem("Playlist");

    if (localPlaylist) {
      return JSON.parse(localPlaylist);
    }

    return [];
  });

  const token = window.location.hash.replace("#" + "access_token=", "");

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
    }

    getUserName();
  }, []);

  useEffect(() => {
    localStorage.setItem("Playlist", JSON.stringify(playlist));
  });

  function handleSearch(e) {
    setUserPlaylist(undefined);
    e.preventDefault();
    async function searchInput() {
      const response = await api.get(
        `/search?q=${artistOrTrack}&type=track,artist`
      );
      setArtists(response.data.artists.items);
      setTracks(response.data.tracks.items);
      setArtistOrTrack("");
    }
    searchInput();
  }

  function handlePlaylist(data) {
    const playlistInfo = {
      data: {
        image: data.album.images[0].url,
        name: data.name,
        href: data.external_urls.spotify,
        contribuitors: data.artists.map((artist) => artist),
      },
    };

    setPlaylist([...playlist, playlistInfo]);
  }

  function showPlaylist() {
    setTracks(undefined);
    setArtists(undefined);
    const myPlaylist = JSON.parse(localStorage.getItem("Playlist"));
    setUserPlaylist(myPlaylist);
  }

  const useStyles = makeStyles({
    inputButton: {
        border: 0,
        borderRadius: '0px 10px 10px 0px',
        backgroundColor: '#1DB954',
        color: '#fff',
        padding: '10px 30px',
        width: '100px',
        "@media (max-width: 690px)": {
          borderRadius: '10px',
          marginTop: '30px'
        }
    },
    input: {
        width: '300px',
        padding: '10px 30px',
        border: 0,
        borderRadius: '10px 0 0 10px',
        "@media (max-width: 690px)": {
          borderRadius: '10px',
        }
    },
    playlistButton: {
      border: 0,
      borderRadius: '10px',
      backgroundColor: '#1DB954',
      color: '#fff',
      padding: '10px 30px',
      width: '100px',
    },
    margins: {
      marginTop: '30px',
      marginBottom: '30px'
    }
  });

  const classes = useStyles();

  return (
    <>
      <header className="header">
        <h1>Olá, {user}</h1>
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
      </header>

      <main className="main-content">
        {artists !== undefined &&
          artists.map((artist) => {
            return (
              <ArtistCard
                title={artist.name}
                img={artist.images[0]?.url ? artist.images[0].url : DefaultImg}
                alt={artist.name}
                hrefOne={artist.external_urls.spotify}
                buttonOneCopy="Ir para o artista"
              />
            );
          })}

        {tracks !== undefined &&
          tracks.map((track) => {
            return (
              <SongCard
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

        {userPlaylist !== undefined &&
          userPlaylist.map((item) => {
            return (
              <SongCard
                title={item.data.name}
                alt={item.data.name}
                img={item.data.image}
                body={item.data.contribuitors[0].name}
                hrefOne={item.data.href}
                buttonOneCopy="Tocar música"
              />
            );
          })}
      </main>
    </>
  );
}
