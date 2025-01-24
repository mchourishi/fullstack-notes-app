const handleAsync = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || { message: "Internal server error" });
  }
};

module.exports = { handleAsync };
