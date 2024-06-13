import * as mysql from "mysql2";
const prompt = require("prompt-sync")();

// Set up the MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "CRM",
});

// Function to view all customers
const viewAllCustomers = () => {
  connection.query("SELECT * FROM customers", (err, results, fields) => {
    console.log("Query results:", results);
    connection.end();
  });
};

// Function to Create
const createCustomer = () => {
    const firstName = prompt('Enter first name. ');
    const lastName = prompt('Enter last name. ');
    const age = prompt('Enter age. ');
    const sql = 'INSERT INTO customers (first_name, last_name, age) VALUES (?, ?, ?)';
    const values = [firstName, lastName, age];

    connection.query(sql, values, (err, results, fields) => {
        if (err) {
            console.error('Error inserting customer:', err);
            return;
        }
        console.log('Customer inserted successfully:', results);
        connection.end();
    });
};

// Function to Update
const updateCustomer = (): void => {
  const id = prompt('Enter the customer ID to edit: ');
  const firstName = prompt('Enter new first name: ');
  const lastName = prompt('Enter new last name: ');
  const age = prompt('Enter new age: ');
  const sql = 'UPDATE customers SET first_name = ?, last_name = ?, age = ? WHERE id = ?';
  const values = [firstName, lastName, age, id];

  connection.query(sql, values, (err, results) => {
      if (err) {
          console.error('Error updating customer:', err);
          return;
      }
      console.log('Customer updated successfully:', results);
      connection.end();
  });
};


// Function to Delete
const deleteCustomer = (): void => {
  const id = prompt('Enter the ID of the customer you want to delete: ');
  const sql = 'DELETE FROM customers WHERE id = ?';

  connection.query(sql, [id], (err, results) => {
      if (err) {
          console.error('Error deleting customer:', err);
          return;
      }
      console.log('Customer deleted successfully:', results);
      connection.end();
  });
};


// Main function to handle user input
const main = (): void => {
    console.log('Welcome to your CRM');
    console.log('1. View all customers');
    console.log('2. Create Customer')
    console.log('3. Update Customer')
    console.log('4. Delete Customer')
    console.log('5. Exit');

  const choice = prompt("Please enter your choice: ");

    switch (choice) {
        case '1':
            viewAllCustomers();
            break;
        case '2':
            createCustomer();
            console.log('Customer Created')
            break
        case '3':
            updateCustomer();
            console.log('Changes have been made')
            break
        case '4':
            deleteCustomer();
            console.log('Successfully deleted')
            break
        case '5':
            console.log('Exiting...');
            connection.end();
            break;
        case '3':
            createCustomer();
            console.log
        default:
            console.log('Invalid choice. Exiting...');
            connection.end();
            break;
    }
};

// Connect to the MySQL database
connection.connect(() => {
  console.log("Connected to the database");
  main();
});
