# JiraFindingsTable

## Overview

This project demonstrates a collapsible table showing group and Raw findings from Jira system.

The table shows Group findings form a Jira system. Every group has its Raw findings that can be collapsed / expanded by clicking on the “Right Chevron” Icon.

An interactive Pie chart is a representation of data from Group Findings table based on “Severity”. The chart shows Legends and Labels associated with Severity and count. Clicking on the Legends will show the data respective to the Legend selected.

## Interactivity
Click on any pie section or a legend to filter the results based on SEVERITY and see the output in the table below the pie chart.

### TODO:
 **The ineractivity currently works for the group finding table. To be applied with similar concept for Raw findings table**

## How the Pie chart works:

By default, all value are selected in the pie. When user clicks on the chart, that section value gets deselected from the legend next to the chart and the value disappers form the pie chart.

NOTE: In order to get back the deselected value to show on the chart again, please click the value from the legend and you'll see that section appeasring on the pie.

When user clicks on any section of the pie chart, the value is deselected and filtered out from the records shown in the table below:

Eg: When "LOW" is clicked, the value is deselected and the table below shows results only with Data having severity "MEDIUM, HIGH, CRITICAL".


## Accessibility 

Chrome, FF and Safari.

## Tech-stack

#Material UI #Javascript #ReactJs


## Build Instructions


#cd JiraFindingsTable

#npm install

NOTE: For any version updates issue, please use:

#npm install --force

NOTE: For production build, please run

#npm run build

#npm start

The project should open at :3000 port: http://localhost:3000/ 



