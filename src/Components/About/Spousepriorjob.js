import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../state";

import { Button, Field, Form, Input,Redio } from "../../Forms";


export const Spousepriorjob = ({state, setState,showSpousePriorJobs, setshowSpousePriorJobs,showSpouseLeaveJobs, setshowSpouseLeaveJobs}) => {

const {handleSubmit,register,watch,formState: { errors },} = useForm({ defaultValues: state, mode: "onSubmit" });
const navigate = useNavigate();	
const [numberOfsinglepriorjob, setNumberOfJobs] = useState(parseInt(1));
const singlepriorjobsData = [];

// Populate jobsData array based on the numberOfJobs variable
for (let i = 0; i < numberOfsinglepriorjob; i++) {
	singlepriorjobsData.push({ name: `Prior Job ${i + 1}` });
}
	
const savesinglepriorJobs = (data) => {
		document.getElementById("example").setAttribute("data-percentage", 25);
		setState({ ...state, ...data });
		navigate("/income");
};
	
const Previoussinglepriorjobs = () => {
	  setshowSpousePriorJobs(false)	
	  setshowSpouseLeaveJobs(true)  
}
const addNewPriorJob = () => {
        setNumberOfJobs(prevCount => prevCount + 1);
}; 	 
return(
        <Form  id="steps-15" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(savesinglepriorJobs)}>
                    <h1 class="text-center font-weight-bold">How much were you and your spouse paid for your prior job(s)??</h1>
                    <p class="text-center">You can find how much tax you've already paid in withholding on your final paycheck from your previous employer.</p>
                    
                    <div id="container">
                    {singlepriorjobsData.map((job, index) => (
                     <div key={index} class="jobs-panel">
                        <div class="add-jobs">
                            <h4>{job.name}</h4>    
                        </div>
                        <ul class="selection-panel">
                            <li>
                                <div class="tool-input position-relative my-2" >
                                    <input type="text" placeholder="$0" id={`Salaryytd${index + 1}`} {...register(`saleryyrd-${index + 1}`)} />
                                    <label htmlFor={`textInput${index + 1}`} id={`priorlabel1${index + 1}`}>Salary (Year to Date)</label>
                                </div>
                            </li>
                            
                            <li>
                                <div class="tool-input position-relative my-2">
                                    <input type="text" placeholder="$0" id={`withholding${index + 1}`} {...register(`withholding-${index + 1}`)} />
                                    <label htmlFor={`textInput2${index + 1}`} id={`priorlabel2${index + 1}`}>Withholding (Year to Date)</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                     ))}
                </div>

				<button class="add-job-btn" onClick={addNewPriorJob}>Add another job </button>

				<div class="form-footer mt-5 pt-4 text-center">
					<button class="btn btn-w4-success Previousform" onClick={Previoussinglepriorjobs}>previous</button>
					<button  class="btn btn-primary">Next</button>
				</div>
               
		</Form>
    );
};
