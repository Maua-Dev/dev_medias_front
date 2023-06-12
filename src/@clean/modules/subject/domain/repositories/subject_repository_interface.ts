import { Subject } from "../../../../shared/domain/entities/subject";

export interface ISubjectRepository {
    getStudentSubjects(): Promise<Subject[]>;
    getAllSubjects(): Promise<Subject[]>;
    getAllSubjectsWithoutStudentSubjects(): Promise<Subject[]>;
    saveStudentSubject(code: string, subject: Subject): Promise<void>;
    deleteStudentSubject(code: string): Promise<void>;
    setStudentSubjectValue(isExam: boolean, code: string, name: string, value: number): Promise<void>;
    calculateFinalAverage(subject: Subject): Promise<void>;
}
