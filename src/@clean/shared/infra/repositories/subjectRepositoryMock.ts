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

    async calculateFinalAverage(subject: Subject): Promise<void> {
        let examsSum = 0;
        let examsWeightSum = 0;
        subject.exams.forEach((exam) => {
            examsSum = examsSum + exam.value * exam.weight;
            examsWeightSum = examsWeightSum + exam.weight;
        })
        let examAverage = examsSum / examsWeightSum;

        let assignmentSum = 0;
        let assignmentWeightSum = 0;
        subject.assignments.forEach((assignment) => {
            assignmentSum = examsSum + assignment.value * assignment.weight;
            assignmentWeightSum = examsWeightSum + assignment.weight;
        })
        let assignmentAverage = assignmentSum / assignmentWeightSum;

        let finalAverage = examAverage * subject.examWeight + assignmentAverage * subject.assignmentWeight;
        subject.average = finalAverage;
        this.saveStudentSubject(subject.code, subject);
    }
}

decorate(injectable(), SubjectRepositoryMock);