const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();

router.post('/google', async (req, res) => {
    const { token } = req.body;
    console.log("Received login request. Token length:", token ? token.length : 'No token');

    try {
        console.log("Verifying token with Google...");
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "760240270184-d1rt3ie9eoemp3qcoo3tto6uhm5cc9mc.apps.googleusercontent.com",
        });
        console.log("Token verified successfully.");

        const payload = ticket.getPayload();

        // In a real app, you would upsert the user in your database here
        // and issue your own JWT or session cookie.

        res.json({
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
        });
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
});

module.exports = router;
