import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../state";
import { Button, Field, Form, Input,Redio } from "../../Forms";


export const SpouseJobs = ({showSpouseCurrentJobs, setshowSpouseCurrentJobs,showSpouseJobs, setShowSpouseJobs, showSpouseAge, setShowSpouseAge,state, setState}) => {

const {handleSubmit,register,watch,formState: { errors },} = useForm({ defaultValues: state, mode: "onSubmit" });
const savespouseJobs = (data) => {
		document.getElementById("example").setAttribute("data-percentage", 20);
		setState({ ...state, ...data });
		setShowSpouseJobs(false)
		setshowSpouseCurrentJobs(true)
};
	
const Previousspousejobs = () => {
      setShowSpouseJobs(false)
	  setShowSpouseAge(true)
}
 	 
return(
        <Form  id="steps-13" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(savespouseJobs)}>
            <div>
                <h1 class="text-center font-weight-bold">How many total jobs do you and your spouse currently have?</h1>
                    <p class="text-center">List all jobs that provide a W-2 (do not include 1099 jobs).</p>
                    <div class="jobs-panel" >
                        <ul class="selection-panel">
                            <li>
                                <div class="tool-input position-relative my-2" >
                                    <select class="form-control" id="howmanyspousejob" onchange="addClassToSelectLabel()" {...register("howmanyspousejob")}>
                                        <option value="1" selected>One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        <option value="4">Four</option>
                                        <option value="5">Five</option>
                                    </select>
                                    <label for="" id="label1">Total jobs</label>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    <div class="form-footer mt-5 pt-4 text-center">
					  <button class="btn btn-w4-success Previousform" onClick={Previousspousejobs}>previous</button>
                      <button  class="btn btn-primary">Next</button>
                    </div>
             
            </div>
		</Form>
    );
};
