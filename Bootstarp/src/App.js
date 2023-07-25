import React, { useState } from "react";

import Header from "./components/Header";
import Customers from "./components/Customers";
import ExportCSV from "./components/ExportCSV";
import ExportReactCSV from "./components/ExportReactCSV";

// generate customer objects

const App = () => {
  const [customers, setCustomers] = useState(customersData());

  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address" },
    { label: "Postcode", key: "postcode" }
  ];

  function customersData() {
    const custs = [];
    for (let i = 0; i <= 25; i++) {
      custs[i] = {
        firstName: `firstname${i}`,
        lastName: `lastname${i}`,
        email: `mail${i}@mail.com`,
        address: `#${i}, block name, floor #${i} street name, city name, state name`,
        postcode: `${i}0000`
      };
    }
    return custs;
  }

  const wscols = [
    { wch: Math.max(...customers.map(customer => customer.firstName.length)) },
    { wch: Math.max(...customers.map(customer => customer.lastName.length)) },
    { wch: Math.max(...customers.map(customer => customer.email.length)) },
    { wch: Math.max(...customers.map(customer => customer.address.length)) },
    {
      wch: Math.max(...customers.map(customer => customer.postcode.length)) + 3
    }
  ];

  console.log(Math.max(...customers.map(customer => customer.address.length)));

  return (
    <div className="App">
      <Header className="header" topicTitle="React Export To Excel" />
      <div className="row">
        <div className="col-md-8">
          <h2>Customers</h2>
        </div>
        <div className="col-md-4 center">
          <ExportCSV
            csvData={customers}
            fileName="Customers_Infomation_xlsx"
            wscols={wscols}
          />
          <ExportReactCSV
            csvHeaders={headers}
            csvData={customersData()}
            fileName="Customers_Infomations_csv.csv"
          />
        </div>
      </div>
      <Customers customers={customers} />
    </div>
  );
};

export default App;

// Prerequisites -------------
// 1. npm packeages - xlsx, file-saver, react-bootstrap, bootstrap
// 2.add stylesheets from React Bootstrap library in the index.html
// Steps -------------
// 3. create Customers component, details refer to ./components/Customers.js
// 4. import Customers component and pass the data into the Customers component
// **using file-saver & xlxs -------------
// 5. create ExportCSV component, details refer to ./components/ExportCSV
// 6. import ExportCSV component
// ** using react-csv(easy but got something wrong on headers and postcode) -------------
// 7. create ExportReactCSV component, details refer to ./components/ExportReactCSV
// ** to avoid Potential infinite loop, open sanbox.config.json and turn off Infinite Loop Protection (to false)
