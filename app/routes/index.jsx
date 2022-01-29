import { Form, useTransition } from "remix";

export default function Index() {
  const transition = useTransition()
  const isSearching = transition.state === 'submitting'
  return (
    <div>
      <h1>remix-spotify-explorer</h1>
      <p>A basic Remix app to play around with CDN caching.</p>
      <p>If you're viewing this on the 'fastly.com' domain, and you go to a page that someone else has gone to, it will be super quick!</p>
      <h2>
        Search
      </h2>
      <Form action="/search">
            <input type="text" name="q" />
            <button disabled={isSearching}>{isSearching ? 'Searching...' : 'Search'}</button>
        </Form>
    </div>
  );
}
