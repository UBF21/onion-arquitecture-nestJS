export class DeleteResponseDto{
    success: boolean;
    message: string;

    constructor(success:boolean,mmesage:string){
        this.success = false;
        this.message = "";
    }
}