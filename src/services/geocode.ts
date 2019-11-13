import { LatLng, IAddress } from '../interfaces/interfaces'
import { GEOCODE_URL_MAP, AUTOCOMPLETE_URL_MAP, ADDRESS_BY_ID } from '../constants/config'

export const getLocationById = async (id: string) => {
    try {
        const { results, status, error_message } = await (await fetch(ADDRESS_BY_ID(id))).json()
        if (status === 'OK' && results.length > 0) {
            return {
                location: results[0].formatted_address,
                pos: results[0].geometry.location
            } as IAddress
        } else {
            return { message: error_message }
        }
    } catch (e) {
        console.log(e);
        return { message: e }
    }
}

export const codeAddress = async (value: string) => {
    const url = AUTOCOMPLETE_URL_MAP(value)
    console.log('url', url)
    try {
        const { predictions, status, error_message } = await
            (await fetch(url)).json()
        if (status === 'OK') {
            return predictions.map((v: any) => (
                getLocationById(v.place_id)
            )) as IAddress[]
        } else {
            return { message: error_message };
        }
    } catch (e) {
        console.log(e);
        return { message: e }
    }
}

export const codePlace = async (value: LatLng) => {
    const url = GEOCODE_URL_MAP(value)
    console.log('url', url)
    try {
        const { results, status, error_message } = await
            (await fetch(url)).json()
        if (status === 'OK' && results.length > 0) {
            return results[0].formatted_address;
        } else {
            return { message: error_message };
        }
    } catch (e) {
        console.log(e);
        return { message: e }
    }
}