export const getErrorMessage = (
  apiResponse: any,
  defaultMessage: string = "Some error occurred, please try again"
) => {
  let errorMessage = defaultMessage;
  if (apiResponse) {
    if (apiResponse.message) {
      errorMessage = apiResponse.message;
    } else if (apiResponse.data && apiResponse.data.message) {
      errorMessage = apiResponse.data.message;
    } else if (
      apiResponse.data &&
      apiResponse.data.data &&
      typeof apiResponse.data.data === "string"
    ) {
      errorMessage = apiResponse.data.data;
    } else if (
      apiResponse.data &&
      apiResponse.data.data &&
      apiResponse.data.data.message
    ) {
      errorMessage = apiResponse.data.data.message;
    }
  }
  return errorMessage;
};

export enum OrderByDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
}
