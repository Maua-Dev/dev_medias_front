import "reflect-metadata";
import { Container } from "inversify";
import { SubjectRepositoryMock } from "../repositories/subjectRepositoryMock";
import { SaveStudentSubjectUsecase } from "../../../modules/subject/usecases/saveStudentSubjectUsecase";
import { GetStudentSubjectsUsecase } from "../../../modules/subject/usecases/getStudentSubjectsUsecase";
import { GetAllSubjectsUsecase } from "../../../modules/subject/usecases/getAllSubjectsUsecase";
import { DeleteStudentSubjectUsecase } from "../../../modules/subject/usecases/deleteStudentSubjectUsecase";
import { CalculateFinalAverageUsecase } from "../../../modules/subject/usecases/calculateFinalAverageUsecase";

export const Registry = {
    SubjectRepositoryMock: Symbol.for("SubjectRepositoryMock"),

    SaveStudentSubjectUsecase: Symbol.for("SaveStudentSubjectUsecase"),
    GetStudentSubjectsUsecase: Symbol.for("GetStudentSubjectsUsecase"),
    GetAllSubjectsUsecase: Symbol.for("GetAllSubjectsUsecase"),
    DeleteStudentSubjectUsecase: Symbol.for("DeleteStudentSubjectUsecase"),
    CalculateFinalAverageUsecase: Symbol.for("CalculateFinalAverageUsecase"),
}

export const subjectsContainer = new Container();

subjectsContainer.bind(Registry.SubjectRepositoryMock).to(SubjectRepositoryMock).inSingletonScope();

subjectsContainer.bind(Registry.SaveStudentSubjectUsecase).toDynamicValue((context) => {
    return new SaveStudentSubjectUsecase(context.container.get(Registry.SubjectRepositoryMock));
})
subjectsContainer.bind(Registry.GetAllSubjectsUsecase).toDynamicValue((context) => {
    return new GetAllSubjectsUsecase(context.container.get(Registry.SubjectRepositoryMock));
})
subjectsContainer.bind(Registry.GetStudentSubjectsUsecase).toDynamicValue((context) => {
    return new GetStudentSubjectsUsecase(context.container.get(Registry.SubjectRepositoryMock));
})
subjectsContainer.bind(Registry.DeleteStudentSubjectUsecase).toDynamicValue((context) => {
    return new DeleteStudentSubjectUsecase(context.container.get(Registry.SubjectRepositoryMock));
})
subjectsContainer.bind(Registry.CalculateFinalAverageUsecase).toDynamicValue((context) => {
    return new CalculateFinalAverageUsecase(context.container.get(Registry.SubjectRepositoryMock));
})