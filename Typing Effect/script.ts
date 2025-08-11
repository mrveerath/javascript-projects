function printGrowingNames(names: string[]) {
    let index = 0;
    
    function printName(name: string, maxLength: number) {
        let currentLength = 1;
        
        const interval = setInterval(() => {
            const word = name.substring(0, currentLength);
            printNames(word);
            currentLength++;
            
            if (currentLength > maxLength) {
                clearInterval(interval);
                index++;
                setTimeout(() => {
                    if (index < names.length) {
                        printName(names[index], names[index].length);
                    } else {
                        index = 0;
                        printName(names[index], names[index].length);
                    }
                },400)
            }
        }, 400);
    }
    
    if (names.length > 0) {
        printName(names[0], names[0].length);
    }
}

// Example usage

const names: string[] = [
    "Pawan",
    "Rajesh",
    "Bikram",
    "Arjun",
    "Brijesh",
    "Deepak",
    "Prakash",
];

function printNames(word:string){
const typingEffect = document.querySelector(".typing-effect") as HTMLDivElement
typingEffect.innerHTML = ""
typingEffect.innerHTML = word
}
printGrowingNames(names);

