import { ApplicationError } from "../protocols/protocols";

export function conflictError(): ApplicationError {
    return {
        name: 'conflictError',
        message: 'conflictError'
    }
}