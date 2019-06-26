import { Router } from '../routes'
import Alert from 'react-s-alert'
import PropTypes from 'prop-types'
import { i18n, Trans, withNamespaces } from '../i18n'

const now = new Date();
const Footer = ({ t, asPath }) => (
    <footer id="footer">
        <div className="row">
            <div className="col">
                <Trans i18nKey="common:footer.copyright"
                values={{
                    year: now.getFullYear(),
                    linkText: "Next Weather"
                }}
                components={[<span className="love" key="f.love"></span>]}
                />
            </div>
            <div className="col">
                <span className="float-right">
                    <a className="flag"
                        onClick={() => {
                            i18n.changeLanguage('en');
                            Router.pushRoute(asPath)
                        }}
                    >
                        <img src="/static/images/english.svg" alt="English" title="English" height="18" />
                    </a>
                    <a
                        className="flag"
                        onClick={() => {
                            i18n.changeLanguage('id');
                            Router.pushRoute(asPath)
                        }}
                        >
                        <img src="/static/images/indonesia.svg" alt="Bahasa" title="Bahasa" height="18" />
                    </a>
                </span>
            </div>
        </div>
    </footer>
)

Footer.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withNamespaces('common')(Footer);