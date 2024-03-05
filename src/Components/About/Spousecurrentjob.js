import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../state";

import { Button, Field, Form, Input, Redio } from "../../Forms";

export const Spousecurrentjob = ({
  state,
  setState,
  showSpouseCurrentJobs,
  setshowSpouseCurrentJobs,
  showSpouseJobs,
  setShowSpouseJobs,
  showSpouseTwoJobs,
  setshowSpouseTwoJobs,
  showSpouseLeaveJobs,
  setshowSpouseLeaveJobs,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });
  const [numberOfJobs, setNumberOfJobs] = useState(
    parseInt(state.howmanyspousejob)
  );
  const jobsData = [];
  // Populate jobsData array based on the numberOfJobs variable
  for (let i = 0; i < numberOfJobs; i++) {
    jobsData.push({ name: `Job ${i + 1}` });
  }

  const savespouseCurrentJobs = (data) => {
    document.getElementById("example").setAttribute("data-percentage", 22);
    const updatedCount = numberOfJobs;
    setState({ ...state, ...data, howmanyspousejob: updatedCount });
    if (state.howmanyspousejob == 2) {
      setshowSpouseCurrentJobs(false);
      setshowSpouseTwoJobs(true);
    } else {
      setshowSpouseCurrentJobs(false);
      setshowSpouseLeaveJobs(true);
    }
  };

  useEffect(() => {
    function applyInitialHighlighting() {
      document.querySelectorAll("input, select").forEach((element) => {
        const inputVal = element.value;
        const labelFor = element.getAttribute("id");
        const label = document.querySelector(`label[for='${labelFor}']`);
        if (label) {
          if (inputVal) {
            label.classList.add("highlight");
          } else {
            label.classList.remove("highlight");
          }
        }
      });
    }

    applyInitialHighlighting();

    // Attach event listeners to input and select elements to dynamically update highlighting
    document.querySelectorAll("input, select").forEach((element) => {
      element.addEventListener("input", updateHighlighting);
      element.addEventListener("change", updateHighlighting);
    });

    return () => {
      // Clean up event listeners when component unmounts
      document.querySelectorAll("input, select").forEach((element) => {
        element.removeEventListener("input", updateHighlighting);
        element.removeEventListener("change", updateHighlighting);
      });
    };
  }, []);

  const Previousspousecurrentjobs = () => {
    setshowSpouseCurrentJobs(false);
    setShowSpouseJobs(true);
  };
  const updateHighlighting = (event) => {
    const inputVal = event.target.value;
    const labelFor = event.target.getAttribute("id");
    const label = document.querySelector(`label[for='${labelFor}']`);
    if (label) {
      if (inputVal) {
        label.classList.add("highlight");
      } else {
        label.classList.remove("highlight");
      }
    }
  };
  const addNewJob = () => {
    setNumberOfJobs((prevCount) => prevCount + 1);
    setTimeout(() => {
      // Attach event listeners to newly added input fields
      document.querySelectorAll('input[type="text"]').forEach((input) => {
        input.addEventListener("input", updateHighlighting);
      });
      document.querySelectorAll("select").forEach((input) => {
        input.addEventListener("change", updateHighlighting);
      });
    }, 0);
  };
  
  const DeleteNewJob = () => {
    setNumberOfJobs((prevCount) => prevCount - 1);
    setTimeout(() => {
      // Attach event listeners to newly added input fields
      document.querySelectorAll('input[type="text"]').forEach((input) => {
        input.addEventListener("input", updateHighlighting);
      });
      document.querySelectorAll("select").forEach((input) => {
        input.addEventListener("change", updateHighlighting);
      });
    }, 0);
  };
  
  
  return (
    <Form
      id="steps-14"
      class="tab-wizard wizard-circle wizard clearfix"
      onSubmit={handleSubmit(savespouseCurrentJobs)}
    >
      <h1 class="text-center font-weight-bold">
        How much are you and your spouse paid yearly for your current job(s)?
      </h1>
      <p class="text-center">
        Please input information from all W-2 jobs only.
      </p>
      <div id="container">
        {jobsData.map((job, index) => (
          <div key={index} class="jobs-panel">
            <div class="add-jobs">
              <h4>{job.name}</h4>
			  <div class="action-button">
			    {index ==0 ? (
					<div></div> 
				) : (
				  <div>
					<a href="#" class="del-btn" onClick={DeleteNewJob}></a>
				  </div>
				)}
			  </div>
            </div>
            <ul class="selection-panel">
              <li class="py-4">
                <div class="radio-panel">
                  <div class="form-check mr-4">
                    <input
                      type="radio"
                      class="form-check-input"
                      id={`tpSpjobsOption${index + 1}`}
                      {...register(`tpSpjobsOption${index + 1}`, {
                        required: "Please select an option",
                      })}
                      value="MyJob"
                    />
                    My job
                    <label class="form-check-label" for="radio1"></label>
                  </div>
                  <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input"
                      id={`tpSpjobsOption${index + 1}`}
                      {...register(`tpSpjobsOption${index + 1}`, {
                        required: "Please select an option",
                      })}
                      value="SpouseJob"
                    />
                    Spouse job
                    <label class="form-check-label" for="radio2"></label>
                  </div>
                </div>
              </li>
              {errors.tpSpjobsOption && (
                <p class="text-center mt-5">
                  <span class="error_msg text-danger mx-auto mt-5">
                    {errors.tpSpjobsOption.message}
                  </span>
                </p>
              )}
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    type="text"
                    id={`yearlysalery${index + 1}`}
                    {...register(`yearlysalery-${index + 1}`)}
                  />
                  <label for={`yearlysalery${index + 1}`}>Yearly Salary</label>
                </div>
              </li>

              <li>
                <div class="tool-input position-relative my-2">
                  <select
                    class="form-control"
                    id={`selectpayfreq${index + 1}`}
                    onchange="addClassToSelectLabel()"
                    {...register(`selectpayfreq-${index + 1}`, {
                      required: "Please select an option",
                    })}
                  >
                    <option value="" selected></option>
                    <option value="biweekly">biweekly</option>
                    <option value="monthly">monthly</option>
                    <option value="quarterly">quarterly</option>
                    <option value="semimonthly">semimonthly</option>
                    <option value="weekly">weekly</option>
                  </select>
                  <label for={`selectpayfreq${index + 1}`}>
                    Pay frequently
                  </label>
                </div>
                {errors.selectpayfreq1 && (
                  <p class="text-center mt-5">
                    <span class="error_msg text-danger mx-auto mt-5">
                      {errors.selectpayfreq1.message}
                    </span>
                  </p>
                )}
              </li>
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    type="text"
                    id={`lastpaycheck${index + 1}`}
                    {...register(`lastpaycheck-${index + 1}`)}
                  />
                  <label for={`lastpaycheck${index + 1}`}>
                    Withholding on last paycheck
                  </label>
                </div>
              </li>
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    type="text"
                    id={`totalwithholding${index + 1}`}
                    {...register(`totalwithholding-${index + 1}`)}
                  />
                  <label for={`totalwithholding${index + 1}`}>
                    Total withholding (year to date)
                  </label>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div class="add-another-job">
		  <a href="#" class="add-job-btn" onClick={addNewJob}>
			Add another job{" "}
		  </a>
      </div>

      <div class="form-footer mt-5 pt-4 text-center">
        <button
          class="btn btn-w4-success Previousform"
          onClick={Previousspousecurrentjobs}
        >
          previous
        </button>
        <button class="btn btn-primary">Next</button>
      </div>
    </Form>
  );
};
