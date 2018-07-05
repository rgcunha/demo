'use strict';

import React, { Component } from 'react';
import InputText from '../Form/InputText';

export default class PartnerStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.getStore().name,
      careType: props.getStore().careType,
      phoneNumber: props.getStore().phoneNumber,
      websiteUrl: props.getStore().websiteUrl,
      appStoreUrl: props.getStore().appStoreUrl,
      playStoreUrl: props.getStore().playStoreUrl,
      openingHours: props.getStore().openingHours,
      serviceDescription: props.getStore().serviceDescription
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
        if (this.props.getStore().name != userInput.name ||
            this.props.getStore().careType != userInput.careType ||
            this.props.getStore().phoneNumber != userInput.phoneNumber ||
            this.props.getStore().websiteUrl != userInput.websiteUrl ||
            this.props.getStore().appStoreUrl != userInput.appStoreUrl ||
            this.props.getStore().playStoreUrl != userInput.playStoreUrl ||
            this.props.getStore().openingHours != userInput.openingHours ||
            this.props.getStore().serviceDescription != userInput.serviceDescription
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
      nameVal: true,
      careTypeVal: true,
      phoneNumberVal: true,
      websiteUrlVal: true,
      appStoreUrlVal: true,
      playStoreUrlVal: true,
      openingHoursVal: true,
      serviceDescriptionVal: true
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
      name: this.refs.name.value,
      careType: this.refs.careType.value,
      phoneNumber: this.refs.phoneNumber.value,
      websiteUrl: this.refs.websiteUrl.value,
      appStoreUrl: this.refs.appStoreUrl.value,
      playStoreUrl: this.refs.playStoreUrl.value,
      openingHours: this.refs.openingHours.value,
      serviceDescription: this.refs.serviceDescription.value
    };
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
      <div className="step step1">
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
              <label className="col-md-12 control-label">
                <h1>Step 1: Partner Information</h1>
              </label>
            </div>
            <div className="row content">
              <div className="col-md-12">
                This is where we collect information about the partner
              </div>
            </div>

            <div className="form-group col-md-12 content form-block-holder">
              <label className="control-label col-md-4">
                Name
              </label>
              <div className={notValidClasses.emailCls}>
                <input
                  ref="name"
                  autoComplete="off"
                  type="text"
                  placeholder="Partner Name"
                  className="form-control"
                  required
                  defaultValue={this.state.name}
                  onBlur={this.validationCheck} />
                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
              </div>
            </div>

            <div className="form-group col-md-12 content form-block-holder">
              <label className="control-label col-md-4">
                Care Type
              </label>
              <div className={notValidClasses.genderCls}>
                <select
                  ref="careType"
                  autoComplete="off"
                  className="form-control"
                  required
                  defaultValue={this.state.careType}
                  onBlur={this.validationCheck}>
                    <option value="">Please select</option>
                    <option value="Telemedicine">Telemedicine</option>
                    <option value="Enmergency Room">Emergency Room</option>
                    <option value="Primary Care">Primary Care</option>
                    <option value="Walk In Clinics">Walk In Clinics</option>
                    <option value="Urgent Care">Urgent Care</option>
                    <option value="Home Visit">Home Visit</option>
                </select>
                <div className={notValidClasses.genderValGrpCls}>{this.state.genderValMsg}</div>
              </div>
            </div>

            <div className="form-group col-md-12 content form-block-holder">
              <label className="control-label col-md-4">
                Phone Number
              </label>
              <div className={notValidClasses.emailCls}>
                <input
                  ref="phoneNumber"
                  autoComplete="off"
                  type="text"
                  placeholder="+40 123456789"
                  className="form-control"
                  required
                  defaultValue={this.state.phoneNumber}
                  onBlur={this.validationCheck} />
                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
              </div>
            </div>

            <div className="form-group col-md-12 content form-block-holder">
              <label className="control-label col-md-4">
                Website Url
              </label>
              <div className={notValidClasses.emailCls}>
                <input
                  ref="websiteUrl"
                  autoComplete="off"
                  type="text"
                  placeholder="www.google.com"
                  className="form-control"
                  required
                  defaultValue={this.state.websiteUrl}
                  onBlur={this.validationCheck} />
                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
              </div>
            </div>

            <div className="form-group col-md-12 content form-block-holder">
              <label className="control-label col-md-4">
                App Store Url
              </label>
              <div className={notValidClasses.emailCls}>
                <input
                  ref="appStoreUrl"
                  autoComplete="off"
                  type="text"
                  placeholder="www.google.com"
                  className="form-control"
                  required
                  defaultValue={this.state.appStoreUrl}
                  onBlur={this.validationCheck} />
                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
              </div>
            </div>

            <div className="form-group col-md-12 content form-block-holder">
              <label className="control-label col-md-4">
                Play Store Url
              </label>
              <div className={notValidClasses.emailCls}>
                <input
                  ref="playStoreUrl"
                  autoComplete="off"
                  type="text"
                  placeholder="www.google.com"
                  className="form-control"
                  required
                  defaultValue={this.state.playStoreUrl}
                  onBlur={this.validationCheck} />
                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
              </div>
            </div>

            <div className="form-group col-md-12 content form-block-holder">
              <label className="control-label col-md-4">
                Opening/Service Hours
              </label>
              <div className={notValidClasses.emailCls}>
                <input
                  ref="openingHours"
                  autoComplete="off"
                  type="text"
                  placeholder="24/7"
                  className="form-control"
                  required
                  defaultValue={this.state.openingHours}
                  onBlur={this.validationCheck} />
                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
              </div>
            </div>

            <div className="form-group col-md-12 content form-block-holder">
              <label className="control-label col-md-4">
                Service Description
              </label>
              <div className={notValidClasses.emailCls}>
                <input
                  ref="serviceDescription"
                  autoComplete="off"
                  type="text"
                  placeholder="Description"
                  className="form-control"
                  required
                  defaultValue={this.state.serviceDescription}
                  onBlur={this.validationCheck} />
                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
