export default class Quiz {
    constructor(response){
        this.response = response;
        this.numsOfQues = response.length;
        this.currentQues= 0;
        this.score = 0;
        this.showQues()

        this.scoreElement = document.getElementById('score');
        this.tryAgain = document.getElementById('again');

        this.nextBtn = document.getElementById('next');
        this.nextBtn.addEventListener('click', this.nextQues.bind(this))

        this.tryAgain = document.getElementById('again');
        this.tryAgain.addEventListener('click', this.back)

        this.answerElement = document.getElementsByName('answer');

    }

    showQues()
    {
        document.getElementById('question').innerHTML = this.response[this.currentQues].question;
        document.getElementById('currentQuestion').innerHTML = this.currentQues + 1;
        document.getElementById('totalNumber').innerHTML = this.numsOfQues;

        let answers = [this.response[this.currentQues].correct_answer, ...this.response[this.currentQues].incorrect_answers]

        function shuffle(answers) {
            let currentIndex = answers.length,  randomIndex;
            while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [answers[currentIndex], answers[randomIndex]] = [
            answers[randomIndex], answers[currentIndex]];
            }
            return answers;
          }
        let answersArr = shuffle(answers);

        let temp = ``;
        for(let i = 0; i< answersArr.length; i++){
            temp += `
            <label class="text-muted">
                <input type="radio" id="true" name="answer" value=${answersArr[i]}> ${answersArr[i]}
            </label>
            `;
        }
        document.getElementById('rowAnswer').innerHTML = temp;
    }

    nextQues()
    {

        let userAnswer = [...this.answerElement].filter(el => el.checked);
        if(userAnswer.length === 1){
            $('#alert').fadeOut(200);
            this.checkAnswer();
            this.currentQues ;
            
            if (this.currentQues == this.numsOfQues) {
                $('#quiz').fadeOut(200, function(){
                    $('#finish').fadeIn(200);
                })
            } else {
                this.showQues();
            }
        } 
        else 
        {
            $('#alert').fadeIn(200);
        }
       

    }

    checkAnswer()
    {
        let userAnswer = [...this.answerElement].filter(el => el.checked)[0].value;
        let correctAnswer = this.response[this.currentQues++].correct_answer;

        if (userAnswer == correctAnswer) {
            this.score ++;
            this.scoreElement.innerHTML = this.score;
            $('#Correct').fadeIn(150, function (){
                $('#Correct').fadeOut(150)
            })
        } else {
            $('#inCorrect').fadeIn(150, function (){
                $('#inCorrect').fadeOut(150)
            })
        }
        if (this.currentQues == this.numsOfQues) {
            $('#quiz').fadeOut(200, function () {
                $('#finish').fadeIn(200)
            })
        }
    }

    back() {
        $('#finish').fadeOut(200, function(){
                $('#setting').fadeIn(200)
            })
    }
}