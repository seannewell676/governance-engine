/**
 * Logic Gate Configuration and Constraint Enforcement
 */
export interface IConstraint {
    id: string;
    validate: (input: any) => boolean;
}

export class LogicGate {
    private constraints: IConstraint[] = [];

    public enforce(data: any): boolean {
        return this.constraints.every(c => c.validate(data));
    }
}
