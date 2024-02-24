import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../state";
import { Button, Field, Form, Input,Redio } from "../../Forms";


export const Spouseage = ({showSpouseJobs, setShowSpouseJobs, showSpouseAge, setShowSpouseAge,showJobs, setShowJobs, showAge, setShowAge, state, setState}) => {

const {handleSubmit,register,watch,formState: { errors },} = useForm({ defaultValues: state, mode: "onSubmit" });
const saveSpouseDataAge = (data) => {
		document.getElementById("example").setAttribute("data-percentage", 18);
		setState({ ...state, ...data });
		setShowSpouseAge(false)
		setShowSpouseJobs(true)
};
	
const PreviousSpouseDataAge = () => {
       setShowSpouseAge(false)
	   setShowAge(true)
}
 	 
return(
        <Form  id="steps-13" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveSpouseDataAge)}>
            <div>
            <h2 class="text-center font-weight-bold">Enter your spouse's age as of Jan 1, 2024.</h2>
			<p class="text-center">This helps us determine which age-specific tax breaks your spouse might qualify for.</p>
			<div class="jobs-panel" >
				<ul class="selection-panel">
					<li>
						<div class="tool-input position-relative my-2" >
							<input  {...register("spouseage", { required: "This field is required" })} type="number" />
							<label for="" id="label">Age</label>
						</div>
					</li>
					{errors.spouseage && <p class="text-center mt-5"><span class="error_msg text-danger mx-auto mt-5">{errors.spouseage.message}</span></p>}
				</ul>
			</div>    
			<div class="form-footer mt-5 pt-4 text-center">
			  <button class="btn btn-w4-success Previousform" onClick={PreviousSpouseDataAge}>previous</button>
			  <button  class="btn btn-primary">Next</button>
			</div>
             
            </div>
		</Form>
    );
};
