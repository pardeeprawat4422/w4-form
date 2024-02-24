import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../state";
import { Button, Field, Form, Input,Redio } from "../../Forms";


export const Singletwojob = ({setshowSingleTwoJobs, showSingleTwoJobs, showSingleLeaveJobs, setshowSingleLeaveJobs, showSingleCurrentJobs,setshowSingleCurrentJobs,state, setState}) => {

const {handleSubmit,register,watch,formState: { errors },} = useForm({ defaultValues: state, mode: "onSubmit" });

const navigate = useNavigate();	
const savesingletwoJobs = (data) => {
		document.getElementById("example").setAttribute("data-percentage", 20);
		setState({ ...state, ...data });
		setshowSingleTwoJobs(false)
		setshowSingleLeaveJobs(true)
};
	
const Previoussingletwojobs = () => {
	   setshowSingleTwoJobs(false)
	   setshowSingleCurrentJobs(true)
}
 	 
return(
        <Form id="steps-16" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(savesingletwoJobs)}>
                <h1 class="text-center font-weight-bold">We've noticed that you currently have two jobs</h1>
                <p class="text-center">If these jobs pay a similar amount, you have the option to check the box below. If they're not similar and you check the box, the lower paying job may have too much withheld.</p>
			 <div class="status-panel">
				<ul class="selection-panel mt-5 p-4">
					<li>
						<div class="form-check py-3">
							<input type="checkbox" {...register("spitwithhelding", {required: 'Please select the checkbox'})} class="form-check-input checkbox-two-job"  id="splitwithhelding" value="true"/>
							<label class="form-check-label">
								Split withholdings more evenly
							</label>
						</div>
					</li>
	                {errors.spitwithhelding && <p class="text-center mt-5"><span class="error_msg text-danger mx-auto mt-5">{errors.spitwithhelding.message}</span></p>}
				</ul>    
				</div>
				<div class="form-footer mt-5 pt-4 text-center">
					<button class="btn btn-w4-success Previousform" onClick={Previoussingletwojobs}>previous</button>
					<button  class="btn btn-primary">Next</button>
				</div>
               
		</Form>
    );
};
