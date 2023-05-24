import { Grade } from "./grade";

export type SubjectProps = {
    name: string;
    code: string;
    period: string;
    average: number;
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

    static fromDataJson(dataJson: string): Subject[]{
        const data = JSON.parse(dataJson);
        const subjects: Subject[] = [];

        for (const subjectCode in data) {
            if (Object.prototype.hasOwnProperty.call(data, subjectCode)) {
            const { name, code, period, examWeight, assignmentWeight, exams, assignments } = data[subjectCode];
            const subjectProps: SubjectProps = {
                name,
                code,
                period,
                average: 0, // Não é fornecido no arquivo JSON, então iniciamos em 0.
                examWeight,
                assignmentWeight,
                exams: exams.map((exam: any) => new Grade({ name: exam.name, value: 0, weight: exam.weight })),
                assignments: assignments.map((assignment: any) => new Grade({ name: assignment.name, value: 0, weight: assignment.weight })),
            };
            const subject = new Subject(subjectProps);
            subjects.push(subject);
            }
        }

        return subjects;
    }
}