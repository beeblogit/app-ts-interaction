import {formatStringToTrace} from 'logger-fusion'

export const checkTrueStringValue = (value?:string):boolean => ((value && value.toUpperCase() === "TRUE")?true:false);

export const SENTRY_DSN:string = process.env.SENTRY_DSN || "";
export const NODE_ENV:string = process.env.NODE_ENV || "local";
export const SENTRY_ENABLED:boolean = checkTrueStringValue(process.env.SENTRY_ENABLED)

export const WINSTON_LOG_TRACE:number = formatStringToTrace(process.env.WINSTON_LOG_TRACE)
export const SENTRY_LOG_TRACE:number = formatStringToTrace(process.env.SENTRY_LOG_TRACE)
export const IS_DEBBUG:boolean = checkTrueStringValue(process.env.IS_DEBBUG)