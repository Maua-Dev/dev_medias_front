import { Container } from "inversify";
import "reflect-metadata";
import { CalculateFinalAverageUsecase } from "../../../modules/subject/usecases/calculateFinalAverageUsecase";
import { DeleteStudentSubjectUsecase } from "../../../modules/subject/usecases/deleteStudentSubjectUsecase";
import { GetAllSubjectsUsecase } from "../../../modules/subject/usecases/getAllSubjectsUsecase";
import { GetAllSubjectsWithoutStudentSubjectsUsecase } from "../../../modules/subject/usecases/getAllSubjectsWithoutStudentSubjectsUsecase";
import { GradeOptimizerUsecase } from "../../../modules/subject/usecases/gradeOptimizerUsecase";
import { GradeOptimizerRepositoryHttp } from "../repositories/gradeOptimizerRepositoryHttp";
import { GetStudentSubjectsUsecase } from "../../../modules/subject/usecases/getStudentSubjectsUsecase";
import { SaveStudentSubjectUsecase } from "../../../modules/subject/usecases/saveStudentSubjectUsecase";
import { SubjectRepositoryAsyncStorage } from "../repositories/subjectRepositoryAsyncStorage";
import { SubjectRepositoryMock } from "../repositories/subjectRepositoryMock";

export const Registry = {
    SubjectRepository: Symbol.for("SubjectRepository"),
    GradeOptimizerRepository: Symbol.for("GradeOptimizerRepository"),

    SaveStudentSubjectUsecase: Symbol.for("SaveStudentSubjectUsecase"),
    GetStudentSubjectsUsecase: Symbol.for("GetStudentSubjectsUsecase"),
    GetAllSubjectsUsecase: Symbol.for("GetAllSubjectsUsecase"),
    GetAllSubjectsWithoutStudentSubjectsUsecase: Symbol.for("GetAllSubjectsWithoutStudentSubjectsUsecase"),
    DeleteStudentSubjectUsecase: Symbol.for("DeleteStudentSubjectUsecase"),
    CalculateFinalAverageUsecase: Symbol.for("CalculateFinalAverageUsecase"),
    GradeOptimizerUsecase: Symbol.for("GradeOptimizerUsecase"),
}

export const subjectsContainer = new Container();

// Repositories
let useAsyncStorage = true;
if (useAsyncStorage) {
    subjectsContainer.bind(Registry.SubjectRepository).to(SubjectRepositoryAsyncStorage).inSingletonScope();
} else {
    subjectsContainer.bind(Registry.SubjectRepository).to(SubjectRepositoryMock).inSingletonScope();
}
subjectsContainer.bind(Registry.GradeOptimizerRepository).to(GradeOptimizerRepositoryHttp).inSingletonScope();

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

subjectsContainer.bind(Registry.GradeOptimizerUsecase).toDynamicValue((context) => {
    return new GradeOptimizerUsecase(context.container.get(Registry.SubjectRepository));
})
