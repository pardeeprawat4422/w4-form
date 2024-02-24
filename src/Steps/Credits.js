import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppState } from "../state"; 
import { Button, Field, Form, Input,Redio } from "../Forms";
import React, { useState } from 'react';

export const Credits = () => {
  const [state, setState] = useAppState();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });
  
	const [showdependentsclaiming, setShowdependentsclaiming] = useState(true);  // Show Married section
	const [showdependents, setShowdependents] = useState(false); // Hide Household section
	const [showOthercredits, setShowOthercredits] = useState(false); // Hide Household section
    const [attributeValue, setAttributeValue] = useState('initialValue');
	
	const navigate = useNavigate();
	const saveDatadependentsclaiming = (data) => {
		setState({ ...state, ...data });
		document.getElementById("example").setAttribute("data-percentage", 3);
		if (data.dependentsclaiming == 'Yesdependents' ) {
			setShowdependentsclaiming(false)
			setShowdependents(true)
		} else {
			 setShowdependentsclaiming(false)
			setShowOthercredits(true) 
		}
	};
	
	const showdependentsData = (data) => {
	  document.getElementById("example").setAttribute("data-percentage", 9);
		setState({ ...state, ...data });
		setShowdependents(false)
		setShowOthercredits(true)
	};
	const OthercreditsData = (data) => {
	  document.getElementById("example").setAttribute("data-percentage", 9);
		setState({ ...state, ...data });
		navigate("/deductions");
	}; 

   const PreviousStepToIncome = () => {
    document.getElementById("example").setAttribute("data-percentage", 25);
    navigate("/income");
   };
   
   const PreviousDdependents = () => {
		document.getElementById("example").setAttribute("data-percentage", 6);
		setShowdependents(false)
		setShowdependentsclaiming(true)	
	};
	
  const PreviousOthercredits  = () => {
	    if(state.dependentsclaiming == "Yesdependents"){
			setShowdependents(true)
			setShowOthercredits(false)
		}
		else{
			setShowdependentsclaiming(true)
			setShowOthercredits(false)
		}
	}
	
