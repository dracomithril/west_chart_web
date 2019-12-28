// @flow
import { api } from '../config';

export function refreshAuth(refreshToken: string): Promise<string> {
  return fetch(api.spotify.refreshToken, {
    method: 'POST',
    // mode: 'cors',
    body: JSON.stringify({ refresh_token: refreshToken }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  }).then(response => response.text());
}

/**
 * Returns url to redirect
 * @returns {Promise<* | never>}
 */
export function login(): Promise<string> {
  return fetch(api.spotify.login, {
    credentials: 'include',
    redirect: 'follow',
    accept: 'application/json',
  })
    .then(response => (response.ok
      ? response.text()
      : Promise.reject(new Error(' No url to fallow'))));
}

export function obtainCredentials(): Promise<{access_token: string, refresh_token: string}> {
  return fetch(api.spotify.obtainCredentials, {
    method: 'GET',
    credentials: 'include',
    accept: 'application/json',
  })
    .then((response) => {
      console.info('response ok:', response.ok);
      return response.ok ? response.json() : Promise.reject(new Error(`Error in request ${response.url}`));
    });
}
