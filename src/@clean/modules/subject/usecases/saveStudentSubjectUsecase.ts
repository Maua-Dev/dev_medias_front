import { Subject } from "../../../shared/domain/entities/subject";
import { ISubjectRepository } from "../domain/repositories/subject_repository_interface";

export class SaveStudentSubjectUsecase {
    constructor(private subjectRepository: ISubjectRepository) {}

    async execute(code: string, subject: Subject): Promise<void> {
        let studentSubjects = await this.subjectRepository.getStudentSubjects() as Subject[];
        let subjectExists = studentSubjects.find((studentSubject) => studentSubject.code === code)
        if (subjectExists) {
            throw new Error('Matéria já cadastrada');
        }else{
            return await this.subjectRepository.saveStudentSubject(code, subject);
        }
    }
}