import Vuetify from 'vuetify';
// Helpers
import colors from 'vuetify/es5/util/colors'

export default ({Vue, options, router, siteData,}) => {
	Vue.use(Vuetify, {
		theme: {
			primary: colors.blue.accent1
		}
	});
}