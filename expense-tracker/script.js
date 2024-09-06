import {
    getDataFromLocalStorage,
    imageToBase64,
    setDataToLocalStorage,
    Transactions,
    User,
    Transaction,
    base64ToImage,
    totolSum
} from './utilsFunc.js';

let admin = null;

window.addEventListener('DOMContentLoaded', () => {
    //Password Visibility Control Of Registration
    const passwordField = document.querySelector('#password');
    const controlBtn = document.querySelector('.hidden-password');
    controlBtn.addEventListener('click', event => {
        if (event.target.name === 'eye-outline') {
            passwordField.type = 'text';
            event.target.name = 'eye-off-outline';
        } else {
            passwordField.type = 'password';
            event.target.name = 'eye-outline';
        }
    });

    //Password Visibility Control Of Login
    const loginPasswordField = document.querySelector('#login-password');
    const loginControlBtn = document.querySelector('.login-hidden-password');
    loginControlBtn.addEventListener('click', event => {
        if (event.target.name === 'eye-outline') {
            loginPasswordField.type = 'text';
            event.target.name = 'eye-off-outline';
        } else {
            loginPasswordField.type = 'password';
            event.target.name = 'eye-outline';
        }
    });

    //All The Containers
    const loginContainer = document.querySelector('.login-form-container');
    const registrationContainer = document.querySelector('.register-form-container');
    const modaleContainer = document.querySelector('.modale-container');
    const transactionFormContainer = document.querySelector('.transaction-container');
    const dashboardContainer = document.querySelector('.dashboard-container');

    //Register And Login Control
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    loginBtn.addEventListener('click', () => {
        modaleContainer.style.display = 'none';
        loginContainer.style.display = 'flex';
    });
    registerBtn.addEventListener('click', () => {
        registrationContainer.style.display = 'flex';
        loginContainer.style.display = 'none';
        modaleContainer.style.display = 'none';
    });

    // Handle Login
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', async event => {
        event.preventDefault();
        const password = document.querySelector('#login-password');
        const name = document.querySelector('#login-name');

        if (password.value.trim() === '' || name.value.trim() === '') {
            alert('All Credentials Are Required');
            return;
        }
        try {
            const user = await getDataFromLocalStorage(name.value.trim());
            if (user) {
                if (password.value.trim() === user.userPassword) {
                    admin = user;
                    modaleContainer.style.display = 'none';
                    loginContainer.style.display = 'none';
                    registrationContainer.style.display = 'none';
                    dashboardContainer.style.display = 'flex';
                    representData(admin);
                } else {
                    alert('Password not matched');
                }
            } else {
                alert("The user doesn't exist.");
                loginContainer.style.display = 'none';
                registrationContainer.style.display = 'flex';
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
        }
    });

    // Handle Registration
    const registrationForm = document.querySelector('.registration-form');
    registrationForm.addEventListener('submit', async event => {
        event.preventDefault();

        const userName = registrationForm.querySelector('#registration-name');
        const userEmail = registrationForm.querySelector('#registration-email');
        const password = registrationForm.querySelector('#registration-password');
        const avatar = registrationForm.querySelector('#registration-image');
        const userCash = registrationForm.querySelector('#registration-cash');

        if (avatar.files[0] == null || userName.value.trim() === '' || userEmail.value.trim() === '' || password.value.trim() === '' || userCash.value.trim() === '') {
            alert('All Credentials Are Required');
            return;
        }

        let imageUrl;
        if (avatar.files[0]) {
            try {
                imageUrl = await imageToBase64(avatar.files[0]);
            } catch (error) {
                console.error('Error converting image to Base64:', error);
            }
        }

        const id = Date.now();
        const transactions = new Transactions(); // New Transactions instance
        const user = new User(id, userName.value.trim(), userEmail.value.trim(), password.value.trim(), imageUrl, userCash.value.trim(), transactions);

        localStorage.clear();
        await setDataToLocalStorage(userName.value.trim(), user);
        admin = await getDataFromLocalStorage(userName.value.trim()); // Update admin after saving
        console.log('Admin:', admin);

        registrationForm.reset();
        representData(admin)
        registrationContainer.style.display = 'none';
        dashboardContainer.style.display = 'flex';
    });

    // Transaction Form Controls
    const showTransactionForm = document.querySelector('.show-transaction-form');
    const hideTransactionForm = document.querySelector('.hide-transaction-form');
    showTransactionForm.addEventListener('click', () => {
        transactionFormContainer.style.display = 'flex';
        dashboardContainer.style.display = 'none';
    });
    hideTransactionForm.addEventListener('click', () => {
        transactionFormContainer.style.display = 'none';
        dashboardContainer.style.display = 'flex';
    });

    // Handle Transaction
    const transactionForm = document.querySelector('#transaction-form');
    transactionForm.addEventListener('submit', async event => {
        event.preventDefault();

        const transactionName = transactionForm.querySelector('#transaction-name').value;
        const transactionAmount = transactionForm.querySelector('#transaction-amount').value;
        const transactionType = transactionForm.querySelector('#transaction-type').value;
        const transactionRemarks = transactionForm.querySelector('#transaction-remarks').value;

        if (!transactionName || !transactionAmount || !transactionRemarks) {
            alert('Please Fill All The Fields');
        } else {
            const id = Date.now();
            const transaction = new Transaction(id, transactionName, transactionType, transactionAmount, transactionRemarks);

            if (admin && admin.userTransactions instanceof Transactions) {
                admin.userTransactions.push(transaction);
                console.log('Updated Transactions:', admin.userTransactions);
                await setDataToLocalStorage(admin.userName, admin); // Save updated admin to localStorage
            } else {
                console.error('Admin transactions not initialized correctly');
                if (admin && admin.userName) {
                    admin.userTransactions = new Transactions(); // Initialize if not already
                    admin.userTransactions.push(transaction);
                    await setDataToLocalStorage(admin.userName, admin); // Save admin after initialization
                }
            }
            const data = await getDataFromLocalStorage(admin.userName)
            console.log(data)
            transactionForm.reset();
            transactionFormContainer.style.display = 'none';
            dashboardContainer.style.display = 'flex';
            representData(data)
        }
    });

    // Dummy function for representing data
    function representData(data) {
        const asideBar = document.querySelector(".aside-bar")
        const cashInHand = document.querySelector(".cash-in-hand")
        const totalExpenseContainer = document.querySelector(".total-expense")
        const totalIncomeContainer = document.querySelector(".total-income")
        const remainingAmountContainer = document.querySelector(".remaining-amount")
        const transactionsContainer = document.querySelector(".transactions-details-container tbody")
        const transactions = data.userTransactions.data
        console.log(transactions)
        transactionsContainer.innerHTML = ""
        const expenseTransaction =  transactions.filter((transaction) => transaction.transactionType === "expense")
        const expenseAmounts = expenseTransaction.map((transaction) => transaction.transactionAmount)
        const totalExpense = totolSum(expenseAmounts)
        const incomeTransaction =  transactions.filter((transaction) => transaction.transactionType === "income")
        const incomeAmounts = incomeTransaction.map((transaction) => transaction.transactionAmount)
        const totalIncome = totolSum(incomeAmounts)
        const amountRemains = Number(data.cashInHand) + Number(totalIncome) - Number(totalExpense)
        // Implement logic for rendering data on the dashboard
        asideBar.innerHTML = "";
        console.log('Representing data:', data);
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
        
        transactions.forEach((transaction) => {
            console.log(transaction)
            const transactionTime = new Date(transaction.transactionId).toDateString()
            console.log(transactionTime)
            const tr = document.createElement("tr")
            tr.className = transaction.transactionType
            const dataToShow =`<td>${transactionTime}</td>
            <td>${transaction.transactionName}</td>
            <td>${transaction.transactionAmount}</td>
            <td>${transaction.transactionRemarks}</td>`
            tr.innerHTML = dataToShow
            transactionsContainer.append(tr)
        })

    }
});
