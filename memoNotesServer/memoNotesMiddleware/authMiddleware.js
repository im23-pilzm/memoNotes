const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const authMiddleware = (req, res, next) => {
    console.log("Cookies received in middleware:", req.headers.cookie);
    // Parse cookies from the request headers
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    // Retrieve the token using the cookie key 'authorization'
    const token = cookies.authorization;
    console.log("Token received in middleware:", token);

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        req.user = jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid Token" });
    }
};

module.exports = authMiddleware;