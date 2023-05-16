import { Subject } from "../../../../shared/domain/entities/subject";

export interface ISubjectRepository {
    getSubjects(): Promise<Subject[]>;
    saveSubject(subject: Subject): Promise<void>;
    deleteSubject(subject: Subject): Promise<void>;
}