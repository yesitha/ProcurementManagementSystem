import React from "react";
import styles from "./addItemstoGoodsReceivedNote.module.css";
import SideNavBar from "../../components/SideNavigationBar/SideNavBar";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";

const list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
const list1 = ["Sub Procurment Plan", "Master Procurement Plan"];
const user = {
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@gmail.com",
  designation: "Financial Division HOD",
  department: "Finance",
  phone: "1234567890",
  address: "123, ABC Street, XYZ City, 123456",
  gender: "Male",
  profilePic: "https://www.w3schools.com/howto/img_avatar.png",
};

const list = ["MPPI10000", "MPPI10001", "MPPI10002", "MPPI10003"];

export default function AddItemstoGoodsReceivedNote() {
  return (
    <div>
      <SideNavBar list1={list1} list2={list2} user={user} />
      <div className={styles.afmpp_mainBody}>
      <div className={styles.topic}>
        <h1>Goods Received Note</h1>
      </div>
      <div>
        <div>
          <div className={styles.dropdown}>
            <SelectDropDown  list={list} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
