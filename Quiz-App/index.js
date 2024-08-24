document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("gameLoading").style.display = "none";
        document.getElementById("gameStart").style.display = "flex";
        
        const gameStartButton = document.getElementById("gameStartButton");
        const playerName = document.querySelector("#playerName");
        const noPlayerContainer = document.getElementById("notUserName");
        const userNotFoundModale = document.getElementById("closeModale");
        
        userNotFoundModale.addEventListener("click", () => {
            noPlayerContainer.style.display = "none";
        });
        
        gameStartButton.addEventListener("click", () => {
            const player = playerName.value.trim();
            if (player === '') {
                noPlayerContainer.style.display = "flex";
            } else {
                document.getElementById("name").innerText = `🙂 ${player.toUpperCase()}`;
                startGame();
            }
        });
    }, 3000);
});

function startGame() {
    const gameContainer = document.getElementById("game");
    const timerContainer = document.getElementById("timerSection");
    const gameStart = document.getElementById("gameStart");
    
    gameStart.style.display = "none";
    gameContainer.style.display = 'flex';
    
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let second = 20;

    const questions = [
        {
            "numb": 1,
            "question": "Regression testing is primarily related to",
            "answer": "Functional testing",
            "options": [
                "Maintenance testing",
                "Data flow testing",
                "Functional testing",
                "Development testing"
            ]
        },
        {
            "numb": 2,
            "question": "What is the defect rate for Six sigma?",
            "answer": "3.4 defects per million lines of code",
            "options": [
                "3.0 defects per million lines of code",
                "3.4 defects per million lines of code",
                "1.4 defects per million lines of code",
                "1.0 defect per million lines of code"
            ]
        },
        {
            "numb": 3,
            "question": "Of the following sort algorithms, which has execution time that is least dependent on initial ordering of the input?",
            "answer": "Merge sort",
            "options": [
                "Selection sort",
                "Insertion sort",
                "Quick sort",
                "Merge sort"
            ]
        },
        {
            "numb": 4,
            "question": "The domain of the function log( log sin(x) ) is",
            "answer": "Empty set",
            "options": [
                "0 < x < π",
                "Empty set",
                "0 < x < π",
                "2nπ < x < (2n + 1) π , for n in N"
            ]
        },
        {
            "numb": 5,
            "question": "What is the time complexity of binary search?",
            "answer": "O(log n)",
            "options": [
                "O(n)",
                "O(log n)",
                "O(n log n)",
                "O(1)"
            ]
        },
        {
            "numb": 6,
            "question": "Which of the following is a type of machine learning?",
            "answer": "Reinforcement learning",
            "options": [
                "Supervised learning",
                "Unsupervised learning",
                "Reinforcement learning",
                "All of the above"
            ]
        },
        {
            "numb": 7,
            "question": "What does HTML stand for?",
            "answer": "HyperText Markup Language",
            "options": [
                "HyperText Markup Language",
                "HighText Markup Language",
                "HyperText Machine Language",
                "HighText Machine Language"
            ]
        },
        {
            "numb": 8,
            "question": "Which programming language is known as the 'mother of all languages'?",
            "answer": "C",
            "options": [
                "C++",
                "Java",
                "C#",
                "C"
            ]
        },
        {
            "numb": 9,
            "question": "In which year was JavaScript created?",
            "answer": "1995",
            "options": [
                "1995",
                "1996",
                "1994",
                "1993"
            ]
        },
        {
            "numb": 10,
            "question": "Which database management system is known for its use in large-scale data warehousing?",
            "answer": "Oracle",
            "options": [
                "MySQL",
                "PostgreSQL",
                "SQLite",
                "Oracle"
            ]
        },
        {
            "numb": 11,
            "question": "What does SQL stand for?",
            "answer": "Structured Query Language",
            "options": [
                "Structured Query Language",
                "Simple Query Language",
                "Standard Query Language",
                "System Query Language"
            ]
        },
        {
            "numb": 12,
            "question": "Which company developed the Java programming language?",
            "answer": "Sun Microsystems",
            "options": [
                "Microsoft",
                "Sun Microsystems",
                "Oracle",
                "IBM"
            ]
        },
        {
            "numb": 13,
            "question": "Which of the following is a NoSQL database?",
            "answer": "MongoDB",
            "options": [
                "MySQL",
                "PostgreSQL",
                "Oracle",
                "MongoDB"
            ]
        },
        {
            "numb": 14,
            "question": "Which algorithm is used for finding the shortest path in a graph?",
            "answer": "Dijkstra's Algorithm",
            "options": [
                "Kruskal's Algorithm",
                "Prim's Algorithm",
                "Dijkstra's Algorithm",
                "Bellman-Ford Algorithm"
            ]
        },
        {
            "numb": 15,
            "question": "What is the primary purpose of an operating system?",
            "answer": "Manage hardware and software resources",
            "options": [
                "Manage hardware and software resources",
                "Compile source code",
                "Design user interfaces",
                "Run applications"
            ]
        },
        {
            "numb": 16,
            "question": "Which programming language is known for its use in web development and is also popular for backend development?",
            "answer": "JavaScript",
            "options": [
                "Python",
                "JavaScript",
                "C++",
                "Swift"
            ]
        },
        {
            "numb": 17,
            "question": "What is the main function of a compiler?",
            "answer": "Translate code from a high-level language to machine code",
            "options": [
                "Translate code from a high-level language to machine code",
                "Execute code directly",
                "Manage system resources",
                "Debug code"
            ]
        },
        {
            "numb": 18,
            "question": "Which protocol is used to send emails?",
            "answer": "SMTP",
            "options": [
                "SMTP",
                "HTTP",
                "FTP",
                "POP3"
            ]
        },
        {
            "numb": 19,
            "question": "Which HTML tag is used to define an unordered list?",
            "answer": "<ul>",
            "options": [
                "<ul>",
                "<ol>",
                "<li>",
                "<list>"
            ]
        },
        {
            "numb": 20,
            "question": "What is the default port number for HTTP?",
            "answer": "80",
            "options": [
                "80",
                "443",
                "21",
                "25"
            ]
        },
        {
            "numb": 21,
            "question": "Which of the following is a Python web framework?",
            "answer": "Django",
            "options": [
                "Django",
                "Ruby on Rails",
                "Angular",
                "Spring"
            ]
        },
        {
            "numb": 22,
            "question": "What is the primary purpose of a version control system?",
            "answer": "Track changes to code and manage multiple versions",
            "options": [
                "Track changes to code and manage multiple versions",
                "Compile code",
                "Run tests",
                "Deploy applications"
            ]
        },
        {
            "numb": 23,
            "question": "What is the name of the data structure that follows the Last In First Out (LIFO) principle?",
            "answer": "Stack",
            "options": [
                "Queue",
                "Stack",
                "Array",
                "Linked List"
            ]
        },
        {
            "numb": 24,
            "question": "Which JavaScript function is used to parse a JSON string into an object?",
            "answer": "JSON.parse()",
            "options": [
                "JSON.parse()",
                "JSON.stringify()",
                "parseJSON()",
                "stringifyJSON()"
            ]
        },
        {
            "numb": 25,
            "question": "What is the main use of the CSS 'float' property?",
            "answer": "Position elements side by side",
            "options": [
                "Position elements side by side",
                "Change the font size",
                "Adjust the element's opacity",
                "Apply a shadow effect"
            ]
        },
        {
            "numb": 26,
            "question": "Which command is used to create a new directory in a Unix-like operating system?",
            "answer": "mkdir",
            "options": [
                "mkdir",
                "rmdir",
                "ls",
                "cd"
            ]
        },
        {
            "numb": 27,
            "question": "What is the purpose of a firewall in a network?",
            "answer": "Protect against unauthorized access",
            "options": [
                "Protect against unauthorized access",
                "Enhance network speed",
                "Store network data",
                "Manage network traffic"
            ]
        },
        {
            "numb": 28,
            "question": "Which algorithm is used for encrypting data?",
            "answer": "AES",
            "options": [
                "AES",
                "RSA",
                "MD5",
                "SHA-1"
            ]
        },
        {
            "numb": 29,
            "question": "What does API stand for?",
            "answer": "Application Programming Interface",
            "options": [
                "Application Programming Interface",
                "Advanced Programming Interface",
                "Automatic Programming Interface",
                "Access Programming Interface"
            ]
        },
        {
            "numb": 30,
            "question": "Which of the following is a popular cloud computing platform?",
            "answer": "AWS",
            "options": [
                "AWS",
                "Dropbox",
                "Google Drive",
                "Slack"
            ]
        },
        {
            "numb": 31,
            "question": "What is the main advantage of using Git over other version control systems?",
            "answer": "Distributed version control",
            "options": [
                "Distributed version control",
                "Centralized version control",
                "Simpler interface",
                "Better performance"
            ]
        },
        {
            "numb": 32,
            "question": "What does the acronym HTTP stand for?",
            "answer": "HyperText Transfer Protocol",
            "options": [
                "HyperText Transfer Protocol",
                "HyperText Transport Protocol",
                "HyperText Transaction Protocol",
                "HyperText Transport Procedure"
            ]
        },
        {
            "numb": 33,
            "question": "Which of the following is an example of a relational database management system?",
            "answer": "PostgreSQL",
            "options": [
                "PostgreSQL",
                "MongoDB",
                "Redis",
                "Cassandra"
            ]
        },
        {
            "numb": 34,
            "question": "Which data structure is used to implement a priority queue?",
            "answer": "Heap",
            "options": [
                "Heap",
                "Stack",
                "Queue",
                "Linked List"
            ]
        },
        {
            "numb": 35,
            "question": "Which programming language is known for its use in data science and machine learning?",
            "answer": "Python",
            "options": [
                "Python",
                "JavaScript",
                "Ruby",
                "C#"
            ]
        },
        {
            "numb": 36,
            "question": "What is the purpose of the 'this' keyword in JavaScript?",
            "answer": "Refer to the current object",
            "options": [
                "Refer to the current object",
                "Refer to the global object",
                "Refer to the previous object",
                "Create a new object"
            ]
        },
        {
            "numb": 37,
            "question": "Which HTTP method is used to retrieve data from a server?",
            "answer": "GET",
            "options": [
                "GET",
                "POST",
                "PUT",
                "DELETE"
            ]
        },
        {
            "numb": 38,
            "question": "What is the primary function of a load balancer?",
            "answer": "Distribute incoming network traffic across multiple servers",
            "options": [
                "Distribute incoming network traffic across multiple servers",
                "Encrypt network traffic",
                "Monitor network performance",
                "Store network data"
            ]
        },
        {
            "numb": 39,
            "question": "Which of the following is a JavaScript framework?",
            "answer": "React",
            "options": [
                "React",
                "Bootstrap",
                "Sass",
                "JQuery"
            ]
        },
        {
            "numb": 40,
            "question": "What does DNS stand for?",
            "answer": "Domain Name System",
            "options": [
                "Domain Name System",
                "Dynamic Name Service",
                "Domain Name Service",
                "Direct Name System"
            ]
        },
        {
            "numb": 41,
            "question": "Which of the following is used for version control in software development?",
            "answer": "Git",
            "options": [
                "Git",
                "JIRA",
                "Docker",
                "Jenkins"
            ]
        },
        {
            "numb": 42,
            "question": "What is the default file extension for Python scripts?",
            "answer": ".py",
            "options": [
                ".py",
                ".java",
                ".js",
                ".rb"
            ]
        },
        {
            "numb": 43,
            "question": "Which CSS property is used to change the background color of an element?",
            "answer": "background-color",
            "options": [
                "background-color",
                "color",
                "bg-color",
                "background"
            ]
        },
        {
            "numb": 44,
            "question": "Which data structure uses a FIFO (First In First Out) principle?",
            "answer": "Queue",
            "options": [
                "Queue",
                "Stack",
                "Array",
                "Hash Table"
            ]
        },
        {
            "numb": 45,
            "question": "What is the purpose of a Docker container?",
            "answer": "Package and distribute applications",
            "options": [
                "Package and distribute applications",
                "Manage database operations",
                "Monitor system performance",
                "Compile code"
            ]
        },
        {
            "numb": 46,
            "question": "Which of the following is an example of a front-end framework?",
            "answer": "Angular",
            "options": [
                "Angular",
                "Django",
                "Spring",
                "Flask"
            ]
        },
        {
            "numb": 47,
            "question": "Which of the following is a commonly used build tool for JavaScript applications?",
            "answer": "Webpack",
            "options": [
                "Webpack",
                "Maven",
                "Gradle",
                "Ant"
            ]
        },
        {
            "numb": 48,
            "question": "What does REST stand for in the context of web services?",
            "answer": "Representational State Transfer",
            "options": [
                "Representational State Transfer",
                "Remote State Transfer",
                "Real-Time State Transfer",
                "Representational Standard Transfer"
            ]
        },
        {
            "numb": 49,
            "question": "What is the primary purpose of an API gateway?",
            "answer": "Manage and route API requests",
            "options": [
                "Manage and route API requests",
                "Store API data",
                "Authenticate users",
                "Encrypt API requests"
            ]
        },
        {
            "numb": 50,
            "question": "What is the name of the process of converting source code into machine code?",
            "answer": "Compilation",
            "options": [
                "Compilation",
                "Interpretation",
                "Execution",
                "Linking"
            ]
        }
    ];
    
    function selectRandomQuestion() {
        const randomIndex = GenerateRandomValue(questions.length);
        return questions[randomIndex];
    }

    function updateTimer() {
        const timer = setInterval(() => {
            second--;
            timerContainer.innerText = `⌚ : ${second}`;
            if (second <= 0) {
                clearInterval(timer);
                revealAnswer(currentQuestion.answer);
                document.querySelector("#playNext").style.display = "grid";
            }
        }, 1000);
        return timer;
    }
    
    function resetGameState() {
        second = 20;
        document.querySelector("#playNext").style.display = "none";
    }

    function handleAnswerClick(event, question, timer) {
        clearInterval(timer);
        timerContainer.innerText = "⌚ : 00";
        const selectedAnswer = event.target.innerText;
        document.querySelectorAll('.answerButton').forEach((button) => {
            button.style.background = '#fff';
            button.style.color = "#000";
            button.disabled = true;
        });

        if (selectedAnswer === question.answer) {
            event.target.style.background = 'green';
            event.target.style.color = "#fff";
            correctAnswers++;
        } else {
            event.target.style.background = 'red';
            event.target.style.color = "#fff";
            wrongAnswers++;
        }

        setTimeout(() => {
            document.getElementById("playNext").style.display = "grid";
        }, 1000);
    }

    function representGame(question) {
        const questionContainer = document.querySelector('#questionElement');
        const answersContainer = document.querySelector("#answersContainer");
        questionContainer.innerText = question.question;
        answersContainer.innerHTML = '';
        
        question.options.forEach((option) => {
            const button = document.createElement("button");
            button.className = 'answerButton';
            button.innerText = option;
            button.addEventListener("click", (event) => handleAnswerClick(event, question, timer));
            answersContainer.append(button);
        });
    }

    function revealAnswer(matchedAnswer) {
        document.querySelectorAll(".answerButton").forEach((button) => {
            if (button.innerText === matchedAnswer) {
                button.style.background = 'green';
                button.style.color = "#fff";
            } else {
                button.style.background = 'red';
                button.style.color = "#fff";
            }
        });
    }
    
    const currentQuestion = selectRandomQuestion();
    const timer = updateTimer();
    representGame(currentQuestion);

    document.querySelector("#playNextButton").addEventListener("click", () => {
        resetGameState();
        const nextQuestion = selectRandomQuestion();
        representGame(nextQuestion);
    });
}

function GenerateRandomValue(length) {
    return Math.floor(Math.random() * length);
}
