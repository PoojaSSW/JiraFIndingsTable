import React from 'react';
import {TableCell, TableRow, IconButton, Table, TableBody, TableHead, Grid,Box, TableContainer, TablePagination} from '@material-ui/core';
import {KeyboardArrowDown, KeyboardArrowRight} from '@material-ui/icons';
import rawFindings from "../store/raw_findings.json";
import "../App.css"

const ExpandableTableRow = ({ 
  children, 
  expandComponent, 
  rowId, 
  getBackgroundColor,
  getSeverityColor,
  ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [clickedRowId, setClickedRowId] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
  setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const onClickRow = (id) => {
    setClickedRowId(id);
    setIsExpanded(!isExpanded);
  }

   const getRawFindings = (grpRowId) => {
    return (rawFindings
      .filter(i=> grpRowId === i.grouped_finding_id)
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(rawRow => (
        <TableRow key={rawRow.id}>
            <TableCell width="30%">{rawRow.description}</TableCell>
            <TableCell align="center">
              <span style= {{background: getBackgroundColor(rawRow.status)}} className="status-cls">{rawRow.status.toUpperCase()}</span>
            </TableCell>
            <TableCell align="left">{new Date(rawRow.ticket_created).toDateString()}</TableCell>
            <TableCell align="left">{new Date(rawRow.finding_created).toDateString()}</TableCell>
            <TableCell align="center" className={`severity-cell  ${getSeverityColor(rawRow?.severity) || ""}`}>{rawRow.severity?.toUpperCase()}</TableCell>
            <TableCell align="left">
              <div>{rawRow.remediation_text}</div>
              <div className="remediation-url" onClick={(e) =>{window.open(e.currentTarget.textContent, '_blank')}}>{rawRow.remediation_url}</div>
            </TableCell>
        </TableRow>)
      ));
  }

  const  renderExpandedRow = (rowID) => {
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
                {getRawFindings(rowID)}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
            component="div"
            count={rawFindings.filter(i=> rowID === i.grouped_finding_id).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Box>);
  }
  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={onClickRow.bind(this, rowId)}>
            {isExpanded ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {renderExpandedRow(clickedRowId)}
        </TableRow>
      )}
    </>
  );
};

export default ExpandableTableRow;