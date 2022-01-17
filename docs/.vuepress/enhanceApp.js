// enhanceApp.js
import ComponentLibrary from './../../src/main.js'

// Bootstrap icons to use b-icon
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

export default ({ Vue, options, router, siteData }) => {
    Vue.use(ComponentLibrary)

    Vue.use(BootstrapVue)
    Vue.use(BootstrapVueIcons)
}
