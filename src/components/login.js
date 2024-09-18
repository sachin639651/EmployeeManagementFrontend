import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate();

const [username,setusername]=useState()
const [password,setpassword]=useState()

const [loginstatus,setloginstatus]=useState('ok')

const [logingin,setlogingin]=useState(false)

const login=async()=>{
    try {
if(username && password){
    setlogingin(true)
        let response=await fetch('http://localhost:5000/login',{
            method:"post",
            headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({'name':username,'password':password}),
              credentials:'include'
        })

        if(response.status===200){
            setloginstatus('ok') 
            window.location.href='/'
        }
        else if(response.status===400){
            setloginstatus('wrongCred')
        }
        else{
            setloginstatus('something wrong')
        }

    }
    else{
        setloginstatus('required')
    }
    } catch (error) {
        console.log(error);
        
    }
    finally{
        setlogingin(false)
    }
}


  return (
    <div className=' h-[calc(100vh-4rem)]  p-3 flex items-center justify-center'>
       
    <div className='md:w-[30%] w-full sm:w-[50%] h-[70%] bg-slate-100 shadow-md gap-3  items-center p-5 rounded-md flex flex-col' >
<div className='w-full flex justify-center text-lg font-medium'>Logo</div>
<div className=''>
    <input className='outline-none rounded-md h-8 p-1' value={username}  onChange={(e)=>{setusername(e.target.value)
        setloginstatus('ok')}} placeholder='User Name'></input>
</div>
<div>
    <input className='outline-none rounded-md h-8 p-1 ' value={password} onChange={(e)=>{setpassword(e.target.value)
        setloginstatus('ok')}} placeholder='Password' ></input>
</div>

<button onClick={login} disabled={logingin} className='border-[3px] py-1 px-4 cursor-pointer hover:bg-sky-500 hover:text-white rounded-md border-sky-500 ' >
{logingin && 
<div>Login ...</div>
}

{!logingin && 
<div>Login</div>
}

  </button>
{loginstatus==='wrongCred'&&

  <div className='text-red-400'>Wrong Credential</div>
}
{loginstatus==='required'&&

<div className='text-red-400'>Please fill all the fields</div>
}
    </div>
    </div>
  )
}
