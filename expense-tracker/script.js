
let admin = null

//Password Visibility Control Of Registration
const passwordField = document.querySelector('#registration-password')
const controlBtn = document.querySelector('.register-hidden-password')
controlBtn.addEventListener('click', event => {
    if (event.target.innerText === 'Show') {
        passwordField.type = 'text'
        event.target.innerText = 'Hide'
    } else {
        passwordField.type = 'password'
        event.target.innerText = 'Show'
    }
})

//Password Visibility Control Of Login
const loginPasswordField = document.querySelector('#login-password')
const loginControlBtn = document.querySelector('.login-hidden-password')
loginControlBtn.addEventListener('click', (event) => {
    if (event.target.innerText === 'Show') {
        loginPasswordField.type = 'text'
        event.target.innerText = "Hide"
    } else {
        loginPasswordField.type = 'password'
        event.target.innerText = "Show"
    }
})

//All The Containers
const loginContainer = document.querySelector('.login-form-container')
const registrationContainer = document.querySelector('.register-form-container')
const modaleContainer = document.querySelector('.modale-container')
const transactionFormContainer = document.querySelector('.transaction-container')
const dashboardContainer = document.querySelector('.dashboard-container')

//Register And Login Control
const loginBtn = document.querySelector('.login-btn')
const registerBtn = document.querySelector('.register-btn')
loginBtn.addEventListener('click', () => {
    modaleContainer.style.display = 'none'
    loginContainer.style.display = 'flex'
})
registerBtn.addEventListener('click', () => {
    registrationContainer.style.display = 'flex'
    loginContainer.style.display = 'none'
    modaleContainer.style.display = 'none'
})

// Handle Login
const loginForm = document.querySelector('.login-form')
loginForm.addEventListener('submit', async event => {
    event.preventDefault()
    const password = document.querySelector('#login-password')
    const name = document.querySelector('#login-name')
    if (password.value.trim() === '' || name.value.trim() === '') {
        alert('All Credentials Are Required')
        return
    }
    try {
        const user = await getDataFromLocalStorage(name.value.trim())
        if (user) {
            if (password.value.trim() === user.userPassword) {
                admin = user
                modaleContainer.style.display = 'none'
                loginContainer.style.display = 'none'
                registrationContainer.style.display = 'none'
                dashboardContainer.style.display = 'flex'
                representData(admin)
            } else {
                alert('Password not matched')
            }
        } else {
            alert("The user doesn't exist.")
            loginContainer.style.display = 'none'
            registrationContainer.style.display = 'flex'
        }
    } catch (error) {
        console.error('Error retrieving user data:', error)
    }
})

// Handle Registration
const registrationForm = document.querySelector('.registration-form')
registrationForm.addEventListener('submit', async event => {
    event.preventDefault()
    const userName = registrationForm.querySelector('#registration-name')
    const userEmail = registrationForm.querySelector('#registration-email')
    const password = registrationForm.querySelector('#registration-password')
    const avatar = registrationForm.querySelector('#registration-image')
    const userCash = registrationForm.querySelector('#registration-cash')
    if (
        avatar.files[0] == null ||
        userName.value.trim() === '' ||
        userEmail.value.trim() === '' ||
        password.value.trim() === '' ||
        userCash.value.trim() === ''
    ) {
        alert('All Credentials Are Required')
        return
    }
    let imageUrl
    if (avatar.files[0]) {
        try {
            imageUrl = await imageToBase64(avatar.files[0])
        } catch (error) {
            console.error('Error converting image to Base64:', error)
        }
    }
    const id = Date.now()
    const transactions = new Transactions() // New Transactions instance
    const user = new User(
        id,
        userName.value.trim(),
        userEmail.value.trim(),
        password.value.trim(),
        imageUrl,
        userCash.value.trim(),
        transactions
    )
    localStorage.clear()
    await setDataToLocalStorage(userName.value.trim(), user)
    admin = await getDataFromLocalStorage(userName.value.trim()) // Update admin after saving
    console.log('Admin:', admin)
    registrationForm.reset()
    representData(admin)
    registrationContainer.style.display = 'none'
    dashboardContainer.style.display = 'flex'
})

