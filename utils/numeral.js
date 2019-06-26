import numeral from 'numeral'
import { get, isEmpty } from 'lodash'
import { i18n } from '../i18n'
import { getCookie } from './cookies'

if (isEmpty(get(numeral, 'locales.id'))) {
    numeral.register('locale', 'id', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'rb',
            million: 'jt',
            billion: 'm',
            trillion: 'tr'
        },
        ordinal : function (number) {
            return 'ke-';
        },
        currency: {
            symbol: 'Rp '
        }
    });
}
if ( numeral.locale != i18n.language )
    numeral.locale(i18n.language);

export default numeral;