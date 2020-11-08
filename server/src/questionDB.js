module.exports = (mongoose) => {
    const questionSchema = new mongoose.Schema({
        heading:String,
        description:String
    })

    const questionModel = mongoose.model('question', questionSchema);

    async function getQuestions(){
        try {
            return await questionModel.find();
        } catch(error){
            console.error("getQuestions", error.message);
            return{};
        }
    }

    async function getQuestion(id) {
        try {
            return await questionModel.findById(id);
        } catch(error){
            console.error("getQuestion", error.message);
            return{};
        }
    }

    async function createQuestion(title, text){
        let question = new questionModel({heading: title, description: text});
        try{
            return question.save();
        } catch(error){
            console.error("createQuestion", error.message);
            return{};
        }
    }

      const answerSchema = new mongoose.Schema({
        questionId:String,
        answer:String,
        score:Number
    })

    const answerModel = mongoose.model('answer', answerSchema);

      async function getAnswers(){
        try {
            return await answerModel.find();
        } catch(error){
            console.error("getAnswers", error.message);
            return{};
        }
    }    

    async function getAnswer(id) {
        try {
            return await answerModel.findById(id);
        } catch(error){
            console.error("getAnswers", error.message);
            return{};
        }
    }

    async function createAnswer(question, text){
        let answer = new answerModel({questionId:question, answer: text, score: 0});
        try{
            return answer.save();
        } catch(error){
            console.error("createAnswer", error.message);
            return{};
        }
        
    }

    async function updateScore(id, score){
        try {
            answerModel.findByIdAndUpdate(id, {score: score}, {new: true}, (error, data) => {
                if(error){
                    console.log(error);
                } else {
                    console.log(data);
                }
            });
           
        } catch(error){
            console.error("updateScore", error.message);
        }
       
    }

    return {
        getQuestions,
        getQuestion,
        createQuestion,
        getAnswers,
        getAnswer,
        createAnswer,
        updateScore
    }
}
