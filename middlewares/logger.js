export const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;

  const loggerInfo = {
        timestamp,
        method,
        url
    }
    console.log(loggerInfo)
 next();   
}