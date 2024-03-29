# Vue Dashboard
> A vuejs grid with draggable and resizable boxes. This source is based on @dattn/dnd-grid. Thank you very much for all of your work @dattn.

## Collision handling
I was looking for a grid library that was rather close to how the Azure portal dashboard worked. But boxes that collided with a dragging box didn't move how I wanted, in dnd-grid, so this is an implementation solving my issue.

## Getting Started
### Add imports
```js
/// main.js
import './plugins/vuedashboard'
```

```js
/// plugins/vuedashboard
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { VueDashboard } from 'dn-vue-dashboard'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueDashboard)
import 'dn-vue-dashboard/dist/dn-vue-dashboard.css'
```
### template
```html
<dn-grid
    :layout="layout"
    :readOnly="false"
    @changed="changed"
>
</dn-grid>
```

### script
```js
layout.push(new Widget({
    id: '1234-0',
    position: {
        x: 0,
        y: 0,
        h: 2,
        w: 4
    },
    title: 'Widget 1',
    component: 'DemoWidget',
    pinned: false
})
```

## Project setup

```
npm install bootstrap-icons --save
npm install bootstrap-vue --save
```

```
yarn install
```

### Compiles and hot-reloads documentation site for development

```
yarn docs:dev
```

### Compiles and minifies for documentation site for production

```
yarn docs:build
```

## NPM
Deploy to NPM
```
yarn publish
```

## TODO
* Remove bootstrap-vue and bootstrap-icons as dependency and use slots instead. You're welcome to contribute.

## License

This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)
