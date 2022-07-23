import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'reactstrap';

import { Link } from 'react-router-dom';

// Import menuDropdown
import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';

//i18n
import { withTranslation } from 'react-i18next';

// Redux Store
import { showRightSidebarAction, toggleLeftmenu, changeSidebarType } from '../../store/actions';

const Header = (props) => {
  function tToggle() {
    var body = document.body;
    body.classList.toggle('vertical-collpsed');
    body.classList.toggle('sidebar-enable');
  }
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            <Form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder={props.t('Search') + '...'}
                />
                <span className="uil-search"></span>
              </div>
            </Form>
          </div>

          <div className="d-flex">
            <ProfileMenu />

            <div
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="uil-cog"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
