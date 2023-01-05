import type {Answer} from "$lib/types/answer";
import type Quizz from "$lib/types/quizz";

export default interface Course {
    id: number;
    quizz: Quizz;
    duration: number;
    score: number;
    answers: Answer[];

}