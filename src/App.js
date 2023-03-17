
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Grid,Box ,TableContainer,TablePagination} from "@material-ui/core";
import ExpandableTableRow from "./components/ExpandableTableRow";
import PieChart from "./components/Pie";
import grpFindings from "./store/grouped_findings.json";
import "./App.css";
import {isEmpty} from "lodash";
function App() {
  const [grpFindingData, setGrpFindingData] = React.useState(grpFindings);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
  setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getSeverityColor = (sev) => {
    switch(sev) {
      case "critical":
        return "purple"
      case "high":
       return "red"
      case "medium":
        return "orange"
      default:
        return "yellow"
    }
  }
  const getBackgroundColor = (status) => {
    switch(status) {
      case "fixed":
       return "green"
      case "in_progress":
        return "#4fa7ed"
      default:
        return "grey"
    }
  }
  const onClickPieChartData = (key, isKeyVisible) => {
    let clickedPieChartData = isKeyVisible ? grpFindingData?.filter(i=>i.severity !== key) : grpFindingData?.concat(grpFindings?.filter(i=>i.severity == key));
    setGrpFindingData(clickedPieChartData);
    setPage(0);
    setRowsPerPage(10);
  }
  return (
    <div className="App">
       <div className="main-header-cls">Dashboard</div>
       <Box>
          <Grid container>
            <Grid item={true} xs={4}>
              <PieChart chartData={grpFindingData} onClickPieChartData={onClickPieChartData.bind(this)}/>
            </Grid>
             <Grid item={true} xs={12}>
                <div className="table-header-cls">Jira Findings Table</div>
                <div className="table-sub-header-cls">Below is a tabular representation of security issues from Jira that depict their groups and raw findings for each group!</div>
                <TableContainer className="grid-cls">
                    <Table stickyHeader aria-label="simple table">
                      <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" />
                            <TableCell>Group Type</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Created Date</TableCell>
                            <TableCell align="left">Severity</TableCell>
                            <TableCell align="left">Owner</TableCell>
                            <TableCell align="left">Security Analyst</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {isEmpty(grpFindingData) ? 
                          <div className="empty-wrapper">
                            <div className="empty-msg-cls">No Data Found</div>
                            <div className="sub-empty-msg-cls">Please select atleast one severity from the pie chart above!</div>
                          </div>
                          :grpFindingData
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map(row => (
                          <ExpandableTableRow key={row.id}
                              rowId ={row.id}
                              getBackgroundColor = {getBackgroundColor}
                              getSeverityColor= {getSeverityColor}>
                            <TableCell align="left">
                             <div>{row?.grouping_type?.charAt(0).toUpperCase() + row?.grouping_type.slice(1)}</div>
                             <div className="remediation-url" onClick={(e) =>{window.open(e.currentTarget.textContent, '_blank')}}>{row.grouping_key}</div>
                            </TableCell>
                            <TableCell align="center">
                              <span style= {{background: getBackgroundColor(row.status)}} className="status-cls">{row.status.toUpperCase()}</span>
                            </TableCell>
                            <TableCell align="left">{new Date(row.grouped_finding_created).toDateString()}</TableCell>
                            <TableCell align="left" className={`severity-cell  ${getSeverityColor(row?.severity)}` }>{row.severity?.toUpperCase()}</TableCell>
                            <TableCell align="left">{row.owner}</TableCell>
                            <TableCell align="left">{row.security_analyst}</TableCell>
                          </ExpandableTableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
                    component="div"
                    count={grpFindingData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
              </Grid>
          </Grid>
      </Box>
    </div>
  );
}

export default App;
