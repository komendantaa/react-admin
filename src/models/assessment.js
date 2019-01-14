export const prepareAssessmentsApiModel = assessment => {
    let model = {};
    model.title = assessment.title;
    model.label = assessment.label;
    model.description = assessment.description;
    model.timeLimit = assessment.timeLimit;
    model.category = assessment.categoryId;
    model.questions = questionsHandler(assessment.questions);
    return model;
};

const questionsHandler = questions => {
    questions.forEach(question => {
        question.correctAnswers = [];
        question.answers.forEach((answer, index) => {
            if(!answer.key) answer.key = index + 1;
            if(answer.correct) question.correctAnswers.push(answer.key);
            delete answer.correct;
        })
    });
    return questions;
};

export const prepareAssessmentsInterfaceModel = assessment => {
    let model = {};
    if(assessment.questions) model.questions = correctAnswerHandler(assessment.questions);
    model.id = assessment.id;
    model.title = assessment.title;
    model.category = assessment.category.title;
    model.categoryId = assessment.category.id;
    model.description = assessment.description;
    model.label = assessment.label;
    model.timeLimit = assessment.timeLimit;
    return model;
};

const correctAnswerHandler = questions => {
    questions.forEach(question =>
        question.answers.forEach(answer =>
            answer.correct = question.correctAnswers.some(correct =>
                correct === answer.key)));
    return questions;
};