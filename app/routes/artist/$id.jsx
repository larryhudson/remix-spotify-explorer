import { useLoaderData } from "remix";
import { fetchFromSpotify } from "~/utils/spotify.server";

export const loader = async ({params}) => {
    const spotifyData = await fetchFromSpotify({
        url: `artists/${params.id}`,
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
        <h1>Artist</h1>
        <pre>{JSON.stringify(spotifyData,null,2)}</pre>
    </div>

}