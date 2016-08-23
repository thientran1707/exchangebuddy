import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Grid } from 'meteor/lifefilm:react-flexbox-grid';

import InfoList from '../../components/Group/Info/InfoList';

export class GroupInfo extends React.Component {
	constructor(props, context) {
		super(props, context);
    this.state={
      xe: null,
      weather: null
    }
	}

  render(){
    return (
      <Grid>
        <InfoList
          group={this.props.groups}
          university={this.props.university}
          countrySectionItems={this.props.countrySectionItems}
          uniSectionItems={this.props.uniSectionItems} />
      </Grid>
    )
  }
}

GroupInfo.contextTypes = {
  router: PropTypes.object
};

function generateSecItems(type) {
  let res = [];
  switch(type){
    case 'country':
      for(let i =0; i<5; i++) {
          const secItem = {countrySectionId: i, countryId: type + i, content: type, createdAt: i, updatedAt: i, userId: i};
          res.push(secItem);
      }
    break;
    case 'uni':
      for(let i =0; i<5; i++) {
          const secItem = {uniSectionId: i, universities_id: type + i, content: i, createdAt: i, updatedAt: i, editUserId: i};
          res.push(secItem);
      }
    break;
    default:
    break;
  }
  return res;
}

function mapStateToProps(state, ownProps) {

  let group = { id: '1', universityId: '1', year: '2', term: '3' };
  let university = { id: '10', name: '10', city: '10', logoImageId: '10', emailDomains: '10', countryId: '10', terms: '10' };
  let countrySectionItems = generateSecItems('country');
  let uniSectionItems = generateSecItems('uni');

  return {
    group,
    university,
    countrySectionItems,
    uniSectionItems
  };

}

export default connect(mapStateToProps)(GroupInfo);
