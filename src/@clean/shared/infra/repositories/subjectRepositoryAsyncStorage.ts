import AsyncStorage from '@react-native-async-storage/async-storage';
import {decorate, injectable} from 'inversify';
import {ISubjectRepository} from '../../../modules/subject/domain/repositories/subject_repository_interface';
import {Grade} from '../../domain/entities/grade';
import {Subject, SubjectProps} from '../../domain/entities/subject';
import allSubjects from '../jsons/allSubjects';

export class SubjectRepositoryAsyncStorage implements ISubjectRepository {
  async getStudentSubjects(): Promise<Subject[]> {
    const keys = await AsyncStorage.getItem('keys');
    if (!keys) {
      return [];
    }
    const subjectDataArray = await Promise.all(
      JSON.parse(keys).map((key: string) => AsyncStorage.getItem(key)),
    );
    const subjects = subjectDataArray.map((data: string) => {
      const {
        code,
        name,
        period,
        average,
        examWeight,
        assignmentWeight,
        exams,
        assignments,
        target,
      } = JSON.parse(data);
      const subjectProps: SubjectProps = {
        code,
        name,
        period,
        average,
        examWeight,
        assignmentWeight,
        exams: exams.map(
          (exam: any) =>
            new Grade({
              name: exam.name,
              value: exam.value,
              weight: exam.weight,
              generated: exam.generated,
            }),
        ),
        assignments: assignments.map(
          (assignment: any) =>
            new Grade({
              name: assignment.name,
              value: assignment.value,
              weight: assignment.weight,
              generated: assignment.generated,
            }),
        ),
        target,
      };
      return new Subject(subjectProps);
    });
    return subjects;
  }

  async getAllSubjects(): Promise<Subject[]> {
    return Subject.fromDataJson(allSubjects);
  }

  async getAllSubjectsWithoutStudentSubjects(): Promise<Subject[]> {
    let studentSubjects = (await this.getStudentSubjects()).map(
      subject => subject.code,
    );
    let filtered = Subject.fromDataJson(allSubjects).filter(
      subject => !studentSubjects.includes(subject.code),
    );
    return filtered;
  }

  async saveStudentSubject(code: String, subject: Subject): Promise<void> {
    const keys = await AsyncStorage.getItem('keys');
    const keyArray = keys ? JSON.parse(keys) : [];
    if (!keyArray.includes(code)) {
      keyArray.push(subject.code);
    }
    await AsyncStorage.setItem('keys', JSON.stringify(keyArray));
    const subjectData = {
      code: subject.code,
      name: subject.name,
      period: subject.period,
      average: subject.average,
      examWeight: subject.examWeight,
      assignmentWeight: subject.assignmentWeight,
      exams: subject.exams.map(exam => ({
        name: exam.name,
        value: exam.value,
        weight: exam.weight,
        generated: exam.generated,
      })),
      assignments: subject.assignments.map(assignment => ({
        name: assignment.name,
        value: assignment.value,
        weight: assignment.weight,
        generated: assignment.generated,
      })),
    };
    await AsyncStorage.setItem(subject.code, JSON.stringify(subjectData));
  }

  async deleteStudentSubject(code: string): Promise<void> {
    const keys = await AsyncStorage.getItem('keys');
    if (!keys) {
      return;
    }
    const keyArray = JSON.parse(keys);
    const index = keyArray.indexOf(code);
    if (index > -1) {
      keyArray.splice(index, 1);
      await AsyncStorage.setItem('keys', JSON.stringify(keyArray));
      await AsyncStorage.removeItem(code);
    }
  }

  async calculateFinalAverage(subject: Subject): Promise<void> {
    const examTotal = subject.exams.reduce(
      (accumulator, exam) =>
        accumulator + (exam.value !== -1 ? exam.value : 0) * exam.weight,
      0,
    );
    const assignmentTotal = subject.assignments.reduce(
      (accumulator, assignment) =>
        accumulator +
        (assignment.value !== -1 ? assignment.value : 0) * assignment.weight,
      0,
    );
    const examWeightTotal = subject.exams.reduce(
      (accumulator, exam) => accumulator + exam.weight,
      0,
    );
    const assignmentWeightTotal = subject.assignments.reduce(
      (accumulator, assignment) => accumulator + assignment.weight,
      0,
    );
    const totalWeight = examWeightTotal + assignmentWeightTotal;
    if (totalWeight === 0) {
      return;
    }
    const examAverage = examTotal / examWeightTotal;
    const assignmentAverage = assignmentTotal / assignmentWeightTotal;
    const weightedAverage =
      (examAverage * subject.examWeight +
        assignmentAverage * subject.assignmentWeight) /
      (subject.examWeight + subject.assignmentWeight);
    const average = Math.round(weightedAverage * 10) / 10;
    subject.average = average;
    await this.saveStudentSubject(subject.code, subject);
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
    // await AsyncStorage.setItem(subject.code, JSON.stringify(subject));
    await this.saveStudentSubject(subject.code, subject);
  }
}

decorate(injectable(), SubjectRepositoryAsyncStorage);
