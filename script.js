
const fakeUsername = 'user';
const fakePassword = 'password';


const quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris'
    },
    {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4'
    },
    {
        question: 'What is the color of the sky?',
        options: ['Blue', 'Green', 'Red', 'Yellow'],
        answer: 'Blue'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Mars'
    },
    {
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        answer: 'Pacific Ocean'
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === fakeUsername && password === fakePassword) {
        document.getElementById('authentication').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        showQuestion();
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const currentQuestion = quizData[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<h3>${currentQuestion.question}</h3>`;

    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" name="answer" value="${option}" id="${option}">
            <label for="${option}">${option}</label>
        `;
        questionElement.appendChild(optionElement);
    });

    questionContainer.appendChild(questionElement);

    const nextButton = document.getElementById('nextButton');
    nextButton.style.display = 'block';
    nextButton.addEventListener('click', checkAnswer);

    updateProgress();
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        const currentQuestion = quizData[currentQuestionIndex];
        
        if (answer === currentQuestion.answer) {
            selectedOption.nextElementSibling.classList.add('correct');
            score++;
        } else {
            selectedOption.nextElementSibling.classList.add('incorrect');
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            setTimeout(() => {
                showQuestion();
            }, 1000);
        } else {
            showFinalScore();
        }
    } else {
        alert('Please select an answer.');
    }
}

function showFinalScore() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';
    document.getElementById('final-score').innerText = `${score} / ${quizData.length}`;
}

function updateProgress() {
    const progressText = document.getElementById('progressText');
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
}
