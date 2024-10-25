export class LogErrorDto {

    timestamp: Date;

    message: string; // Mensaje de error

    methodName: string; // Nombre del método donde ocurrió el error

    stackTrace?: string; // Traza de la pila (opcional, puede ayudar a la depuración)

    additionalInfo?: any; // Información adicional (opcional)

    constructor(method: string, error: Error | string, additionalInfo?: any) {
        this.timestamp = new Date();
        this.message = typeof error === 'string' ? error : error.message;
        this.methodName = method;
        this.stackTrace = error instanceof Error ? error.stack : undefined;
        this.additionalInfo = additionalInfo;
    }
}