import { Subject } from "../../../shared/domain/entities/subject";
import { ISubjectRepository } from "../domain/repositories/subject_repository_interface";

export class CalculateFinalAverageUsecase {
    constructor(private subjectRepository: ISubjectRepository) {}

    async execute(subject: Subject): Promise<void> {
        return await this.subjectRepository.calculateFinalAverage(subject);
    }
}