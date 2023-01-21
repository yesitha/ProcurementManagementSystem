
import React from 'react'

import SideNavBar from '../../components/SideNavigationBar/SideNavBar'

function Dashboard() {
  const list2=["Vendors and Items", "Budgets", "Inventory", "Settings"];
  const list1=["Sub Procurment Plan"];
  const user={firstname: "John", lastname: "Doe", email:"johndoe@gmail.com", designation:"Financial Division HOD", department:"Finance", phone:"1234567890", address:"123, ABC Street, XYZ City, 123456",gender:"Male", profilePic:"https://www.w3schools.com/howto/img_avatar.png"}
  
    
  return (
    <div style={{ display: "flex" }}>
    <SideNavBar  list1={list1} list2={list2} user={user}/>
    <div  style={{ flexGrow: 1}}>
        
    <div style={{backgroundColor: 'red' , height: '100vh' }}>
       
      </div>
    </div>
    </div>
  );
};


  
   
      
  


export default Dashboard
