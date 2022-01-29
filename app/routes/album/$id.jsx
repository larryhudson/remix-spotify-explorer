import { useLoaderData } from "remix";
import { fetchFromSpotify } from "~/utils/spotify.server";

export const loader = async ({params}) => {
    const spotifyData = await fetchFromSpotify({
        url: `albums/${params.id}`,
        params: {
            market: 'AU'
        }
    })

    return spotifyData
}

export const headers = () => {
    return {
        'Cache-Control': 'public, max-age=3600'
    }
}

export default function AlbumPage() {
    const spotifyData = useLoaderData()

    return <div>
        <h1>Album</h1>
        <pre>{JSON.stringify(spotifyData,null,2)}</pre>
    </div>

}