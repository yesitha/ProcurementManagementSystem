import { height } from '@mui/system';
import React from 'react'

import SideNavBar from '../../components/SideNavigationBarwithAppBar/SideNavAppBar'

function Dashboard() {
  const list2=["Vendors and Items", "Budgets", "Inventory", "Settings"];
  const list1=["Sub Procurment Plan"];
  
    
  return (
    <SideNavBar main={<DashboardBody/>} list1={list1} list2={list2}/>
  )
}
function DashboardBody() {
  return (

    <div style={{backgroundColor: 'red' , height: '100vh' }}>
  <h1>Dashboard Body</h1>
 </div>
  )
}

  
   
      
  


export default Dashboard
