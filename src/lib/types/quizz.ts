import type {Question} from "$lib/types/answer";
import type {Skill} from "$lib/types/skill";

export default interface Quizz {
    id: number,
    skill: Skill,
    active: boolean,
    questions: Question[],
}