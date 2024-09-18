import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Header() {
const navigate=useNavigate()
  const location=useLocation()

  function getCookie() {
    const value = `${document.cookie}`;     
    const parts = value.split(`; ${'username'}=`);
        if (parts.length === 1) return parts[0].split('=')[1]
  }
  
  const [userdata,setuserdata]=useState(getCookie())


  const LogOut=async()=>{
    const response = await fetch("http://localhost:5000/logout",{
      method:"get",
      credentials: 'include'
    });
    let status=response.status
    if(status==200){
      
      window.location.reload();
    }
  
  }
  
useEffect(()=>{
if(!userdata){
  navigate('/login')
}
},[userdata,location])



  return (
    <div className='w-full h-[4rem] border-b flex justify-between items-center px-5'>
  <div><Link to='/' className='flex gap-2 font-medium' >
  <img alt='Logo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAw1BMVEX/////+Pj74eH50dH5ycr72tr85ubwamzsGiLqAADrAAXsEBrsNzvvYWPzjo/rABHsHybsICfrDBfrLjPqAAnuWlzhHybSHibSFyDhVln11NP36+v1qqvwcXPtSk3y8fHBwMDIJCuxFyG7GyTnk5TQCRb/+/u0tbX7tLSvAADHFyDyg4Tf3t7hODzjpqjJAADQ09PFTVHLubnpvL24TlHQNTnVAADusrOoqKiZGyKxhYb4w8OPAAB9QEOmFR/0oKGRkpIzuICZAAABI0lEQVR4AbTQRWLDMBRF0WesZKj/DzMzM9P+V9UYwpn2DnXE+OcUVdN1XTNM5YPMHyGlFWQ77q/+Yp5NHEVCxGT8iV07GPbjICHvqkgiEp4Xs2Newgp2sZMPTKUz2Vw+ryh5VS8U44JECWHlSrVWTwn/nHK5DKDRZLuIoFYbnW7PP6ePa4Myhr1arBNhBRiNBTN7Th7ARLPS9bGJsMoAUEuWfw3/pEFSZHpT4ElR8FWawMyi1HiOe5N2C9C8KxrAwmZa4rlKG2BiqWK2Ik6s8VJrg/gVzdZWsHDwVhuCOKHsmsRy/4Etj8jOHYT/dV+RjxmmhPkVmU7pVOKMT0RcMPXqzSS+4TnBzJmVic82wFJ6Mm7gG1Yu0Ar71t+wpz8dKqZlALZoGm+hl67WAAAAAElFTkSuQmCC' ></img>
<p>DealsDray</p>
</Link></div>



{userdata&&<div className='flex flex-row gap-10'>
  <div className='flex gap-5' >
<div onClick={()=>{navigate('/employee')}} className=' cursor-pointer'>Employee List</div>

</div>
<div className='font-medium text-xl' >{userdata}</div>
<div onClick={LogOut} className='cursor-pointer'  >Logout</div>
</div>}





{!userdata&&<>
  {location.pathname!=='/login'&&
   <Link to='/login' >
  <div  className='border-[3px] py-1 px-4 cursor-pointer hover:bg-sky-500 hover:text-white rounded-md border-sky-500 ' >

 Login
    </div></Link> }</>}




    </div>
  )
}
