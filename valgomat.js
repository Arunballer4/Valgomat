let currentQuestion = 1;
let btnNext = document.getElementById('btnNext');
let btnCalc = document.getElementById('btnCalc');
let question1 = document.getElementById('question1');
let question2 = document.getElementById('question2');
let question3 = document.getElementById('question3');

btnNext.onclick = function () {
    if (currentQuestion === 1) {
        question1.style.display = 'none';
        question2.style.display = 'block';
        currentQuestion = 2;
    } else if (currentQuestion === 2) {
        question2.style.display = 'none';
        question3.style.display = 'block';
        btnNext.style.display = 'none';
        btnCalc.style.display = 'block';
        currentQuestion = 3;
    }
};

btnCalc.onclick = calculateResult;

// Vekting basert på svarene.
// For hvert spørsmål og svar, hvor mange poeng skal legges til for hvert parti.
const weights = {
    question1: {
        option1: { Mdg: 2, PartiB: 1, PartiC: 0 },
        option2: { Mdg: 0, PartiB: 1, PartiC: 2 }
    },
    question2: {
        option1: { Mdg: 1, PartiB: 2, PartiC: 1 },
        option2: { Mdg: 2, PartiB: 0, PartiC: 1 }
    },
    question3: {
        option1: { Mdg: 1, PartiB: 0, PartiC: 2 },
        option2: { Mdg: 0, PartiB: 2, PartiC: 1 }
    }
    // ... legg til flere spørsmål og vekting her ...
};

function calculateResult() {
    let formData = new FormData(document.getElementById('valgomatForm'));

    // Telle opp poengene for hvert parti.
    let partyScores = {
        Mdg: 0,
        PartiB: 0,
        PartiC: 0
    };

    for (let entry of formData) {
        let question = entry[0];
        let answer = entry[1];

        if (weights[question] && weights[question][answer]) {
            for (let party in weights[question][answer]) {
                partyScores[party] += weights[question][answer][party];
            }
        }
    }

    let maxScore = 0;
    let selectedParty = null;

    for (let party in partyScores) {
        if (partyScores[party] > maxScore) {
            maxScore = partyScores[party];
            selectedParty = party;
        }
    }

    let resultElement = document.getElementById('result');
    if (selectedParty) {
        resultElement.textContent = `Basert på dine svar, matcher du best med: ${selectedParty}`;
    } else {
        resultElement.textContent = `Du har ikke svart på alle spørsmålene.`;
    }
}
