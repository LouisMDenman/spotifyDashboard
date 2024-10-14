import { useSpotifyProfileData } from "../contexts/SpotifyProfileProvider"

export function ProfileHeader() {
    let {profileData} = useSpotifyProfileData()

    if (profileData.id) {
        return <div id="profileHeader">
            <h1>{profileData.display_name}'s Current Top 20 Tracks</h1>
            {profileData.images.length > 0 && (<img id="profileHeaderImage" src={profileData.images[1].url} />)}
        </div>
    }
    else {
        return <div id="profileHeader">
            <p>Please sign in to view profile data.</p>
        </div>
    }
}