
// import {
//   getCashboxes,
//   getEnterprises,
//   getSalePoints,
//   getUsers,
// } from "../firebase/firebaseService";

import { useState } from "react";
import UniversalInput from "../helpers/UniversalInput";

function App() {
  const [inputValue, setInputValue] = useState("");

 
  // getCashboxes().then((res) => {
  //   console.log("cashboxes=>", res);
  // });
  // getEnterprises().then((res) => {
  //   console.log("Enterprises=>", res);
  // });
  // getSalePoints().then((res) => {
  //   console.log("SalePoints=>", res);
  // });
  // getUsers().then((res) => {
  //   console.log("Users=>", res);
  // });
  
  
  return (
    <>
      <h1>Online Cash App</h1>
      <div className="w-60">


    <UniversalInput type="text" placeholder="type something..." name="name" value={inputValue} onChange={(e) =>  setInputValue(e.target.value)}/>
      </div>
    </>
  );
}

export default App;
