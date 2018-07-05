'use strict';

import React, { Component } from 'react';
import Promise from 'promise';

export default class ReviewStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false
    };

    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // This review screen had the 'Save' button, on clicking this is called
  isValidated() {
    // typically this method needs to return true or false (to indicate if the local forms are validated, so StepZilla can move to the next step),
    // but in this example we simulate an ajax request which is async. In the case of async validation or server saving etc. return a Promise and StepZilla will wait
    // ... for the resolve() to work out if we can move to the next step
    // So here are the rules:
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // SYNC action (e.g. local JS form validation).. if you return:
    // true/undefined: validation has passed. Move to next step.
    // false: validation failed. Stay on current step
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // ASYNC return (server side validation or saving data to server etc).. you need to return a Promise which can resolve like so:
    // resolve(): validation/save has passed. Move to next step.
    // reject(): validation/save failed. Stay on current step

    this.setState({
      saving: true
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({
          saving: true
        });

        this.props.updateStore({savedToCloud: true});  // Update store here (this is just an example, in reality you will do it via redux or flux)

        // call resolve() to indicate that server validation or other aync method was a success.
        // ... only then will it move to the next step. reject() will indicate a fail
        resolve();
        // reject(); // or reject
      }, 5000);
    });
  }

  // jumpToStep(toStep) {
  //   // We can explicitly move to a step (we -1 as its a zero based index)
  //   this.props.jumpToStep(toStep-1); // The StepZilla library injects this jumpToStep utility into each component
  // }

  renderTriages() {
    const { supportedTriages } = this.props.getStore()
    if (supportedTriages.length > 0) {
      const labels = supportedTriages.map(triage => triage.label)
      return <span>{labels.join(', ')}</span>
    }
  }

  renderIcd10Codes() {
    // if (this.props.getStore().icd10Codes.length > 0) {
    //   return this.props.getStore().icd10Codes.map((code, index) => (
    //     < key={index}>{code}</li>
    //   ))
    // }
    const { icd10Codes } = this.props.getStore()
    if (icd10Codes.length > 0) {
      return <span>{icd10Codes.join(', ')}</span>
    }
  }


  render() {
    const savingCls = this.state.saving ? 'saving col-md-12 show' : 'saving col-md-12 hide';

    return (
      <div className="step step4 review">
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
              <label className="col-md-12 control-label">
                <h1>Step 4: Review your Details and 'Save'</h1>
              </label>
            </div>

            <div className="form-group">
              <div className="col-md-12 control-label">
                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Name
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().name}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Care Type
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().careType}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Country
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().country}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Phone Number
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().phoneNumber}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Website Url
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().websiteUrl}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    App Store Url
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().appStoreUrl}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Play Store Url
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().playStoreUrl}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Opening Hours
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().openingHours}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Service Description
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().serviceDescription}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Min Age
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().minAge}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Max Age
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.props.getStore().maxAge}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    Supported Triage Levels
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.renderTriages()}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="col-md-4 text-right">
                    ICD-10 Codes
                  </div>
                  <div className="col-md-offset-2 col-md-4">
                    {this.renderIcd10Codes()}
                  </div>
                </div>
                <h2 className={savingCls}>Saving, please wait...</h2>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
