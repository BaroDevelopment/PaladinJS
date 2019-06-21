import Vuetify from 'vuetify';
import pageComponents from '@internal/page-components'

// Helpers
import colors from 'vuetify/es5/util/colors'

export default ({Vue, options, router, siteData,}) => {
	Vue.use(Vuetify, {
		theme: {
			primary: colors.blue.accent1
		}
	});
	for (const [name, component] of Object.entries(pageComponents)) {
		Vue.component(name, component)
	}
}