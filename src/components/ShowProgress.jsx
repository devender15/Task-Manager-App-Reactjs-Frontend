import React, { useState, useEffect } from "react";

import { Progressbar } from "./";

const ShowProgress = ({ tasks }) => {

    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [overDueTasks, setOverDueTasks] = useState([]);
    const [startedTasks, setStartedTasks] = useState([]);
    const [halfCompleted, setHalfCompleted] = useState([]);

    const totalTasks = tasks.length;

    const pendingTasksPercentage = Math.round((pendingTasks.length / totalTasks) * 100);
    const completedTasksPercentage = Math.round((completedTasks.length / totalTasks) * 100);
    const overdueTasksPercentage = Math.round((overDueTasks.length / totalTasks) * 100);
    const startedTasksPercentage = Math.round((startedTasks.length / totalTasks) * 100);
    const halfCompletedTasksPercentage = Math.round((halfCompleted.length / totalTasks) * 100);


    useEffect(() => {
        setPendingTasks(tasks.filter(task => task.status === "PENDING"));
        setCompletedTasks(tasks.filter(task => task.status === "COMPLETED"));
        setOverDueTasks(tasks.filter(task => task.status === "OVERDUE"));
        setStartedTasks(tasks.filter(task => task.status === "STARTED"));
        setHalfCompleted(tasks.filter(task => task.status === "HALF_COMPLETED"));
    }, [tasks])


  return (
    <div>
        
      <h1 className="font-bold text-2xl">Your current progress</h1>
    <div className="flex items-center space-x-10">
        <p className="flex space-x-20 items-center">Pending <div className="w-5 h-5 bg-[#ffa500]"></div></p>
        <p className="flex space-x-20 items-center">Completed <div className="w-5 h-5 bg-red-600"></div></p>
        <p className="flex space-x-20 items-center">Overdue <div className="w-5 h-5 bg-[#99ff66]"></div></p>
        <p className="flex space-x-20 items-center">Started <div className="w-5 h-5 bg-[#cc2b5e]"></div></p>
        <p className="flex space-x-20 items-center">Half completed <div className="w-5 h-5 bg-[#ff5f6d]"></div></p>
    </div>

      <div className="flex flex-col justify-center items-center">
        <Progressbar bgcolor="orange" progress={pendingTasksPercentage ? pendingTasksPercentage : 0} height={30}/>
        <Progressbar bgcolor="red" progress={completedTasksPercentage ? completedTasksPercentage : 0} height={30} />
        <Progressbar bgcolor="#99ff66" progress={overdueTasksPercentage ? overdueTasksPercentage : 0} height={30} />
        <Progressbar bgcolor="#cc2b5e" progress={startedTasksPercentage ? startedTasksPercentage : 0} height={30} />
        <Progressbar bgcolor="#ff5f6d" progress={halfCompletedTasksPercentage ? halfCompletedTasksPercentage : 0} height={30} />
      </div>
    </div>
  );
};

export default ShowProgress;
