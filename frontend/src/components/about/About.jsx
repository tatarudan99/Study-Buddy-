import React from 'react';

const About = () => {
    return (
        <div style={{
            padding: '20px',
            lineHeight: '1.6',
            color: '#333',
            marginTop: "100px",
            paddingInline: "150px"
        }}>
            <h1 style={{textAlign: 'center', fontWeight: 'bold', color: '#000000'}}>Welcome to Study Buddy</h1>
            <p>
                Your personalized AI-powered learning companion. We believe that every learner is unique,
                and our mission is to help you discover and embrace your individual learning style.
            </p>
            <p>
                By answering a few simple questions about your schedule, pace, interests, and motivational
                preferences, you’ll unlock a customized path that respects who you are as a learner. From there,
                our adaptive chat sessions support you at every step, helping you understand concepts in a way
                that resonates with you.
            </p>
            <p>
                After each session, you’ll find a personalized summary, spotlighting what you’ve accomplished and
                guiding your next steps. At Study Buddy, we’re here to help you learn your way—every day.
            </p>
            <h2 style={{color: '#000000', fontWeight: 'bold'}}>Why Choose Me?</h2>
            <ul>
                <li>Customized learning paths tailored to your needs.</li>
                <li>Interactive chat sessions for deeper understanding.</li>
                <li>Personalized summaries to track your progress.</li>
                <li>Supportive, adaptive, and always here for you.</li>
            </ul>
            <p>
                Join the thousands of learners who are already transforming their educational journeys
                with Study Buddy. Let’s unlock your potential together!
            </p>
            <p style={{textAlign: 'center', fontWeight: 'bold', color: '#000000'}}>
                Start your journey today and discover the joy of learning your way.
            </p>
        </div>
    );
};

export default About;
