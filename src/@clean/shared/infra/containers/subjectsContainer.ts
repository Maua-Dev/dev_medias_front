import { Container } from "inversify";
import "reflect-metadata";
import { CalculateFinalAverageUsecase } from "../../../modules/subject/usecases/calculateFinalAverageUsecase";
import { CleanGeneratedGradesUsecase } from "../../../modules/subject/usecases/cleanGeneratedGradesUsecase";
import { DeleteStudentSubjectUsecase } from "../../../modules/subject/usecases/deleteStudentSubjectUsecase";
import { GetAllSubjectsUsecase } from "../../../modules/subject/usecases/getAllSubjectsUsecase";
import { GetAllSubjectsWithoutStudentSubjectsUsecase } from "../../../modules/subject/usecases/getAllSubjectsWithoutStudentSubjectsUsecase";
import { GetStudentSubjectsUsecase } from "../../../modules/subject/usecases/getStudentSubjectsUsecase";
import { GradeOptimizerUsecase } from "../../../modules/subject/usecases/gradeOptimizerUsecase";
import { SaveStudentSubjectUsecase } from "../../../modules/subject/usecases/saveStudentSubjectUsecase";
import { http } from "../http";
import { GradeOptimizerRepositoryHttp } from "../repositories/gradeOptimizerRepositoryHttp";
import { SubjectRepositoryAsyncStorage } from "../repositories/subjectRepositoryAsyncStorage";
import { SubjectRepositoryMock } from "../repositories/subjectRepositoryMock";

export const Registry = {
    AxiosAdapter: Symbol.for("AxiosAdapter"),

    SubjectRepository: Symbol.for("SubjectRepository"),
    GradeOptimizerRepository: Symbol.for("GradeOptimizerRepository"),

    SaveStudentSubjectUsecase: Symbol.for("SaveStudentSubjectUsecase"),
    GetStudentSubjectsUsecase: Symbol.for("GetStudentSubjectsUsecase"),
    GetAllSubjectsUsecase: Symbol.for("GetAllSubjectsUsecase"),
    GetAllSubjectsWithoutStudentSubjectsUsecase: Symbol.for("GetAllSubjectsWithoutStudentSubjectsUsecase"),
    DeleteStudentSubjectUsecase: Symbol.for("DeleteStudentSubjectUsecase"),
    CalculateFinalAverageUsecase: Symbol.for("CalculateFinalAverageUsecase"),
    GradeOptimizerUsecase: Symbol.for("GradeOptimizerUsecase"),
    CleanGeneratedGradesUsecase: Symbol.for("CleanGeneratedGradesUsecase")

}

export const subjectsContainer = new Container();

// HTTP
subjectsContainer.bind(Registry.AxiosAdapter).toConstantValue(http);

// Repositories
let useAsyncStorage = true;
if (useAsyncStorage) {
    subjectsContainer.bind(Registry.SubjectRepository).to(SubjectRepositoryAsyncStorage).inSingletonScope();
} else {
    subjectsContainer.bind(Registry.SubjectRepository).to(SubjectRepositoryMock).inSingletonScope();
}
subjectsContainer.bind(Registry.GradeOptimizerRepository).toDynamicValue((context) => {
    return new GradeOptimizerRepositoryHttp(context.container.get(Registry.AxiosAdapter));
});

// Usecases
subjectsContainer.bind(Registry.SaveStudentSubjectUsecase).toDynamicValue((context) => {
    return new SaveStudentSubjectUsecase(context.container.get(Registry.SubjectRepository));
})
subjectsContainer.bind(Registry.GetAllSubjectsUsecase).toDynamicValue((context) => {
    return new GetAllSubjectsUsecase(context.container.get(Registry.SubjectRepository));
})
subjectsContainer.bind(Registry.GetAllSubjectsWithoutStudentSubjectsUsecase).toDynamicValue((context) => {
    return new GetAllSubjectsWithoutStudentSubjectsUsecase(context.container.get(Registry.SubjectRepository));
})
subjectsContainer.bind(Registry.GetStudentSubjectsUsecase).toDynamicValue((context) => {
    return new GetStudentSubjectsUsecase(context.container.get(Registry.SubjectRepository));
})
subjectsContainer.bind(Registry.DeleteStudentSubjectUsecase).toDynamicValue((context) => {
    return new DeleteStudentSubjectUsecase(context.container.get(Registry.SubjectRepository));
})
subjectsContainer.bind(Registry.CalculateFinalAverageUsecase).toDynamicValue((context) => {
    return new CalculateFinalAverageUsecase(context.container.get(Registry.SubjectRepository));
})
subjectsContainer.bind(Registry.CleanGeneratedGradesUsecase).toDynamicValue((context) => {
    return new CleanGeneratedGradesUsecase(context.container.get(Registry.SubjectRepository));
})

subjectsContainer.bind(Registry.GradeOptimizerUsecase).toDynamicValue((context) => {
    return new GradeOptimizerUsecase(context.container.get(Registry.GradeOptimizerRepository));
})
