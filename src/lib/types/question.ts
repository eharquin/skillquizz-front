import type {Answer} from "./answer";
import type Version from "./version";

export default interface Question {
    id: number;
    order: number;
    active: boolean;
    text : string;
    version: Version;
    goodAnswer : Answer;

}