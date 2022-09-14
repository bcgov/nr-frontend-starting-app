type ApiException = {
  errorMessage: string
}

function toApiException(error: unknown | Error): ApiException {
  if (error instanceof Error) {
    const apiException: ApiException = JSON.parse(String(error.message));
    return apiException;
  }

  return {
    errorMessage: String(error)
  };
}

export default toApiException;
