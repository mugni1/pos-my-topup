import { AxiosError } from "axios";

export const handleErrorResponse = (error: unknown) => {
    let message = 'Internal Server Error';
    if (error instanceof AxiosError) {
        message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
        message = error.message;
    }
    return {
        status: 500,
        message: message,
        data: null,
        meta: null,
        errors: null
    };
}