import { FSQUARE_CLIENT_ID, FSQUARE_CLIENT_SECRET } from './credentials';

export const MAP_BASE_URL = 'https://maps.googleapis.com/maps/api/js?';
export const FSQUARE_REC_BASE_URL =
  'https://api.foursquare.com/v2/venues/explore?';
export const FSQUARE_PHOTO_BASE_URL = 'https://api.foursquare.com/v2/venues/';

export const DEFAULT_CENTER = { lat: -8.5064764, lng: 115.26023 };
export const DEFAULT_ZOOM = 14;

export const FSQUARE_VENUE_PARAMS = {
  client_id: FSQUARE_CLIENT_ID,
  client_secret: FSQUARE_CLIENT_SECRET,
  section: 'food',
  near: 'Ubud',
  limit: 10,
  v: 20180910,
};
export const FSQUARE_PHOTO_PARAMS = {
  client_id: FSQUARE_CLIENT_ID,
  client_secret: FSQUARE_CLIENT_SECRET,
  group: 'venue',
  limit: 1,
  v: 20180910,
};

// src: https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
export function loadMap(url) {
  const ref = window.document.getElementsByTagName('script')[1];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);
}
