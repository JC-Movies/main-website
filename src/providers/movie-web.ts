import {
  buildProviders,
  makeSimpleProxyFetcher,
  makeStandardFetcher,
  targets,
} from "@movie-web/providers";
// import fetch from 'node-fetch';
// this is how the library will make http requests
// const CORS_PROXY = process.env.NEXT_PUBLIC_BASEURL + "/api/proxy?";
const CORS_PROXY = process.env.NEXT_PUBLIC_BASEURL + "/api/proxy?";

// const fetcher = makeSimpleProxyFetcher(CORS_PROXY, fetch);
const myFetcher = makeStandardFetcher(fetch);
const proxyFetcher = makeSimpleProxyFetcher(CORS_PROXY, fetch);
// make an instance of the providers library
const providers = buildProviders()
  .setProxiedFetcher(proxyFetcher)
  .setFetcher(myFetcher)
  .addBuiltinProviders()
  .setTarget(targets.BROWSER)
  .build();

export default providers;
