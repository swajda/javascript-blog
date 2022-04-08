/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}
function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active')
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const getHref = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(getHref);
  targetArticle.classList.add('active')
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id')
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;

  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
  }
  for (let tag in tags) {
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;

}

function calculateTagClass(count) {
  const params = { min: 4, max: 6 };
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;

}


function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);
  let allTags = {};

  for (const article of articles) {
    let html = '';
    const tagListOne = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.articleTag(linkHTMLData);
      //const linkHTML = '<li><a href="#tag-' + tag + '"><span> ' + tag + ' ,</span></a></li>';
      html = html + linkHTML;

      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagListOne.innerHTML = html;
  }
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);

  const allTagsData = { tags: [] };

  for (let tag in allTags) {
    //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    //const linkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) +'"><span> ' + tag + '</span></a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);

}


function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    tag = href.replace('#tag-', ''),
    activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {

    const authorPlace = article.querySelector(optAuthorSelector),
      articleAuthor = article.getAttribute('data-author');
    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkHTML = templates.articleAuthor(linkHTMLData);
   const link = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>',
    fullLink = 'By ' + link;

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = {
        html: link,
        count: 1
      };
    } else {
      allAuthors[articleAuthor].count++;
    }
    authorPlace.innerHTML = fullLink;
  }
  const authorList = document.querySelector(optAuthorsListSelector);

  //  --> let allAuthorsHTML = '';
  const allAuthorsData = {authors: []};
  console.log(allAuthorsData);

  for(let author in allAuthors) {
    //const linkHTML = '<li>' + allAuthors[author].html + ' (' + allAuthors[author].count + ')</li>';
    // --> allAuthorsHTML += linkHTML;
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author].count,
    });

  }

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

}


function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    author = href.replace('#author-', ''),
    activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(href);
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