// Transaction Form Controls
const showTransactionForm = document.querySelector('.show-transaction-form')
const hideTransactionForm = document.querySelector('.hide-transaction-form')
showTransactionForm.addEventListener('click', () => {
    transactionFormContainer.style.display = 'flex'
    dashboardContainer.style.display = 'none'
})
hideTransactionForm.addEventListener('click', () => {
    transactionFormContainer.style.display = 'none'
    dashboardContainer.style.display = 'flex'
})
// Handle Transaction
const transactionForm = document.querySelector('#transaction-form')
transactionForm.addEventListener('submit', async event => {
    event.preventDefault()
    const transactionName =
        transactionForm.querySelector('#transaction-name').value
    const transactionAmount = transactionForm.querySelector(
        '#transaction-amount'
    ).value
    const transactionType =
        transactionForm.querySelector('#transaction-type').value
    const transactionRemarks = transactionForm.querySelector(
        '#transaction-remarks'
    ).value
    if (!transactionName || !transactionAmount || !transactionRemarks) {
        alert('Please Fill All The Fields')
    } else {
        const id = Date.now()
        const transaction = new Transaction(
            id,
            transactionName,
            transactionType,
            transactionAmount,
            transactionRemarks
        )
        if (admin && admin.userTransactions instanceof Transactions) {
            admin.userTransactions.push(transaction)
            console.log('Updated Transactions:', admin.userTransactions)
            await setDataToLocalStorage(admin.userName, admin) // Save updated admin to localStorage
        } else {
            console.error('Admin transactions not initialized correctly')
            if (admin && admin.userName) {
                admin.userTransactions = new Transactions() // Initialize if not already
                admin.userTransactions.push(transaction)
                await setDataToLocalStorage(admin.userName, admin) // Save admin after initialization
            }
        }
        const data = await getDataFromLocalStorage(admin.userName)
        console.log(data)
        transactionForm.reset()
        transactionFormContainer.style.display = 'none'
        dashboardContainer.style.display = 'flex'
        representData(data)
    }
})
// Dummy function for representing data
function representData(data) {
    const asideBar = document.querySelector('.aside-bar')
    const cashInHand = document.querySelector('.cash-in-hand')
    const totalExpenseContainer = document.querySelector('.total-expense')
    const totalIncomeContainer = document.querySelector('.total-income')
    const remainingAmountContainer = document.querySelector('.remaining-amount')
    const transactionsContainer = document.querySelector(
        '.transactions-details-container tbody'
    )
    const transactions = data.userTransactions.data
    console.log(transactions)
    transactionsContainer.innerHTML = ''
    const expenseTransaction = transactions.filter(
        transaction => transaction.transactionType === 'expense'
    )
    const expenseAmounts = expenseTransaction.map(
        transaction => transaction.transactionAmount
    )
    const totalExpense = totolSum(expenseAmounts)
    const incomeTransaction = transactions.filter(
        transaction => transaction.transactionType === 'income'
    )
    const incomeAmounts = incomeTransaction.map(
        transaction => transaction.transactionAmount
    )
    const totalIncome = totolSum(incomeAmounts)
    const amountRemains =
        Number(data.cashInHand) + Number(totalIncome) - Number(totalExpense)
    // Implement logic for rendering data on the dashboard
    asideBar.innerHTML = ''
    console.log('Representing data:', data)
    asideBar.innerHTML = `<img src=${data.userImage} /><h1>${data.userName}</h1>`
    cashInHand.innerHTML = `<span>Starting Amount</span>
        <h2><ion-icon name="cash-outline"></ion-icon><span>${data.cashInHand}</span></h2>
        `
    totalExpenseContainer.innerHTML = `<span>Total Expense</span>
        <h2><ion-icon name="trending-down-outline"></ion-icon><span>${totalExpense}</span></h2>
        `
    totalIncomeContainer.innerHTML = `<span>Total Income</span>
        <h2><ion-icon name="trending-up-outline"></ion-icon><span>${totalIncome}</span></h2>
        `
    remainingAmountContainer.innerHTML = `<span>Remaining Amount</span>
        <h2><ion-icon name="layers-outline"></ion-icon><span>${amountRemains}</span></h2>
        `
        transactions.forEach(transaction => {
            const tbody = document.querySelector("table tbody");
        
            // Remove the default text if this is the first transaction
            if (tbody.textContent.includes("Do Some Transaction To Appear")) {
                tbody.innerHTML = "";  // Clear the default message
            }
        
            // Create a new row for the transaction
            const tr = document.createElement("tr");
            tr.className = `${transaction.transactionType}`;
        
            // Controls (edit/save/delete)
            const controlsCell = document.createElement("td");
        
            // Edit button
            const editTransaction = document.createElement("button");
            editTransaction.innerHTML = `<i class='bx bx-edit'></i>`;
            editTransaction.className = 'edit-button';
        
            // Delete button
            const deleteTransaction = document.createElement("button");
            deleteTransaction.innerHTML = `<i class='bx bxs-trash'></i>`;
            deleteTransaction.className = 'delete-button';
        
            // Save button
            const saveTransaction = document.createElement("button");
            saveTransaction.innerHTML = `<i class='bx bx-save'></i>`;
            saveTransaction.className = 'save-button';
            saveTransaction.style.display = 'none'; // Hide save button initially
        
            // Add buttons to controls
            const controls = document.createElement("div");
            controls.className = "controls";
            controls.appendChild(editTransaction);
            controls.appendChild(deleteTransaction);
            controls.appendChild(saveTransaction);
        
            controlsCell.appendChild(controls);
            tr.appendChild(controlsCell);
        
            // Transaction date
            const dateCell = document.createElement("td");
            const transactionDate = new Date(transaction.transactionId).toLocaleDateString();
            dateCell.textContent = transactionDate;
            tr.appendChild(dateCell);
        
            // Transaction name input
            const nameCell = document.createElement("td");
            const name = document.createElement("input");
            name.type = "text";
            name.value = transaction.transactionName;
            name.disabled = true;
            nameCell.appendChild(name);
            tr.appendChild(nameCell);
        
            // Transaction amount input
            const amountCell = document.createElement("td");
            const amount = document.createElement("input");
            amount.type = "number";
            amount.value = transaction.transactionAmount;
            amount.disabled = true;
            amountCell.appendChild(amount);
            tr.appendChild(amountCell);
        
            // Transaction remarks input
            const remarksCell = document.createElement("td");
            const remarks = document.createElement("textarea");
            remarks.type = "text";
            remarks.value = transaction.transactionRemarks;
            remarks.disabled = true;
            remarksCell.appendChild(remarks);
            tr.appendChild(remarksCell);
        
            // Event Listeners for Buttons
            editTransaction.addEventListener('click', () => {
                name.disabled = false;
                name.style.border = "1px solid red"
                amount.disabled = false;
                amount.style.border = "1px solid red"
                remarks.disabled = false;
                remarks.style.border = "1px solid red"
                editTransaction.style.display = 'none'; // Hide edit button
                saveTransaction.style.display = 'inline'; // Show save button
            });
        
            saveTransaction.addEventListener('click', () => {
                // Save updated transaction values
                transaction.transactionName = name.value;
                transaction.transactionAmount = amount.value;
                transaction.transactionRemarks = remarks.value;
                name.disabled = true;
                amount.disabled = true;
                remarks.disabled = true;
                saveTransaction.style.display = 'none'; // Hide save button
                editTransaction.style.display = 'inline'; // Show edit button
        
                // Optionally, update your data structure or backend here
            });
        
            deleteTransaction.addEventListener('click', async () => {
                // Get the ID of the transaction to delete
                const transactionIdToDelete = transaction.transactionId;
        
                // Remove the transaction from the admin's transactions
                admin.userTransactions.deleteById(transactionIdToDelete);
        
                // Update local storage
                await setDataToLocalStorage(admin.userName, admin);
        
                // Remove the row from the table
                tbody.removeChild(tr);
        
                // Re-represent the updated data
                representData(admin);
            });
        
            // Append the row to the table body
            tbody.appendChild(tr);
        });
        
        
        

}
const userAuth = async (userData, url) => {
    try {
        const response = await fetch(url, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        if (!response.ok) {
            throw new Error('Failed To Get Response')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

// getting item from local storage
const getDataFromLocalStorage = async (key) => {
    try {
        const response = localStorage.getItem(key);
        if (response) {
            const data = JSON.parse(response);

            // Check if data.userTransactions exists and is an array
            if (Array.isArray(data.userTransactions)) {
                const transactions = new Transactions();
                data.userTransactions.forEach(transaction => {
                    transactions.push(new Transaction(
                        transaction.transactionId,
                        transaction.transactionName,
                        transaction.transactionType,
                        transaction.transactionAmount,
                        transaction.transactionRemarks
                    ));
                });
                data.userTransactions = transactions; // Convert array to Transactions instance
            } else {
                // Initialize an empty Transactions instance if not an array
                data.userTransactions = new Transactions();
            }

            return data;
        }
    } catch (error) {
        console.error("Error retrieving data from localStorage:", error);
    }
    return null;
};

const setDataToLocalStorage = async (key, data) => {
    try {
        // Create a copy of data to avoid mutating original object
        const dataCopy = { ...data };

        if (dataCopy.userTransactions instanceof Transactions) {
            dataCopy.userTransactions = dataCopy.userTransactions.data; // Ensure only array is stored
        }

        localStorage.setItem(key, JSON.stringify(dataCopy));
    } catch (error) {
        console.error("Error setting data to localStorage:", error);
    }
};


// converting image to base64
const imageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(imageFile)
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error)
    })
}

