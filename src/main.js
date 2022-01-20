import * as components from './components'
import Widget from './components/DnWidget/widget.js'

const VueDashboard = {
  install(Vue, options = {}) {
    // components
    for (const componentName in components) {
      const component = components[componentName]

      Vue.component(component.name, component)
    }
  }
}

export { VueDashboard, Widget }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueDashboard)
}