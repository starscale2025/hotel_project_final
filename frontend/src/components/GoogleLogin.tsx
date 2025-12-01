import React, { useEffect } from 'react';

declare global {
    interface Window {
        google: any;
    }
}

const GoogleLogin = () => {
    const [user, setUser] = React.useState<any>(null);

    useEffect(() => {
        const handleCredentialResponse = (response: any) => {
            console.log("Encoded JWT ID token: " + response.credential);

            fetch("http://localhost:3000/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: response.credential })
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Logged in:", data);
                    setUser(data);
                })
                .catch(err => {
                    console.error("Login failed:", err);
                    alert("Login failed. Check console for details.");
                });
        };

        if (window.google && !user) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse
            });

            window.google.accounts.id.renderButton(
                document.getElementById("googleSignInDiv"),
                { theme: "outline", size: "large" }  // customization attributes
            );
        }
    }, [user]);

    return (
        <div>
            {user ? (
                <div className="text-luxury-ivory/80 text-xs tracking-[0.2em] uppercase font-medium">
                    {user.name}
                </div>
            ) : (
                <div id="googleSignInDiv"></div>
            )}
        </div>
    );
};

export default GoogleLogin;
