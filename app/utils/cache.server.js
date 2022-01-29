import NodeCache from 'node-cache'

let nodeCache;

// copied this code from Remix's Jokes tutorial
// I think it means that the nodeCache is available across different files etc.
// so we're not creating a new cache each time we use it
if (process.env.NODE_ENV === "production") {
  nodeCache = new NodeCache( { stdTTL: 3600, checkperiod: 120 } );
} else {
  if (!global.__nodeCache) {
    global.__nodeCache = new NodeCache( { stdTTL: 3600, checkperiod: 120 } );
  }
  nodeCache = global.__nodeCache;
}

export { nodeCache };