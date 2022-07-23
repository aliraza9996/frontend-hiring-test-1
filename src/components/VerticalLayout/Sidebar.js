import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

//i18n
import { withTranslation } from 'react-i18next';
import SidebarContent from './SidebarContent';

const Sidebar = (props) => {
  function tToggle() {
    var body = document.body;
    body.classList.toggle('vertical-collpsed');
    body.classList.toggle('sidebar-enable');
  }

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <button
          onClick={() => {
            tToggle();
          }}
          type="button"
          className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
        >
          <i className="fa fa-fw fa-bars" />
        </button>
        <div className="sidebar-menu-scroll">
          {props.type !== 'condensed' ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(mapStatetoProps, {})(withRouter(withTranslation()(Sidebar)));
