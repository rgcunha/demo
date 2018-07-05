'use strict';

import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

import PartnerStep from './Steps/PartnerStep'
import UserStep from './Steps/UserStep'
import ICDCodesStep from './Steps/ICDCodesStep'
import ReviewStep from './Steps/ReviewStep'
import CompletedStep from './Steps/CompletedStep'


export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.sampleStore = {
    //   email: '',
    //   gender: '',
    //   savedToCloud: false
    // };

    this.sampleStore = {
      name: '',
      careType: '',
      country: '',
      countryCode: '',
      phoneNumber: '',
      websiteUrl: '',
      appStoreUrl: '',
      playStoreUrl: '',
      openingHours: '',
      serviceDescription: '',
      minAge: '',
      maxAge: '',
      supportedTriages: [],
      icd10Codes: []
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }

  render() {
    // const steps =
    // [
    //   {name: 'Step1', component: <Step1 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
    //   {name: 'Step2', component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
    //   {name: 'Step3', component: <Step3 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
    //   {name: 'step4', component: <Step4 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
    //   {name: 'Step5', component: <Step5 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
    //   {name: 'Step6', component: <Step6 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}
    // ]

    const steps = [
      {name: 'Partner Info', component: <PartnerStep getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'User Targeting', component: <UserStep getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'ICD-10 Codes', component: <ICDCodesStep getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Review', component: <ReviewStep getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
			{name: 'Completed', component: <CompletedStep getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}
    ]


    return (
      <div className='example'>
        <img className='logo' src="https://www.featuredcustomers.com/media/Company.logo/ada-Logo_2017_copy.png" />
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            preventEnterSubmission={true}
            nextTextOnFinalActionStep={"Save"}
            hocValidationAppliedTo={[4]}
            startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
            onStepChange={(step) => window.sessionStorage.setItem('step', step)}
           />
        </div>
      </div>
    )
  }
}
