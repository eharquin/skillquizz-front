import type {PageLoad} from './$types';
import {env} from "$env/dynamic/public";
import type Quizz from "$lib/types/quizz";

export const load: PageLoad<Quizz> = async ({params}) => {
  const quizz: Quizz = await fetch(env.PUBLIC_BASE_URL + `/quizz/${params.id}`).then(r => r.json());
  return quizz;
}
