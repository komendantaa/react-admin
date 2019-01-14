export const prepareCountriesInterfaceModel = country => {
    let model = {};
    model.id = country.id;
    model.name = country.name;
    return model;
};

export const prepareStatesInterfaceModel = state => {
    let model = {};
    model.id = state.id;
    model.name = state.name;
    return model;
};