import React,{useState} from 'react'
import { RiImageAddFill } from "react-icons/ri";
export default function Createemployee() {


    const [data,setdata]=useState({
        name:"",email:"",mobile:"",designation:"",gender:"",course:"",profile:""
    })

    const [validity,setvalidity]=useState({email:true,number:true})
const handelinput=(e)=>{
let name=e.target.name;
let value=e.target.value;
if(name=='email'){
  setvalidity((prev) => ({ ...prev, email: true }));
}
if(name=='mobile'){
  setvalidity((prev) => ({ ...prev, number: true }));
}
setdata({...data,[name]:value})
}

const [creating,setcreating]=useState(false)



const validateemail=(email)=>{
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRegex.test(email);
}

const validnumber=(number)=>{

  
  return number.length==10;
}



const createemployee = async () => {
    try {
     

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      formData.append("designation", data.designation);
      formData.append("gender", data.gender);
      formData.append("course", data.course);
  
      if (typeof(data.profile)!=='string') {
        formData.append("profile", data.profile);  
      }
  if(data.name && data.email && data.mobile && data.designation && data.gender && data.course){
    if(validateemail(data.email)){

      if(validnumber(data.mobile)){
        setcreating(true);
      let response = await fetch("http://localhost:5000/createemployee", {
        method: 'POST',
        body: formData,
        credentials: "include"
      });
  if(response.status===201){

    window.alert("Employee Created")

  }else if(response.status===409){
window.alert('An Employee with this email already exist')
  }

}else{
  setvalidity((prev) => ({ ...prev, number: false }));
  }



}
  else{
    setvalidity((prev) => ({ ...prev, email: false }));
  }


}else{
  window.alert("Please fill all the fields")
}
  
    } catch (error) {
      console.log(error);
    }
  };








  return (
    <div className='w-full  flex  p-5 justify-center'>

        <div className='w-[50%] flex items-center flex-col gap-5  p-5 bg-slate-100 border  rounded-md shadow-md ' >
            <div className='p-2 font-medium  text-lg'>Create Employee</div>
            <div className='flex flex-row gap-3 items-center'>
                <p className='font-medium text-lg text-gray-700 '   >Name :</p>
                <input className='outline-none border-2 rounded-md h-9 ' value={data.name} name='name' onChange={(e)=>{handelinput(e)}}  placeholder='Enter name'></input>
            </div>
            <div className='flex flex-row gap-3 items-center'>
                <p className='font-medium text-lg text-gray-700 '>Email :</p>
                <input className='outline-none border-2 rounded-md h-9 ' value={data.email} name='email' onChange={(e)=>{handelinput(e)}} placeholder='Enter email'></input>
            </div>
           {!validity.email && <div className='text-red-400' >Enter valid email</div>}
            <div className='flex flex-row gap-3 items-center'>
                <p className='font-medium text-lg text-gray-700 '>Mobile No. :</p>
                <input className='outline-none border-2 rounded-md h-9 ' value={data.mobile} name='mobile' onChange={(e)=>{handelinput(e)}} placeholder='Enter Mobile No.'></input>
            </div>
            {!validity.number && <div className='text-red-400' >Enter valid Mobile No.</div>}
            <div className='flex flex-row gap-3 items-center'>
                <p className='font-medium text-lg text-gray-700 '>Designation :</p>

<select className='outline-none border-2 rounded-md h-9 '   name='designation' onChange={(e)=>{handelinput(e)}} >
    <option value=''>Select Designation</option>
    <option value='HR'>HR</option>
    <option value='Manager'>Manager</option>
    <option value='Sales'>Sales</option>
</select>


                {/* <input className='outline-none border-2 rounded-md h-9 '    value={data.designation} name='designation' onChange={(e)=>{handelinput(e)}} placeholder='Enter designation'></input> */}
            </div>
            <div className='flex flex-row gap-3 items-center'>
                <p className='font-medium text-lg text-gray-700 '>Gender :</p>
                <div className='flex items-center gap-5'>
                <div className='flex flex-row gap-1 items-center' >
                   
                <input className='outline-none border-2 rounded-md h-9 '  type='radio' value='Male' name='gender' onChange={(e)=>{handelinput(e)}} placeholder='Enter Gender'></input>
                <p>Male</p>
                </div>
                <div className='flex flex-row gap-1 items-center' >
              
                <input className='outline-none border-2 rounded-md h-9 ' type='radio' value='Female' name='gender' onChange={(e)=>{handelinput(e)}} placeholder='Enter Gender'></input>
                <p>Female</p>
                </div>
                </div>
            </div>


            <div className='flex flex-row gap-3 items-center'>
                <p className='font-medium text-lg text-gray-700 '>Course :</p>
<div className='flex flex-row gap-3' >
    <div className='flex flex-row items-center gap-1' >
    <input className='outline-none border-2 rounded-md h-9 ' type='checkbox' value='MCA' name='course' onChange={(e)=>{handelinput(e)}} ></input>
    <p>MCA</p>
    </div>
    <div className='flex flex-row items-center gap-1' >
    <input className='outline-none border-2 rounded-md h-9 ' type='checkbox' value='BCA' name='course' onChange={(e)=>{handelinput(e)}} ></input>
    <p>BCA</p>
    </div>
    <div className='flex flex-row items-center gap-1' >
    <input className='outline-none border-2 rounded-md h-9 ' type='checkbox' value='BSC' name='course' onChange={(e)=>{handelinput(e)}} ></input>
    <p>BSC</p>
    </div>

</div>
                



            </div>







            <div className='flex flex-row gap-3 items-center'>
                <p className='font-medium text-lg text-gray-700 '>Profile Image :</p>
                <div onClick={()=>{document.getElementById("image_input").click()}} className='w-20 border rounded-md flex  cursor-pointer items-center justify-center h-20' >
{typeof(data.profile)!=='string'?<img src={URL.createObjectURL(data.profile)} alt='Profile Image' className='w-full h-full' ></img>:
    <RiImageAddFill size={35} />  
}
            
{/* 
            <RiImageAddFill size={35} />   */}

                </div>
                <input className=' h-9 hidden ' id='image_input' onChange={(e)=>setdata({...data,profile:e.target.files[0]})} type='file'  accept="image/png, image/jpeg, image/jpg" ></input>
            </div>


            <div className='flex flex-row gap-3 items-center'>

                <button onClick={createemployee} className='outline-none border-2 rounded-md h-9 px-5 bg-slate-400 ' >Create</button>
            </div>
             </div>
      
    </div>
  )
}
