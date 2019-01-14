import { AppConfig } from '../AppConfig';

/**
 * Categories section
 */

export const prepareBlogCategoriesApiModel = category => {
    let model = {};
    model.title = category.title ? category.title : '';
    return model;
};

export const prepareBlogCategoriesInterfaceModel = category => {
    let model = {};
    model.id = category.id;
    model.title = category.title;
    return model;
};

/**
 * Comments section
 */
export const prepareCommentApiModel = comment => {
    let model = {};
    model.text = comment.text;
    if(comment.articleIdTest) model.article = comment.articleIdTest;
    model.active = !!comment.active;
    return model;
};

export const prepareCommentInterfaceModel = comment => {
    let model = {};
    model.id = comment.id;
    model.text = comment.text;
    model.createdAt = comment.createdAt;
    if(comment.name) model.name = comment.name;
    if(comment.email) model.email = comment.email;
    if(comment.user) model.user = comment.user;
    model.preparedName = comment.name ? `${comment.name} (${comment.email})` : `${comment.user.firstName} ${comment.user.lastName}`;
    model.active = !!comment.active;
    model.articleId = comment.article.id;
    model.articleTitle = comment.article.title;
    return model;
};

/**
 * Articles section
 */
export const prepareAtriclesApiModel = article => {
    let model = {};
    model.title = article.title;
    model.headText = article.headText;
    if(article.newImage) model.image = article.newImage;
    model.body = article.body;
    model.tags = repeatedIdsCheck(article.tags);
    model.category = repeatedIdsCheck(article.category);
    model.active = article.active;
    return model;
};

export const prepareAtriclesInterfaceModel = article => {
    let model = {};
    model.id = article.id;
    model.updatedAt = article.updatedAt;
    model.title = article.title;
    model.headText = article.headText;
    model.image = article.image ? imgHelper(article.image) : '';
    model.newImage = '';
    model.body = article.body;
    model.tags = article.tags;
    model.category = article.category;
    model.active = article.active;
    model.slug = article.slug;
    model.comments = article.comments.reverse();
    return model;
};

const imgHelper = img => ({ file: AppConfig.imgUrl + '/' + img });

const repeatedIdsCheck = ids => [ ...new Set(ids) ];

/**
 * Tag section
 */
export const prepareTagsApiModel = tag => {
    let model = {};
    model.title = tag.title;
    return model;
};

export const prepareTagsInterfaceModel = tag => {
    let model = {};
    model.id = tag.id;
    model.title = tag.title;
    return model;
};
