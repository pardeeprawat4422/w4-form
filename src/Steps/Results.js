import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state";
import { Button, Field, Form, Input, Redio } from "../Forms";
import React, { useState, useRef, useEffect} from "react";
import { Document, Page, Text, View, PDFViewer, PDFDownloadLink }  from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

export const Results = () => {
  const [state, setState] = useAppState();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });

  const [showEstimatedTotal, setShowEstimatedTotal] = useState(true);
  const [showFillingW4Form, setShowFillingW4Form] = useState(false);
  const [attributeValue, setAttributeValue] = useState("initialValue");
  const [value, setValue] = useState(100);
  const navigate = useNavigate();
  const numberOfJobs = 1;
  const jobsData = [];
  for (let i = 0; i < numberOfJobs; i++) {
    jobsData.push({ name: `Job ${i + 1}` });
  }
  useEffect(() => {
    function applyInitialHighlighting() {
        document.querySelectorAll('input[type="text"]').forEach((element) => {
            const inputVal = element.value;
            const labelFor = element.getAttribute('id');
            const label = document.querySelector(`label[for='${labelFor}']`);
            if (inputVal) {
      // Remove non-numeric characters from the input value
      const numericValue = inputVal.replace(/\D/g, '');
      
      // Format the numeric value with commas every three digits
      let formattedValue = '';
      for (let i = numericValue.length - 1, j = 0; i >= 0; i--, j++) {
        // Add comma after every three digits except for the first group of digits
        if (j > 0 && j % 3 === 0) {
          formattedValue = ',' + formattedValue;
        }
        formattedValue = numericValue[i] + formattedValue;
      }
      
      // Update the input value with the formatted value
      element.value = formattedValue;
      label.classList.add("highlight");
    } else {
      label.classList.remove("highlight");
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
                label.classList.add('highlight');
            } else {
                label.classList.remove('highlight');
            }
        }
    }

    // Attach event listeners to inputs for immediate highlighting
    document.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', handleInputChange);
    });

    // Clean up event listeners on component unmount
    return () => {
        document.querySelectorAll('input').forEach((input) => {
            input.removeEventListener('input', handleInputChange);
        });
    };
}, [showFillingW4Form]);
	
  const PdfDocument = () => (
    <Document>
      <Page>
        <Text>Hello, this is a PDF! </Text>
      </Page>
    </Document>
  );
  
  const saveEstimatedTotal = (data) => {
    setState({ ...state, ...data });
    document.getElementById("example").setAttribute("data-percentage", 85);
    setShowEstimatedTotal(false)
	setShowFillingW4Form(true)
  };
  
  const PreviousStepToDeductions = () => {
    document.getElementById("example").setAttribute("data-percentage", 75);
    navigate('/deductions');
  };
  
  const saveFillingW4Form = (data) => {
    setState({ ...state, ...data });
    console.log(data);
    document.getElementById("example").setAttribute("data-percentage", 100);

  };
  const PreviousFillOutW4Form = () => {
    document.getElementById("example").setAttribute("data-percentage", 75);
	setShowFillingW4Form(false)
	setShowEstimatedTotal(true)
  };
  
  const StartOver = () => {
   navigate('/');
   window.location.reload();
  };
  

