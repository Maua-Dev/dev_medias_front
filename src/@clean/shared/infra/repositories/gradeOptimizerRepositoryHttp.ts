import { IGradeOptmizerRepository } from "../../../modules/subject/domain/repositories/grade_optmizer_repository_interface";
import { Subject } from "../../domain/entities/subject";
import { AxiosError, AxiosInstance } from 'axios';
import { GradeOptimizerModel } from "../models/gradeOptimizerModel";

export class GradeOptimizerRepositoryHttp implements IGradeOptmizerRepository {
    constructor(private http: AxiosInstance) {}

    async optmizeGrades(subject: Subject): Promise<Subject> {
        let subjectData = GradeOptimizerModel.fromSubject(subject)
        let subjectDataJson = subjectData.toJSON()
        return await this.http.post('/', subjectDataJson).then(res => {
            return new Subject({

            });
        }).catch((err: AxiosError) => {
            console.log(err);
            throw err.response?.data;
        });
    }
}