import { compose } from 'redux'
import { connect } from 'react-redux'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Router } from '../routes'
import PropTypes from 'prop-types'
import React from 'react'
import { removeCookie, setCookie } from '../utils/cookies'
import { withNamespaces } from '../i18n'


class Navigation extends React.Component {

constructor( props ) {
  super(props);
}

render(){
  const {
    t
  } = this.props;


return (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Link route="index">
        <a className="navbar-brand">
          <img
            alt=""
            src="/static/images/svg/clouds-1.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {' Next Weather'}
        </a>
      </Link>
      {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Link route="index"><a className="nav-link">{t('current-weather')}</a></Link>
        </Nav>
      </Navbar.Collapse>*/}
    </Container>
  </Navbar>
)
}
}

Navigation.propTypes = {
  t: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNamespaces('common')
)(Navigation);