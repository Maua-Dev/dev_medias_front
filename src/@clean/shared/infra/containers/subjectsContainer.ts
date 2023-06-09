import { Container } from "inversify";
import "reflect-metadata";
import { DeleteStudentSubjectUsecase } from "../../../modules/subject/usecases/deleteStudentSubjectUsecase";
import { GetAllSubjectsUsecase } from "../../../modules/subject/usecases/getAllSubjectsUsecase";
import { GetStudentSubjectsUsecase } from "../../../modules/subject/usecases/getStudentSubjectsUsecase";
import { SaveStudentSubjectUsecase } from "../../../modules/subject/usecases/saveStudentSubjectUsecase";
import { SetStudentSubjectValueUsecase } from "../../../modules/subject/usecases/setStudentSubjectValueUsecase";
import { SubjectRepositoryMock } from "../repositories/subjectRepositoryMock";

export const Registry = {
    SubjectRepositoryMock: Symbol.for("SubjectRepositoryMock"),

    SaveStudentSubjectUsecase: Symbol.for("SaveStudentSubjectUsecase"),
    GetStudentSubjectsUsecase: Symbol.for("GetStudentSubjectsUsecase"),
    GetAllSubjectsUsecase: Symbol.for("GetAllSubjectsUsecase"),
    DeleteStudentSubjectUsecase: Symbol.for("DeleteStudentSubjectUsecase"),
    SetStudentSubjectValueUsecase: Symbol.for("SetStudentSubjectValueUsecase")
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

subjectsContainer.bind(Registry.SetStudentSubjectValueUsecase).toDynamicValue((context) => {
    return new SetStudentSubjectValueUsecase(context.container.get(Registry.SubjectRepositoryMock));
})
