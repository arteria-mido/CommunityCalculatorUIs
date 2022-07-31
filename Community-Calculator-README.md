# Vertical- & Horizontal-layout UIs
### Note on UI buttons:
Only buttons that have to do with the layout (e.g. show/hide menu, show/hide dropdowns) currently work. Those that don't work yet are closely related to the functionalities of the calculator. These must be integrated if any of the features of either UI is to be adopted.

For the vertical layout, chart size must always be updated with the red round button. This is because highcharts' charts recognise only window resize event to resize their charts. If the window size remains the same but only the div (container) size changes, charts must be force-resized.

### Note on colour schemes:
The colour scheme of the UIs is still a work in progress.

### Note on kpi section (summary of energy figures and deman statistics):
Currently in all view mode certain section of the kpi can be highlighted or unhighlighted by clicking on the relevant grid. This can be changed to leave certain grids as always highlighted.

### UI functionalities
All functionalities in both UIs can still be subject to further modifications or complete removal.

