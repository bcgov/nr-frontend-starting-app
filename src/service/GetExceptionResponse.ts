import ExceptionResponse from '../types/ExceptionResponse';

function getExceptionResponse(error: unknown | Error): ExceptionResponse {
  if (error instanceof Error) {
    const excResponse: ExceptionResponse = JSON.parse(String(error.message));
    return excResponse;
  }

  return {
    errorMessage: String(error),
    fields: []
  };
}

export default getExceptionResponse;
