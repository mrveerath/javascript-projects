window.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("text")
    const checkButton = document.getElementById("check")
    const showMessage = document.getElementById("message")

    checkButton.addEventListener('click' ,() => {
        if(textInput.value === ""){
            alert("Please Enter Some Text")
        }
        else{
            console.log(textInput.value)
            const text = textInput.value
            const textArr = text.split("").reverse().join("")
            if(text === textArr){
                showMessage.innerText = "Yes This Is Palindrome"
            }
            else{
                showMessage.innerText = "No This Is Not Palindrome"
            }
            textInput.value = ""
        }
    })
})