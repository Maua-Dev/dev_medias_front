import { Grade } from "./grade";

export type SubjectProps = {
    name: string;
    code: string;
    period: string;
    examWeight: number;
    assignmentWeight: number;
    exams: Grade[];
    assignments: Grade[];
}

export class Subject {
    constructor (private props: SubjectProps) {
        this.props.name = props.name;
        this.props.code = props.code;
        this.props.period = props.period;
        this.props.examWeight = props.examWeight;
        this.props.assignmentWeight = props.assignmentWeight;
        this.props.exams = props.exams;
        this.props.assignments = props.assignments;
    }

    get name(): string {
        return this.props.name;
    }
    set name(name: string) {
        this.props.name = name;
    }  
    get code(): string {
        return this.props.code;
    }
    set code(code: string) {
        this.props.code = code;
    }
}