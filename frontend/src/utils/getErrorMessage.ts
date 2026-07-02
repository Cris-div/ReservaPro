import axios from "axios";

interface ErrorResponse {
  message?: string;
  errors?: string[];
}

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    const response = error.response?.data;

    if (response?.errors?.length) {
      return response.errors.join(", ");
    }

    if (response?.message) {
      return response.message;
    }
  }

  return "Ocurrio un error inesperado";
}
