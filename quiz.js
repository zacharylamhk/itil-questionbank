document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const nextButton = document.getElementById('nextBtn');
    let questions;

    // Fetch the JSON data
    fetch('https://raw.githubusercontent.com/zacharylamhk/itil-questionbank/main/ITIL4Foundation_QB.json')
        .then(response => response.json())
        .then(data => {
            questions = Object.values(data);
            loadQuestion();
        });

    function loadQuestion() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const questionData = questions[randomIndex];
        displayQuestion(questionData);
    }

    function displayQuestion(questionData) {
        quizContainer.innerHTML = `
            <div class="question">${questionData.Q}</div>
            <ul class="options">
                <li><input type="radio" name="option" value="A"> ${questionData.A}</li>
                <li><input type="radio" name="option" value="B"> ${questionData.B}</li>
                <li><input type="radio" name="option" value="C"> ${questionData.C}</li>
                <li><input type="radio" name="option" value="D"> ${questionData.D}</li>
            </ul>
            <button id="submitBtn">Submit</button>
            <div class="result" id="result"></div>
        `;

        document.getElementById('submitBtn').addEventListener('click', () => {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            const resultContainer = document.getElementById('result');

            if (selectedOption) {
                const answer = selectedOption.value;
                const correctAnswer = questionData.ANS;
                if (answer === correctAnswer) {
                    resultContainer.textContent = "Correct!";
                } else {
                    resultContainer.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
                }
            } else {
                resultContainer.textContent = "Please select an option.";
            }
        });
    }

    nextButton.addEventListener('click', () => {
        loadQuestion();
    });
});
