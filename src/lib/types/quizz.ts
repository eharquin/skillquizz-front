import type {Question} from "$lib/types/answer";

export default interface Quizz {
    id: number,
    skill: string,
    active: boolean,
    questions: Question[],
}