import { LatLng } from '../interfaces/interfaces'

export const config = {
    apiKey: "AIzaSyAhzO1ZNgEF2Kt287qOjbEFi1cjcTDLh7M",
    authDomain: "test-project-8ff73.firebaseapp.com",
    databaseURL: "https://test-project-8ff73.firebaseio.com",
    projectId: "test-project-8ff73",
    storageBucket: "test-project-8ff73.appspot.com",
    messagingSenderId: "102358788103",
    appId: "1:102358788103:web:05f4c3745797b492dd22a2"
}

export const API_KEY = 'AIzaSyAOaxRNcyr2A29H3Y8mS1YWQRDdEeRrycI'

export const GEOCODE_URL_MAP = (ll: LatLng) => `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&latlng=${ll.lat},${ll.lng}`

export const AUTOCOMPLETE_URL_MAP = (input: string) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${input}`

export const ADDRESS_BY_ID = (id: string) => `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&place_id=${id}`
