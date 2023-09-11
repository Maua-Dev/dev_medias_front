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
  
   async calculateFinalAverage(subject: Subject): Promise<void> {
        const examTotal = subject.exams.reduce((accumulator, exam) => accumulator + (exam.value !== -1 ? exam.value : 0) * exam.weight, 0);
        const assignmentTotal = subject.assignments.reduce((accumulator, assignment) => accumulator + (assignment.value !== -1 ? assignment.value : 0) * assignment.weight, 0);
        const examWeightTotal = subject.exams.reduce((accumulator, exam) => accumulator + exam.weight, 0);
        const assignmentWeightTotal = subject.assignments.reduce((accumulator, assignment) => accumulator + assignment.weight, 0);
        const totalWeight = examWeightTotal + assignmentWeightTotal;
        if (totalWeight === 0) {
          return;
        }
        const examAverage = examTotal / examWeightTotal;
        const assignmentAverage = assignmentTotal / assignmentWeightTotal;
        let weightedAverage = 0
        if(examAverage && assignmentAverage){
          weightedAverage = (examAverage * subject.examWeight + assignmentAverage * subject.assignmentWeight) / (subject.examWeight + subject.assignmentWeight);
        }else if(examAverage){
          weightedAverage = (examAverage * subject.examWeight)  / (subject.examWeight);
        }else{
          weightedAverage = (assignmentAverage * subject.assignmentWeight) / (subject.assignmentWeight);
        }
        
        const average = Math.round(weightedAverage * 10) / 10;
        subject.average = average;
        await this.saveStudentSubject(subject.code, subject);
      }
}

decorate(injectable(), SubjectRepositoryMock);
