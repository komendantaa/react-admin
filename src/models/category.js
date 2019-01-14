export const prepareCategoriesApiModel = category => {
    let model = {};
    model.name = category.name;
    if(category.parentCategoryId) model.parentCategoryId = category.parentCategoryId;
    return model;
};

export const prepareCategoriesInterfaceModel = category => {
    let model = {};
    model.id = category.id;
    model.name = category.name;
    model.parentCategoryId = category.parentId;
    model.parent = category.parent ? category.parent : '';
    model.disabled = !category.parentId;
    return model;
};

export const prepareParentCategoriesInterfaceModel = category => {
    let model = {};
    model.id = category.id;
    model.name = category.name;
    return model;
};