import { Subject } from "../../../shared/domain/entities/subject";
import { ISubjectRepository } from "../domain/repositories/subject_repository_interface";

export class GetSubjectsUsecase {
    constructor(private subjectRepository: ISubjectRepository) {}

    async execute(): Promise<{ [key: string]: Subject }> {
        return await this.subjectRepository.getSubjects();
    }
}