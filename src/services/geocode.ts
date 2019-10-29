import { LatLng } from '../interfaces/interfaces'
import { URL_MAP } from '../constants/config'

export const codeAddress = async (value: string) => {
    const { results, status, error_message } = await
        (await fetch(`${URL_MAP}&address=${value}`)).json()
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
        (await fetch(`${URL_MAP}&lat=${value.lat}&lng=${value.lng}`)).json()
    if (status === 'OK') {
        return results[0].formatted_address;
    } else {
        return { message: error_message };
    }
}