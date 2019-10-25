import { LatLng } from '../interfaces/interfaces'
import { API_KEY } from '../constants/config'

export const codeAddress = async (value: string) => {
    const { results, status, error_message } = await
        (await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/Geocode/json?key=${API_KEY}&address=${value}`)).json()
    if (status === 'OK') {
        return {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
        }
    } else {
        return { message: error_message };
    }
}

export const codePlace = async (value: LatLng) => {
    const { results, status, error_message } = await
        (await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/Geocode/json?key=${API_KEY}&lat=${value.lat}&lng=${value.lng}`)).json()
    if (status === 'OK') {
        return results[0].formatted_address;
    } else {
        return { message: error_message };
    }
}