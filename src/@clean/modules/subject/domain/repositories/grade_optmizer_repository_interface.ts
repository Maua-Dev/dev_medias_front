import { Subject } from "../../../../shared/domain/entities/subject";

export interface IGradeOptmizerRepository {
    optmizeGrades(subject: Subject): Promise<Subject>;
}