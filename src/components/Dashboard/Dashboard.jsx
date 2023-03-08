import React, { Component } from "react";
import { connect } from "react-redux";
import "./dashboard.css";
import PropTypes from "prop-types";
import {
  Button,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { getSession } from "../../actions/userSession";
import { getTasks, getUserTasks } from "./../../actions/userAction";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = () => ({
  root: {
    flexGrow: 1,
    width: "80%",
    height: "vh",
    marginTop: "2%",
    maxWidth: "80%",
    margin: "auto",
  },
  container: {
    maxHeight: 440,
  },
  header: {
    textAlign: "center",
    marginTop: "2%",
  },
  btn: {
    border: "1px solid black",
    margin: "1%",
  },
  search: {
    float: "right",
    marginRight: "2px",
    marginTop: "1.4%",
  },
  input: {
    float: "right",
    marginTop: "1%",
  },
});
const columns = [
  { id: "taskIdentifier", label: "Identifier", align: "left" },
  { id: "title", label: "Title", minWidth: 170, align: "left" },
  {
    id: "progress",
    label: "Progress",
    minWidth: 170,
    align: "left",
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 170,
    align: "left",
  },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName : '',
      page: 0,
      rowsPerPage: 10,
      searchfield: "",
    };
  }
  handleChange = (e) => {
    this.setState({ searchfield: e.target.value });
  };
 
  componentDidMount() {
     //this.props.getSession();
     //console.log(this.props.getSession());
     this.props.getUserTasks(this.props.userSession.loginName);
     //this.props.getTasks();
  }

  render() {
    const { userSession } = this.props;
    const { classes } = this.props;
    const tasks = this.props.tasks;
    //const tasks = this.props.tasks.tasks;
    const { searchfield } = this.state;
    const { page } = this.state;
    const { rowsPerPage } = this.state;

    var filteredData = tasks.filter((task) => {
      if (task.title.toLowerCase().includes(searchfield.toLowerCase())) {
        return task;
      }
      return null;
    });
    
    return (
      userSession.authType !== undefined &&
      userSession.authType !== "loggedIn" ? (
      (window.location.href = "/login")
    ) : (
      
      <div className="dashboard">
        <Typography
          variant="h3"
          style={{ fontWeight: "600", color: "white" }}
          className={classes.header}
        >
          Task List
        </Typography>
        <Paper className={classes.root}>
          <NavLink to="/task/create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{ border: "none" }}
              className={classes.btn}
              name="btnid"
            >
              Create Task
            </Button>
          </NavLink>
          <div className={classes.input}>
            <InputBase
              placeholder="Search By Title"
              inputProps={{ "aria-label": "search" }}
              name="searchfield"
              value={this.state.searchfield}
              onChange={this.handleChange}
            />
          </div>
          <div className={classes.search}>
            <SearchIcon />
          </div>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .reverse()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={task.id}
                      >
                        {columns.map((column) => {
                          const value = task[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <NavLink
                                to={`/task/${task.taskIdentifier}`}
                                style={{ textDecoration: "none" }}
                              >
                                {value}
                              </NavLink>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 15, 25]}
              component="div"
              count={tasks.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={(event, newPage) =>
                this.setState({ page: newPage })
              }
              onChangeRowsPerPage={(event) =>
                this.setState({ rowsPerPage: +event.target.value, page: 0 })
              }
            />
          </TableContainer>
        </Paper>
      </div>
    ));
  }
}

Dashboard.propTypes = {
  tasks: PropTypes.object.isRequired,
  getSession: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  getUserTasks: PropTypes.func.isRequired,
  userSession: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userSession: state.userSession, 
  users: state.users,
  //tasks : state.tasks,
  tasks: state.users.userTasks
});

export default connect(mapStateToProps, {getSession, getTasks, getUserTasks })(
  withStyles(useStyles)(Dashboard)
);
