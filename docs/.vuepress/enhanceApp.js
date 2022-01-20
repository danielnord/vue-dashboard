// enhanceApp.js
import { VueDashboard } from './../../src/main.js'

// Bootstrap icons to use b-icon
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

export default ({ Vue, options, router, siteData }) => {
    Vue.use(VueDashboard)

    Vue.use(BootstrapVue)
    Vue.use(BootstrapVueIcons)
}
