import { Profile } from "./user/profile";

export interface User {
    id: number,
    name: string,
    email:string,
    password: string,
    token:string,
    profile: Profile  
}
