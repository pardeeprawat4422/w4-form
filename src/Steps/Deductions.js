import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state";
import { Button, Field, Form, Input, Redio } from "../Forms";
import React, { useState, useRef, useEffect } from "react";

export const Deductions = () => {
  const [state, setState] = useAppState();
  const {
    handleSubmit,
    register,
    watch,
	setValue,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });
 console.log(state)
  const [saveDeduction, setShowDeductionData] = useState(true); // Show setShowDeductionData section
  const [saveDeductionApply, setShowDeductionApply] = useState(false); // Show setShowDeductionApply section
  const [saveStudentApply, setShowStudentApply] = useState(false); // Show setShowDeductionApply section
  const [saveIRAcontributions, setShowIRAcontributions] = useState(false); // Show setShowDeductionApply section
  //No Case Function
  const [saveNoDeductionApply, setShowNoDeductionApply] = useState(false); // Show setShowDeductionApply section
  const [savehomemortgage, setShowhomemortgage] = useState(false); // Show setShowDeductionApply section
  const [saveCharitabledonations, setShowCharitabledonations] = useState(false); // Show setShowDeductionApply section
  const [saveStateIncome, setShowStateIncome] = useState(false); // Show setShowDeductionApply section
  const [saveMedicalexpenses, setShowMedicalexpenses] = useState(false); // Show setShowDeductionApply section
  const [saveStudentloaninterestno, setShowStudentloaninterestno] = useState(false); // Show setShowDeductionApply section
  const [saveIRAcontributionsNo, setShowIRAcontributionsNo] = useState(false); // Show setShowDeductionApply section
  const [saveOtherdeductions, setShowOtherdeductions] = useState(false); // Show setShowDeductionApply section

  const [attributeValue, setAttributeValue] = useState("initialValue");
  const [noneApplyChecked, setNoneApplyChecked] = useState(false);
  const navigate = useNavigate();
  
  const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  /* End Dollar Sign */
  
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
    saveDeduction,
    saveDeductionApply,
    saveStudentApply,
    saveIRAcontributions,
    saveNoDeductionApply,
    savehomemortgage,
    saveCharitabledonations,
    saveStateIncome,
    saveMedicalexpenses,
    saveStudentloaninterestno,
    saveIRAcontributionsNo,
    saveOtherdeductions,
  ]);

  const saveDeductionData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 75);
    if (data.standarddeduction == "Yes") {
      setShowDeductionData(false);
      setShowDeductionApply(true);
    } else {
      setShowDeductionData(false);
      setShowNoDeductionApply(true);
    }
  };
  const PreviousDeductionApplyData = () => {
    if (state.standarddeduction == "Yes") {
      setShowDeductionData(true);
      setShowDeductionApply(false);
    } else {
      setShowDeductionData(true);
      saveNoDeductionApply(false);
    }
  };

  const DeductionApplyData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 80);
    if (data.accountNoneapply == "noneApply") {
      navigate("/results");
    } else if (data.accountStudentloaninterest == "Studentloaninterest") {
      setShowDeductionApply(false);
      setShowStudentApply(true);
    } else if (data.accountIRAcontributions == "IRAcontributions") {
      setShowDeductionApply(false);
      setShowIRAcontributions(true);
    }
  };
  const PreviousStudentApplyIncome = () => {
    setShowDeductionApply(true);
    setShowStudentApply(false);
  };
  const PreviousIRAcontributions = () => {
    setShowDeductionApply(true);
    setShowIRAcontributions(false);
  };

  //Yes case
  const StudentApplyData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 85);
    if (data.accountIRAcontributions == "IRAcontributions") {
      setShowStudentApply(false);
      setShowIRAcontributions(true);
    } else {
      navigate("/results");
    }
  };
  const StudentIRAcontributionsData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 90);
    navigate("/results");
  };

  //No Case
  const DeductionNoApplyData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 92);
    if (data.accountNoneapplyno == "noneApply") {
      navigate("/results");
    } else if (data.accounthomemortgage == "homemortgage") {
      setShowNoDeductionApply(false);
      setShowhomemortgage(true);
    } else if (data.accountCharitabledonations == "Charitabledonations") {
      setShowNoDeductionApply(false);
      setShowCharitabledonations(true);
    } else if (data.accountStateIncome == "StateIncome") {
      setShowNoDeductionApply(false);
      setShowStateIncome(true);
    } else if (data.accountMedicalexpenses == "Medicalexpenses") {
      setShowNoDeductionApply(false);
      setShowMedicalexpenses(true);
    } else if (data.accountStudentloaninterestno == "Studentloaninterestno") {
      setShowNoDeductionApply(false);
      setShowStudentloaninterestno(true);
    } else if (data.accountIRAcontributions == "IRAcontributionsno") {
      setShowNoDeductionApply(false);
      setShowIRAcontributionsNo(true);
    } else if (data.accountOtherdeductions == "Otherdeductions") {
      setShowNoDeductionApply(false);
      setShowOtherdeductions(true);
    }
  };

  const homemortgageData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 95);
    if (data.accountCharitabledonations == "Charitabledonations") {
      setShowhomemortgage(false);
      setShowCharitabledonations(true);
    } else if (data.accountStateIncome == "StateIncome") {
      setShowhomemortgage(false);
      setShowStateIncome(true);
    } else if (data.accountMedicalexpenses == "Medicalexpenses") {
      setShowhomemortgage(false);
      setShowMedicalexpenses(true);
    } else if (data.accountStudentloaninterestno == "Studentloaninterestno") {
      setShowhomemortgage(false);
      setShowStudentloaninterestno(true);
    } else if (data.accountIRAcontributions == "IRAcontributionsno") {
      setShowhomemortgage(false);
      setShowIRAcontributionsNo(true);
    } else if (data.accountOtherdeductions == "Otherdeductions") {
      setShowhomemortgage(false);
      setShowOtherdeductions(true);
    } else {
      navigate("/results");
    }
  };

  const CharitabledonationsData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 97);
    if (data.accountStateIncome == "StateIncome") {
      setShowCharitabledonations(false);
      setShowStateIncome(true);
    } else if (data.accountMedicalexpenses == "Medicalexpenses") {
      setShowCharitabledonations(false);
      setShowMedicalexpenses(true);
    } else if (data.accountStudentloaninterestno == "Studentloaninterestno") {
      setShowCharitabledonations(false);
      setShowStudentloaninterestno(true);
    } else if (data.accountIRAcontributions == "IRAcontributionsno") {
      setShowCharitabledonations(false);
      setShowIRAcontributionsNo(true);
    } else if (data.accountOtherdeductions == "Otherdeductions") {
      setShowCharitabledonations(false);
      setShowOtherdeductions(true);
    } else {
      navigate("/results");
    }
  };
  const StateIncomeData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 99);
    if (data.accountMedicalexpenses == "Medicalexpenses") {
      setShowStateIncome(false);
      setShowMedicalexpenses(true);
    } else if (data.accountStudentloaninterestno == "Studentloaninterestno") {
      setShowStateIncome(false);
      setShowStudentloaninterestno(true);
    } else if (data.accountIRAcontributions == "IRAcontributionsno") {
      setShowStateIncome(false);
      setShowIRAcontributionsNo(true);
    } else if (data.accountOtherdeductions == "Otherdeductions") {
      setShowStateIncome(false);
      setShowOtherdeductions(true);
    } else {
      navigate("/results");
    }
  };
  const MedicalexpensesData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 99);
    if (data.accountStudentloaninterestno == "Studentloaninterestno") {
      setShowMedicalexpenses(false);
      setShowStudentloaninterestno(true);
    } else if (data.accountIRAcontributions == "IRAcontributionsno") {
      setShowMedicalexpenses(false);
      setShowIRAcontributionsNo(true);
    } else if (data.accountOtherdeductions == "Otherdeductions") {
      setShowMedicalexpenses(false);
      setShowOtherdeductions(true);
    } else {
      navigate("/results");
    }
  };
  const StudentloaninterestnoData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 100);
    if (data.accountIRAcontributions == "IRAcontributionsno") {
      setShowStudentloaninterestno(false);
      setShowIRAcontributionsNo(true);
    } else if (data.accountOtherdeductions == "Otherdeductions") {
      setShowStudentloaninterestno(false);
      setShowOtherdeductions(true);
    } else {
      navigate("/results");
    }
  };
  
  const IRAcontributionsNoData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 100);
    if (data.accountOtherdeductions == "Otherdeductions") {
      setShowIRAcontributionsNo(false);
      setShowOtherdeductions(true);
    } else {
      navigate("/results");
    }
  };
  
  const OtherdeductionsData = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 100);
    navigate("/results");
  };
  
  
  const handleNoneApplyChange = (event) => {
    const { checked } = event.target;
    setNoneApplyChecked(checked);

    // If "None apply" is checked, uncheck all other checkboxes
    if (checked) {
      setValue("accountStudentloaninterest", false);
      setValue("accountIRAcontributions", false);
	  setValue("accounthomemortgage", false);
	  setValue("accountCharitabledonations", false);
	  setValue("accountStateIncome", false);
	  setValue("accountMedicalexpenses", false);
	  setValue("accountStudentloaninterestno", false);
	  setValue("accountIRAcontributions", false);
	  setValue("accountOtherdeductions", false);
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
  
  
  

  const PreviouStudentloaninterest = () => {
    setShowDeductionApply(true);
    setShowStudentApply(false);
  };

  const PrevioushomemortgageIncome = () => {
    setShowNoDeductionApply(true);
    setShowhomemortgage(false);
  };

  const PreviousCharitabledonationsIncome = () => {
    setShowNoDeductionApply(true);
    setShowCharitabledonations(false);
  };

  const PreviousStateIncome = () => {
    setShowNoDeductionApply(true);
    setShowStateIncome(false);
  };

  const PreviousMedicalexpenses = () => {
    setShowNoDeductionApply(true);
    setShowMedicalexpenses(false);
  };

  const PreviouStudentloaninterestno = () => {
    setShowNoDeductionApply(true);
    setShowStudentloaninterestno(false);
  };

  const PreviouIRAcontributionsNo = () => {
    setShowNoDeductionApply(true);
    setShowIRAcontributionsNo(false);
  };
  const PreviousOtherdeductions = () => {
    setShowNoDeductionApply(true);
    setShowOtherdeductions(false);
  };

  const PreviousStepToCredits = () => {
    document.getElementById("example").setAttribute("data-percentage", 75);
    navigate("/credits");
  };

  

  return (
    <div class="w4-main-container">
      {saveDeduction && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(saveDeductionData)}
        >
          <h2 class="text-center font-weight-bold">
            Do you want to take the standard <br /> deduction?{" "}
          </h2>
          <p class="text-center">
            Select "Yes" if you're not claiming itemized deductions.
          </p>
          <div class="status-panel">
            <ul class="selection-panel mt-5 p-4">
              <li>
                <div class="form-check py-3">
                  <input
                    {...register("standarddeduction", {
                      required: "Please select an option",
                    })}
                    value="Yes"
                    type="radio"
                    class="form-check-input"
                    id="validationCustom01 "
                  />
                  <label class="form-check-label single yes">Yes</label>
                </div>
              </li>
              <li>
                <div class="form-check py-3">
                  <input
                    {...register("standarddeduction", {
                      required: "Please select an option",
                    })}
                    value="No"
                    type="radio"
                    class="form-check-input"
                    id="validationCustom02 "
                  />
                  <label class="form-check-label standarddeduction no">
                    No
                  </label>
                </div>
              </li>
              {errors.standarddeduction && (
                <p class="text-center mt-5">
                  <span class="error_msg text-danger mx-auto mt-5">
                    {errors.standarddeduction.message}
                  </span>
                </p>
              )}
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousStepToCredits}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {saveDeductionApply && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(DeductionApplyData)}
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
                    {...register("accountStudentloaninterest")}
                    type="checkbox"
                    id="Studentloaninterest"
                    value="Studentloaninterest"
                    checked={watch("accountStudentloaninterest")}
                    onChange={(e) => handleCheckboxChange("accountStudentloaninterest", e.target.checked)}
                  />
                  <label for="Studentloaninterest" class="single-tile">
                    Student loan interest
                  </label>
                </div>
              </li>
              <li class="col-md-4 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountIRAcontributions")}
                    type="checkbox"
                    id="IRAcontributions"
                    value="IRAcontributions"
                    checked={watch("accountIRAcontributions")}
                    onChange={(e) => handleCheckboxChange("accountIRAcontributions", e.target.checked)}
                  />
                  <label for="IRAcontributions" class="single-tile">
                    IRA contributions
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
              onClick={PreviousDeductionApplyData}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {saveStudentApply && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(StudentApplyData)}
        >
          <h2 class="text-center font-weight-bold">Student loan interest</h2>
          <p class="text-center">
            Include student loan interest amounts for you, your spouse, and/or
            your dependent(s).
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    {...register("StudentApplyIncome")}
                    type="text"
                    id="studentloanincome"
                  />
                  <label for="studentloanincome">Student loan interest</label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousStudentApplyIncome}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {saveIRAcontributions && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(StudentIRAcontributionsData)}
        >
          <h2 class="text-center font-weight-bold">
            Eligible IRA contributions
          </h2>
          <p class="text-center">
            Include traditional IRA contributions eligible for a deduction.
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    {...register("IRAcontributions")}
                    type="text"
                    id="IRAcontributions"
					
                    
                  />
                  <label for="IRAcontributions">
                    Eligible IRA contributions
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousIRAcontributions}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {/* No code Here */}
      {saveNoDeductionApply && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(DeductionNoApplyData)}
        >
          <h2 class="text-center font-weight-bold">
            Which deductions apply to you?
          </h2>
          <p class="text-center">
            This calculator accounts for the most common tax situations. Choose
            "Other deductions" if yours is not listed.
          </p>
          <div class="status-panel">
            <ul class="selection-panel income-panel main-deduction row m-0 mt-5 py-4">
              <li class="col-md-3 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accounthomemortgage")}
                    type="checkbox"
                    id="homemortgage"
                    value="homemortgage"
                    checked={watch("accounthomemortgage")}
                    onChange={(e) => handleCheckboxChange("accounthomemortgage", e.target.checked)}
                  />
                  <label for="home-mortgage" class="single-tile">
                    Home mortgage interest
                  </label>
                </div>
              </li>
              <li class="col-md-3 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountCharitabledonations")}
                    type="checkbox"
                    id="Charitabledonations"
                    value="Charitabledonations"
                    checked={watch("accountCharitabledonations")}
                    onChange={(e) => handleCheckboxChange("accountCharitabledonations", e.target.checked)}
                  />
                  <label for="Charitabledonations" class="single-tile">
                    Charitable donations
                  </label>
                </div>
              </li>
              <li class="col-md-3 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountStateIncome")}
                    type="checkbox"
                    id="StateIncome"
                    value="StateIncome"
                    checked={watch("accountStateIncome")}
                    onChange={(e) => handleCheckboxChange("accountStateIncome", e.target.checked)}
                  />
                  <label for="StateIncome" class="single-tile">
                    State/Local taxes
                  </label>
                </div>
              </li>
              <li class="col-md-3 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountMedicalexpenses")}
                    type="checkbox"
                    id="Medicalexpenses"
                    value="Medicalexpenses"
                    checked={watch("accountMedicalexpenses")}
                    onChange={(e) => handleCheckboxChange("accountMedicalexpenses", e.target.checked)}
                  />
                  <label for="Medicalexpenses " class="single-tile">
                    Medical expenses
                  </label>
                </div>
              </li>
              <li class="col-md-3 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountStudentloaninterestno")}
                    type="checkbox"
                    id="Studentloaninterestno"
                    value="Studentloaninterestno"
                    checked={watch("accountStudentloaninterestno")}
                    onChange={(e) => handleCheckboxChange("accountStudentloaninterestno", e.target.checked)}
                  />
                  <label for="Studentloaninterest" class="single-tile">
                    Student loan interest
                  </label>
                </div>
              </li>
              <li class="col-md-3 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountIRAcontributions")}
                    type="checkbox"
                    id="IRAcontributionsno"
                    value="IRAcontributionsno"
                    checked={watch("accountIRAcontributions")}
                    onChange={(e) => handleCheckboxChange("accountIRAcontributions", e.target.checked)}
                  />
                  <label for="IRAcontributions" class="single-tile">
                    IRA contributions
                  </label>
                </div>
              </li>
              <li class="col-md-3 my-3">
                <div class="select-check position-relative">
                  <input
                    {...register("accountOtherdeductions")}
                    type="checkbox"
                    id="Otherdeductions"
                    value="Otherdeductions"
                    checked={watch("accountOtherdeductions")}
                    onChange={(e) => handleCheckboxChange("accountOtherdeductions", e.target.checked)}
                  />
                  <label for="Otherdeductions " class="single-tile">
                    Other deductions
                  </label>
                </div>
              </li>
              <li class="col-md-3 my-3">
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
            <button class="btn btn-w4-success Previousform">previous</button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {savehomemortgage && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(homemortgageData)}
        >
          <h2 class="text-center font-weight-bold">Mortgage interest</h2>
          <p class="text-center">
            Include mortgage interest for your main or second home and points
            paid to buy a home.
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    {...register("homemortgageIncome")}
                    type="text"
                    id="homemortgageIncome"
					
                    
                  />
                  <label for="homemortgageIncome">Mortgage interest</label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PrevioushomemortgageIncome}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}

      {saveCharitabledonations && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(CharitabledonationsData)}
        >
          <h2 class="text-center font-weight-bold">Charitable donations</h2>
          <p class="text-center">
            Include money or property donations made to qualified
            organizations.
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    {...register("CharitabledonationsIncome")}
                    type="text"
                    id="CharitabledonationsIncome"
					
                    
                  />
                  <label for="CharitabledonationsIncome">
                    Charitable donations
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform ss"
              onClick={PreviousCharitabledonationsIncome}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {saveStateIncome && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(StateIncomeData)}
        >
          <h2 class="text-center font-weight-bold">State and local taxes</h2>
          <p class="text-center">
            Examples include state and local, real estate, and/or personal
            property taxes.
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    {...register("StateIncome")}
                    type="text"
                    id="StateIncome"
					
                    
                  />
                  <label for="StateIncome">State and local taxes</label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousStateIncome}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {saveMedicalexpenses && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(MedicalexpensesData)}
        >
          <h2 class="text-center font-weight-bold">
            Total anticipated medical expenses
          </h2>
          <p class="text-center">
            Enter the total of all eligible, unreimbursed medical and dental
            expenses. Examples include prescriptions, exams, and qualified
            long-term care.
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    {...register("(Medicalexpenses")}
                    type="text"
                    id="Medicalexpenses"
					
                    
                  />
                  <label for="Medicalexpenses">
                    Total anticipated medical expenses
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousMedicalexpenses}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {saveStudentloaninterestno && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(StudentloaninterestnoData)}
        >
          <h2 class="text-center font-weight-bold">Student loan interest</h2>
          <p class="text-center">
            Include student loan interest amounts for you, your spouse, and/or
            your dependent(s).
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    {...register("(Studentloaninterestno")}
                    type="text"
                    id="Studentloaninterestno"
					
                    
                  />
                  <label for="Studentloaninterestno">
                    Student loan interest
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviouStudentloaninterestno}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {saveIRAcontributionsNo && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(IRAcontributionsNoData)}
        >
          <h2 class="text-center font-weight-bold">
            Eligible IRA contributions
          </h2>
          <p class="text-center">
            Include traditional IRA contributions eligible for a deduction.
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    {...register("IRAcontributionsno")}
                    type="text"
                    id="IRAcontributionsno"
					
                    
                  />
                  <label for="IRAcontributionsno">
                    Eligible IRA contributions
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviouIRAcontributionsNo}
            >
              previous
            </button>
            <button class="btn btn-primary">Next</button>
          </div>
        </Form>
      )}
      {saveOtherdeductions && (
        <Form
          class="tab-wizard wizard-circle wizard clearfix"
          onSubmit={handleSubmit(OtherdeductionsData)}
        >
          <h2 class="text-center font-weight-bold">Other deductions</h2>
          <p class="text-center">
            Examples include deductible theft and disaster losses and
            impairment-related work expenses.
          </p>
          <div class="jobs-panel">
            <ul class="selection-panel">
              <li>
                <div class="tool-input dollar-sign position-relative my-2">
                  <input
                    {...register("Otherdeductions")}
                    type="text"
                    id="Otherdeductions"
					
                    
                  />
                  <label for="Otherdeductions">Other deductions</label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-footer mt-5 pt-4 text-center">
            <button
              class="btn btn-w4-success Previousform"
              onClick={PreviousOtherdeductions}
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
