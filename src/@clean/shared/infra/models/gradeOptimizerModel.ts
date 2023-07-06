import { Grade } from '../../domain/entities/grade';
import { Subject } from '../../domain/entities/subject';

export type NotasQueTenhoProps = {
  valor: number;
  peso: number;
};

export type NotasQueQueroProps = {
  peso: number;
};

export type GradeOptimizerModelProps = {
  provas_que_tenho: NotasQueTenhoProps[];
  trabalhos_que_tenho: NotasQueTenhoProps[];
  provas_que_quero: NotasQueQueroProps[];
  trabalhos_que_quero: NotasQueQueroProps[];
  media_desejada: number;
};

export type GradeOptimizerResponse = {
  notas: {
    provas: NotasQueTenhoProps[]
    trabalhos: NotasQueTenhoProps[]
  }

}

export class GradeOptimizerModel {
  constructor(private props: GradeOptimizerModelProps) { }

  get provas_que_tenho(): NotasQueTenhoProps[] {
    return this.props.provas_que_tenho;
  }

  set provas_que_tenho(provas_que_tenho: NotasQueTenhoProps[]) {
    this.props.provas_que_tenho = provas_que_tenho;
  }

  get provas_que_quero(): NotasQueQueroProps[] {
    return this.props.provas_que_quero;
  }

  set provas_que_quero(provas_que_quero: NotasQueQueroProps[]) {
    this.props.provas_que_quero = provas_que_quero;
  }

  get trabalhos_que_tenho(): NotasQueTenhoProps[] {
    return this.props.trabalhos_que_tenho;
  }

  set trabalhos_que_tenho(trabalhos_que_tenho: NotasQueTenhoProps[]) {
    this.props.trabalhos_que_tenho = trabalhos_que_tenho;
  }

  get trabalhos_que_quero(): NotasQueQueroProps[] {
    return this.props.trabalhos_que_quero;
  }

  set trabalhos_que_quero(trabalhos_que_quero: NotasQueQueroProps[]) {
    this.props.trabalhos_que_quero = trabalhos_que_quero;
  }

  get media_desejada(): number {
    return this.props.media_desejada;
  }

  set media_desejada(media_desejada: number) {
    this.props.media_desejada = media_desejada;
  }

  toJSON(): string {
    return JSON.stringify({
      provas_que_tenho: this.provas_que_tenho,
      provas_que_quero: this.provas_que_quero,
      trabalhos_que_tenho: this.trabalhos_que_tenho,
      trabalhos_que_quero: this.trabalhos_que_quero,
      media_desejada: this.media_desejada,
    });
  }

  static fromSubject(subject: Subject): GradeOptimizerModel {
    let provas_que_tenho: NotasQueTenhoProps[] = []
    let provas_que_quero: NotasQueQueroProps[] = []
    let trabalhos_que_tenho: NotasQueTenhoProps[] = []
    let trabalhos_que_quero: NotasQueQueroProps[] = []

    let soma_pesos_provas: number = subject.exams.reduce((total, exam) => {
      return total + exam.weight
    }, 0)

    let soma_pesos_trabalhos: number = subject.assignments.reduce((total, assignment) => {
      return total + assignment.weight
    }, 0)

    subject.exams.forEach((grade: Grade) => {
      if (grade.value !== -1) {
        provas_que_tenho.push({
          valor: grade.value,
          peso: Number((grade.weight * subject.examWeight / soma_pesos_provas).toFixed(2)) / 100,
        })
      } else {
        provas_que_quero.push({
          peso: Number((grade.weight * subject.examWeight / soma_pesos_provas).toFixed(2)) / 100,
        })
      }
    }
    );
    subject.assignments.forEach((grade: Grade) => {
      if (grade.value !== -1) {
        trabalhos_que_tenho.push({
          valor: grade.value,
          peso: Number((grade.weight * subject.assignmentWeight / soma_pesos_trabalhos).toFixed(2)) / 100,
        })
      } else {
        trabalhos_que_quero.push({
          peso: Number((grade.weight * subject.assignmentWeight / soma_pesos_trabalhos).toFixed(2)) / 100,
        })
      }
    }
    );

    return new GradeOptimizerModel({
      provas_que_tenho,
      provas_que_quero,
      trabalhos_que_tenho,
      trabalhos_que_quero,
      media_desejada: subject.target,
    });
  }

  static fromResApiGradeOptimizer(res: GradeOptimizerResponse, subject: Subject): Subject {
    let newExams: Grade[] = []
    let newAssignments: Grade[] = []
    let counterReponseIndex: number = 0
    subject.exams.forEach((grade: Grade) => {
      newExams.push(new Grade({
        value: grade.value === -1 ? res.notas.provas[counterReponseIndex].valor : grade.value,
        weight: grade.weight,
        name: grade.name,
        generated: grade.value === -1
      })
      )
      if (grade.value === -1) {
        counterReponseIndex++
      }

    })
    counterReponseIndex = 0
    subject.assignments.forEach((grade: Grade) => {
      newAssignments.push(new Grade({
        value: grade.value === -1 ? res.notas.trabalhos[counterReponseIndex].valor : grade.value,
        weight: grade.weight,
        name: grade.name,
        generated: grade.value === -1
      })
      )
      if (grade.value === -1) {
        counterReponseIndex++
      }
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
