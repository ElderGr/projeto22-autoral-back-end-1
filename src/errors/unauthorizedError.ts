import { ApplicationError } from "../protocols/protocols";

export function unathorizedError(): ApplicationError {
    return {
        name: 'UNATHORIZED',
        message: 'Permission denied'
    }
}