export const prepareIndustriesApiModel = industry => {
    let model = {};
    model.title = industry.title;
    return model;
};

export const prepareIndustriesInterfaceModel = industry => {
    let model = {};
    model.id = industry.id;
    model.title = industry.title;
    return model;
};