exports.success = (res, message, data = {}) => {
  res.json({ success: true, message, data });
};

exports.error = (res, message) => {
  res.status(400).json({ success: false, message });
};
