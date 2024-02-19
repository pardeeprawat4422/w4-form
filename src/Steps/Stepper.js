import { useLocation } from "react-router-dom";
import React, { useState } from 'react';

 
export const Stepper = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return (
      "nav-link disabled " + (path === location.pathname ? "active" : undefined)
    );
  };
  const [step, setStep] = useState(1);
   const prevStep = () => {
    setStep(step - 1);
  };
 

  return (
  
   
   <div class="w4-nav my-5">
                    <ul class="w4-tab-menu">
                        <li class="tab-about active">
                            <button class="btn">About You</button>
                        </li>
                        <li class="tab-income">
                            <button class="btn">Income</button>
                        </li>
                        <li class="tab-credits">
                            <button class="btn">Credits</button>
                        </li>
                        <li class="tab-deductions">
                            <button class="btn">Deductions</button>
                        </li>
                        <li class="tab-results">
                            <button class="btn">Results</button>
                        </li>
                    </ul>

					<div class="progress" id="example" data-percentage='0'>
                        <span class="progress-left">
                            <span class="progress-bar"></span>
                        </span>
                        <span class="progress-right">
                            <span class="progress-bar"></span>
                        </span>
                        <div class="progress-value">
                            <div>
                               
                            </div>
                        </div>
                    </div>
                </div>
			 
  );
};
