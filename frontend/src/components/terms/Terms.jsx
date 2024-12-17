import React from 'react';
import './Terms.css';

const Terms = () => {
    return (
        <div className="terms-container">
            <h1>Terms and Conditions</h1>
            <p className="intro-text">
                Welcome to our application. By using this application, you agree to the following terms and conditions:
            </p>
            <ol className="terms-list">
                <li>
                    <strong>Data Usage:</strong> We collect and store your preferences (such as theme, language, and conversation style) locally in your browser’s local storage. No personal data is sent to our servers.
                </li>
                <li>
                    <strong>Privacy:</strong> Since your data stays in local storage, it remains on your device. We do not have access to it, and it is not shared with any third parties.
                </li>
                <li>
                    <strong>User Interaction:</strong> The application enables you to interact with an AI-powered chat assistant using the OpenAI API. You agree not to use the chat in a manner that violates any applicable laws, regulations, or these terms. The chat is intended solely for informational, educational, and conversational purposes. Any misuse, such as attempting to elicit disallowed content or using the AI for malicious purposes, is strictly prohibited.
                </li>
                <li>
                    <strong>Appropriate Use of AI:</strong> You agree not to rely solely on the responses provided by the AI and to use your own judgment. The application and its AI assistant are not intended to provide professional advice or services. Do not use the AI for tasks that require professional input (legal, medical, financial, etc.) without consulting a qualified professional.
                </li>
                <li>
                    <strong>Liability:</strong> The application provides no guarantee of accuracy, completeness, or suitability of the AI's responses. By using the chat, you acknowledge that the information may not be fully reliable, and you assume all responsibility for any actions you take based on the AI's output.
                </li>
            </ol>
            <p className="acknowledgment">
                By continuing, you acknowledge that you have read, understood, and agree to these terms.
            </p>
        </div>
    );
};

export default Terms;


// The generateSummary function condenses the conversation, reducing the amount of context needed:
const generateSummary = async (conversation) => {
    // ... Code that creates a user-friendly summary of the recent conversation ...
    // This summary is then included as a system message to guide the model.
};

// The getAndSummary function triggers a summary on demand, again limiting token usage by reducing context:
const getAndSummary = () => {
    // ... Code that generates a summary and includes it as a system message ...
};