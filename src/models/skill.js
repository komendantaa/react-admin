export const prepareSkillsApiModel = skill => {
    let model = {};
    model.title = skill.title;
    return model;
};

export const prepareSkillsInterfaceModel = skill => {
    let model = {};
    model.id = skill.id;
    model.title = skill.title;
    return model;
};
