import { Subject } from "../../../../shared/domain/entities/subject";

export interface ISubjectRepository {
    getStudentSubjects(): Promise<Subject[]>;
    getAllSubjects(): Promise<Subject[]>;
    saveStudentSubject(code: string, subject: Subject): Promise<void>;
    deleteStudentSubject(code: string): Promise<void>;
}