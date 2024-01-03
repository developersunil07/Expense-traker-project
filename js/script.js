// Selectors

const expenseForm = document.getElementById('expense-form');
const expenseList = document.querySelector('.expense-list');
const totalAmountElement = document.getElementById('total-amount');



let expenses = JSON.parse(localStorage.getItem("expenses")) || [];



function renderExpenses() {


    expenseList.innerHTML = ""

 

    let totalAmount = 0 ;

  

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const expenseRow = document.createElement("li");
        expenseRow.innerHTML = ` 
	<span  class="left">${expense.name}</span>
	 <span class="right">${expense.amount}</span>
	<span class="delete fa-solid fa-xmark" data-id="${i}"></span>
	`;
        expenseList.appendChild(expenseRow);

      
        totalAmount += expense.amount;
    }

    totalAmountElement.textContent =
        `${totalAmount} ₹`;


    localStorage.setItem("expenses",
        JSON.stringify(expenses));
}


function addExpense(event) {

    event.preventDefault();

    const expenseNameInput =
        document.getElementById("expense-name");
    const expenseAmountInput =
        document.getElementById("expense-amount");
    const expenseName =
        expenseNameInput.value;
    const expenseAmount =
        parseFloat(expenseAmountInput.value);

    // Clear form inputs 
    expenseNameInput.value = "";
    expenseAmountInput.value = "";

      // Validate inputs 
      if (expenseName === "" || isNaN(expenseAmount)) {
        alert("Please enter valid expense details.");
        return;
    }

     // Create new expense object 
     const expense = {
        name: expenseName,
        amount: expenseAmount,
    };

       // Add expense to expenses array 
       expenses.push(expense);

       // Render expenses 
       renderExpenses();
}

function deleteExpense(event){
    if (event.target.classList.contains("delete")) {

        // Get expense index from data-id attribute 
        const expenseIndex =
            parseInt(event.target.getAttribute("data-id"));

        // Remove expense from expenses array 
        expenses.splice(expenseIndex, 1);

        // Render expenses 
        renderExpenses();
    }
}

// Add event listeners 
expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

// Render initial expenses on page load 
renderExpenses();