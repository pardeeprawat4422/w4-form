import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export const Stepper = () => {
  const navigate = useNavigate();	
  const location = useLocation();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Determine the step based on the current location
    switch(location.pathname) {
      case '/':
        setStep(1);
        break;
      case '/income':
        setStep(2);
        break;
      case '/credits':
        setStep(3);
        break;
      case '/deductions':
        setStep(4);
        break;
      case '/results':
        setStep(5);
        break;
      default:
        setStep(1);
    }
  }, [location.pathname]);

  const navigateToStep = (path) => {
    navigate(path);
  };

  return (
    <div className="w4-nav my-5">
      <ul className="w4-tab-menu">
        <li className={`tab-about ${step === 1 ? 'active' : ''}`}>
          <button className="btn" onClick={() => navigateToStep('/')}>About You</button>
        </li>
        <li className={`tab-income ${step === 2 ? 'active' : ''}`}>
          <button className="btn" onClick={() => navigateToStep('/income')}>Income</button>
        </li>
        <li className={`tab-credits ${step === 3 ? 'active' : ''}`}>
          <button className="btn" onClick={() => navigateToStep('/credits')}>Credits</button>
        </li>
        <li className={`tab-deductions ${step === 4 ? 'active' : ''}`}>
          <button className="btn" onClick={() => navigateToStep('/deductions')}>Deductions</button>
        </li>
        <li className={`tab-results ${step === 5 ? 'active' : ''}`}>
          <button className="btn" onClick={() => navigateToStep('/results')}>Results</button>
        </li>
      </ul>

      <div className="progress" id="example" data-percentage={(step - 1) * 25}>
        <span className="progress-left">
          <span className="progress-bar"></span>
        </span>
        <span className="progress-right">
          <span className="progress-bar"></span>
        </span>
        <div className="progress-value">
          <div></div>
        </div>
      </div>
    </div>
  );
};