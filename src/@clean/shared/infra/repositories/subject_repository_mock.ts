import { ISubjectRepository } from "../../../modules/subject/domain/repositories/subject_repository_interface";
import { Subject } from "../../../shared/domain/entities/subject";

export class SubjectRepositoryMock implements ISubjectRepository {
    private subjects: Subject[] = [];

    async getSubjects(): Promise<Subject[]> {
        return this.subjects;
    }

    async saveSubject(subject: Subject): Promise<void> {
        this.subjects.push(subject);
    }

    async deleteSubject(subject: Subject): Promise<void> {
        this.subjects = this.subjects.filter(
            (s: Subject) => s.code !== subject.code
        );
    }
}