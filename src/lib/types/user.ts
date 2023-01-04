export default interface User {
    id: number,
    type: string,
    email: string,
    name: string,
    company: string,
    phoneNumber: string,
}

export interface UserDetails {
    email: string,
    password: string,
}