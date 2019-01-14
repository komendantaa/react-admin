export const prepareDegreeInterfaceModel = degree => {
    let model = {};
    model.id = degree.id;
    model.name = degree.name;
    return model;
};
