import "reflect-metadata";
import { Container, injectable } from "inversify";
import { SubjectRepositoryMock } from "../repositories/subjectRepositoryMock";
import { SaveStudentSubjectUsecase } from "../../../modules/subject/usecases/saveStudentSubjectUsecase";
import { GetStudentSubjectsUsecase } from "../../../modules/subject/usecases/getStudentSubjectsUsecase";
import { DeleteStudentSubjectUsecase } from "../../../modules/subject/usecases/deleteStudentSubjectUsecase";

export const Registry = {
    SubjectRepositoryMock: Symbol.for("SubjectRepositoryMock"),

    SaveStudentSubjectUsecase: Symbol.for("SaveStudentSubjectUsecase"),
    GetStudentSubjectsUsecase: Symbol.for("GetStudentSubjectsUsecase"),
    DeleteStudentSubjectUsecase: Symbol.for("DeleteStudentSubjectUsecase"),
}

export const subjectsContainer = new Container();

subjectsContainer.bind(Registry.SubjectRepositoryMock).to(SubjectRepositoryMock).inSingletonScope();

subjectsContainer.bind(Registry.SaveStudentSubjectUsecase).to(SaveStudentSubjectUsecase).inSingletonScope();
subjectsContainer.bind(Registry.GetStudentSubjectsUsecase).to(GetStudentSubjectsUsecase).inSingletonScope();
subjectsContainer.bind(Registry.DeleteStudentSubjectUsecase).to(DeleteStudentSubjectUsecase).inSingletonScope();