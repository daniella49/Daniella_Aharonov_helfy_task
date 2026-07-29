module.exports = (req, res, next) => {
  const { title, priority } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required."
    });
  }

  const validPriorities = ["low", "medium", "high"];

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be low, medium, or high."
    });
  }

  next();
};