
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Grid,Box ,TableContainer,TablePagination} from "@material-ui/core";
import ExpandableTableRow from "./components/ExpandableTableRow";
import PieChart from "./components/Pie";
import rawFindings from "./store/raw_findings.json";
import grpFindings from "./store/grouped_findings.json";
import "./App.css";

function App() {
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
  const getRawFindings = (grpRowId) => {
    const rowFndingObj = rawFindings.find((item) => item.id=== grpRowId);
    const severityCls = getSeverityColor(rowFndingObj?.severity);
    return (rowFndingObj && 
      <TableRow key={rowFndingObj.id}>
          <TableCell width="30%">{rowFndingObj.description}</TableCell>
          <TableCell align="center">
            <span style= {{background: getBackgroundColor(rowFndingObj.status)}} className="status-cls">{rowFndingObj.status.toUpperCase()}</span>
          </TableCell>
          <TableCell align="left">{rowFndingObj.ticket_created}</TableCell>
          <TableCell align="left">{new Date(rowFndingObj.finding_created).toDateString()}</TableCell>
          <TableCell align="center" className={`severity-cell  ${severityCls}` }>{rowFndingObj.severity?.toUpperCase()}</TableCell>
          <TableCell align="left">
            <div>{rowFndingObj.remediation_text}</div>
            <div className="remediation-url" onClick={(e) =>{window.open(e.currentTarget.textContent, '_blank');}}>{rowFndingObj.remediation_url}</div>
          </TableCell>
      </TableRow>);
  }
  const renderExpandedDetailRow = (row) => {
    return (<Box>
        <Grid>
         <TableContainer className="raw-grid">
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    Raw Findings
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Created Date</TableCell>
                  <TableCell align="center">Findings Date</TableCell>
                  <TableCell align="center">Severity</TableCell>
                  <TableCell align="center">Remediation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getRawFindings(row.id)}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>);
  }
  return (
    <div className="App">
       <Box>
          <Grid container>
             <Grid item={true} xs={12}>
                <TableContainer className="grid-cls">
                    <Table stickyHeader aria-label="simple table">
                      <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" />
                            <TableCell>Description</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Created Date</TableCell>
                            <TableCell align="left">Severity</TableCell>
                            <TableCell align="left">Owner</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {grpFindings
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map(row => (
                          <ExpandableTableRow key={row.id}
                              expandComponent={renderExpandedDetailRow(row)}>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="center">
                              <span style= {{background: getBackgroundColor(row.status)}} className="status-cls">{row.status.toUpperCase()}</span>
                            </TableCell>
                            <TableCell align="left">{new Date(row.grouped_finding_created).toDateString()}</TableCell>
                            <TableCell align="left" className={`severity-cell  ${getSeverityColor(row?.severity)}` }>{row.severity?.toUpperCase()}</TableCell>
                            <TableCell align="left">{row.owner}</TableCell>
                          </ExpandableTableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
                    component="div"
                    count={grpFindings.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
              </Grid>
              <Grid item={true} xs={4}>
                <PieChart chartData={grpFindings}/>
              </Grid>
          </Grid>
      </Box>
    </div>
  );
}

export default App;
