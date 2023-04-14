/// <reference path="../typings/globals/jquery/index.d.ts"
import Quiz from "./quiz.js";

export default class Setting {
    constructor() {
        this.categoryInput = document.getElementById('category');
        this.difficultyInput = document.getElementsByName('difficulty');
        this.questionsNumberInput = document.getElementById('questionsNumber');
        this.startBtn = document.getElementById('startBtn');
        this.startBtn.addEventListener('click', this.startQuiz.bind(this))
    }


    async startQuiz()
    {
        let category = this.categoryInput.value;
        let questionsNumber= this.questionsNumberInput.value;
        let difficulty = this.difficultyInput;
        let FinalDifficulty = [...difficulty].filter(el => el.checked)[0].value
        
        let Api = `https://opentdb.com/api.php?amount=${questionsNumber}&category=${category}&difficulty=${FinalDifficulty}`
        let response = await this.fetchApi(Api);
        if (response.length > 0) {
            $('#setting').fadeOut(200, function(){
                $('#quiz').fadeIn(200);
            })
        }
        let quiz = new Quiz(response);
    }

    async fetchApi(Api){
        let response = await fetch(Api);
        let finalResponse = await response.json();
        return finalResponse.results;
    }

}