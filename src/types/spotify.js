// @flow
export type SpotifyArtist = {
  external_urls: { spotify: string },
  href: string,
  id: string,
  name: string,
  type: string,
  uri: string,
}
export type SpotifyTrack = {
  id: string,
  name: string,
  artists: Array<SpotifyArtist>,
  preview_url: string,
  external_urls: { spotify: string },
}
export type SpotifyUser = {
  id: string,
  access_token: string,
}
