import { IGradeOptmizerRepository } from "../../../modules/subject/domain/repositories/grade_optmizer_repository_interface";
import { Subject } from "../../domain/entities/subject";
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { GradeOptimizerModel, GradeOptimizerResponse } from "../models/gradeOptimizerModel";

export class GradeOptimizerRepositoryHttp implements IGradeOptmizerRepository {
    constructor(private http: AxiosInstance) {}

    async optmizeGrades(subject: Subject): Promise<Subject> {
        let subjectData = GradeOptimizerModel.fromSubject(subject)
        let subjectDataJson = subjectData.toJSON()
        return await this.http.post<GradeOptimizerResponse>('/grade-optmizer', subjectDataJson).then((res: AxiosResponse<GradeOptimizerResponse>) => {
            return GradeOptimizerModel.fromResApiGradeOptimizer(res.data, subject);
        }).catch((err: AxiosError) => {
            console.log(err);
            throw err.response?.data;
        });
    }
}