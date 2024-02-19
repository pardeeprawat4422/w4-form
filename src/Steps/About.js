import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state"; 
import { Button, Field, Form, Input,Redio } from "../Forms";
import React, { useState } from 'react';
 
 
export const About = () => {
	 
  const [state, setState] = useAppState();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });
  
	const [showMarried, setShowMarried] = useState(true);  // Show Married section
	const [showIfMarried, setShowIfMarried] = useState(false);
	const [showHousehold, setShowHousehold] = useState(false); // Hide Household section
	const [showAge, setShowAge] = useState(false);
	const [attributeValue, setAttributeValue] = useState('initialValue');
  
	const navigate = useNavigate();

	const saveMarriedData = (data) => {
		setState({ ...state, ...data });
		document.getElementById("example").setAttribute("data-percentage", 3);
		if (data.married == 'Single' ) {
			setShowMarried(false)
			setShowHousehold(true)
		} else {
			setShowMarried(false)
			setShowIfMarried(true)
		}
	};
	
	const PreviousMarried = () => {
		setShowMarried(true)
		setShowHousehold(false)
	}
  

	const saveDataIfMarried = (data) => {
	 setState({ ...state, ...data });
		if (data.married == 'Single' ) {
			//setShowMarried(false)
			//setShowHousehold(true)
		} else {
			//setShowMarried(true)
			//setShowHousehold(false)
		}
		//console.log('value is:', data)
		//navigate("/education");
  };
  const Previous1 = () => {
	setShowMarried(true)
			setShowIfMarried(false)
  }
  


  const saveDataHouse = (data) => {
		setState({ ...state, ...data });
		if (data.married == 'Yeshousehold' ) {
		   setShowHousehold(false)
		   setShowAge(true)
		} else {
			  setShowHousehold(false)
		   setShowAge(true)
		}
	};

     const saveDataAge = (data) => {
		setState({ ...state, ...data });
		if (data.married == 'Yeshousehold' ) {
		 
		} else {
			 
		}
	};

const PreviousHousehold = () => {
	setShowHousehold(true)
		   setShowAge(false)
  }

  return (
	<div class="w4-main-container">
		{showMarried && (
			<Form  id="steps-1" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveMarriedData)}>
			<h2 class="text-center font-weight-bold">Are you single or married?</h2>
			<p class="text-center">This will help us determine your filing status, standard deduction, and which credits you can claim.</p>
			<ul class="selection-panel mt-5 p-4">
				<li>
					<div class="form-check py-3">
						<input  {...register("married", { required: "Please select an option" })} value="Single" type="radio" class="form-check-input" name="married" id="validationCustom01" />
						<label class="form-check-label single">
							Single
						</label>
					</div>
				</li>
				<li>
					<div class="form-check py-3">
						<input  {...register("married", { required: "Please select an option" })}  value="Married" type="radio" class="form-check-input" name="married" id="validationCustom02" />
						<label class="form-check-label married">
							Married
						</label>
						 {errors.married && <span class="error_msg">{errors.married.message}</span>}
					</div>
					
				</li>
			</ul>
			<div class="form-footer mt-5 pt-4 text-center">
				<button  class="btn btn-primary">Next</button>
			</div>
				 
			</Form>		
		)}
	 
	{showHousehold && ( 
		<Form  id="steps-2" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveDataHouse)}>
        <h2 class="text-center font-weight-bold">Are you the head of household?</h2>
			<p class="text-center">Head of Household is a filing status for unmarried persons with a qualified person.</p>
            <ul class="selection-panel mt-5 p-4">
				<li>
					<div class="form-check py-3">
						<input  {...register("household", { required: "Please select an option" })} value="Yeshousehold" type="radio" class="form-check-input" name="household"  />
						<label class="form-check-label householdYes">
							Yes
						</label>
					</div>
                </li>
				<li>
                    <div class="form-check py-3">
                        <input  {...register("household", { required: "Please select an option" })}  value="Nohousehold" type="radio" class="form-check-input" name="household" />
                        <label class="form-check-label married">
						No
                        </label>
						{errors.household && <span class="error_msg">{errors.household.message}</span>}
                    </div>
                </li>
            </ul>
			<div class="form-footer mt-5 pt-4 text-center">
				<button class="btn btn-w4-success Previousform" onClick={PreviousMarried}>previous</button>
				<button  class="btn btn-primary">Next</button>
			</div>
		</Form>		
    )}
	
		{showAge && ( 
		 
		<Form  id="steps-3" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveDataAge)}>
        <h2 class="text-center font-weight-bold">Enter your age as of Jan 1, 2024.</h2>
                    <p class="text-center">This helps us determine which age-specific tax breaks you might qualify for.</p>
                    <ul class="selection-panel mt-5 p-4">
                    <li>
						<div class="form-check py-3">

							<input  {...register("yourage", { required: "This field is required" })}  class="form-check-input" name="yourage"  />
							<label class="form-check-label Age">
								Age
							</label>
							{errors.yourage && <span class="error_msg">{errors.yourage.message}</span>}
						</div>
                    </li>
                </ul>
				<div class="form-footer mt-5 pt-4 text-center">
				 <button class="btn btn-w4-success" onClick={PreviousHousehold}>previous</button>
					<button  class="btn btn-primary">Next</button>
				</div>
			 
		</Form>	
    )}
	 
	{showIfMarried && ( 
		<Form  id="steps-3" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveDataIfMarried)}>
			<div class="step step-1">
				<div class="firststep-panel">
					<h2 class="step-mainheading">Do you plan to file with your spouse?</h2>
					<p>In most cases, filing jointly with your spouse results in a lower tax bill. This means you and your spouse report combined income and deduct your combined expenses. Choose No if you're married and plan to file separately.</p>
					<ul  class="tools-selection-tiles">
						<li>
							<Redio   {...register("spouse")} value="Yesspouse"  class="tool-long-tile single" id="tc-single" />
							<label for="tc-single">Yes</label>
						</li>
						<li>
							<Redio  {...register("spouse")}  value="Nospouse" class="tool-long-tile married" id="tc-married"  />
							<label for="tc-married">No</label>
						</li>
					</ul>
					<div class="btn-step">
					<button class="btn btn-w4-success" onClick={Previous1}>previous</button>
							<button class="btn btn-w4-success">Next</button>
                     </div>
				</div> 
			</div> 
		</Form>
    )} 
	 
</div>	
 	
  );
};
