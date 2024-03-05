import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../state";
import { Button, Field, Form, Input, Redio } from "../../Forms";

export const Singlepriorjob = ({
  state,
  setState,
  showSingleLeaveJobs,
  setshowSingleLeaveJobs,
  showSinglePriorJobs,
  setshowSinglePriorJobs,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });
  const navigate = useNavigate();
  const [numberOfsinglepriorjob, setNumberOfJobs] = useState(parseInt(1));
  const singlepriorjobsData = [];
  
  // Populate jobsData array based on the numberOfJobs variable
  for (let i = 0; i < numberOfsinglepriorjob; i++) {
    singlepriorjobsData.push({ name: `Prior Job ${i + 1}` });
  }

  const savesinglepriorJobs = (data) => {
    document.getElementById("example").setAttribute("data-percentage", 25);
    setState({ ...state, ...data });
    navigate("/income");
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

  const Previoussinglepriorjobs = () => {
    setshowSingleLeaveJobs(true);
    setshowSinglePriorJobs(false);
  };

  const addNewPriorJob = () => {
    setNumberOfJobs((prevCount) => prevCount + 1);
    setTimeout(() => {
      // Attach event listeners to newly added input fields
      document.querySelectorAll('input[type="text"]').forEach((input) => {
        input.addEventListener("input", updateHighlighting);
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
    }, 0);
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

  return (
    <Form
      id="steps-15"
      class="tab-wizard wizard-circle wizard clearfix"
      onSubmit={handleSubmit(savesinglepriorJobs)}
    >
      <h1 class="text-center font-weight-bold">
        How much are you paid yearly for your current job(s)?
      </h1>
      <p class="text-center">
        Please input information from all W-2 jobs only.
      </p>

      <div id="container">
        {singlepriorjobsData.map((job, index) => (
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
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    type="text"
              
                    id={`Salaryytd${index + 1}`}
                    {...register(`saleryyrd-${index + 1}`)}
                  />
                  <label htmlFor={`Salaryytd${index + 1}`}>
                    Salary (Year to Date)
                  </label>
                </div>
              </li>

              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    type="text"
                    id={`withholding${index + 1}`}
                    {...register(`withholding-${index + 1}`)}
                  />
                  <label htmlFor={`withholding${index + 1}`}>
                    Withholding (Year to Date)
                  </label>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
	  <div class="add-another-job">
		  <a href="#" class="add-job-btn" onClick={addNewPriorJob}>
			Add another job{" "}
		  </a>
	  </div>
      <div class="form-footer mt-5 pt-4 text-center">
        <button
          class="btn btn-w4-success Previousform"
          onClick={Previoussinglepriorjobs}
        >
          previous
        </button>
        <button class="btn btn-primary">Next</button>
      </div>
    </Form>
  );
};
