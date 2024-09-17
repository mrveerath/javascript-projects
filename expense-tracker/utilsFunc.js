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
    ){
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
    ){
        this.transactionId = transactionId
        this.transactionName = transactionName,
        this.transactionType = transactionType,
        this.transactionAmount = transactionAmount,
        this.transactionRemarks = transactionRemarks
    }
}
//Transaction Arrya Type

class Transactions{
    constructor(){
        this.length = 0,
        this.data = [],
        this.type = Transaction
    }
    push(element){
        if(!(element instanceof this.type)){
            throw new Error(`${this.type} Missmatched`)
        }
        this.data[this.length] = element,
        this.length++
        return this.length
    }
    pop(){
        if(this.length === 0) return undefined
        this.length--
        const lastElement = this.data[this.length]
        delete this.data[this.length]
        return lastElement
    }
    getByIndex(index){
        return this.data[index]
    }
    getById(id){
        return Object.values(this.data).find(item => item.id === id)
    }
    deleteByIndex(index){
        if(index >=0 && index < this.length){
            delete this.data[index]
            this.shiftItems(index)
        }
        else{
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
    
    shiftItems(index){
        for(let i = index; i < this.length -1; i++){
            this.data[i] = this.data[i + 1]
        }
        delete this.data[this.length-1]
        this.length--;
    }
    update(id,newElement){
        if(!(newElement instanceof this.type)){
            throw new Error("Unmatched Data Type")
        }
        const index = Object.values(this.data).findIndex(item => item.transactionId === id)
        if(index !== -1){
            this.data[index] = newElement
        }
        else{
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