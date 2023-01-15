import type Course from "$lib/types/course";

export default interface User {
    id: number,
    type: string,
    email: string,
    name: string,
    company: string,
    phoneNumber: string,
    active: boolean,
    courses: Course[],
}

export interface UserDetails {
    email: string,
    password: string,
}