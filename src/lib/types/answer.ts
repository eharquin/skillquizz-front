export interface Answer {
    id: number;
    text: string;
}

export interface Question {
    id: number;
    text: string;
    answers: Answer[];
    goodAnswer: number;
}