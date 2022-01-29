import { Form, json, Link, useLoaderData, useTransition } from "remix";
import { fetchFromSpotify } from "~/utils/spotify.server";

export const loader = async ({request}) => {
    const searchParams = Object.fromEntries(new URL(request.url).searchParams)
    const {q} = searchParams

    if (typeof q === 'undefined') return null

    const spotifyData = await fetchFromSpotify({
        url: `search`,
        params: {
            q,
            type: 'artist,album,track'
        }
    })

    json

    return json({...spotifyData, q}, {headers: {
        'Cache-Control': 'public, max-age=3600'
    }})
}

export const headers = () => {
    return {
        'Cache-Control': 'public, max-age=3600'
    }
}

function AlbumsList({albums}) {
    return <table>
    <thead>
        <tr>
            <th>Album</th>
            <th>Artist(s)</th>
        </tr>
    </thead>
    <tbody>
    {albums.map(album => (
        <tr>
            <td>
                <img src={album.images[2].url} alt="" />
                <Link to={`/album/${album.id}`}>{album.name}</Link></td>
            <td>{album.artists.map(artist => (
                <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
            ))}</td>
        </tr>
    ))}
    </tbody>
</table>
}

function ArtistList({artists}) {
    return <table>
    <thead>
        <tr>
            <th>Artist</th>
        </tr>
    </thead>
    <tbody>
    {artists.map(artist => (
        <tr>
            <td>
                {artist.images.length && (
                    <img src={artist.images[2].url} alt="" />
                )}
                <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
            </td>
        </tr>
    ))}
    </tbody>
</table>
}

export default function SearchPage() {
    const spotifyData = useLoaderData()
    const albums = spotifyData?.albums?.items
    const artists = spotifyData?.artists?.items
    const transition = useTransition()
    const isSearching = transition.state === 'submitting'
    const query = spotifyData?.q ?? ''

    return <div>
        <h1>Search</h1>
        <Form>
            <input type="text" name="q" defaultValue={query} />
            <button disabled={isSearching}>{isSearching ? 'Searching...' : 'Search'}</button>
        </Form>
        {albums && (
            <section>
            <h2>Albums</h2>
            <AlbumsList albums={albums} />
            </section>
        )}

        {artists && (
            <section>
            <h2>Artists</h2>
            <ArtistList artists={artists} />
            <pre>{JSON.stringify(artists,null,2)}</pre>
            </section>
        )}
        
    </div>

}