
export const checkTrueStringValue = (value:string):boolean => (value.toUpperCase() === "TRUE");

export const SENTRY_DSN:string = process.env.SENTRY_DSN || "";
export const NODE_ENV:string = process.env.NODE_ENV || "local";
export const SENTRY_ENABLED:boolean = checkTrueStringValue(process.env.SENTRY_ENABLED || "")
export const WINSTON_DEBBUG:boolean = checkTrueStringValue(process.env.WINSTON_DEBBUG || "")