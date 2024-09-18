import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { RiImageAddFill } from "react-icons/ri";

export default function Employee() {

const navigate=useNavigate()

const [employee,setemployee]=useState([])

const [query,setquery]=useState()

useEffect(()=>{
    getemployeelist()
},[])

const getemployeelist=async()=>{
    try {
        
let response=await fetch('http://localhost:5000/getemployee',{
    method:'get',
    credentials:'include'

})

let data=await response.json()
setemployee(data)

    } catch (error) {
        console.log(error);
        
    }
}




const getemployeefilteredlist=async()=>{
  try {
      
let response=await fetch('http://localhost:5000/getfilteredemployee',{
  method:'post',
  credentials:'include',
  headers:{
    'Content-Type':"application/json"
  },
  body:JSON.stringify({"query":query})
})

let data=await response.json()
setemployee(data)

  } catch (error) {
      console.log(error);
      
  }
}




const deleteEmployee=async(id)=>{
  try {


if(window.confirm('Do you want to delete this data?')){

      let response=await fetch("http://localhost:5000/deleteemployee",{
          method:"post",
          headers:{
              'Content-Type':"application/json"
          },
  
          body:JSON.stringify({'id':id})
      })
  
  let status=response.status;
  
  if(status==200){
      
    setemployee((prev) => prev.filter(employee => employee.id !==id));


  }
}
      
  } catch (error) {
      
  }
  
  
  
    }



  return (
    <div className='w-full h-[calc(100vh-4rem)]'>
      <div className='w-full flex justify-between  my-2 p-3 '  >
        <div>Total Count : {employee.length}</div>
        <div className='flex gap-5'>
      <button onClick={()=>{navigate('/create')}} className='border-2 px-3 rounded-md '>Create Employee</button>
        <div className='flex gap-3'>
        <input placeholder='search' value={query} onKeyUp={(e)=>{if(e.key=='Enter'){getemployeefilteredlist()}}} onChange={(e)=>{setquery(e.target.value)}} className='bg-slate-100 outline-none border rounded-md px-1' ></input>
        {/* <button className='border-2 px-3 rounded-md'>Search</button> */}
        </div>
        </div>      
      </div>


<div  className='w-full' >
<div className='w-full flex flex-row border bg-slate-100' >
<div className='flex w-[3%] border-x border-2'>Id</div>
<div className='flex w-[10%] border-x border-2'>Image</div>
<div className='flex w-[10%] border-x border-2'>Name</div>
<div className='flex w-[17%] border-x border-2'>Email</div>
<div className='flex w-[10%] border-x border-2'>Mobile No.</div>
<div className='flex w-[10%] border-x border-2'>Designation</div>
<div className='flex w-[8%] border-x border-2'>Gender</div>
<div className='flex w-[10%] border-x border-2'>Course</div>
<div className='flex w-[10%] border-x border-2'>Create Date</div>
<div className='flex w-[12%] border-x border-2'>Action</div>
</div>
</div>

{employee.map((item,index)=>{
return(
    <div  key={index} className='w-full' >
<div className='w-full flex flex-row border text-black ' >
<div className='flex w-[3%] border-x border-2'>{item.id}</div>
<div className='flex w-[10%] border-x border-2'>
<img  className='w-full aspect-auto' src={`http://localhost:5000/getimage?url=${item.image}`} alt="profile" />
  
  </div>
<div className='flex w-[10%] border-x border-2'>

{item.name}
 
  </div>
<div className='flex w-[17%] border-x border-2'>{item.email}</div>
<div className='flex w-[10%] border-x border-2'>{item.mobile}</div>
<div className='flex w-[10%] border-x border-2'>{item.designation}</div>
<div className='flex w-[8%] border-x border-2'>{item.gender}</div>
<div className='flex w-[10%] border-x border-2'>{item.course}</div>
<div className='flex w-[10%] border-x border-2'>{item.date_only}</div>
<div className='flex w-[12%] flex-row items-center border-x border-2 gap-2'>
    <button onClick={()=>{navigate(`/update/${item.id}`)}} className='border-2 rounded-md p-2 bg-sky-600 text-white'>Update</button>
    <button onClick={()=>{deleteEmployee(item.id)}} className='border-2 rounded-md p-2 bg-red-500 text-white'> delete</button>
</div>
</div>
</div>

)
})}




    </div>
  )
}
