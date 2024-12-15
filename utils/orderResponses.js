const orderSuccess = (res, data, message = "Operation successful") => {
  return res.status(200).json({
    status: true,
    message,
    data
  });
};

const orderError = (res, message = "Operation failed", statusCode = 400) => {
  return res.status(statusCode).json({
    status: false,
    error: message
  });
};

module.exports = {
  orderSuccess,
  orderError
}; 