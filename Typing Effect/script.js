function printGrowingNames(names) {
    var index = 0;
    function printName(name, maxLength) {
        var currentLength = 1;
        var interval = setInterval(function () {
            var word = name.substring(0, currentLength);
            printNames(word);
            currentLength++;
            if (currentLength > maxLength) {
                clearInterval(interval);
                index++;
                setTimeout(function () {
                    if (index < names.length) {
                        printName(names[index], names[index].length);
                    }
                    else {
                        index = 0;
                        printName(names[index], names[index].length);
                    }
                }, 400);
            }
        }, 400);
    }
    if (names.length > 0) {
        printName(names[0], names[0].length);
    }
}
// Example usage
var names = [
    "Pawan",
    "Rajesh",
    "Bikram",
    "Arjun",
    "Brijesh",
    "Deepak",
    "Prakash",
];
function printNames(word) {
    var typingEffect = document.querySelector(".typing-effect");
    typingEffect.innerHTML = "";
    typingEffect.innerHTML = word;
}
printGrowingNames(names);
