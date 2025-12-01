export const authenticate = (req, res, next) => {
  // Get API key from request header
  const apiKey = req.headers['x-api-key'];
  
  // Check if API key exists
  if (!apiKey) {
    return res.error("API key is required", 401);
  }
  
  // Check if API key is valid
  const validApiKey = "express_app_2025";
  
  if (apiKey !== validApiKey) {
    return res.error("Invalid API key", 401);
  }
  
  next();
};