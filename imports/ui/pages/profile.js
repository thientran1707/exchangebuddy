import React from 'react';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProfilePaper from '../components/ProfilePaper';

const welcomeStyle = { height: "calc(100vh - 150px)", backgroundColor: "darkslategray", paddingTop: 150 }

const Profile = ({ params }) => (
  <div className="text-center" style={welcomeStyle}>
    <div id="welcome-header">

      <div id="logo-image">
        { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 99, "exchangebuddy-logo") }
      </div>

      <Grid>
        <Row>
          <Col xs={12}>
            <ProfilePaper userId={ params.userId } />
          </Col>
        </Row>
      </Grid>
    </div>

  </div>
);

export default Profile;
