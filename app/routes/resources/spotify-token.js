import { json } from "remix"

export const loader = async ({request}) => {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env
    const authString = Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
    const spotifyResponse = await fetch(
        'https://accounts.spotify.com/api/token',
        {
            headers: {
                'Authorization': `Basic ${authString}`,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: new URLSearchParams({ grant_type: 'client_credentials' })
        }
    ).then(r => r.json())
    return json(spotifyResponse, {
        headers: {
            'Cache-Control': 'max-age=3600'
        }
    })
}