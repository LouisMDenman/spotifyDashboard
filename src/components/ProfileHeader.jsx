import { useSpotifyProfileData } from "../contexts/SpotifyProfileProvider"


export function ProfileHeader() {
    let {profileData} = useSpotifyProfileData()

    if (profileData.id) {
        return <div id="profileHeader">
            <h1>Spotify stats for {profileData.display_name}</h1>
            <img src = {profileData.images.length > 0 && <img src={profileData.images[0].url} />}/>
        </div>
    }
    else {
        return <div id="profileHeader">
            <p>Please sign in to view profile data.</p>
        </div>
    }
}