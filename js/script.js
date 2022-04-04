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
    optArticleTagsSelector = '.post-tags .list',
    optAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

    }
    tagList.innerHTML = html;
  }
}
  function tagClickHandler(event){
    event.preventDefault();
    const clickedElement = this,
      href = clickedElement.getAttribute('href'),
      tag =  href.replace('#tag-', ''),
      activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

      for(let activeTag of activeTags){
        activeTag.classList.remove('active');
      }

      const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

      for(let tagLink of tagLinks){
        tagLink.classList.add('active');
      }
      generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){

    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
      for(let tagLink of tagLinks){
        tagLink.addEventListener('click', tagClickHandler);
      }
  }

  function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);

    for(const article of articles){

      const authorList = article.querySelector(optAuthorSelector),
        articleAuthor = article.getAttribute('data-author'),
        //articleAuthorTag = articleAuthor.replace(' ', ''),
        linkHTML = '<a href="#author-' + articleAuthor + '"><span>By ' + articleAuthor + '</span></a>';

      authorList.innerHTML = linkHTML;
      }
    }

    function authorClickHandler(event){
      event.preventDefault();
      const clickedElement = this,
        href = clickedElement.getAttribute('href'),
        author =  href.replace('#author-', ''),
        activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
      console.log(href);
        for(let activeAuthor of activeAuthors){
          activeAuthor.classList.remove('active');
        }

        const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

        for(let authorLink of authorLinks){
          authorLink.classList.add('active');
        }
        generateTitleLinks('[data-author="' + author + '"]');
    }

    function addClickListenersToAuthors(){

      const authorLinks = document.querySelectorAll('a[href^="#author-"]');
        for(let authorLink of authorLinks){
          authorLink.addEventListener('click', authorClickHandler);
        }
    }

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
