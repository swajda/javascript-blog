/* eslint-disable no-undef */
'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active')
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    const getHref = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(getHref);
    targetArticle.classList.add('active')
}


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){
  const titleList = document.querySelector(optTitleListSelector)
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector)
  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id')
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;

  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

function generateTags(){
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for(const article of articles){
    const tagList = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray){

      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + ',</span></a></li>';
      html = html + linkHTML;
      console.log(html);
    }
    tagList.innerHTML = html;
  }

  /* DONE find all articles */
  /*  DONE START LOOP: for every article: */
    /* DONE find tags wrapper */
    /* DONE make html variable with empty string */
    /* DONE get tags from data-tags attribute */
    /* DONE split tags into array */

    /* DONE START LOOP: for each tag */
      /* DONE generate HTML of the link */
      /* DONE add generated code to html variable */
    /* DONE END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */

}


generateTitleLinks();
generateTags();
