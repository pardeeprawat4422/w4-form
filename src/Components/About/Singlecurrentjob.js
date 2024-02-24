import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../state";

import { Button, Field, Form, Input, Redio } from "../../Forms";

export const Singlecurrentjob = ({ setshowSingleTwoJobs, showSingleTwoJobs, showSingleCurrentJobs, setshowSingleCurrentJobs, state, setState, setShowJobs, showJobs, showSingleLeaveJobs, setshowSingleLeaveJobs }) => {

console.log(state.howmanyjobs);
    const { handleSubmit, register, watch, formState: { errors } } = useForm({ defaultValues: state, mode: "onSubmit" });
    const [numberOfJobs, setNumberOfJobs] = useState(parseInt(state.howmanyjobs));
    const jobsData = [];
    const addNewJob = () => {
	
		  setNumberOfJobs(prevCount => {
            setState({ ...state, howmanyjobs: prevCount + 1 }); // Update howmanyjobs in state
            return prevCount + 1;
        });
    };
    // Populate jobsData array based on the numberOfJobs variable
    for (let i = 0; i < numberOfJobs; i++) {
        jobsData.push({ name: `Job ${i + 1}` });
    }

    

    const savesingleCurrentJobs = (data) => {
        document.getElementById("example").setAttribute("data-percentage", 22);
        setState({ ...state, ...data });
        if (state.howmanyjobs == 2) {
            setshowSingleCurrentJobs(false)
            setshowSingleTwoJobs(true)
        } else {
            setshowSingleCurrentJobs(false)
            setshowSingleLeaveJobs(true)
        }
    };

    const Previoussinglecurrentjobs = () => {
        setshowSingleCurrentJobs(false)
        setShowJobs(true)
    }

    return (
        <Form id="steps-14" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(savesingleCurrentJobs)}>
            <h1 class="text-center font-weight-bold">How much are you paid yearly for your current job(s)?</h1>
            <p class="text-center">Please input information from all W-2 jobs only.</p>

            <div id="container">
                {jobsData.map((job, index) => (
                    <div key={index} class="jobs-panel">
                        <div class="add-jobs">
                            <h4>{job.name}</h4>
                        </div>
                        <ul class="selection-panel">
                            <li>
                                <div class="tool-input position-relative my-2" >
                                    <input type="text" placeholder="$0" id={`yearlysalery${index + 1}`} {...register(`yearlysalery-${index + 1}`)} />
                                    <label htmlFor={`textInput${index + 1}`} id={`label${index + 1}`}>Yearly Salary</label>
                                </div>
                            </li>
                            <li>
                                <div class="tool-input position-relative my-2" >
                                    <select class="form-control" id={`selectpayfreq${index + 1}`} onchange="addClassToSelectLabel()" {...register(`selectpayfreq-${index + 1}`, { required: "Please select an option" })}>
                                        <option value="" selected></option>
                                        <option value="biweekly">biweekly</option>
                                        <option value="monthly">monthly</option>
                                        <option value="quarterly">quarterly</option>
                                        <option value="semimonthly">semimonthly</option>
                                        <option value="weekly">weekly</option>
                                    </select>
                                    <label htmlFor={`selectpayfreq${index + 1}`} id={`label1${index + 1}`}>Pay frequently</label>
                                </div>
                                {errors.selectpayfreq1 && <p class="text-center mt-5"><span class="error_msg text-danger mx-auto mt-5">{errors.selectpayfreq1.message}</span></p>}
                            </li>
                            <li>
                                <div class="tool-input position-relative my-2">
                                    <input type="text" placeholder="$0" id={`lastpaycheck${index + 1}`} {...register(`lastpaycheck-${index + 1}`)} />
                                    <label htmlFor={`textInput2${index + 1}`} id={`label2${index + 1}`}>Withholding on last paycheck</label>
                                </div>
                            </li>
                            <li>
                                <div class="tool-input position-relative my-2">
                                    <input type="text" placeholder="$0" id={`totalwithholding${index + 1}`} {...register(`totalwithholding-${index + 1}`)} />
                                    <label htmlFor={`textInput3${index + 1}`} id={`label3${index + 1}`}>Total withholding (year to date)</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>

            <button class="add-job-btn" onClick={addNewJob}>Add another job </button>

            <div class="form-footer mt-5 pt-4 text-center">
                <button class="btn btn-w4-success Previousform" onClick={Previoussinglecurrentjobs}>previous</button>
                <button class="btn btn-primary">Next</button>
            </div>

        </Form>
    );
};
