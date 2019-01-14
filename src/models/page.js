import { AppConfig } from '../AppConfig';

export const preparePagesApiModel = data => {
    data.body = data.body || '';
    data.body = data.body.replace(/<h1><br><\/h1>+/g, '<p><br></p>');
    data.body = data.body.replace(/<h2><br><\/h2>+/g, '<p><br></p>');
    data.body = data.body.replace(/<h3><br><\/h3>+/g, '<p><br></p>');
    data.body = data.body.replace(/<h4><br><\/h4>+/g, '<p><br></p>');
    for(let i = 0; i < 10; i++) {
        data.body = data.body.replace(/<p><br><\/p><p><br><\/p>+/g, '<p><br></p>');
    }

    let model = {};
    model.active = data.active || false;
    model.body = data.body;
    model.headline = data.headline || '';
    model.subhead = data.subhead || '';
    return model;
};

export const preparePagesInterfaceModel = data => {
    let model = {};
    model.id = data.id;
    model.active = data.active || false;
    model.body = data.body;
    model.headline = data.headline;
    model.slug = `${AppConfig.siteUrl}/page/` + data.slug;
    model.subhead = data.subhead;
    return model;
};