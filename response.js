const response = (statusCode, message, datas, res) => {
    if (datas != null) {
        res.status(statusCode).json([
            {
                payload: datas,
                message: message,
                metaData: {
                    prev: "",
                    next: "",
                    max: ""
                }
            },
        ])
    } else {
        res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            pagination: {
                prev: "",
                next: "",
                max: ""
            }
        })
    }
}

module.exports = response