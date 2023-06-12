import { Subject } from '../../domain/entities/subject';
import { Grade } from '../../domain/entities/grade';

export type NotasQueTenhoProps = {
  valor: number;
  peso: number;
};

export type NotasQueQueroProps = {
  peso: number;
};

export type GradeOptimizerModelProps = {
  notas_que_tenho: NotasQueTenhoProps[];
  notas_que_quero: NotasQueQueroProps[];
  media_desejada: number;
};

export type GradeOptimizerResponse = {
  notas: NotasQueTenhoProps[]
}

export class GradeOptimizerModel {
  constructor(private props: GradeOptimizerModelProps) {}

  get notas_que_tenho(): NotasQueTenhoProps[] {
    return this.props.notas_que_tenho;
  }

  set notas_que_tenho(notas_que_tenho: NotasQueTenhoProps[]) {
    this.props.notas_que_tenho = notas_que_tenho;
  }

  get notas_que_quero(): NotasQueQueroProps[] {
    return this.props.notas_que_quero;
  }

  set notas_que_quero(notas_que_quero: NotasQueQueroProps[]) {
    this.props.notas_que_quero = notas_que_quero;
  }

  get media_desejada(): number {
    return this.props.media_desejada;
  }

  set media_desejada(media_desejada: number) {
    this.props.media_desejada = media_desejada;
  }

  toJSON(): string {
    return JSON.stringify({
      notas_que_tenho: this.notas_que_tenho,
      notas_que_quero: this.notas_que_quero,
      media_desejada: this.media_desejada,
    });
  }

  static fromSubject(subject: Subject): GradeOptimizerModel {
    let notas_que_tenho: NotasQueTenhoProps[] = []
    let notas_que_quero: NotasQueQueroProps[] = [] 
    let soma_pesos_provas: number = subject.exams.reduce((total, exam) => {
      return total + exam.value
    }, 0)
    let soma_pesos_trabalhos: number = subject.exams.reduce((total, assignment) => {
      return total + assignment.value
    }, 0)
    subject.exams.forEach((grade: Grade) => {
        if(grade.value !== -1){
            notas_que_tenho.push({
                valor: grade.value,
                peso: grade.weight / soma_pesos_provas * subject.examWeight,
            })
        }else{
            notas_que_quero.push({
                peso: grade.weight / soma_pesos_provas * subject.examWeight,
            })
        }
      }
    );
      subject.assignments.forEach((grade: Grade) => {
        if(grade.value !== -1){
            notas_que_tenho.push({
                valor: grade.value,
                peso: grade.weight / soma_pesos_trabalhos * subject.assignmentWeight,
            })
        }else{
            notas_que_quero.push({
                peso: grade.weight / soma_pesos_trabalhos * subject.assignmentWeight,
            })
        }
      }
    );

    return new GradeOptimizerModel({
      notas_que_tenho,
      notas_que_quero,
      media_desejada: subject.target,
    });
  }

  static fromResApiGradeOptimizer(res: GradeOptimizerResponse, subject: Subject): Subject{
    let newExams: Grade[] = []
    let newAssignments: Grade[] = [] 
    let counterReponseIndex : number = 0
    subject.exams.forEach((grade: Grade) => {
      newExams.push(new Grade({
            value: grade.value === -1 ? res.notas[counterReponseIndex].valor : grade.value,
            weight: grade.weight,
            name: grade.name
        })
      )
    })
    subject.assignments.forEach((grade: Grade) => {
      newAssignments.push(new Grade({
            value: grade.value === -1 ? res.notas[counterReponseIndex].valor : grade.value,
            weight: grade.weight,
            name: grade.name
        })
      )
    })
    return new Subject({
      name: subject.name,
      code: subject.code,
      period: subject.period,
      average: subject.average,
      examWeight: subject.examWeight,
      assignmentWeight: subject.assignmentWeight,
      exams: newExams,
      assignments: newAssignments,
      target: subject.target,
    });
  }
}