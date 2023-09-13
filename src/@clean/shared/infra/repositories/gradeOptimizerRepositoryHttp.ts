import 'reflect-metadata';
import {IGradeOptmizerRepository} from '../../../modules/subject/domain/repositories/grade_optmizer_repository_interface';
import {Subject} from '../../domain/entities/subject';
import {decorate, injectable} from 'inversify';
import {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {
  GradeOptimizerModel,
  GradeOptimizerResponse,
} from '../models/gradeOptimizerModel';

export class GradeOptimizerRepositoryHttp implements IGradeOptmizerRepository {
  constructor(private http: AxiosInstance) {}

  async optmizeGrades(subject: Subject): Promise<Subject> {
    let subjectData = GradeOptimizerModel.fromSubject(subject);
    let subjectDataJson = subjectData.toJSON();
    try {
      return await this.http
        .post<GradeOptimizerResponse>('/grade-optmizer', subjectDataJson)
        .then((res: AxiosResponse<GradeOptimizerResponse>) => {
          return GradeOptimizerModel.fromResApiGradeOptimizer(
            res.data,
            subject,
          );
        });
    } catch (err) {
      let error = err as AxiosError;
      if (error.response) {
        throw error.response!.data;
      } else {
        throw new Error('Erro ao otimizar notas');
      }
    }
  }
}

decorate(injectable(), GradeOptimizerRepositoryHttp);
