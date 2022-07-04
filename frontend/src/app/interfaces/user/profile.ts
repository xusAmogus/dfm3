import { Image } from "./Image";

export interface Profile {
    images : Array<Image>,
    role?: string,
    info?: string,
    user_id?: number
}
