import { createContext, useContext, useEffect, useState } from "react"

const clientId = "206a4d126d7e4e479b3c031c8b4bfbba"

export const spotifyAuthScaffold = {
    access_token: "",
    token_type: "",
    expires_in: "",
    refresh_token: "",
    scope: ""
}

export const SpotifyAuthContext = createContext(spotifyAuthScaffold)

export function useSpotifyAuthcontext(){
    return useContext(SpotifyAuthContext)
}

export function SpotifyAuthProvider({children}){
    let [userAuthCode, setUserAuthCode] = useState("")
    let [userAuthData, setUserAuthData] = useState(spotifyAuthScaffold)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get("code")

        setUserAuthCode(code)
    }, [])

    useEffect(() => {
        async function getAuthData(){
            const authData = await getAuthTokens(clientId, userAuthCode)
            setUserAuthData(authData)
            window.history.replace(null, "Spotify Dashboard", "/")
        }
        if (userAuthCode) {
            getAuthData()
        }
    }, [userAuthCode])

    async function getAuthTokens(clientId, code){
        const verifier = localStorage.getItem("verifier")

        const params = new URLSearchParams()
        params.append("client_id", clientId)
        params.append("grant_type", "authorization_code")
        params.append("code", code)
        params.append("redirect_uri", "http://localhost:5173/spotifycallback")
        params.append("code_verifier", verifier)

        const result = await fetch("https://accounts.spotify.com/api/token", {
            metho: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        })

        const authTokens = await result.json()
        return authTokens
    }

    async function redirectToAuthCodeFlow(clientId) {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);
    
        localStorage.setItem("verifier", verifier);
    
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "http://localhost:5173/spotifycallback");
        params.append("scope", "user-read-private user-read-email");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);
    
        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }
    
    function generateCodeVerifier(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    
    async function generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    return (
        <SpotifyAuthContext.Provider value={userAuthData}>
            {children}
        </SpotifyAuthContext.Provider>
    )
}