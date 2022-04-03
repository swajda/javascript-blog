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

  for(const article of articles){
    let html = '';
    const tagList = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '"><span> ' + tag + ' ,</span></a></li>';
      html = html + linkHTML;
      console.log(html);
    }
    tagList.innerHTML = html;
  }
}
  function tagClickHandler(event){

    /* prevent default action for this event */
    /* make new constant named "clickedElement" and give it the value of "this" */
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    /* make a new constant "tag" and extract tag from the "href" constant */
    /* find all tag links with class active */
    /* START LOOP: for each active tag link */
      /* remove class active */
    /* END LOOP: for each active tag link */
    /* find all tag links with "href" attribute equal to the "href" constant */
    /* START LOOP: for each found tag link */
      /* add class active */
    /* END LOOP: for each found tag link */
    /* execute function "generateTitleLinks" with article selector as argument */
  }

  function addClickListenersToTags(){

    /* find all links to tags */
    /* START LOOP: for each link */
      /* add tagClickHandler as event listener for that link */
    /* END LOOP: for each link */
  }



addClickListenersToTags();
generateTitleLinks();
generateTags();
