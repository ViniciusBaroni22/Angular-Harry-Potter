const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");
const $answers = document.querySelectorAll(".answer");

let currentQuestionIndex = 0;
let totalCorrect = 0;

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  displayNextQuestion();
}

function displayNextQuestion() {
  resetState();

  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  $questionText.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].answers.forEach((answer) => {
    const newAsnwer = document.createElement("button");
    newAsnwer.classList.add("button", "answer");
    newAsnwer.textContent = answer.text;
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAsnwer);

    newAsnwer.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    document.body.classList.add("1");
    totalCorrect++;
  } else {
    document.body.classList.add("2");
  }

  document.querySelectorAll(".answer").forEach((button) => {
    button.disabled = true;

    if (button.dataset.correct) {
      button.classList.add("1");
    } else {
      button.classList.add("2");
    }
  });

  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor((totalCorrect * 100) / totalQuestions);

  let message = "";

  switch (true) {
    case performance >= 75:
      message = "CORVINAL";
      break;
    case performance >= 50:
      message = "GRIFINÓRIA";
      break;
    case performance >= 25:
      message = "LUFA-LUFA";
      break;
    default:
      message = "SONSERINA";
  }

  $questionsContainer.innerHTML = `
    <p class="final-message">
      
      <span>Sua casa é: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `;
}

const questions = [
  {
    question: "Dia ou Noite ?",
    answers: [
      { text: "DIA", correct: false },
      { text: "NOITE", correct: true },
    ],
  },
  {
    question: "Quem você salvaria primeiro ?",
    answers: [
      { text: "Cho Chang", correct: true },
      { text: "Luna Lovegood", correct: true },
      { text: "Harry Potter", correct: false },
      { text: "Ron Weasley", correct: false },
    ],
  },
  {
    question: "Inventaria uma poção que lhe garantisse?",
    answers: [
      { text: "GLÓRIA", correct: true },
      { text: "PODER", correct: false },
      { text: "AMOR", correct: false },
      { text: "SABEDORIA", correct: true },
    ],
  },
  {
    question: "Qual casa você gostaria de entrar ?",
    answers: [
      { text: "Grifinória", correct: false },
      { text: "Lufa-Lufa", correct: false },
      { text: "Corvinal", correct: false },
      { text: "Sonserina", correct: true },
    ],
  },
  {
    question: "Qual casa você não gostaria de entrar ?",
    answers: [
      { text: "Grifinória", correct: false },
      { text: "Lufa-Lufa", correct: true },
      { text: "Corvinal", correct: false },
      { text: "Sonserina", correct: true },
    ],
  },
  {
    question: "Qual sua matéria preferida ?",
    answers: [
      { text: "Transfiguração", correct: false },
      { text: "poções", correct: true },
      { text: "Feitiços", correct: true },
      { text: "adivinhação", correct: false },
    ],
  },
  {
    question: "Qual destas palavras mais combinam com você ?",
    answers: [
      { text: "Ousado", correct: false },
      { text: "Determinado", correct: true },
      { text: "Original", correct: true },
      { text: "Paciente", correct: false },
    ],
  },
  {
    question: "Se alguém descobre que você é Bruxo oq você faz ?",
    answers: [
      { text: "Falo para a pessoa guardar segredo", correct: false },
      { text: "Mato ela", correct: false },
      { text: "Faço um feitiço para ela equecer", correct: true },
      { text: "Pergunto se ela é doida", correct: false },
    ],
  },
  {
    question: "Qualnome você daria para seu animal de estimação ?",
    answers: [
      { text: "Lola Lua", correct: true },
      { text: "Valdemort", correct: true },
      { text: "Dobby", correct: false },
      { text: "Edwiges", correct: false },
    ],
  },
  {
    question: "Qual destes cheiros você mais aprecia ?",
    answers: [
      { text: "Casa", correct: false },
      { text: "Pergaminho Novo", correct: false },
      { text: "Mar", correct: true },
      { text: "Fogo", correct: true },
    ],
  },
];
