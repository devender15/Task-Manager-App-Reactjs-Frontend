import React, { useState, useEffect } from "react";
import { fetchUser } from "../utilities/fetchUser";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { ShowProgress } from "./";

const TasksTable = () => {
  const userToken = fetchUser();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const [updateTaskFlag, setUpdateTaskFlag] = useState(false);

  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateDue_date, setUpdateDue_date] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  // states for task details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDue_date] = useState("");
  const [status, setStatus] = useState("");

    // showing the current status will we be using this toast message
    const toastMessage = (type, message) => {
      toast(message, {
        type: type==="error" ? "error" : "success",
        theme: "colored",
        position: "top-center",
        autoClose: 2000,
      });
    };
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchUserTasks = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/list`,
        { headers: { Authorization: "Bearer " + userToken } }
      );
      setTasks(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, [updateList]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Task Name", width: 130 },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 90,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
    },
  ];

  const handleCreateTask = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/create-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        name,
        description,
        due_date,
        status,
      }),
    })
      .then((res) => res.json())
      .then((data) => toastMessage(data.status, data.message))
      .then(setUpdateList(!updateList))
      .then(handleClose());
  };

  // function to get the selected row data from table
  const onRowsSelectionHandler = (ids) => {
    setSelectedRowsData(ids.map((id) => tasks.find((row) => row.id === id)));
  };


  const handleDeleteTask = () => {
    if (selectedRowsData.length !== 0) {
      selectedRowsData.map((row, i) => {
        fetch(`${process.env.REACT_APP_API_URL}/tasks/delete-task`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken,
          },
          body: JSON.stringify({ taskId: selectedRowsData[i].id }),
        })
          .then((res) => res.json())
          .then((data) => toastMessage(data.status, data.message))
          .then(setUpdateList(!updateList));
      });
    } else {
      console.log("please select a task to delete !");
    }
  };


  const handleEditTask = () => {
    if (selectedRowsData.length === 1 ) {
      fetch(`${process.env.REACT_APP_API_URL}/tasks/edit-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify({
          taskId: selectedRowsData[0].id,
          name: updateName,
          description: updateDescription,
          status: updateStatus,
          due_date: updateDue_date,
        }),
      })
        .then((res) => res.json())
        .then((data) => toastMessage(data.status, data.msg))
        .then(setUpdateList(!updateList))
        .then(setSelectedRowsData([]))
        .then(handleClose());

    } else {
      console.log("select any task");
    }
  };

  return (
    <>
      <div style={{ height: 300, width: "100%", backgroundColor: "white" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          rowSpacingType="filled"
          onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        />
      </div>

      <div className="flex justify-start items-center space-x-4">
        <button
          onClick={() => {
            setUpdateTaskFlag(false);
            handleOpen();
          }}
          className="font-bold p-4 bg-blue-800 text-white rounded-md my-4 hover:bg-blue-600 transition-all transition-duration:0.2s"
        >
          Add new task
        </button>

        <button
          className="font-bold p-4 bg-green-800 text-white rounded-md my-4 hover:bg-green-600 transition-all transition-duration:0.2s"
          onClick={() => {
            setUpdateTaskFlag(true);
            handleOpen();
            setUpdateName(selectedRowsData[0].name);
            setUpdateDescription(selectedRowsData[0].description);
            setUpdateStatus(selectedRowsData[0].status);
            setUpdateDue_date(selectedRowsData[0].due_date);
          }}
          disabled = {selectedRowsData.length === 0}
        >
          Edit task
        </button>

        <button
          className="font-bold p-4 bg-red-700 text-white rounded-md my-4 hover:bg-red-500 transition-all transition-duration:0.2s"
          onClick={handleDeleteTask}
          disabled = {selectedRowsData.length === 0}
        >
          Delete task
        </button>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="space-y-4">
            <TextField
              id="filled-basic"
              label="Task Name"
              type="text"
              variant="standard"
              required
              value={updateTaskFlag ? updateName : name}
              onChange={(e) => updateTaskFlag ?  setUpdateName(e.target.value) : setName(e.target.value)}
              sx={{ fontWeight: "bold" }}
            />

            <textarea
              name="desc"
              id="desc"
              value={updateTaskFlag ? updateDescription : description}
              onChange={(e) => updateTaskFlag ?  setUpdateDescription(e.target.value) : setDescription(e.target.value)}
              cols="30"
              rows="10"
              placeholder="describe your task"
              className="font-bold p-4 bg-gray-300"
            ></textarea>

            <div className="flex p-2 space-x-6">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={updateTaskFlag ? updateStatus : status}
                  onChange={(e) => updateTaskFlag ? setUpdateStatus(e.target.value) :  setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"STARTED"}>STARTED</MenuItem>
                  <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                  <MenuItem value={"CANCELLED"}>CANCELLED</MenuItem>
                  <MenuItem value={"PENDING"}>PENDING</MenuItem>
                  <MenuItem value={"HALF_COMPLETED"}>HALF COMPELETED</MenuItem>
                  <MenuItem value={"OVERDUE"}>OVERDUE</MenuItem>
                </Select>
              </FormControl>

              <input
                type="time"
                value={updateTaskFlag ? updateDue_date : due_date}
                onChange={(e) => updateTaskFlag ? setUpdateDue_date(e.target.value) :  setDue_date(e.target.value)}
                className="border-2 border-blue-600 rounded-md"
              />
            </div>

            <button
              className="font-bold p-3 text-white bg-blue-600 rounded-md"
              onClick={updateTaskFlag ? handleEditTask : handleCreateTask}
            >
              {updateTaskFlag ? "Update task" : "Create task"}
            </button>
          </Box>
        </Modal>
      </div>

      <div className="my-6">
        <ShowProgress tasks={tasks} />
      </div>


    <ToastContainer />
    </>
  );
};

export default TasksTable;
