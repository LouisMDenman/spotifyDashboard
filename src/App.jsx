import './App.css'
import './styles/ProfileHeader.css'
import './styles/TopTracks.css'
import { useThemeContext } from './contexts/ThemeContextProvider'
import { useSpotifyAuthContext } from './contexts/spotifyAuthProvider'
import { ProfileHeader } from './components/ProfileHeader'
import { TopTracks } from './components/TopTracks'

function App() {
  const [currentTheme, toggleTheme, setToSystem] = useThemeContext()
  const {redirectToAuthCodeFlow} = useSpotifyAuthContext() 

  return (
    <>
    <ProfileHeader />
    <TopTracks />
    <div id="buttons">
      <button onClick = {toggleTheme}>
        Toggle Theme
      </button>
      <button onClick={redirectToAuthCodeFlow}>
        Sign in via Spotify
      </button>
      <button onClick={setToSystem}>
        Set to system theme
      </button>
    </div>
    </>
  )
}

export default App
