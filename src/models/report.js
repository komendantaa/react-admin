export const prepareReportInterfaceModel = line => {
    let model = {};
    model.id = line.id;
    model.projectId = line.projectSlug;
    model.projectName = line.projectName;
    model.professional = line.professional;
    model.company = line.company;
    model.total = line.totalAmount;
    return model;
};
