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
    target: number;
}

export class Subject {
    constructor(private props: SubjectProps) {
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
    get average(): number {
        return this.props.average;
    }
    set average(average: number) {
        this.props.average = average;
    }
    get exams(): Grade[] {
        return this.props.exams;
    }
    get assignments(): Grade[] {
        return this.props.assignments;
    }
    get examWeight(): number {
        return this.props.examWeight;
    }
    get assignmentWeight(): number {
        return this.props.assignmentWeight;
    }
    get period(): string {
        return this.props.period;
    }
    get target(): number {
        return this.props.target;
    }

    static fromDataJson(data: Record<string, any>): Subject[] {
        const subjects: Subject[] = [];

        for (const subjectCode in data) {
            if (Object.prototype.hasOwnProperty.call(data, subjectCode)) {
<<<<<<< HEAD
            const { name, code, period, examWeight, assignmentWeight, exams, assignments } = data[subjectCode];
            const subjectProps: SubjectProps = {
                target: 6,
                name,
                code,
                period,
                average: 0,
                examWeight,
                assignmentWeight,
                exams: exams.map((exam: any) => new Grade({ name: exam.name, value: -1, weight: exam.weight })),
                assignments: assignments.map((assignment: any) => new Grade({ name: assignment.name, value: 8, weight: assignment.weight })),
            };
            const subject = new Subject(subjectProps);
            subjects.push(subject);
=======
                const { name, code, period, examWeight, assignmentWeight, exams, assignments } = data[subjectCode];
                const subjectProps: SubjectProps = {
                    name,
                    code,
                    period,
                    average: 0,
                    examWeight,
                    assignmentWeight,
                    exams: exams.map((exam: any) => new Grade({ name: exam.name, value: -1, weight: exam.weight })),
                    assignments: assignments.map((assignment: any) => new Grade({ name: assignment.name, value: -1, weight: assignment.weight })),
                };
                const subject = new Subject(subjectProps);
                subjects.push(subject);
>>>>>>> 4687f0b8c644746ca415ad428fd9e7c0e87764d7
            }
        }

        return subjects;
    }
}
