import { Subject } from "../../../shared/domain/entities/subject";
import { ISubjectRepository } from "../domain/repositories/subject_repository_interface";

export class DeleteSubjectUsecase {
    constructor(private subjectRepository: ISubjectRepository) {}

    async execute(code: string): Promise<void> {
        return await this.subjectRepository.deleteStudentSubject(code);
    }
}