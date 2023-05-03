import React, { Component } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  Card,
} from "@mui/material";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  assignClient,
  getTask,
  getClients,
} from "../../actions/userAction";
import { withStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";

const useStyles = () => ({
  title: {
    fontSize: 35,
    padding: "35px 0px",
    fontWeight: 300,
  },
  card: {
    width: "80%",
    margin: "5%",
    marginLeft: "10%",
    marginRight: "5%",
  },
});

class AssignClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      errors: {},
    };
  }

  onChange = (event) => {
    console.log(event);
    //study syntheticbaseevent its an object
    this.setState({ loginName: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.loginName === "") {
      this.setState({ errors: { loginName: "Cannot be blank" } });
    } else {
      //   const assignDeveloper = {
      //     loginName: this.state.loginName,
      //   };
      this.props.assignClient(
        this.props.taskIdentifier.taskIdentifier,
        this.state.loginName
      );
    }
  };

  componentDidMount() {
    this.props.getClients();
    this.props.getTask();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { classes } = this.props;
    const { clients } = this.props.clients;
    console.log(this.props);

    return (
      <>
        <CssBaseline />
        <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "7%",
                paddingBottom: "7%",
                height:"100%"
              }}
            >
        <Card varient="outlined"
                maxWidth="sm"
                style={{
                  width: "60%",
                  height: "100%",
                  padding: "30px",
                  margin: "5%",
                  marginLeft: "5%",
                  marginRight: "5%",
                }}>
          <Container maxWidth="sm">
            <div>
              <Typography variant="h1" align="center" className={classes.title}>
                Assign Client
              </Typography>
              <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                <Grid container alignItems="flex-start" spacing={1}>
                  {clients !== undefined ? (
                    <Select
                      style={{ width: "200%", minHeight: "10%"}}
                      name="loginName"
                      onChange={this.onChange}
                      value={this.state.loginName}
                    >
                      {clients.map((client) => (
                        <MenuItem
                          key={client.id}
                          value={client.loginName}
                        >
                          {" "}
                          {client.name}{" "}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    ""
                  )}

                  <Container maxWidth="sm">
                    <Box m="20px auto">
                      <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        style={{ marginLeft: "30%" }}
                      >
                        Assign Task
                      </Button>{" "}
                      &nbsp;
                      <NavLink
                        to={`/task/${this.props.taskIdentifier.taskIdentifier}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="outlined" color="primary">
                          Cancel
                        </Button>
                      </NavLink>
                    </Box>
                  </Container>
                </Grid>
              </form>
            </div>
          </Container>
        </Card>
        </Box>
      </>
    );
  }
}

AssignClient.propTypes = {
  classes: PropTypes.object.isRequired,
  assignClient: PropTypes.func.isRequired,
  getTask: PropTypes.func.isRequired,
  getClients: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  task: state.tasks.task,
  clients: state.clients,
  client: state.clients.client,
});

export default connect(mapStateToProps, {
  assignClient,
  getTask,
  getClients,
})(withStyles(useStyles)(AssignClient));
