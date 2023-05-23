import { Subject } from "../../../shared/domain/entities/subject";
import { ISubjectRepository } from "../domain/repositories/subject_repository_interface";

export class GetAllSubjectsUsecase {
    constructor(private subjectRepository: ISubjectRepository) {}

    async execute(): Promise<Subject[]> {
        return await this.subjectRepository.getAllSubjects();
    }
}