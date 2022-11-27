const validateCreateUser = async(req, res, next) => {
    const {body} = req;
    if(body.userName === undefined) {
        return res.status(400).json({message:'the field userName is required'});
    };
    if(body.userName === '') {
        return res.status(400).json({message:'userName cannot be empty'});
    };
    next();
};

module.exports = {
    validateCreateUser
}
