# Spotify Statistics Dashboard

## App features

- My Profile Data
- My Top Items
- My Currently Playing
- Check if I follow an artist
- App theme (dark/light)

## Context data / global state

- Spotify API Context Provider
    - Async Reducer
        - Endpoints for the data wanted handled within switch statement
        - Save endpoint responses in state

- CSS Theme Context Provider
    - Dark/Light/System
    - No reducer, just simple context state

## Routes

-   `localhost:3000/`
    - homepage
    - Tiles for different stats:
        - Top 5 songs
        - Top 5 Albums
        - Top 5 Artists
        - Currently Listening
        - Most Listened Genre
        - Larger List of Followed Artist
        - Recommended Content
-   `localhost:3000/search/{userId}/`
    - Once MVP is implemented, potential search route for other users data

## Resources

- [Spotify Developer Docs](https://developer.spotify.com/documentation/web-api)