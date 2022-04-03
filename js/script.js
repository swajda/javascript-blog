/* eslint-disable no-undef */
'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active')

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    const getHref = clickedElement.getAttribute('href');
    console.log(getHref);
    const targetArticle = document.querySelector(getHref);
    console.log(targetArticle);
    targetArticle.classList.add('active')
}



  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
  const titleList = document.querySelector(optTitleListSelector)
  /* remove contents of titleList */
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector)
  let html = '';
  /* for each article */
  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id')
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* create HTML of the link */
      // titleList.insertAdjacentHTML('afterbegin', linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