// converting base64 to image 
const base64ToImage = (imageStr) => {
    return new Promise((resolve, reject) => {
        if (!imageStr || typeof imageStr !== 'string') {
            reject(new Error("Invalid Base64 string. Expected a string."));
            return;
        }
        const image = new Image();
        if (!imageStr.startsWith("data:image/")) {
            reject(new Error("Invalid Base64 string. Missing data URL prefix."));
            return;
        }
        image.src = imageStr;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(new Error("Failed to load image. Please check the Base64 string."));
    });
};

// User Data Type  
class User {
    constructor(
        userId,
        userName,
        userEmail,
        userPassword,
        userImage,
        cashInHand,
        userTransactions,
    ) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.cashInHand = cashInHand;
        this.userImage = userImage;
        this.userTransactions = userTransactions
    }
}
//Transaction Type
class Transaction {
    constructor(
        transactionId,
        transactionName,
        transactionType,
        transactionAmount,
        transactionRemarks
    ) {
        this.transactionId = transactionId
        this.transactionName = transactionName,
            this.transactionType = transactionType,
            this.transactionAmount = transactionAmount,
            this.transactionRemarks = transactionRemarks
    }
}
//Transaction Arrya Type

class Transactions {
    constructor() {
        this.length = 0,
            this.data = [],
            this.type = Transaction
    }
    push(element) {
        if (!(element instanceof this.type)) {
            throw new Error(`${this.type} Missmatched`)
        }
        this.data[this.length] = element,
            this.length++
        return this.length
    }
    pop() {
        if (this.length === 0) return undefined
        this.length--
        const lastElement = this.data[this.length]
        delete this.data[this.length]
        return lastElement
    }
    getByIndex(index) {
        return this.data[index]
    }
    getById(id) {
        return Object.values(this.data).find(item => item.id === id)
    }
    deleteByIndex(index) {
        if (index >= 0 && index < this.length) {
            delete this.data[index]
            this.shiftItems(index)
        }
        else {
            throw new Error("Index Out Of Range")
        }
    }
    deleteById(id) {
        let found = false;
        let indexToDelete = -1;
        for (let index in this.data) {
            if (this.data[index].transactionId === id) {
                indexToDelete = index;
                this.deleteByIndex(index);
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error("Transaction With This Id Not Found");
        }
    }

    shiftItems(index) {
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1]
        }
        delete this.data[this.length - 1]
        this.length--;
    }
    update(id, newElement) {
        if (!(newElement instanceof this.type)) {
            throw new Error("Unmatched Data Type")
        }
        const index = Object.values(this.data).findIndex(item => item.transactionId === id)
        if (index !== -1) {
            this.data[index] = newElement
        }
        else {
            throw new Error("Cannot Find Data With This Id")
        }
    }
}

const totolSum = (array) => {
    let sum = 0;
    for (let index = 0; index < array.length; index++) {
        sum += Number(array[index])
    }
    return sum
}