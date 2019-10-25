export interface LatLng {
    lat: number
    lng: number
}

export interface Application {
    userID: any,
    appName: string,
    picture: string,
    color: string,
    description: string,
    selectedPlace: LatLng,
    isCategories: boolean,
    isGPS: boolean
}