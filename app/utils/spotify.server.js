import { nodeCache } from "./cache.server";

async function getToken() {
    if (nodeCache.get('token')) return nodeCache.get('token')

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

    console.log({spotifyResponse})

    const token = spotifyResponse.access_token

    nodeCache.set('token', token)
    return token
}

const SPOTIFY_URL_BASE = `https://api.spotify.com/v1/`

export const fetchFromSpotify = async ({url, params}) => {
    const paramsString = params ? new URLSearchParams(params).toString() : ''
    const spotifyUrl = `${SPOTIFY_URL_BASE}${url}?${paramsString}`

    const accessToken = await getToken()
    console.log('fetching from spotify')
    console.log({spotifyUrl})

    return await fetch(spotifyUrl, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(r => r.json())
}