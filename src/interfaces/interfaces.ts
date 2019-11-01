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

export interface ReadApplication extends Application {
    uid: string;
}

export interface RouteParams {
    appId: string
}

export interface IStop {
    appID: string,
    categoryID: string,
    title: string,
    description: string,
    picture: string,
    videoURL: string,
    place: LatLng
}

export interface ICategory {
    appID: string,
    categoryName: string,
    description: string
}