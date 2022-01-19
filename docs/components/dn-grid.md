# dn-grid
Grid with widgets based on provided layout.

## Example

<Demo componentName="examples-dn-grid-doc" />

## Source Code

<SourceCode>
<<< @/src/components/DnGrid/DnGrid.vue
</SourceCode>

> use $refs.layout to commitLayout

## slots

...

### widget-wrapper
Within the dn-widget the slot is filled with a component and is using widget.component to choose the right component. The component needs to take :data as property


## props
### layout
An array of widgets

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
Set to true of the user shouldn't be able to re-arrange the widgets

## emitters
@changed
