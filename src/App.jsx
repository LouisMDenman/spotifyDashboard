import './App.css'
import { useThemeContext } from './contexts/ThemeContextProvider'
import { useSpotifyAuthContext } from './contexts/spotifyAuthProvider'

function App() {
  const [currentTheme, toggleTheme, setToSystem] = useThemeContext()
  const {redirectToAuthCodeFlow} = useSpotifyAuthContext() 

  return (
    <>
      <button onClick = {toggleTheme}>
        Toggle Theme
      </button> 
      <button onClick={setToSystem}>
        Set to system theme
      </button>
      <button onClick={redirectToAuthCodeFlow}>
        Sign in via Spotify
      </button>
    </>
  )
}

export default App
