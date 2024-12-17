import React from 'react';
import './Privacy.css';

const Privacy = () => {
    return (
        <div className="privacy-container">
            <h1>Privacy Policy</h1>
            <p className="intro-text">
                This Privacy Policy explains how we handle your data when you use our application.
            </p>
            <ol className="privacy-list">
                <li>
                    <strong>Local Data Storage:</strong> We store your preferences (such as theme, language, and conversation style) locally on your device via browser local storage. No personal data is transferred to our servers.
                </li>
                <li>
                    <strong>No Third-Party Data Sharing:</strong> Since your data remains local, we do not have access to it, nor do we share it with any third parties.
                </li>
                <li>
                    <strong>OpenAI API Interaction:</strong> The chat requests you send are processed by the OpenAI API. We only send the necessary prompt to generate a response. We do not transmit or store any personally identifiable information.
                </li>
                <li>
                    <strong>Your Control:</strong> You may delete your local storage data at any time by clearing your browser’s cache and local storage, thereby removing your saved preferences.
                </li>
                <li>
                    <strong>Security:</strong> Since no personal information is stored on our servers, the primary security measure is your own browser environment. Ensure that your device and browser are up-to-date and protected.
                </li>
            </ol>
            <p className="acknowledgment">
                By using our application, you acknowledge that you understand and accept this Privacy Policy.
            </p>
        </div>
    );
};

export default Privacy;
