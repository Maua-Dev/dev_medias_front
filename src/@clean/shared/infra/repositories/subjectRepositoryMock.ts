import { decorate, injectable } from "inversify";
import { ISubjectRepository } from "../../../modules/subject/domain/repositories/subject_repository_interface";
import { Subject } from "../../domain/entities/subject";
import allSubjects from "../jsons/allSubjects";

export class SubjectRepositoryMock implements ISubjectRepository {
    private subjects: { [key: string]: Subject } = {};

    async getStudentSubjects(): Promise<Subject[]> {
        return Object.values(this.subjects);
    }

    async getAllSubjects(): Promise<Subject[]> {
        return Subject.fromDataJson(allSubjects);
    }

    async saveStudentSubject(code: string, subject: Subject): Promise<void> {
        this.subjects[code] = subject;
    }

    async deleteStudentSubject(code: string): Promise<void> {
        delete this.subjects[code]
    }

    async setStudentSubjectValue(isExam: boolean, code: string, name: string, value: number) {
        if (isExam) {
            this.subjects[code].exams.map(item => {
                if (item.name === name)
                    item.value = value
            })
        }
        else {
            this.subjects[code].assignments.map(item => {
                if (item.name === name)
                    item.value = value
            })
        }
    }
}

decorate(injectable(), SubjectRepositoryMock);
