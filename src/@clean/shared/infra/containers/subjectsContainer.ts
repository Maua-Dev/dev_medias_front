import "reflect-metadata";
import { Container, injectable } from "inversify";
import { SubjectRepositoryMock } from "../repositories/subjectRepositoryMock";
import { SaveSubjectUsecase } from "../../../modules/subject/usecases/saveSubjectUsecase";
import { GetSubjectsUsecase } from "../../../modules/subject/usecases/getSubjectsUsecase";
import { DeleteSubjectUsecase } from "../../../modules/subject/usecases/deleteSubjectUsecase";

export const Registry = {
    SubjectRepositoryMock: Symbol.for("SubjectRepositoryMock"),

    SaveSubjectUsecase: Symbol.for("SaveSubjectUsecase"),
    GetSubjectsUsecase: Symbol.for("GetSubjectsUsecase"),
    DeleteSubjectUsecase: Symbol.for("DeleteSubjectUsecase"),
}

export const subjectsContainer = new Container();

subjectsContainer.bind(Registry.SubjectRepositoryMock).to(SubjectRepositoryMock).inSingletonScope();

subjectsContainer.bind(Registry.SaveSubjectUsecase).to(SaveSubjectUsecase).inSingletonScope();
subjectsContainer.bind(Registry.GetSubjectsUsecase).to(GetSubjectsUsecase).inSingletonScope();
subjectsContainer.bind(Registry.DeleteSubjectUsecase).to(DeleteSubjectUsecase).inSingletonScope();