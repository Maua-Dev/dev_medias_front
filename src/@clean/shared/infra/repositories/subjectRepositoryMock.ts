import {decorate, injectable} from 'inversify';
import {ISubjectRepository} from '../../../modules/subject/domain/repositories/subject_repository_interface';
import {Subject} from '../../domain/entities/subject';
import allSubjects from '../jsons/allSubjects';

export class SubjectRepositoryMock implements ISubjectRepository {
  private subjects: {[key: string]: Subject} = {};

  async getStudentSubjects(): Promise<Subject[]> {
    return Object.values(this.subjects);
  }

  async getAllSubjects(): Promise<Subject[]> {
    return Subject.fromDataJson(allSubjects);
  }

  async getAllSubjectsWithoutStudentSubjects(): Promise<Subject[]> {
    let studentSubjects = (await this.getStudentSubjects()).map(
      subject => subject.code,
    );
    return Subject.fromDataJson(allSubjects).filter(
      subject => !studentSubjects.includes(subject.code),
    );
  }

  async saveStudentSubject(code: string, subject: Subject): Promise<void> {
    this.subjects[code] = subject;
  }

  async deleteStudentSubject(code: string): Promise<void> {
    delete this.subjects[code];
  }

  async setStudentSubjectValue(
    isExam: boolean,
    code: string,
    name: string,
    value: number,
  ) {
    if (isExam) {
      this.subjects[code].exams.map(item => {
        if (item.name === name) item.value = value;
      });
    } else {
      this.subjects[code].assignments.map(item => {
        if (item.name === name) item.value = value;
      });
    }
  }

  async calculateFinalAverage(subject: Subject): Promise<void> {
    let examsSum = 0;
    let examsWeightSum = 0;
    subject.exams.forEach(exam => {
      examsSum = examsSum + (exam.value !== -1 ? exam.value : 0) * exam.weight;
      examsWeightSum = examsWeightSum + exam.weight;
    });
    let examAverage = examsSum / examsWeightSum;

    let assignmentSum = 0;
    let assignmentWeightSum = 0;
    subject.assignments.forEach(assignment => {
      assignmentSum =
        assignmentSum +
        (assignment.value !== -1 ? assignment.value : 0) * assignment.weight;
      assignmentWeightSum = assignmentWeightSum + assignment.weight;
    });
    let assignmentAverage = assignmentSum / assignmentWeightSum;
    let finalAverage =
      (examAverage * subject.examWeight +
        assignmentAverage * subject.assignmentWeight) /
      (subject.examWeight + subject.assignmentWeight);
    finalAverage = Math.round(finalAverage * 10) / 10;
    subject.average = finalAverage;
    this.saveStudentSubject(subject.code, subject);
  }

  async cleanGeneratedGrades(subject: Subject): Promise<void> {
    subject.exams.forEach(elem => {
      if (elem.generated) {
        elem.value = -1;
        elem.generated = false;
      }
    });

    subject.assignments.forEach(elem => {
      if (elem.generated) {
        elem.value = -1;
        elem.generated = false;
      }
    });

    this.saveStudentSubject(subject.code, subject);
  }
}

decorate(injectable(), SubjectRepositoryMock);
