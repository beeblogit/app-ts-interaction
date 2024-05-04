export interface Sentry {
    captureMessage(msg: any):void;
    captureException(err: any):void;
}

export interface ILogger {
    setSentry(s:Sentry):void;
    log(err:any):void;
}

export class Logger {
    sentry: Sentry;
    constructor(){}

    setSentry(sentry: Sentry){
        this.sentry = sentry;
    }

    log(err: any){
        this.sentry.captureException(err);
    }
}