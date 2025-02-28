export interface Photo {
    id:string,
    caption:string,
    photo_url:string,
    created_at:string,
    updated_at:string
}
// if want to use class
export class EmployeeClass {
    id!: number;
    firstName!:string;
    lastName!:string;
    emailId!:string;
}


export interface Employee {
    id:number;
    firstName:string;
    lastName:string;
    emailId:string;

}

export interface Country {
    name:string;
    code:string;
}