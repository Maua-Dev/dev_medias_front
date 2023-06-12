import { Subject } from "../../../shared/domain/entities/subject";
import { IGradeOptmizerRepository } from "../domain/repositories/grade_optmizer_repository_interface";

export class GradeOptimizerUsecase {
    constructor(private repo: IGradeOptmizerRepository) {}

    async execute(subject: Subject): Promise<Subject> {
        return await this.repo.optmizeGrades(subject);
    }
}