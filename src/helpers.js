import axios from 'axios';
import { FSQUARE_CLIENT_ID, FSQUARE_CLIENT_SECRET } from './credentials';

// TODO: Figure out which functions do not need to be exported and remove export
export const DEFAULT_CENTER = { lat: -8.5064764, lng: 115.26023 };
export const DEFAULT_ZOOM = 14;

export function mapBaseURL() {
  return 'https://maps.googleapis.com/maps/api/js?v=3.exp&';
}

export function fsquareBaseURL() {
  return 'https://api.foursquare.com/v2/venues/';
}

// returns client_id=myClientID&client_secret=myClientSecret&v=20180910
export function fsquareAuth() {
  const keys = {
    client_id: FSQUARE_CLIENT_ID,
    client_secret: FSQUARE_CLIENT_SECRET,
    v: 20180910,
  };
  return Object.keys(keys)
    .map(k => `${k}=${keys[k]}`)
    .join('&');
}

// returns the params set for the fsquareSearch function
// i.e near=Ubud&query=food&limit=10
export function fsquareParams(urlParams) {
  return Object.keys(urlParams)
    .map(k => `${k}=${urlParams[k]}`)
    .join('&');
}

// assembles the url for my api call and makes the call with it
// i.e https://api.foursquare.com/v2/venues/search?client_id=myClientID&client_secret=myClientSecret&v=20180910&near=Ubud&query=food&limit=10
export function fsquareGetData(endpoint, urlParams) {
  return axios.get(
    `${fsquareBaseURL()}${endpoint}?${fsquareAuth()}&${fsquareParams(
      urlParams
    )}`
  );
}

// Returns a list of venues near the current location
export function fsquareSearch(urlParams) {
  return fsquareGetData('search', urlParams);
}

// Returns the full details about a specific venue
export function fsquareGetVenueDetails(VENUE_ID) {
  return fsquareGetData(`${VENUE_ID}`);
}

// Returns photos for a specific venue
export function fsquareGetPhotos(VENUE_ID) {
  return fsquareGetData(`${VENUE_ID}/photos`);
}
