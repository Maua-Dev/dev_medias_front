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
    subject.exams.forEach((grade: Grade) => {
        if(grade.value !== null){
            notas_que_tenho.push({
                valor: grade.value,
                peso: grade.weight,
            })
        }else{
            notas_que_quero.push({
                peso: grade.weight,
            })
        }
    });

    return new GradeOptimizerModel({
      notas_que_tenho,
      notas_que_quero,
      media_desejada: subject.target,
    });
  }
}