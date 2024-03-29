import React from "react";
import { useParams } from "react-router-dom";
import AssignDeveloper from "./AssignDeveloper";
import Task from "./Task";
import UpdateTask from "./UpdateTask";
import AssignClient from "./AssignClient";

function TaskRoutes(props) {
  const taskIdentifier = useParams();
  return (
    <div>
      {
        {
          View: <Task taskIdentifier={taskIdentifier} />,
          Update: <UpdateTask taskIdentifier={taskIdentifier} />,
          AssignDeveloper: <AssignDeveloper taskIdentifier={taskIdentifier} />,
          AssignClient: <AssignClient taskIdentifier={taskIdentifier} />,
        }[props.action]
      }
    </div>
  );
}
TaskRoutes.propTypes = {};

export default TaskRoutes;
