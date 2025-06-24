const TryCatch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: error.message
                });
            }
            else {
                res.status(500).json({
                    message: "Unknown error occurred"
                });
            }
        }
    };
};
export default TryCatch;
