interface Answer {
    id: number;
    text: string;
}

interface Question {
    id: number;
    text: string;
    answers: Answer[];
}

export default interface Quizz {
    id: number,
    skill: string,
    active: boolean,
    questions: Question[],
}