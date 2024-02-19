import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state"; 
import { Button, Field, Form, Input,Redio } from "../Forms";
import React, { useState } from 'react';
      

export const Contact = () => {
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
  
  
  const navigate = useNavigate();

  const saveData = (data) => {
	 setState({ ...state, ...data });
	 alert(data.married)
		if (data.married == 'Single' ) {
			setShowMarried(false)
			setShowHousehold(true)
		} else {
			setShowMarried(false)
			setShowIfMarried(true)
		}
		//console.log('value is:', data)
		navigate("/education");
  };

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

  return (
  <div class ="container">
    {showMarried && (
		<Form  id="steps-uid-0" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveData)}>
			<div class="step step-1">
				<div class="firststep-panels">
					<h2 class="step-mainheading">Are you single or married? </h2>
					<p>This will help us determine your filing status, standard deduction, and which credits you can claim. </p>
					<ul  class="tools-selection-tiles">
						<li>
							<Redio   {...register("married")} value="Single"  name="married" class="tool-long-tile" id="tc-single" />
							<label for="tc-single">Single</label>
						</li>
						<li>
							<Redio  {...register("married")}  value="Married" name="married" class="tool-long-tile" id="tc-married"  />
							<label for="tc-married">Married</label>
						</li>
					</ul>
					<div class="btn-step">
						<button class="btn btn-w4-success">Next</button>
					</div>
				</div> 
			</div> 
		</Form>
	 )}
	 
	{showHousehold && ( 
		<Form  id="steps-uid-0" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveDataHouse)}>
			<div class="step step-1">
				<div class="firststep-panel">
					<h2 class="step-mainheading">Are you the head of household?</h2>
					<p>Head of Household is a filing status for unmarried persons with a qualified person.</p>
					<ul  class="tools-selection-tiles">
						<li>
							<Redio   {...register("household")} value="Yeshousehold"  class="tool-long-tile single" id="tc-single" />
							<label for="tc-single">Yes</label>
						</li>
						<li>
							<Redio  {...register("household")}  value="Nohousehold" class="tool-long-tile married" id="tc-married"  />
							<label for="tc-married">No</label>
						</li>
					</ul>
					<div class="btn-step">
							<button class="btn btn-w4-success">Next</button>
                     </div>
				</div> 
			</div> 
		</Form>
    )}
	
		{showAge && ( 
		<Form  id="steps-uid-0" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveDataAge)}>
			<div class="step step-1">
				<div class="firststep-panel">
					<h2 class="step-mainheading">Enter your age as of Jan 1, 2024.</h2>
					<p>This helps us determine which age-specific tax breaks you might qualify for.</p>
					<div class="tool-input-textbox">
                        <input type="number" id="your-age" aria-required="true" class="ng-pristine ng-invalid ng-touched" />
                        <label for="your-age">Age
                        </label>
                     </div>
					<div class="btn-step">
							<button class="btn btn-w4-success">Next</button>
                     </div>
				</div> 
			</div> 
		</Form>
    )}
	 
	{showIfMarried && ( 
		<Form  id="steps-uid-0" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveDataIfMarried)}>
			<div class="step step-1">
				<div class="firststep-panel">
					<h2 class="step-mainheading">Do you plan to file with your spouse?</h2>
					<p>In most cases, filing jointly with your spouse results in a lower tax bill. This means you and your spouse report combined income and deduct your combined expenses. Choose No if you're married and plan to file separately.

</p>
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
							<button class="btn btn-w4-success">Next</button>
                     </div>
				</div> 
			</div> 
		</Form>
    )} 
	 
</div>	
 	
  );
};
