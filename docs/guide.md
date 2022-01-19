# Getting Started
## template
```html
<dn-grid
    :layout="layout"
    :readOnly="false"
    @changed="changed"
>
</dn-grid>
```

## script
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
