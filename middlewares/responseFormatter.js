export const responseFormatter = (req, res, next) => {

    res.success = (data, message = "Success", statusCode = 200) => {
       return res.status(statusCode).json({
            success: true,
            data: data,
            message: message,
            timestamp: new Date()
        })

    };


    res.error = (message, statusCode = 400) => {
        return res.status(statusCode).json({
            success: false,
            error: message,
            timestamp: new Date()
        })
    }

next();    
}