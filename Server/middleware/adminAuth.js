import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        // Token should be passed in the Authorization header as Bearer token
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        // Extract the token from the Bearer header
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains the admin email
        if (decodedToken.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Not Authorized, Login Again" });
        }

        // Proceed to the next middleware if authenticated
        next();
    } catch (error) {
        console.log("Authentication Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export default adminAuth;
