export class EmployeeModel{
    id?:number;
    name!:string;
    position!:string;
    salary!:number;
    date!:Date;

    constructor(){
        this.name="";
        this.position="";
        this.salary=0;
    }
}