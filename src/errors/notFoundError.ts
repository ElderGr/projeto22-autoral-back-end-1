import { ApplicationError } from "../protocols/protocols";

export function notFoundError(): ApplicationError {
    return {
        name: 'notFoundError',
        message: 'Not Found'
    }
}