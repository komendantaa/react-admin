export const prepareProjectInterfaceModel = project => {
    let model = {};
    model.id = project.slug;
    model.budget = project.budget;
    model.categories = categoryHandler(project.category);
    model.company = project.company;
    model.completedAt = project.completedAt;
    model.createdAt = project.createdAt;
    model.dateFrom = project.dateFrom;
    model.dateTo = project.dateTo;
    model.description = project.description;
    model.experienceLevel = project.experienceLevel;
    model.isReviewed = project.isReviewed;
    model.jobs = project.jobs;
    model.slug = project.id;
    model.status = project.status;
    model.title = project.title;
    model.updatedAt = project.updatedAt;
    model.workWeeks = project.workWeeks;

    model.projectSkills = [];
    project.projectSkills.forEach(skill => model.projectSkills.push(skill.id));

    return model;
};

const categoryHandler = categories => {
    const catArr = [];
    const childrenCheck = parent => {
        catArr.push(parent.id);
        if(parent.children.length) parent.children.forEach(el => childrenCheck(el));
    };
    categories.forEach(el => childrenCheck(el));
    return catArr;
};