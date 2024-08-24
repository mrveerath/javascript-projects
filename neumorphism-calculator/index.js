let outputScreen = document.getElementById("output")

function display(num) {
    outputScreen.value += num
}
async function calculate(){
    try {
        outputScreen.value = eval(outputScreen.value)
    } catch (error) {
     outputScreen.value = "Can't Calculate"   
    }
}
function delet(){
    outputScreen.value = outputScreen.value.slice(0,-1)
}
function clearAll() {
    outputScreen.value = "";
}