return (
	<div class="w4-main-container">
		{showdependentsclaiming && ( 
			<Form  id="steps-2" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveDatadependentsclaiming)}>
			<h2 class="text-center font-weight-bold">Are you claiming any dependents?</h2>
				<p class="text-center">Include any qualifying children, relatives, or household members whom you plan to claim.</p>
				<div class="status-panel">
					<ul class="selection-panel mt-5 p-4">
						<li>
							<div class="form-check py-3">
								<input  {...register("dependentsclaiming", { required: "Please select an option" })} value="Yesdependents" type="radio" class="form-check-input"   />
								<label class="form-check-label yes">
									Yes
								</label>
							</div>
						</li>
						<li>
							<div class="form-check py-3">
								<input  {...register("dependentsclaiming", { required: "Please select an option" })}  value="Nodependents" type="radio" class="form-check-input"  />
								<label class="form-check-label no">
								No
								</label>
								
							</div>
						</li>
						{errors.household && <p class="text-center mt-5"><span class="error_msg text-danger mx-auto mt-5">{errors.household.message}</span></p>}
					</ul>
				</div>
				<div class="form-footer mt-5 pt-4 text-center">
					<button
					  class="btn btn-w4-success Previousform"
					  onClick={PreviousStepToIncome}
					>
					  previous
					</button>
					<button  class="btn btn-primary">Next</button>
				</div>
			</Form>		
		)}
	{showdependents && ( 
			<Form  id="steps-2" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(showdependentsData)}>
		                  <h1 class="text-center font-weight-bold">Tell us about your dependents</h1>
                    <p class="text-center">his helps us determine which dependent-related tax breaks you might qualify for. Examples include Earned Income Tax Credit, Child Tax Credit, and Credit for Other Dependents.Enter Dependent-1 name</p>
                    
                    <div id="container">

                    <div class="jobs-panel">
                        <div class="add-jobs">
                            <div class="edit-heading mb-3 w-100">
                                <h2 id="editable" onclick="makeEditable(this)">Dependent  1</h2>
                            </div>
                            <div class="action-button">
                                <a href="#" class="del-btn" onclick="deleteDiv()" style={{ marginTop: '-15px' }}></a>
                            </div>
                        </div>
                        <ul class="selection-panel">
                            <li>
                                <div class="tool-input position-relative my-2" >
                                    <input type="text" {...register("dependents", { required: "Please select an option" })} placeholder="$0" id="textInput"  oninput="addClassToLabel()" />
                                    <label for="" id="label">Age as of Jan 1, 2024</label>
                                </div>
                            </li>
                            <li class="py-4">
                                <div class="check-panel">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                        <label class="form-check-label" for="defaultCheck1">
                                            Student
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                                        <label class="form-check-label" for="defaultCheck2">
                                            Disabled
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" />
                                        <label class="form-check-label" for="defaultCheck3">
                                            Lives with me
                                        </label>
                                      </div>
                                </div>  
                            </li>
                            
                        </ul>
                    </div>

                    <div class="jobs-panel new-div mt-5" id="template-div">
                        <div class="jobs-panel">
                            <div class="add-jobs">
                                <div class="edit-heading mb-3 w-100">
                                    <h2 id="editable" onclick="makeEditable(this)">Dependent  2</h2>
                                </div>
                                <div class="action-button">
                                    <a href="#" class="del-btn" onclick="deleteDiv()" style={{ marginTop: '-15px' }}></a>
                                </div>
                            </div>
                            <ul class="selection-panel">
                                <li>
                                    <div class="tool-input position-relative my-2" >
                                        <input type="text" placeholder="$0" id="textInput1"  oninput="addClassToLabel()" />
                                        <label for="" id="label1">Age as of Jan 1, 2024</label>
                                    </div>
                                </li>
                                <li class="py-4">
                                    <div class="check-panel">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck4" />
                                            <label class="form-check-label" for="defaultCheck4">
                                                Student
                                            </label>
                                          </div>
                                          <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck5" />
                                            <label class="form-check-label" for="defaultCheck5">
                                                Disabled
                                            </label>
                                          </div>
                                          <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck6" />
                                            <label class="form-check-label" for="defaultCheck6">
                                                Lives with me
                                            </label>
                                          </div>
                                    </div>  
                                </li>
                                {errors.dependents && <p class="text-center mt-5"><span class="error_msg text-danger mx-auto mt-5">{errors.dependents.message}</span></p>}
                            </ul>
                        </div>
                    </div>



                    </div>

                    <button class="add-job-btn" onclick="addDiv()">Add another job </button>
					<button class="btn btn-w4-success Previousform" onClick={PreviousDdependents}>previous</button>
                    <div class="form-footer mt-5 pt-4 text-center">
                        <button  class="btn btn-primary">Next</button>
                    </div>
				</Form>	
            )}
		{showOthercredits && ( 
			<Form  id="steps-2" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(OthercreditsData)}>
				<h1 class="text-center font-weight-bold">Other credits</h1>
                    <p class="text-center">Credits can reduce the amount of tax you owe or increase your refund. Accounting for them on your W-4 will increase your paycheck. Examples include the credits for child and dependent care and education.</p>
                    <div class="jobs-panel" >
                        <ul class="selection-panel">
                            <li>
                                <div class="tool-input position-relative my-2" >
                                    <input type="text" placeholder="" id="textInput"  oninput="addClassToLabel()" />
                                    <label for="" id="label">Other credits</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="form-footer mt-5 pt-4 text-center">
					<button class="btn btn-w4-success Previousform" onClick={PreviousOthercredits}>previous</button>
                        <button  class="btn btn-primary">Next</button>
                    </div>
					
			</Form>	
            )}
		
    </div>	
 	
  );
};
