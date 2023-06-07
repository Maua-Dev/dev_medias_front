import "reflect-metadata";
import { Container } from "inversify";
import { SubjectRepositoryMock } from "../repositories/subjectRepositoryMock";
import { SubjectRepositoryAsyncStorage } from "../repositories/subjectRepositoryAsyncStorage";
import { SaveStudentSubjectUsecase } from "../../../modules/subject/usecases/saveStudentSubjectUsecase";
import { GetStudentSubjectsUsecase } from "../../../modules/subject/usecases/getStudentSubjectsUsecase";
import { GetAllSubjectsUsecase } from "../../../modules/subject/usecases/getAllSubjectsUsecase";
import { DeleteStudentSubjectUsecase } from "../../../modules/subject/usecases/deleteStudentSubjectUsecase";
import { CalculateFinalAverageUsecase } from "../../../modules/subject/usecases/calculateFinalAverageUsecase";
import { GetAllSubjectsWithoutStudentSubjectsUsecase } from "../../../modules/subject/usecases/getAllSubjectsWithoutStudentSubjectsUsecase";

export const Registry = {
    SubjectRepository: Symbol.for("SubjectRepository"),

    SaveStudentSubjectUsecase: Symbol.for("SaveStudentSubjectUsecase"),
    GetStudentSubjectsUsecase: Symbol.for("GetStudentSubjectsUsecase"),
    GetAllSubjectsUsecase: Symbol.for("GetAllSubjectsUsecase"),
    GetAllSubjectsWithoutStudentSubjectsUsecase: Symbol.for("GetAllSubjectsWithoutStudentSubjectsUsecase"),
    DeleteStudentSubjectUsecase: Symbol.for("DeleteStudentSubjectUsecase"),
    CalculateFinalAverageUsecase: Symbol.for("CalculateFinalAverageUsecase"),
}

export const subjectsContainer = new Container();

let useAsyncStorage = false;
if(useAsyncStorage) {
    subjectsContainer.bind(Registry.SubjectRepository).to(SubjectRepositoryAsyncStorage).inSingletonScope();
}else{
    subjectsContainer.bind(Registry.SubjectRepository).to(SubjectRepositoryMock).inSingletonScope();
}

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