const TryCatch = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.error("❌ SERVER ERROR:", err); // full error in terminal
    res.status(500).json({
      success: false,
      message: err.message, // readable in Postman
      error: err.stack,     // helps debugging
    });
  }
};

export default TryCatch;
