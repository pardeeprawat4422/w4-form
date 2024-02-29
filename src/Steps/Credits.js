import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppState } from "../state";
import { Button, Field, Form, Input, Redio } from "../Forms";
import React, { useState, useEffect } from "react";

export const Credits = () => {
  const [state, setState] = useAppState();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });

  const [showdependentsclaiming, setShowdependentsclaiming] = useState(true); // Show Married section
  const [showdependents, setShowdependents] = useState(false); // Hide Household section
  const [showOthercredits, setShowOthercredits] = useState(false); // Hide Household section
  const [attributeValue, setAttributeValue] = useState("initialValue");
  const [numberOfDependents, setNumberOfDependents] = useState(parseInt(2));
  const navigate = useNavigate();
  const DependentsData = [];

  for (let i = 0; i < numberOfDependents; i++) {
    DependentsData.push({ name: `Dependent ${i + 1}` });
  }
  const saveDatadependentsclaiming = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 3);
    if (data.dependentsclaiming == "Yesdependents") {
      setShowdependentsclaiming(false);
      setShowdependents(true);
    } else {
      setShowdependentsclaiming(false);
      setShowOthercredits(true);
    }
  };

  const showdependentsData = (data) => {
    document.getElementById("example").setAttribute("data-percentage", 9);
    setState({ ...state, ...data });
    setShowdependents(false);
    setShowOthercredits(true);
  };
  const OthercreditsData = (data) => {
    document.getElementById("example").setAttribute("data-percentage", 9);
    setState({ ...state, ...data });
    navigate("/deductions");
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
  }, [showdependents, showOthercredits]);

  const PreviousStepToIncome = () => {
    document.getElementById("example").setAttribute("data-percentage", 25);
    navigate("/income");
  };

  const PreviousDdependents = () => {
    document.getElementById("example").setAttribute("data-percentage", 6);
    setShowdependents(false);
    setShowdependentsclaiming(true);
  };

  const PreviousOthercredits = () => {
    if (state.dependentsclaiming == "Yesdependents") {
      setShowdependents(true);
      setShowOthercredits(false);
    } else {
      setShowdependentsclaiming(true);
      setShowOthercredits(false);
    }
  };

  const addNewDependent = () => {
    setNumberOfDependents((prevCount) => prevCount + 1);
    setTimeout(() => {
      // Attach event listeners to newly added input fields
      document.querySelectorAll('input[type="text"]').forEach((input) => {
        input.addEventListener("input", updateHighlighting);
      });
      document.querySelectorAll("select").forEach((input) => {
        input.addEventListener("select", updateHighlighting);
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
    <div class="w4-main-container">
      {showdependentsclaiming && (
        <Form
          id="steps-2"
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(saveDatadependentsclaiming)}
        >
          <h2 class="text-center font-weight-bold">
            Are you claiming any dependents?
          </h2>
          <p class="text-center">
            Include any qualifying children, relatives, or household members
            whom you plan to claim.
          </p>
          <div class="status-panel">
            <ul class="selection-panel mt-5 p-4">
              <li>
                <div class="form-check py-3">
                  <input
                    {...register("dependentsclaiming", {
                      required: "Please select an option",
                    })}
                    value="Yesdependents"
                    type="radio"
                    class="form-check-input"
                  />
                  <label class="form-check-label yes">Yes</label>
                </div>
              </li>
              <li>
                <div class="form-check py-3">
                  <input
                    {...register("dependentsclaiming", {
                      required: "Please select an option",
                    })}
                    value="Nodependents"
                    type="radio"
                    class="form-check-input"
                  />
                  <label class="form-check-label no">No</label>
                </div>
              </li>
              {errors.household && (
                <p class="text-center mt-5">
                  <span class="error_msg text-danger mx-auto mt-5">
                    {errors.household.message}
                  </span>
                </p>
              )}
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousStepToIncome}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {showdependents && (
        <Form
          id="steps-2"
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(showdependentsData)}
        >
          <h1 class="text-center font-weight-bold">
            Tell us about your dependents
          </h1>
          <p class="text-center">
            his helps us determine which dependent-related tax breaks you might
            qualify for. Examples include Earned Income Tax Credit, Child Tax
            Credit, and Credit for Other Dependents.Enter Dependent-1 name
          </p>

          <div id="container">
            {DependentsData.map((dependent, index) => (
              <div key={index} class="jobs-panel">
                <div class="add-jobs">
                  <div class="edit-heading mb-3 w-100">
                    <h2 id="editable" onclick="makeEditable(this)">
                      {dependent.name}
                    </h2>
                  </div>
                  <div class="action-button">
                    <a
                      href="#"
                      class="del-btn"
                      onclick="deleteDiv()"
                      style={{ marginTop: "-15px" }}
                    ></a>
                  </div>
                </div>
                <ul class="selection-panel">
                  <li>
                    <div class="tool-input position-relative my-2">
                      <input
                        type="text"
                        placeholder="$0"
                        {...register(`dependents-${index + 1}`, {
                          required: "Please select an option",
                        })}
                        id={`creditdependents${index + 1}`}
                      />
                      <label for={`creditdependents${index + 1}`} id="label">
                        Age as of Jan 1, 2024
                      </label>
                    </div>
                  </li>
                  <li class="py-4">
                    <div class="check-panel">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="Student"
                          {...register(`dependentstype${index + 1}[]`)}
                        />
                        <label class="form-check-label" for="defaultCheck1">
                          Student
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="Disabled"
                          {...register(`dependentstype${index + 1}[]`)}
                        />
                        <label class="form-check-label" for="defaultCheck2">
                          Disabled
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="LWM"
                          {...register(`dependentstype${index + 1}[]`)}
                        />
                        <label class="form-check-label" for="defaultCheck3">
                          Lives with me
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>
		  <div class="add-another-job">
			  <a class="add-job-btn" onClick={addNewDependent}>
				Add another job{" "}
			  </a>
		  </div>
          <button
            class="btn btn-w4-success Previousform"
            onClick={PreviousDdependents}
          >
            previous
          </button>
          <div class="form-footer mt-5 pt-4 text-center">
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {showOthercredits && (
        <Form
          id="steps-2"
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(OthercreditsData)}
        >
          <h1 class="text-center font-weight-bold">Other credits</h1>
          <p class="text-center">
            Credits can reduce the amount of tax you owe or increase your
            refund. Accounting for them on your W-4 will increase your paycheck.
            Examples include the credits for child and dependent care and
            education.
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input position-relative my-2">
                  <input type="text" placeholder="" id="othercredit" />
                  <label for="othercredit" id="label">
                    Other credits
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousOthercredits}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
    </div>
  );
};
