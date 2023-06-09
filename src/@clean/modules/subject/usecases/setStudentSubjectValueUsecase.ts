import { ISubjectRepository } from "../domain/repositories/subject_repository_interface";

export class SetStudentSubjectValueUsecase {
    constructor(private subjectRepository: ISubjectRepository) { }

    async execute(isExam: boolean, code: string, name: string, value: number): Promise<void> {
        return await this.subjectRepository.setStudentSubjectValue(isExam, code, name, value = value ?? 0)
    }
}