return (
    <div class="w4-main-container">
	  {showEstimatedTotal && (
        <Form id="steps-4" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveEstimatedTotal)} >
			<h2 class="text-center font-weight-bold display-4">Your estimated <br/>total federal refund</h2>
			<h2 class="text-center font-weight-bold display-4 text-primary">$4,405</h2>

			<h2 class="text-center font-weight-bold mt-5">Adjusting your withholdings</h2>
			<p class="text-center mb-5">Use the slider(s) to adjust your refund estimate.</p>
			<p class="text-center">A larger number means lower take-home pay and tax liability. A smaller number means more take-home pay and tax liability.</p>
			
			<div class="totaljobdisplay row justify-content-center">
			 {jobsData.map((job, index) => (
				<div class="col-md-6 mb-4">			 
				<div key={index} class="result-panel border p-4">
					<div class="star-rate text-center">
						{index === 0 ? (
							<span><svg class="mr-2" _ngcontent-puh-c89="" aria-hidden="true" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-di-res-id="947f4b9e-33adad00" data-di-rand="1708685624397"><path _ngcontent-puh-c89="" d="M8.20853 7.334L2.52153 7.99749C2.51305 7.99848 2.50963 8.00894 2.51588 8.01475L6.49535 11.71C6.49819 11.7126 6.49925 11.7166 6.49808 11.7203L4.50778 17.9756C4.50501 17.9842 4.51435 17.9918 4.52227 17.9873L10.4947 14.5744C10.498 14.5726 10.502 14.5727 10.5051 14.5747L15.8132 17.987C15.8206 17.9918 15.8302 17.9852 15.8284 17.9766L14.5012 11.7198C14.5004 11.7164 14.5016 11.7128 14.5042 11.7104L18.4841 8.01475C18.4904 8.00894 18.4869 7.99848 18.4785 7.99749L12.7915 7.334C12.7879 7.33359 12.7848 7.3313 12.7834 7.32801L10.5092 2.02145C10.5057 2.01337 10.4943 2.01337 10.4908 2.02145L8.21657 7.32801C8.21516 7.3313 8.21209 7.33359 8.20853 7.334Z" fill="#F5CC02" stroke="#F5CC02" stroke-width="2"></path></svg> Highest paying job</span>
						) : (
							<p></p>
						)}
					</div>
					<h2 class="results-title text-center my-4 font-weight-bold">{job.name}</h2>
		
					<div class="results-label-wrapper mb-5">
						<h4 class="results-label-sub-title mb-0"> Additional withholding per pay period</h4>
						<p class="results-label-amt text-medium mb-0"> $0 </p>
					</div>
					<div class="form-group">
						<div class="range-value">
							<span class="value-one">0</span>
							<span class="value-two">200</span>
						</div>
						<input type="range" className="form-control-range" id={`periodrange${index + 1}`} value={value} onChange={(e) => setValue(e.target.value)} min="0" max="200"/>
						<label for="emailaddress">Email Address</label>
                        <p class="text-center font-weight-bold text-primary">{value}</p>
					</div>
					<div class="results-label-wrapper mb-5">
						<h5 class=" mb-0"> Minimum <a class="tooltop-icon" role="tooltip" data-toggle="tooltip" title="Hooray!"></a></h5>
						<h5 class=" mb-0"> <a href="javascript:void(0)">Reset</a></h5>
					</div>
					<div class="results-label-wrapper">
						<h4 class="results-label-sub-title mb-0 font-weight-normal"> Total federal income tax withheld</h4>
						<p class="results-label-amt text-medium mb-0"> $0 </p>
					</div>
				</div>
				</div>
			   ))}
             </div>
			 
			<div class="estimate-panel py-5">
				<h2 class="title">Your estimated total federal refund</h2>
				<h2 class="value font-weight-bold">$4,405*</h2>
			</div>

			<p class="text-center"><small>*This is an estimate for informational purposes only. Consult your tax professional regarding your individual tax situation.</small></p>
			
			<div class="form-footer mt-5 pt-4 text-center">
				<button  class="btn btn-outline-dark mr-3">Finish</button>
				<button class="btn btn-w4-success Previousform" onClick={PreviousStepToDeductions}>previous</button>
				<button class="btn btn-primary" onClick={StartOver}>Start Over</button>
			</div>
        </Form>
      )}
	  
	  
      {showFillingW4Form && (
        <Form id="steps-4" class="tab-wizard wizard-circle wizard clearfix" onSubmit={handleSubmit(saveFillingW4Form)} >
			<h2 class="text-center font-weight-bold display-4">Filing out your W-4 form(s)</h2>
            <p class="text-center">Use the information below to help fill out your W-4 form(s)</p>
			<div class="w4-accordion">
                        <div class="accordion" id="accordionExample">
						{jobsData.map((job, index) => (
                            <div key={index} class="card mb-3">
                              <div class="card-header" id={`headingOne${index + 1}`}>
                                <h2 class="mb-0">
                                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`collapseOne${index + 1}`} aria-expanded="true" aria-controls="collapseOne">
								   {index === 0 ? (
										<span><svg class="mr-2" _ngcontent-puh-c89="" aria-hidden="true" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-di-res-id="947f4b9e-33adad00" data-di-rand="1708685624397"><path _ngcontent-puh-c89="" d="M8.20853 7.334L2.52153 7.99749C2.51305 7.99848 2.50963 8.00894 2.51588 8.01475L6.49535 11.71C6.49819 11.7126 6.49925 11.7166 6.49808 11.7203L4.50778 17.9756C4.50501 17.9842 4.51435 17.9918 4.52227 17.9873L10.4947 14.5744C10.498 14.5726 10.502 14.5727 10.5051 14.5747L15.8132 17.987C15.8206 17.9918 15.8302 17.9852 15.8284 17.9766L14.5012 11.7198C14.5004 11.7164 14.5016 11.7128 14.5042 11.7104L18.4841 8.01475C18.4904 8.00894 18.4869 7.99848 18.4785 7.99749L12.7915 7.334C12.7879 7.33359 12.7848 7.3313 12.7834 7.32801L10.5092 2.02145C10.5057 2.01337 10.4943 2.01337 10.4908 2.02145L8.21657 7.32801C8.21516 7.3313 8.21209 7.33359 8.20853 7.334Z" fill="#F5CC02" stroke="#F5CC02" stroke-width="2"></path></svg> Highest paying job</span>
									) : (
										<p></p>
									)}
                                    {job.name}
                                  </button>
                                </h2>
                              </div>
                        
                              <div id={`collapseOne${index + 1}`} class="collapse show" aria-labelledby={`headingOne${index + 1}`} data-parent="#accordionExample">
                                <div class="card-body">
                                  <ul class="results-accordion">
                                    <li>
                                        <div class="label-results">
                                            Filing Status:
                                        </div>
                                        <div class="label-values">
                                            <b>MFS :</b>
                                        </div>
                                        <div class="label-data">
                                            <b>box 1(c)</b>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="label-results">
                                            Filing Status:
                                        </div>
                                        <div class="label-values">
                                            <b>MFS :</b>
                                        </div>
                                        <div class="label-data">
                                            <b>box 1(c)</b>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="label-results">
                                            Filing Status:
                                        </div>
                                        <div class="label-values">
                                            
                                        </div>
                                        <div class="label-data">
                                            <b>box 1(c)</b>
                                        </div>
                                    </li>
                                  </ul>

                                  <ul class="sub-list-deps">
                                    <li>
                                        <div class="label-results">
                                            - Under 17:
                                        </div>
                                        <div class="label-values">
                                            <b> 0</b>
                                        </div>
                                        <div class="label-data">
                                            
                                        </div>
                                    </li>
                                    <li>
                                        <div class="label-results">
                                            - Other:
                                        </div>
                                        <div class="label-values">
                                            <b>0</b>
                                        </div>
                                        <div class="label-data">
                                            
                                        </div>
                                    </li>
                                    <li>
                                        <div class="label-results">
                                            Total:
                                        </div>
                                        <div class="label-values">
                                            <b>0</b>
                                        </div>
                                        <div class="label-data">
                                            
                                        </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
						   ))}
						</div>

                        <hr></hr>
                        
                        <h2 class="text-center">What to do next</h2>
                        <p class="text-center">Click the button below and you'll get a PDF that includes the information you provided. Make sure to add your personal information (name, address, and social security number) to the completed W-4 form(s), then sign, date and submit to your employer.</p>
                        <p class="text-center mt-5">Don’t want a PDF? You can add the values above to a blank W-4 on your own.</p>
                    </div>
					<div class="form-footer mt-5 pt-4 text-center mb-3">
                        <button class="btn btn-primary" onClick={StartOver}>Start Over</button>
						<button class="btn btn-w4-success Previousform" onClick={PreviousFillOutW4Form}>previous</button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">
                            Get my W-4 form(s)
                        </button>
                    </div>
					<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
						<div class="modal-dialog modal-lg">
						  <div class="modal-content position-relative">
							<div class="modal-header p-0 border-0">
							  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							  </button>
							</div>
							<div class="modal-body py-0">
							  <div class="row">
								<div class="col-md-6 py-5">
									<h2>Your W-4 form(s) are ready to download</h2>
									<p>Once saved, you will need to print out the forms and fill out your personal information including your name, address and social security number.</p>
									<p>Please make sure that you sign and date before handing to your employer.</p>
									<PDFDownloadLink document={<PdfDocument />} fileName="w4-form.pdf" className="btn btn-primary">
										{({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download W-4 form(s)')}
									</PDFDownloadLink>
								</div>
								<div class="col-md-6 py-5" style={{ background: '#f1f5f7' }}>
									<h2>Get your W-4 form(s) sent to your inbox</h2>
									<p>Once saved, you will need to print out the forms and fill out your personal information including your name, address and social security number.</p>
									<div class="w4-main-container">
										<ul class="selection-panel">
											<li>
												<div class="tool-input position-relative my-2" >
													<input type="text" placeholder="" id="emailaddress"/>
													<label for="emailaddress">Email Address</label>
												</div>
											</li>
										</ul>
									</div>
									<a href="#" class="btn btn-primary">Download W-4 form(s)</a>
								</div>
							  </div>
							</div>
						  </div>
						</div>
					  </div>
					  <div class="bottom-section py-5 text-center">
						<div class="container">
						  <h2>Have questions?</h2>
						  <p>Book a free consultation with a tax pro.</p>
						  <p><a href="#">Schedule consultation</a></p>
						</div>
					  </div>
        </Form>
		  
      )}
    </div>
  );
};
