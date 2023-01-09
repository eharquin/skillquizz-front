import type Quizz from "./quizz";

export default interface Version {
    id: number;
    quizz: Quizz;
    order: number;

}