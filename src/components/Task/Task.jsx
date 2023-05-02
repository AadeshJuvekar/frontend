import React, { Component } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { getTask, getDeveloper, deleteTask, addRemark } from "./../../actions/userAction";
import { getSession } from "./../../actions/userSession";

const useStyles = () => ({
  root: {
    "& > *": {
      margin: "1%",
    },
  },
  textboxstyle: {
    width: "50%",
    marginLeft: "35%",
    marginBottom: "2px",
  },
  typographystyle: {
    marginTop: "5px",
    color: "black",
  },
  addremark: {
    width: "20%",
    textAlign: "center",
    paddinBottom: "2%",
    fontSize: "120%",
    fontWeight: "120%",
    marginRight: "2%",
  },
  container: {
    maxHeight: 440,
  },
  cardroot: {
    width: "98%",
    margin: "12px",
  },
  textarea: {
    width: "100%",
    border: "1px solid white",
    backgroundColor: "#ddd",
    borderRadius: "10px",
    borderBottom: "none",
    outline: "none",
  },
  remark: {
    textAlign: "left",
    marginLeft: "2%",
    marginTop: "1%",
  },
  addBtn: {
    float: "right",
  },
  givenby: {
    marginTop: "1%",
    marginBottom: "2%",
    // fontSize: "150%",
    marginLeft: "2%",
    width: "100%",
    textAlign: "left",
  },
});

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remark: "",
      count: 0,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange = (event) => {
    // console.log(event.target.value);
    //study syntheticbaseevent its an object
    this.setState({ errors: {} });
    this.setState({ [event.target.name]: event.target.value });
  };
  onClick = (event) => {
    const taskIdentifier = this.props.taskIdentifier.taskIdentifier;
    this.props.deleteTask(taskIdentifier);
  };
  onSubmit = (event) => {
    event.preventDefault();
   // console.log("Remark Count :" + this.state.tasks.task.remark);
    const newComment = {
      //remarkIdentifier: this.props.taskIdentifier.taskIdentifier + "-" + this.state.count ,
      description: this.state.remark,
      givenBy: this.props.userSession.loginName
    };
   // console.log(this.props.taskIdentifier.taskIdentifier + "-" );
    this.props.getSession();
     this.props.addRemark(
       newComment,
       this.props.taskIdentifier.taskIdentifier
     );
  };
  componentDidMount() {
    const taskIdentifier = this.props.taskIdentifier.taskIdentifier;
    console.log("did :", taskIdentifier);
    this.props.getSession();
    this.props.getTask(taskIdentifier);
    this.props.getDeveloper(taskIdentifier);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const taskIdentifier = this.props.taskIdentifier.taskIdentifier;
    const {developer} = this.props;
    console.log("developer: ", developer );
    const { classes } = this.props;
    const { task } = this.props;
    const {userType} = this.props.userSession;
    const remark = task.remarks;
    console.log("userSession :", taskIdentifier, this.props.userSession.loginName , this.props.userSession.userType);
    const page = this.setState;
    console.log("Remarks :" + remark);
    return (
      <div
        style={{
          height: "85vh",
          width: "100%",
          position: "relative",
          top: "3em",
        }}
      >
        <div className="card d-block">
          <Card
            variant="outlined"
            style={{ margin: "10px", borderRadius: "10px" }}
          >
            <Container maxWidth="lg" style={{ minHeight: "65vh" }}>
            <form autoComplete="off" onSubmit={this.onSubmit}>
              <Grid container>
                <Grid item md={6}>
                  {/* <!-- project title--> */}
                  <h1 className="mt-0">{task.title}</h1>
                  <h4 className="mt-0">Task Id : {task.taskIdentifier}</h4>
                  <div className="badge bg-secondary text-light mb-3">
                  <h4 className="mt-0">Status :  <Chip label={task.progress} color="primary" /> </h4>
                  </div>
                  <h4 className="mt-0">Assigned to : 
                  {developer.userType === "Developer"? 
                  <Chip avatar={<Avatar>D</Avatar>} label={developer.loginName} variant="outlined"/>
                  :""}
                 
                  </h4>

                  <h4>Task Description:</h4>

                  <p className="text-muted mb-2">{task.description}</p>

                  <Grid container spacing={1}>
                    <Grid item md={4}>
                      <div className="mb-4">
                        <h4>Created At :</h4>
                        <p>{task.createdAt}</p>
                      </div>
                    </Grid>
                    <Grid item sm={4}>
                      <div className="mb-1">
                        <h4>Updated At :</h4>
                        <p>{task.updatedAt}</p>
                      </div>
                    </Grid>
                  </Grid>

                  {/* <div id="tooltip-container">
                    <h5>Team Members:</h5>                                            
                </div> */}

                  <Grid container spacing={1}>
                    <Grid item md={3}>
                      <div className="mb-4">
                        <NavLink
                          to={`/task/update/${taskIdentifier}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="outlined">Update Task</Button>
                        </NavLink>
                      </div>
                    </Grid>
                    {userType === "Client" || userType === "Developer"  ? (
                      //   <Grid item md={4}>
                      // <div className="mb-4">
                      //   <NavLink
                      //     to={`/task/assignDeveloper/${task.taskIdentifier}`}
                      //     style={{ textDecoration: "none" }}
                      //   >
                      //     <Button variant="outlined">Assign Client</Button>
                      //   </NavLink>
                      // </div>
                      // </Grid>
                      <></>
                      ):(<>{userType === "ProductOwner"  ? (
                        <Grid item md={3}>
                      <div className="mb-4">
                        <NavLink
                          to={`/task/assignClient/${task.taskIdentifier}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="outlined">Add Client</Button>
                        </NavLink>
                      </div>
                      </Grid>
                      ):(
                        <Grid item md={4}>
                        <div className="mb-4">
                        <NavLink
                          to={`/task/assignDeveloper/${task.taskIdentifier}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button textAlign="center" variant="outlined">Assign Developer</Button>
                        </NavLink>
                      </div>
                      </Grid>
                      )}</>)}
                      {userType === "Client" || userType === "Developer"  ?"": (
                    <Grid item md={3}>
                      <div className="mb-4">
                        <Button
                          variant="outlined"
                          onClick={this.onClick.bind(this, task.taskIdentifier)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Grid>
                  )}                  
                  </Grid>
                  <br />
                  <br />
                </Grid>
                {/* Remark Card */}
                
                <Grid item md={6}>
                  <Card className={classes.cardroot}>
                    {remark !== undefined ? (
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.remark}
                      >
                        {`Comments : ` + remark.length + ``}
                      </Typography>
                    ) : (
                      ""
                    )}
                    <CardContent></CardContent>
                    {remark !== undefined
                      ? remark
                          .reverse()
                          .slice(page)
                          .map((taskremark) => {
                            return (
                              <Typography
                                className={classes.givenby}
                                key={taskremark.id}
                              >
                                <Typography style={{ fontWeight: "bold" }}>
                                {taskremark.remarkIdentifier} <t/>
                                {taskremark.givenBy}
                                </Typography>
                                <Typography>{taskremark.createdAt}</Typography>
                                <Typography>
                                  {taskremark.description}
                                </Typography>
                                <hr style={{opacity:"0.4"}}/>
                              </Typography>
                            );
                          })
                          
                      : ""}
                      <div>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="remark"
                          label="Add Comment"
                          type="text"
                          id="remark"
                          error={this.state.errors.remark}
                          helperText={this.state.errors.remark}
                          onChange={this.onChange}                          
                        />                      
                        <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ marginBottom: "10px"}}
                    >
                      Add Comment
                    </Button>
                        </div>
                  </Card>
                </Grid>
               
              </Grid>
              </form>
            </Container>
          </Card>

          {/* <!-- end card-body--> */}
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  getTask: PropTypes.func.isRequired,
  getDeveloper: PropTypes.func.isRequired,
  getSession: PropTypes.func.isRequired,
  userSession: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired,
  developer: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  addRemark: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  tasks: state.tasks,
  task: state.tasks.task,
  developer: state.tasks.developer,
  remarks: state.tasks.task.remark,
  userSession: state.userSession,
});

export default connect(mapStateToProps, {
  getTask,
  addRemark,
  getSession,
  getDeveloper,
  deleteTask,
})(withStyles(useStyles)(Task));
