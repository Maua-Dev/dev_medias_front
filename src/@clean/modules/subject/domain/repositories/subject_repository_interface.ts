import { Subject } from "../../../../shared/domain/entities/subject";

export interface ISubjectRepository {
    getSubjects(): Promise<{ [key: string]: Subject }>;
    saveSubject(code: string, subject: Subject): Promise<void>;
    deleteSubject(code: string): Promise<void>;
}