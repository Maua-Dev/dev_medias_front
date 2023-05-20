import { ISubjectRepository } from "../../../modules/subject/domain/repositories/subject_repository_interface";
import { Subject } from "../../../shared/domain/entities/subject";

export class SubjectRepositoryMock implements ISubjectRepository {
    private subjects: { [key: string]: Subject } = {};

    async getSubjects(): Promise<{ [key: string]: Subject }> {
        return this.subjects;
    }

    async saveSubject(code: string, subject: Subject): Promise<void> {
        this.subjects[code] = subject;
    }

    async deleteSubject(code: string): Promise<void> {
        delete this.subjects[code]
    }
}