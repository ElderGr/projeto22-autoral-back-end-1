import { ApplicationError } from "../protocols/protocols";

export function invalidDataError(details?:string[]): AplicationInvalidDataError {
    return {
        name: 'InvalidDataError',
        message: 'Invalid Data',
        details: details || ['']
    }
}

type AplicationInvalidDataError = ApplicationError & {
    details: string[];
}