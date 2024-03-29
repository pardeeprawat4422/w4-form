import React, { useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../state";
import { Button, Field, Form, Input,Redio } from "../../Forms";


export const Spousetwojob = ({state, setState, showSpouseTwoJobs, setshowSpouseTwoJobs,showSpouseCurrentJobs, setshowSpouseCurrentJobs,showSpouseLeaveJobs, setshowSpouseLeaveJobs}) => {

const {handleSubmit,register,watch,formState: { errors },} = useForm({ defaultValues: state, mode: "onSubmit" });

const navigate = useNavigate();	
const savespousetwoJobs = (data) => {
		document.getElementById("example").setAttribute("data-percentage", 23);
		setState({ ...state, ...data });
		setshowSpouseTwoJobs(false)
		setshowSpouseLeaveJobs(true)		
};
	
const Previousspousetwojobs = () => {
	  setshowSpouseTwoJobs(false)
	  setshowSpouseCurrentJobs(true) 
}
 	 
return(
        <Form id="steps-16" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(savespousetwoJobs)}>
                <h1 class="text-center font-weight-bold">We've noticed that you currently have two jobs</h1>
                <p class="text-center">If these jobs pay a similar amount, you have the option to check the box below. If they're not similar and you check the box, the lower paying job may have too much withheld.</p>
			 <div class="jobs-panel">
				  <ul class="selection-panel">
					<li>
					 <div class=" position-relative my-2">
						<div class="form-check text-center">
							<input class="form-check-input" {...register("spitwithhelding", {required: 'Please select the checkbox'})} type="checkbox" value="true" id="splitwithhelding" />
							<label class="form-check-label font-weight-bold" for="defaultCheck1">
								Split withholdings more evenly
							</label>
						  </div>
					   </div>
					</li>
	                {errors.spitwithhelding && <p class="text-center mt-5"><span class="error_msg text-danger mx-auto mt-5">{errors.spitwithhelding.message}</span></p>}
				 </ul>    
				</div>
				<div class="form-footer mt-5 pt-4 text-center">
					<button class="btn btn-w4-success Previousform" onClick={Previousspousetwojobs}>previous</button>
					<button  class="btn btn-primary">Next</button>
				</div>
               
		</Form>
    );
};
