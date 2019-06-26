import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Container } from 'react-bootstrap'
import Footer from './footer'
import { isEmpty } from 'lodash'
import Navigation from './navigation'
import PropTypes from "prop-types"
import { removeAlert } from "../stores/actions"

const Layout = ({ asPath, children, customClass }) => {
    return (
    <div>
      <Navigation asPath={asPath} />

      <Container className={`main-page ${customClass}`}>
      {children}
      </Container>

      <Container>
        <Footer asPath={asPath} />
      </Container>
    </div>
    )
}

Layout.propTypes = {
  alert: PropTypes.object
};

const mapStateToProps = state => ({
  alert: state.alert
});

const mapDispatchToProps = dispatch => {
  return {
    removeAlert: bindActionCreators(removeAlert, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);