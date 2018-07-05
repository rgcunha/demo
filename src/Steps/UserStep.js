'use strict';

import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class UserStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: props.getStore().country,
      minAge: props.getStore().minAge,
      maxAge: props.getStore().maxAge,
      supportedTriages: props.getStore().supportedTriages
    };

    this._validateOnDemand = false; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (this.props.getStore().country != userInput.country ||
            this.props.getStore().minAge != userInput.minAge ||
            this.props.getStore().maxAge != userInput.maxAge ||
            this.props.getStore().supportedTriages != userInput.supportedTriages
          ) { // only update store of something changed
          this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
          });  // Update store here (this is just an example, in reality you will do it via redux or flux)
        }

        isDataValid = true;
    }
    else {
        // if anything fails then update the UI validation state but NOT the UI Data State
        this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    }

    return isDataValid;
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
  }

   _validateData(data) {
    // return  {
    //   genderVal: (data.gender != 0), // required: anything besides N/A
    //   emailVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.email), // required: regex w3c uses in html5
    // }
    return {
      countryVal: true,
      minAgeVal: true,
      maxAgeVal: true,
      supportedTriagesVal: true
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      genderValMsg: val.genderVal ? '' : 'A gender selection is required',
      emailValMsg: val.emailVal ? '' : 'A valid email is required'
    }
    return errMsgs;
  }

  _grabUserInput() {
    return {
      country: this.refs.country.value,
      minAge: this.refs.minAge.value,
      maxAge: this.refs.maxAge.value,
      supportedTriages: this.state.supportedTriages
    };
  }

  handleChange = (supportedTriages) => {
    this.setState({ supportedTriages });
    // selectedOption can be null when the `x` (close) button is clicked
    if (supportedTriages) {
      console.log(`Selected: ${supportedTriages.label}`);
    }
  }

  render() {
    // explicit class assigning based on validation
    let notValidClasses = {};

    if (typeof this.state.genderVal == 'undefined' || this.state.genderVal) {
      notValidClasses.genderCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.genderCls = 'has-error col-md-8';
       notValidClasses.genderValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.emailVal == 'undefined' || this.state.emailVal) {
        notValidClasses.emailCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.emailCls = 'has-error col-md-8';
       notValidClasses.emailValGrpCls = 'val-err-tooltip';
    }

    return (
      <div className="step step2">
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
              <label className="col-md-12 control-label">
                <h1>Step 2: User Targeting</h1>
              </label>
            </div>
            <div className="row content">
              <div className="col-md-12">
                Target users
              </div>
            </div>

            <div className="form-group col-md-9 content form-block-holder">
              <label className="control-label col-md-4">
                Country
              </label>
              <div className={notValidClasses.genderCls}>
                <select
                  ref="country"
                  autoComplete="off"
                  className="form-control"
                  required
                  defaultValue={this.state.country}
                  onBlur={this.validationCheck}>
                    <option value="">Please select</option>
                    <option value="UK">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="US">United States</option>>
                </select>
                <div className={notValidClasses.genderValGrpCls}>{this.state.genderValMsg}</div>
              </div>
            </div>

            <div className="form-group col-md-9 content form-block-holder">
              <label className="control-label col-md-4">
                Min Age
              </label>
              <div className={notValidClasses.emailCls}>
                <input
                  ref="minAge"
                  autoComplete="off"
                  type="text"
                  placeholder="18"
                  className="form-control"
                  required
                  defaultValue={this.state.minAge}
                  onBlur={this.validationCheck} />
                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
              </div>
            </div>

            <div className="form-group col-md-9 content form-block-holder">
              <label className="control-label col-md-4">
                Max Age
              </label>
              <div className={notValidClasses.emailCls}>
                <input
                  ref="maxAge"
                  autoComplete="off"
                  type="text"
                  placeholder="125"
                  className="form-control"
                  required
                  defaultValue={this.state.maxAge}
                  onBlur={this.validationCheck} />
                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
              </div>
            </div>

            <div className="form-group col-md-9 content form-block-holder">
              <label className="control-label col-md-4">
                Supported Triage Levels
              </label>
              <div className={notValidClasses.genderCls}>
                <Select
                  multi
                  ref="supportedTriages"
                  name="supportedTriages"
                  value={this.state.supportedTriages}
                  onChange={this.handleChange}
                  onBlur={this.validationCheck}
                  options={[
                    { value: 'SELFCARE', label: 'SelfCare' },
                    { value: 'SELF_CARE_PHARMA', label: 'SelfCarePharma' },
                    { value: 'PRIMARY_CARE_2_3_WEEKS', label: 'PrimaryCare2to3Weeks' },
                    { value: 'PRIMARY_CARE_2_3_DAYS', label: 'PrimaryCare2to3Days' },
                    { value: 'PRIMARY_CARE_SAME_DAY', label: 'PrimaryCareSameDay' },
                    { value: 'PRIMARY_CARE_4_HOURS', label: 'PrimaryCare4Hours' },
                    { value: 'GO_TO_ER', label: 'EmergencyCare' },
                    { value: 'CALL_AN_AMBULANCE', label: 'CallAmbulance' }
                  ]}
                />
                <div className={notValidClasses.genderValGrpCls}>{this.state.genderValMsg}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
