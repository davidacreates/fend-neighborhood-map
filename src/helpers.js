export const MAP_BASE_URL = 'https://maps.googleapis.com/maps/api/js?';

// src: https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
export function loadMap(url) {
  const ref = window.document.getElementsByTagName('script')[1];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);
}
