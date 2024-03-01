import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state";
import { Button, Field, Form, Input, Redio } from "../Forms";
import React, { useState, useRef, useEffect } from "react";
export const Income = () => {
  const [state, setState] = useAppState();
  const {
    handleSubmit,
    register,
    watch,
	setValue,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });

  const [showAccounting, setShowccounting] = useState(true); // Show Married section
  const [showInterestIncome, setShowInterestIncome] = useState(false);
  const [showDividendIncome, setShowDividendIncome] = useState(false);
  const [showretirementIncome, setShowretirementIncome] = useState(false);
  const [showSelfemploymentIncome, setShowSelfemploymentIncome] = useState(false);
  const [showUnemploymentIncome, setShowUnemploymentIncome] = useState(false);
  const [attributeValue, setAttributeValue] = useState("initialValue");
  const [noneApplyChecked, setNoneApplyChecked] = useState(false);
  const navigate = useNavigate();
  
  const [numberOfInterestData, setNumberOfInterestData] = useState(parseInt(2));
  const InterestData = [];
  for (let i = 0; i < numberOfInterestData; i++) {
    InterestData.push({ name: `Income Source ${i + 1}` });
  }
  
  const saveAccountingData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 35);

    if (data.accountNoneapply == "noneApply") {
      navigate("/credits");
    } else if (data.accountInterest == "Interest") {
      setShowccounting(false);
      setShowInterestIncome(true);
    } else if (data.accountDividend == "Dividend") {
      setShowccounting(false);
      setShowDividendIncome(true);
    } else if (data.accountRetirement == "Retirement") {
      setShowccounting(false);
      setShowretirementIncome(true);
    } else if (data.accountSelfEmployment == "Self-employment") {
      setShowccounting(false);
      setShowSelfemploymentIncome(true);
    } else if (data.accountUnemployment == "Unemployment") {
      setShowccounting(false);
      setShowUnemploymentIncome(true);
    }
  };

  const saveInterestData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 40);
    if (data.accountDividend == "Dividend") {
      setShowInterestIncome(false);
      setShowDividendIncome(true);
    } else if (data.accountRetirement == "Retirement") {
      setShowInterestIncome(false);
      setShowretirementIncome(true);
    } else if (data.accountSelfEmployment == "Self-employment") {
      setShowInterestIncome(false);
      setShowSelfemploymentIncome(true);
    } else if (data.accountUnemployment == "Unemployment") {
      setShowInterestIncome(false);
      setShowUnemploymentIncome(true);
    } else {
      navigate("/credits");
    }
  };

  const saveDividendData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 42);
    if (data.accountRetirement == "Retirement") {
      setShowDividendIncome(false);
      setShowretirementIncome(true);
    } else if (data.accountSelfEmployment == "Self-employment") {
      setShowDividendIncome(false);
      setShowSelfemploymentIncome(true);
    } else if (data.accountUnemployment == "Unemployment") {
      setShowDividendIncome(false);
      setShowUnemploymentIncome(true);
    } else {
      navigate("/credits");
    }
  };

  const retirementIncomeData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 43);
    if (data.accountSelfEmployment == "Self-employment") {
      setShowretirementIncome(false);
      setShowSelfemploymentIncome(true);
    } else if (data.accountUnemployment == "Unemployment") {
      setShowretirementIncome(false);
      setShowUnemploymentIncome(true);
    } else {
      navigate("/credits");
    }
  };

  const SelfemploymentIncomeData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 44);
    if (data.accountUnemployment == "Unemployment") {
      setShowSelfemploymentIncome(false);
      setShowUnemploymentIncome(true);
    } else {
      navigate("/credits");
    }
  };

  const ShowUnemploymentIncomeData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 45);
    navigate("/credits");
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

    // Function to apply highlighting on input change
    function handleInputChange(event) {
      const inputVal = event.target.value;
      const labelFor = event.target.id;
      const label = document.querySelector(`label[for='${labelFor}']`);
      if (label) {
        if (inputVal) {
          label.classList.add("highlight");
        } else {
          label.classList.remove("highlight");
        }
      }
    }

    // Attach event listeners to inputs for immediate highlighting
    document.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", handleInputChange);
    });

    // Clean up event listeners on component unmount
    return () => {
      document.querySelectorAll("input").forEach((input) => {
        input.removeEventListener("input", handleInputChange);
      });
    };
  }, [
    showInterestIncome,
    showDividendIncome,
    showretirementIncome,
    showSelfemploymentIncome,
    showUnemploymentIncome,
  ]);
  
  
  const handleNoneApplyChange = (event) => {
    const { checked } = event.target;
    setNoneApplyChecked(checked);

    // If "None apply" is checked, uncheck all other checkboxes
    if (checked) {
      setValue("accountInterest", false);
      setValue("accountDividend", false);
      setValue("accountRetirement", false);
      setValue("accountSelfEmployment", false);
      setValue("accountUnemployment", false);
    }
  };
  
  
  const handleCheckboxChange = (name, checked) => {
    // If any other checkbox is checked, uncheck "None apply"
    if (checked) {
      setNoneApplyChecked(false);
      setValue("accountNoneapply", false);
    }
    setValue(name, checked); // Update the form state with the new checkbox value
  };
  
  
  const PreviousStepToAbout = () => {
    document.getElementById("example").setAttribute("data-percentage", 25);
    navigate("/");
  };

  const PreviousinterstMarried = () => {
    document.getElementById("example").setAttribute("data-percentage", 42);
    setShowInterestIncome(false);
    setShowccounting(true);
  };
  const PreviousDividendincome = () => {
    document.getElementById("example").setAttribute("data-percentage", 35);
    setShowDividendIncome(false);
    setShowccounting(true);
  };
  const PreviousTaxableincome = () => {
    document.getElementById("example").setAttribute("data-percentage", 34);
    setShowretirementIncome(false);
    setShowccounting(true);
  };
  const Previousstudentincome = () => {
    document.getElementById("example").setAttribute("data-percentage", 30);
    setShowSelfemploymentIncome(false);
    setShowccounting(true);
  };
  const PreviouUnemploymentincome = () => {
    document.getElementById("example").setAttribute("data-percentage", 25);
    setShowUnemploymentIncome(false);
    setShowccounting(true);
  };
  
  const addNewJob = () => {
    setNumberOfInterestData((prevCount) => prevCount + 1);
  };
  
  const DeleteNewJob = () => {
    setNumberOfInterestData((prevCount) => prevCount - 1);
  };

 return (
    <div class="w4-main-container">
      {showAccounting && (
        <Form
          id="steps-1"
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(saveAccountingData)}
        >
          <h2 class="text-center font-weight-bold">
            Accounting for other income
          </h2>
          <p class="text-center">
            If you want to use your job to help pay for taxes for other sources
            of income, include them here. Including this information increases
            calculation accuracy.
          </p>
          <div class="status-panel">
            <ul class="selection-panel income-panel row m-0 mt-5 py-4">
              <li class="col-md-4 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountInterest")}
                    type="checkbox"
                    id="interestIncome"
                    value="Interest"
					checked={watch("accountInterest")}
                    onChange={(e) => handleCheckboxChange("accountInterest", e.target.checked)}
      
                  />
                  <label for="interestIncome" class="single-tile">
                    Interest
                  </label>
                </div>
              </li>
              <li class="col-md-4 my-3">
                <div class="select-check position-relative">
                  <input
                   {...register("accountDividend")}
                    type="checkbox"
                    id="dividentIncome"
                    value="Dividend"
					checked={watch("accountDividend")}
                    onChange={(e) => handleCheckboxChange("accountDividend", e.target.checked)}
                  />
                  <label for="dividentIncome" class="single-tile">
                    Dividend
                  </label>
                </div>
              </li>
              <li class="col-md-4 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountRetirement")}
                    type="checkbox"
                    id="retirementIncome"
                    value="Retirement"
					checked={watch("accountRetirement")}
                    onChange={(e) => handleCheckboxChange("accountRetirement", e.target.checked)}
                  />
                  <label for="retirementIncome" class="single-tile">
                    Retirement
                  </label>
                </div>
              </li>
              <li class="col-md-4 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountSelfEmployment")}
                    type="checkbox"
                    id="selfEmploymentIncome"
                    value="Self-employment"
					checked={watch("accountSelfEmployment")}
                    onChange={(e) => handleCheckboxChange("accountSelfEmployment", e.target.checked)}
                  />
                  <label for="selfEmploymentIncome" class="single-tile">
                    Self-employment
                  </label>
                </div>
              </li>
              <li class="col-md-4 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountUnemployment")}
                    type="checkbox"
                    id="unemploymentIncome"
                    value="Unemployment"
					checked={watch("accountUnemployment")}
                    onChange={(e) => handleCheckboxChange("accountUnemployment", e.target.checked)}
                  />
                  <label for="unemploymentIncome" class="single-tile">
                    Unemployment
                  </label>
                </div>
              </li>
              <li class="col-md-4 my-3">
                <div class="select-check position-relative">
                  <input
                    type="checkbox"
                    {...register("accountNoneapply")}
                    value="noneApply"
                    id="noneApply"
					checked={noneApplyChecked}
                    onChange={handleNoneApplyChange}
                  />
                  <label for="noneApply" class="single-tile">
                    None apply
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousStepToAbout}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {showInterestIncome && (
        <Form
          id="steps-3"
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(saveInterestData)}
        >
          <h2 class="text-center font-weight-bold">Interest income</h2>
          <p class="text-center">Examples include bank deposits and bonds.</p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input position-relative my-2">
                  <input
                    {...register("InterestIncome", {
                      required: "This field is required",
                    })}
                    type="number"
                    id="InterestIncome"
                  />
                  <label for="InterestIncome">Interest Income</label>
                </div>
              </li>
              {errors.InterestIncome && (
                <p class="text-center mt-5">
                  <span class="error_msg text-danger mx-auto mt-5">
                    {errors.InterestIncome.message}
                  </span>
                </p>
              )}
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousinterstMarried}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {showDividendIncome && (
        <Form
          id="steps-3"
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(saveDividendData)}
        >
          <h2 class="text-center font-weight-bold">Dividend income</h2>
          <p class="text-center">
            Examples are monthly and/or quarterly ordinary dividends.
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input position-relative my-2">
                  <input
                    {...register("Dividendincome", {
                      required: "This field is required",
                    })}
                    type="number"
                    id="Dividendincome"
                  />
                  <label for="Dividendincome">Dividend income</label>
                </div>
              </li>
              {errors.Dividendincome && (
                <p class="text-center mt-5">
                  <span class="error_msg text-danger mx-auto mt-5">
                    {errors.Dividendincome.message}
                  </span>
                </p>
              )}
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousDividendincome}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {showretirementIncome && (
        <Form
          id="steps-4"
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(retirementIncomeData)}
        >
          <h2 class="text-center font-weight-bold">
            Taxable retirement income
          </h2>
          <p class="text-center">Examples include 401(k)s and IRAs.</p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input position-relative my-2">
                  <input
                    {...register("Taxableretirementincome", {
                      required: "This field is required",
                    })}
                    type="number"
                    id="Taxableretirementincome"
                  />
                  <label for="Taxableretirementincome">
                    Taxable retirement income
                  </label>
                </div>
              </li>
              {errors.Taxableretirementincome && (
                <p class="text-center mt-5">
                  <span class="error_msg text-danger mx-auto mt-5">
                    {errors.Taxableretirementincome.message}
                  </span>
                </p>
              )}
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousTaxableincome}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {showSelfemploymentIncome && (
        <Form
          id="steps-4"
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(SelfemploymentIncomeData)}
        >
          <h1 class="text-center font-weight-bold">Self-employment income</h1>
          <p class="text-center">
            Generally, taxes from self-employment income are paid through
            estimated payments as they’re not accounted for through W-4
            withholdings. Entering information here can increase your
            calculation accuracy, but may cause more to be withheld from your
            paycheck.
          </p>

          <div id="container">
		    {InterestData.map((interest, index) => (
				<div key={index} class="jobs-panel">
				  <div class="add-jobs">
					<h4>{interest.name}</h4>
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
					  <div class="tool-input position-relative my-2">
						<input type="text" {...register(`netprofit-${index + 1}`)} placeholder="$0" id={`Netprofit-${index + 1}`} />
						<label for={`Netprofit-${index + 1}`}>Net Profit </label>
					  </div>
					</li>
					<li>
					  <div class="tool-input position-relative my-2">
						<input type="text" {...register(`eqp-${index + 1}`)} placeholder="$0" id={`EQP-${index + 1}`} />
						<label for={`EQP-${index + 1}`}>Estimated quarterly payments</label>
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
              onClick={Previousstudentincome}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {showUnemploymentIncome && (
        <Form
          id="steps-4"
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(ShowUnemploymentIncomeData)}
        >
          <h2 class="text-center font-weight-bold">Unemployment income</h2>
          <p class="text-center">Taxable income from unemployment.</p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input position-relative my-2">
                  <input
                    {...register("Unemployment", {
                      required: "This field is required",
                    })}
                    type="number"
                    id="Unemployment"
                  />
                  <label for="Unemployment">Unemployment income</label>
                </div>
              </li>
              {errors.Unemployment && (
                <p class="text-center mt-5">
                  <span class="error_msg text-danger mx-auto mt-5">
                    {errors.Unemployment.message}
                  </span>
                </p>
              )}
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviouUnemploymentincome}
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
