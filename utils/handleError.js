export const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ success: false, error });
};
