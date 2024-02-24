import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import { useAppState } from "../../state";
import { Button, Field, Form, Input,Redio } from "../../Forms";


export const Spouseleavejob = ({state, setState,showSpouseTwoJobs, setshowSpouseTwoJobs,showSpouseCurrentJobs, setshowSpouseCurrentJobs,showSpouseLeaveJobs, setshowSpouseLeaveJobs,showSpousePriorJobs, setshowSpousePriorJobs}) => {
const {handleSubmit,register,watch,formState: { errors },} = useForm({ defaultValues: state, mode: "onSubmit" });
const navigate = useNavigate();	
console.log(state)
const savespouseleaveJobs = (data) => {
		document.getElementById("example").setAttribute("data-percentage", 24);
		
		setState({ ...state, ...data });
		if(data.spouseleaveajob =="yes") {
		  setshowSpouseLeaveJobs(false)
		  setshowSpousePriorJobs(true)
		}
		else {
		    navigate("/income");
		} 
};
	
const Previousspouseleavejobs = (data) => {
	    if(state.spitwithhelding == "true") {
		   setshowSpouseLeaveJobs(false)
		   setshowSpouseTwoJobs(true)
		}
		else {
		   setshowSpouseLeaveJobs(false)
		   setshowSpouseCurrentJobs(true)
		}		
}
 	 
return(
        <Form id="steps-14" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(savespouseleaveJobs)}>
                <h1 class="text-center font-weight-bold">Did you or your spouse leave a job this year?</h1>
                <p class="text-center">To account for tax you've already paid, we need to know how much you've already withheld this year.</p>
			 <div class="status-panel">
				<ul class="selection-panel mt-5 p-4">
					<li>
						<div class="form-check py-3">
							<input type="radio" {...register("spouseleaveajob", { required: "Please select an option" })} class="form-check-input"  id="validationCustom01" value="yes"/>
							<label class="form-check-label yes">
								Yes
							</label>
						</div>
					</li>
					<li>
						<div class="form-check py-3">
							<input type="radio" {...register("spouseleaveajob", { required: "Please select an option" })} class="form-check-input"  id="validationCustom02" value="no"/>
							<label class="form-check-label no">
								No
							</label>
						  </div>
					</li>
				   {errors.leaveajob && <p class="text-center mt-5"><span class="error_msg text-danger mx-auto mt-5">{errors.leaveajob.message}</span></p>}
	
				</ul>    
				</div>
				<div class="form-footer mt-5 pt-4 text-center">
					<button class="btn btn-w4-success Previousform" onClick={Previousspouseleavejobs}>previous</button>
					<button  class="btn btn-primary">Next</button>
				</div>
               
		</Form>
    );
};
