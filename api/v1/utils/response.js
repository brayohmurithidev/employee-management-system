export const apiResponse = (status, data, message, code) => {
  const response = {
    status,
    data,
    message,
    code,
  };
  return response;
};
