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
    // Answers
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

     // Users
    const userSchema = new mongoose.Schema({
        username:String,
        password:String
    })

    const userModel = mongoose.model('user', userSchema);

      async function getUsers(){
        try {
            return await userModel.find();
        } catch(error){
            console.error("getUsers", error.message);
            return{};
        }
    }    

    async function getUser(id) {
        try {
            return await userModel.findById(id);
        } catch(error){
            console.error("getUser", error.message);
            return{};
        }
    }

    async function createUser(username, password){
        let user = new userModel({username:username, password: password});
        try{
            return user.save();
        } catch(error){
            console.error("CreateUser", error.message);
            return{};
        }
        
    }

    return {
        getQuestions,
        getQuestion,
        createQuestion,
        getAnswers,
        getAnswer,
        createAnswer,
        updateScore,
        getUsers,
        getUser,
        createUser
    }
}
