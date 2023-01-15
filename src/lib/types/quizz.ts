import type {Question} from "$lib/types/answer";
import type {Skill} from "$lib/types/skill";

export default interface Skill {
    id: number;
    subject: string;
}

export default interface Quizz {
    id: number,
    skill: Skill,
    active: boolean,
    questions: Question[],
    avgScore: number,
    bestScore: number,
    worstScore: number,
}