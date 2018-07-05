'use strict';

import React, { Component } from 'react';

// import DropdownTreeSelect from 'react-dropdown-tree-select'
// import 'react-dropdown-tree-select/dist/styles.css'
// import './tree.css'

import 'rc-tree-select/assets/index.css';
import TreeSelect, { TreeNode, SHOW_PARENT } from 'rc-tree-select';
import {DEFAULT_ICD_10_CODES} from '../constants'


export default class ICDCodesStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: this.normalizeCodes(DEFAULT_ICD_10_CODES.codes),
      icd10Codes: props.getStore().icd10Codes
    };

    this._validateOnDemand = false; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  normalizeCodes(codes) {
    const result = codes.map((code) => {
      return {
        title: code.to ? `${code.from} - ${code.to} - ${code.description}` : `${code.from} - ${code.description}`,
        value: code.to ? `${code.from} - ${code.to}` : `${code.from}`,
        children: code.codes ? this.normalizeCodes(code.codes) : [],
        key: code.to ? `${code.from} - ${code.to}` : `${code.from}`
      }
    })

    return result
  }

  componentDidMount() {}

  componentWillUnmount() {}

  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (this.props.getStore().icd10Codes != userInput.icd10Codes) { // only update store of something changed
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
      icd10Codes: true
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
      icd10Codes: this.state.icd10Codes
    };
  }

  // onChange(currentNode, selectedNodes) {
  //   console.log('onChange::', currentNode, selectedNodes)
  //   this.setState({icd10Codes: selectedNodes})
  //   this.validationCheck()
  // }

  onChange = (value, ...rest) => {
    console.log('onChange', value, ...rest);
    this.setState({ icd10Codes: value });
  }

  onDropdownVisibleChange = (visible, info) => {
    console.log(visible, this.state.icd10Codes, info);
    if (Array.isArray(this.state.icd10Codes) && this.state.icd10Codes.length > 1
      && this.state.icd10Codes.length < 3) {
      window.alert('please select more than two item or less than one item.');
      return false;
    }
    return true;
  }

  // onAction({ action, node }) {
  //   console.log(`onAction:: [${action}]`, node)
  // }
  // onNodeToggle(currentNode) {
  //   console.log('onNodeToggle::', currentNode)
  // }

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

    // <DropdownTreeSelect
    //   data={this.state.icd10Codes}
    //   onChange={this.onChange}
    //   onAction={this.onAction}
    //   onNodeToggle={this.onNodeToggle}
    //   className="bootstrap-demo"
    // />

    // <TreeSelect
    //   className="check-select"
    //   dropdownStyle={{ height: 200, overflow: 'auto' }}
    //   dropdownPopupAlign={{ overflow: { adjustY: 0, adjustX: 0 }, offset: [0, 2] }}
    //   placeholder={<i>Placeholder</i>}
    //   searchPlaceholder="please search"
    //   treeLine maxTagTextLength={10}
    //   value={this.state.icd10Codes}
    //   autoClearSearchValue
    //   treeData={this.state.tree}
    //   treeNodeFilterProp="title"
    //   treeCheckable showCheckedStrategy={SHOW_PARENT}
    //   onChange={this.onChange}
    //   maxTagCount={2}
    // />

    return (
      <div className="step step3">
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
              <label className="col-md-12 control-label">
                <h1>Step 3: ICD10 Codes</h1>
              </label>
            </div>
            <div className="row content">
              <div className="col-md-12">
                Conditions supported by the partner
              </div>
            </div>

            <div className="form-group col-md-12 content form-block-holder">
              <label className="control-label col-md-3">
                ICD 10 Codes
              </label>
              <div className={notValidClasses.emailCls}>
                <TreeSelect
                  className="check-select"
                  transitionName="rc-tree-select-dropdown-slide-up"
                  choiceTransitionName="rc-tree-select-selection__choice-zoom"
                  dropdownStyle={{ height: 200, overflow: 'auto' }}
                  dropdownPopupAlign={{ overflow: { adjustY: 0, adjustX: 0 }, offset: [0, 2] }}
                  onDropdownVisibleChange={this.onDropdownVisibleChange}
                  placeholder={<i>Click to select the ICD-10 Codes</i>}
                  searchPlaceholder="please search"
                  treeLine maxTagTextLength={10}
                  value={this.state.icd10Codes}
                  autoClearSearchValue
                  treeData={this.state.tree}
                  treeNodeFilterProp="title"
                  treeCheckable showCheckedStrategy={SHOW_PARENT}
                  onChange={this.onChange}
                  maxTagCount={2}
                  maxTagPlaceholder={(valueList) => {
                    console.log('Max Tag Rest Value:', valueList);
                    return `${valueList.length} rest...`
                  }}
                />
                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
