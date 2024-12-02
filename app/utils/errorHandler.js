export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const isProductionMode = process.env.NODE_ENV === "production";

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(!isProductionMode && { stack: err.stack }),
  });
};
