import React from 'react';
import { reduxForm } from 'redux-form';

import { Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import { TextFormField, SelectFormField, AutoCompleteFormField } from '../Field';
import NextButton from './NextButton';

import MySQLHelper from '../../../util/mysql';

export const fields = [ 'displayName', 'gender', 'homeUniId' ];

const saveForm = (callback) => {
  return (values) => {
    const { displayName } = values;

    Meteor.call('updateProfile', { id: Meteor.userId(), displayName }, (err, result) => {
      if (!err)
        if (callback)
          callback();
    });
  };
};

const validate = values => {
  const errors = {};
  const requiredFields = [ 'displayName', 'gender', 'homeUniId' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  return errors;
};

class Step1 extends React.Component {
  render() {
    const { universities, fields: { displayName, gender, homeUniId }, handleNext, handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={ handleSubmit(saveForm(handleNext)) }>
        <Row>
          <Col xs={12}>
            <TextFormField name="displayName" floatingLabelText="Your Name" {...displayName} />

            <SelectFormField name="gender" floatingLabelText="Gender" {...gender}>
              <MenuItem value="male" primaryText="Male" />
              <MenuItem value="female" primaryText="Female" />
              <MenuItem value="others" primaryText="Others" />
            </SelectFormField>

            <AutoCompleteFormField
              name="homeUniId"
              floatingLabelText="Current University" {...homeUniId}
              openOnFocus={true}
              filter={ (searchText, key) => searchText.length > 2 && key.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').some(s => s.substr(0, searchText.length) == searchText) }
              onNewRequest={ (searchText) => console.log(searchText) }
              dataSource={ MySQLHelper.map(universities, (uni) => ({ value: uni.id, text: uni.name }) ) } />
          </Col>
        </Row>

        <div style={{ marginTop: 12 }}>
          <NextButton label="Next" disabled={submitting} />
        </div>
      </form>
    );
  }
}


// Decorate with redux-form
export default reduxForm({
  form: 'signupStep1',
  validate, fields
})(Step1);