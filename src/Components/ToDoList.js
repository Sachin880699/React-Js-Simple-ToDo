import React, { useEffect, useState } from "react"



function ToDoList(){
    const [taskname , setTaskName] = useState("")
    const [tasktime , setTaskTime]= useState("")
    const [tasktoassign , setTaskToAssign] = useState("")
    const [data , setData] = useState([])
    

    function addtaks(){
        console.warn(taskname , tasktime , tasktoassign)
        fetch("http://192.168.43.79:8000/AddToDo",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({taskname , tasktime , tasktoassign})
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn(resp)
                window.location.reload();
            })
        })
    }
    

    useEffect(async ()=>{
        let result = await fetch("http://192.168.43.79:8000/ToDoList");
        result = await result.json();
        console.warn(result.output)
        setData(result.output)
    },[])


    function deletetask(task_id){
        fetch("http://192.168.43.79:8000/DeleteToDO",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({task_id})
        })
        window.location.reload();

    }
    
    return(
        <div>
            <h1>ToDoList</h1>
            <center>
            <div className="col-sm-6 offset-m-3 ">
           
            
      <div className="form-inline">
        <input type="text" placeholder="Enter Task Name" onChange={(e)=>setTaskName(e.target.value)} className="form-control"  /><br/>
        <input type="time" placeholder="Enter Task Time" onChange={(e)=>setTaskTime(e.target.value)} className="form-control"  /><br/>
        <input type="text" placeholder="Enter Task To Assing" onChange={(e)=>setTaskToAssign(e.target.value)} className="form-control"  /><br/>
        <button onClick={addtaks} className="btn btn-primary"  >Add Task</button>
      </div>


            </div>

<br/>

    {
        data.map((res)=>
        
        
        <div className="card" style={{width:"18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{res.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{res.time}</h6>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
    <button  className="btn btn-warning">Update</button>&nbsp;
    <button onClick={()=>deletetask(res.id)} className="btn btn-danger">Delete</button>
    
  </div>
  
</div>


        )

    }

           
            </center>
        </div>
    )
}

export default ToDoList