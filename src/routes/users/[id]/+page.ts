import type {PageLoad} from './$types';
import type User from "$lib/types/user";

export interface EditUserData {
  title: string,
  user: User
}

export const load: PageLoad<EditUserData> = async ({params}) => {
  // TODO: fetch the user here
  const user: User = {
    id: parseInt(params.id),
    name: 'Antonin',
    type: 'admin',
    email: 'agu@evertrust.fr',
    company: 'EverTrust',
    phoneNumber: '0631616085'
  }

  return {
    title: 'Utilisateur ' + user.name,
    user: user
  };
}
