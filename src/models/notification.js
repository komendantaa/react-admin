export const prepareNotificationsInterfaceModel = notification => {
    let model = {};
    model.id = notification.id;
    model.type = notification.type;
    model.text = notification.text;
    model.createdAt = notification.createdAt;
    return model;
};
