$(document).ready(function () {
    questionManager();
    progressBar();

    $('a#submit.btn.btn-primary.btn-lg').click(function () {
        submitAnswer();
        console.log("buttonhasbeenclicked");
        $('#answerFeedBack').removeClass('hidden');
        $('.form-group').toggleClass('hidden');
        $('#submit').toggleClass('hidden');
        $('#nextQuestion').toggleClass('hidden');

        progressBar();
    });

    $('a#nextQuestion.btn.btn-primary.btn-lg').click(function () {
        console.log("nextQuestionbuttonhasbeenclicked");
        
        $('#answerFeedBack').addClass('hidden');
        $('.form-group').toggleClass('hidden');
        $('#submit').toggleClass('hidden');
        $('#nextQuestion').toggleClass('hidden');
        $('#imageContainer').addClass('hidden');
        questionManager();
        progressBar();
    });

    $('a#reset.btn.btn-primary.btn-lg').click(function () {

        $('a#reset.btn.btn-primary.btn-lg').toggleClass('hidden');
        $('.form-group').toggleClass('hidden');
        $('#submit').toggleClass('hidden')
        $('#imageContainer').toggleClass('hidden');
        correctGuesses = 0;
        wrongGuesses = 0;
        currentQuestionNumber = -1;
        questionManager();
        progressBar();
        
    });
});

//nasty nasty globals
var correctGuesses = 0;
var wrongGuesses = 0;
var currentQuestionNumber = -1;


var progressBar = function () {

    var percentageSuccess = correctGuesses / 5 * 100;
    console.log(percentageSuccess);
    var percentageWrong = wrongGuesses / 5 * 100;
    console.log(percentageWrong);


    $('div.progress-bar.progress-bar-success').css('width', percentageSuccess + '%');
    $('div.progress-bar.progress-bar-danger').css('width', percentageWrong + '%');

    if (correctGuesses + wrongGuesses == 0) {
        $('.div.progress-bar.progress-bar-success').css('width', '0%');
        $('.div.progress-bar.progress-bar-danger').css('width', '0%');
    }

};

var allQuestions = [{
            question: 'How old is Jake?',
            options: ['28', '37', '45', '13'],
            answer: 0,
            gif: 'question1.gif',
        },
        {
            question: 'Who is ready for Brad?',
            options: ['Jake', 'Lumpy Space Princess', 'BEEMO', 'Gunther'],
            answer: 1,
            gif: 'question2.gif',
        },
        {
            question: 'Who is the mightiest hero of Ooo?',
            options: ['Marceline', 'Billy', 'Finn', 'Flame Princess'],
            answer: 1,
            gif: 'question3.gif',
        },
        {
            question: "Who has been driven insane by his crown?",
            options: ['Ice King', 'Jake', 'Finn', 'Ghost Princess'],
            answer: 0,
            gif: 'question4.gif',
        },
        {
            question: "Out of all the princesses, who does the ice king stalk the most?",
            options: ['Jungle Princess', 'Embryo Princess', 'Jungle Princess', 'Princess Bubblegum'],
            answer: 3,
            gif: 'question5.gif',
        }
];


//handles the presentation of the answer and returns the correct answer
var questionManager = function () {

    $('#imageContainer').addClass('hidden');

    if (currentQuestionNumber <= 3) {
        var question = allQuestions[currentQuestionNumber + 1]
        $('#question').html(question.question);
        $('#answer0').html(question.options[0]);
        $('#answer1').html(question.options[1]);
        $('#answer2').html(question.options[2]);
        $('#answer3').html(question.options[3]);
        console.log(currentQuestionNumber);
    }
    
    else {
        gameOver();
    }
}

var submitAnswer = function () {
    console.log("submitanswerreached");
    
    var userAnswer = $('input[name=optionsRadios]:radio:checked').val();
    var checkBlanks = $("input:radio[name='optionsRadios']").is(":checked")
    console.log(checkBlanks + "checking for blanks, boss");

    var question = allQuestions[currentQuestionNumber + 1]
   
    if (checkBlanks == false) {
        $('#answerFeedBack').html('<div class="alert alert-danger">Please select an answer, Ooo is a pretty radical place, so you get to try again!</div>');
    }
    
    else if (userAnswer == question.answer) {
        $('#answerFeedBack').html('<div class="alert alert-success">Correct answer! Awesome man,' + ' your answer ' + question.options[question.answer] + ' was totes radical!</div>');
        $('#answerFeedBack').toggleClass('hidden');
        correctGuesses++;
        currentQuestionNumber++;
        $('#imageContainer').html("<img id= 'images' src=" + question.gif + ">");
        $('#imageContainer').removeClass('hidden');
        console.log(question.gif);

    }

    else {
        $('#answerFeedBack').html('<div class="alert alert-danger">' + 'Wrong! The correct answer is ' + question.options[question.answer] + '. You guessed: ' + question.options[userAnswer] + '</div>');
        $('#answerFeedBack').toggleClass('hidden');
        wrongGuesses++;
        currentQuestionNumber++;
        $('#imageContainer').html("<img id= 'images' src=" + question.gif + ">");
        $('#imageContainer').removeClass('hidden');
        console.log(question.gif);
    }
};

var gameOver = function () {
    $('.form-group').toggleClass('hidden');
    $('#submit').toggleClass('hidden')
    $('#reset').toggleClass('hidden');
    $('#nextQuestion').addClass('hidden');
    $('#question').html('<div class="alert alert-danger">' + 'You finished the quiz! ' + 'You got ' + correctGuesses + ' / 5' + ' questions correct.</div>');
};