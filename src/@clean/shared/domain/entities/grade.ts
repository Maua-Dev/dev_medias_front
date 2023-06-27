export type gradeProps = {
    name: string;
    value: number;
    weight: number;
}

export class Grade {
    constructor(private props: gradeProps) {
        this.props.name = props.name;
        this.props.value = props.value;
        this.props.weight = props.weight;
    }

    get name(): string {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    get value(): number {
        return this.props.value;
    }

    set value(value: number) {
        this.props.value = value;
    }

    get weight(): number {
        return this.props.weight;
    }

    set weight(weight: number) {
        this.props.weight = weight;
    }
}
