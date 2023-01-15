export default interface User {
    id: number,
    type: string,
    email: string,
    name: string,
    company: string,
    phoneNumber: string,
    active: boolean,
}

export interface UserDetails {
    email: string,
    password: string,
}