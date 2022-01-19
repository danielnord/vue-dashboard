# dn-widget
Widget that presents icons to view, edit and change position

## Source Code

<SourceCode>
<<< @/src/components/DnWidget/DnWidget.vue
</SourceCode>

> use $refs.layout to commitLayout

## slots

...

### widget-wrapper
Within the dn-widget the slot is filled with a component and is using widget.component to choose the right component. The component needs to take :data as property


## props
### widget
The widget class.
```js
constructor(box) {
    this.dashboardCompatibility = box.dashboardCompatibility
    this.address = box.address
    this.hidden = box.hidden
    this.id = box.id
    this.minSize = box.minSize
    this.pinned = box.pinned
    this.position = box.position
    this.title = box.title
    this.data = box.data
    this.description = box.description
    this.component = box.component
    this.originalPosition = Object.assign({}, box.position)
    this.isProcessed = false // If set to true this box will be ignored when moving around boxes
}
```

### cellSize
The size of each cell including margin to other cells

### maxColumnCount
The maximum number of columns

### maxRowCount
The maximum number of rows

### margin
The margin within grid

### dashboardType
The dashboard type. Used to see if a widget is compatible with the grid

### readOnly
Set to true of the user shouldn't be able to re-arrange the widget. Show info icon in readOnly mode and edit icon otherwise.

## emitters
* @dragStart
* @dragEnd
* @dragUpdate
* @resizeStart
* @resizeEnd
* @resizeUpdate
* @removeClicked
* @editClicked
* @viewClicked