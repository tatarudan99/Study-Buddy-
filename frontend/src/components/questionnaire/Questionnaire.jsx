// src/components/Questionnaire.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Questionnaire.css';

function Questionnaire() {
  const navigate = useNavigate();

  // Total steps for the questionnaire
  const totalSteps = 9;

  // Step management
  const [step, setStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    subject: '',
    assistance: [],
    tone: '',
    motivationStyle: '',
    humor: '',
    themes: [],
    pace: '',
    interests: '',
    timeAvailability: '',
  });

  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('questionnaireData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save form data to localStorage on formData change
  useEffect(() => {
    localStorage.setItem('questionnaireData', JSON.stringify(formData));
  }, [formData]);

  // Handle form input changes
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field, value) => {
    const currentArray = formData[field];
    if (currentArray.includes(value)) {
      handleChange(
        field,
        currentArray.filter((item) => item !== value)
      );
    } else {
      handleChange(field, [...currentArray, value]);
    }
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        localStorage.setItem('questionnaireData', JSON.stringify(formData));
        navigate('/study');
      }
    } else {
      alert('Please complete the required fields before proceeding.');
    }
  };

  // Handle back step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Validation for each step
  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.subject.trim() !== '';
      case 2:
        return formData.assistance.length > 0;
      case 3:
        return formData.tone !== '';
      case 4:
        return formData.motivationStyle !== '';
      case 5:
        return formData.humor !== '';
      case 6:
        return formData.themes.length > 0;
      case 7:
        return formData.pace !== '';
      case 8:
        return formData.interests.trim() !== '';
      case 9:
        return formData.timeAvailability.trim() !== '';
      default:
        return true;
    }
  };

  // Render progress bar
  const renderProgressBar = () => {
    const progressPercentage = Math.round((step / totalSteps) * 100);
    return (
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress-bar-filled"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-bar-percentage">{progressPercentage}%</div>
      </div>
    );
  };

  // Render each question based on the current step
  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <div className="question-step">
            <h2>What subject or topic would you like to study today?</h2>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="e.g., Calculus, World War II, Spanish Language"
            />
          </div>
        );
      case 2:
        return (
          <div className="question-step">
            <h2>What would you like help with? (Choose one or more)</h2>
            <div className="options-container">
              {['Summary', 'Explanation', 'Practice Questions', 'Examples', 'Revision Tips'].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={formData.assistance.includes(option)}
                    onChange={() => handleCheckboxChange('assistance', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="question-step">
            <h2>Which tone do you prefer?</h2>
            <div className="options-container">
              {['Friendly and Supportive', 'Strict and Disciplined', 'Fun and Playful', 'Reflective and Philosophical'].map((tone) => (
                <label key={tone}>
                  <input
                    type="radio"
                    name="tone"
                    value={tone}
                    checked={formData.tone === tone}
                    onChange={(e) => handleChange('tone', e.target.value)}
                  />
                  {tone}
                </label>
              ))}
            </div>
          </div>
        );
        case 4:
          return (
            <div className="question-step">
              <h2>What motivational style do you prefer?</h2>
              <div className="options-container">
                <label>
                  <input
                    type="radio"
                    name="motivationStyle"
                    value="Gentle Encouragement"
                    checked={formData.motivationStyle === 'Gentle Encouragement'}
                    onChange={(e) =>
                      handleChange('motivationStyle', e.target.value)
                    }
                  />
                  Gentle Encouragement
                </label>
                <label>
                  <input
                    type="radio"
                    name="motivationStyle"
                    value="Balanced Support and Challenge"
                    checked={
                      formData.motivationStyle ===
                      'Balanced Support and Challenge'
                    }
                    onChange={(e) =>
                      handleChange('motivationStyle', e.target.value)
                    }
                  />
                  Balanced Support and Challenge
                </label>
                <label>
                  <input
                    type="radio"
                    name="motivationStyle"
                    value="Tough Love and Direct Push"
                    checked={
                      formData.motivationStyle === 'Tough Love and Direct Push'
                    }
                    onChange={(e) =>
                      handleChange('motivationStyle', e.target.value)
                    }
                  />
                  Tough Love and Direct Push
                </label>
                <label>
                  <input
                    type="radio"
                    name="motivationStyle"
                    value="Thought-Provoking and Deep"
                    checked={
                      formData.motivationStyle === 'Thought-Provoking and Deep'
                    }
                    onChange={(e) =>
                      handleChange('motivationStyle', e.target.value)
                    }
                  />
                  Thought-Provoking and Deep
                </label>
              </div>
            </div>
          );
        case 5:
          return (
            <div className="question-step">
              <h2>Do you prefer humor or seriousness?</h2>
              <div className="options-container">
                <label>
                  <input
                    type="radio"
                    name="humor"
                    value="Lighthearted with Humor"
                    checked={formData.humor === 'Lighthearted with Humor'}
                    onChange={(e) => handleChange('humor', e.target.value)}
                  />
                  Lighthearted with Humor
                </label>
                <label>
                  <input
                    type="radio"
                    name="humor"
                    value="A Mix of Both"
                    checked={formData.humor === 'A Mix of Both'}
                    onChange={(e) => handleChange('humor', e.target.value)}
                  />
                  A Mix of Both
                </label>
                <label>
                  <input
                    type="radio"
                    name="humor"
                    value="Mostly Serious"
                    checked={formData.humor === 'Mostly Serious'}
                    onChange={(e) => handleChange('humor', e.target.value)}
                  />
                  Mostly Serious
                </label>
              </div>
            </div>
          );
        case 6:
          return (
            <div className="question-step">
              <h2>Which themes of motivation resonate with you? (Choose one or more)</h2>
              <div className="options-container">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.themes.includes(
                      'Personal Growth and Self-Improvement'
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        'themes',
                        'Personal Growth and Self-Improvement'
                      )
                    }
                  />
                  Personal Growth and Self-Improvement
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.themes.includes(
                      'Overcoming Challenges and Adversity'
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        'themes',
                        'Overcoming Challenges and Adversity'
                      )
                    }
                  />
                  Overcoming Challenges and Adversity
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.themes.includes('Success and Achievement')}
                    onChange={() =>
                      handleCheckboxChange('themes', 'Success and Achievement')
                    }
                  />
                  Success and Achievement
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.themes.includes(
                      'Philosophical Wisdom and Inner Peace'
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        'themes',
                        'Philosophical Wisdom and Inner Peace'
                      )
                    }
                  />
                  Philosophical Wisdom and Inner Peace
                </label>
              </div>
            </div>
          );
        case 7:
          return (
            <div className="question-step">
              <h2>At what pace would you like to learn?</h2>
              <div className="options-container">
                <label>
                  <input
                    type="radio"
                    name="pace"
                    value="Easy"
                    checked={formData.pace === 'Easy'}
                    onChange={(e) => handleChange('pace', e.target.value)}
                  />
                  Easy
                </label>
                <label>
                  <input
                    type="radio"
                    name="pace"
                    value="Moderate"
                    checked={formData.pace === 'Moderate'}
                    onChange={(e) => handleChange('pace', e.target.value)}
                  />
                  Moderate
                </label>
                <label>
                  <input
                    type="radio"
                    name="pace"
                    value="Hard"
                    checked={formData.pace === 'Hard'}
                    onChange={(e) => handleChange('pace', e.target.value)}
                  />
                  Hard
                </label>
                <label>
                  <input
                    type="radio"
                    name="pace"
                    value="Champion"
                    checked={formData.pace === 'Champion'}
                    onChange={(e) => handleChange('pace', e.target.value)}
                  />
                  Champion
                </label>
              </div>
            </div>
          );
        case 8:
          return (
            <div className="question-step">
              <h2>List some of your interests (max 20 words):</h2>
              <textarea
                value={formData.interests}
                onChange={(e) => handleChange('interests', e.target.value)}
                placeholder="e.g., Soccer, Video Games, Cooking"
                maxLength={200}
              ></textarea>
            </div>
          );
        case 9:
          return (
            <div className="question-step">
              <h2>How much time do you have for this session?</h2>
              <input
                type="text"
                value={formData.timeAvailability}
                onChange={(e) =>
                  handleChange('timeAvailability', e.target.value)
                }
                placeholder="e.g., 30 minutes"
              />
            </div>
          );
  

      default:
        return null;
    }
  };

  // Render the form container
  return (
    <div className="questionnaire-container">
      <h1 className="questionnaire-title">Questionnaire</h1>
      {renderProgressBar()}
      {renderQuestion()}
      <div className="navigation-buttons">
        {step > 1 && (
          <button type="button" className="back-button" onClick={handleBack}>
            Back
          </button>
        )}
        <button type="button" className="next-button" onClick={handleNext}>
          {step < totalSteps ? 'Next' : 'Start Session'}
        </button>
      </div>
    </div>
  );
}

export default Questionnaire;
