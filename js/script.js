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
      //tag = href.getAttribute('#tag-'),
      tag =  href.replace('#tag-', ''),
      activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
      console.log(tag);
      for(const activeTag of activeTags){
        activeTag.classList.remove('active');
      }

      const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

      for(const tagLink of tagLinks){
        tagLink.classList.add('active');
      }
      generateTitleLinks('[data-tags~="' + tag + '"]');

    /* DONE prevent default action for this event */
    /* DONE make new constant named "clickedElement" and give it the value of "this" */
    /* DONE make a new constant "href" and read the attribute "href" of the clicked element */
    /* DONE make a new constant "tag" and extract tag from the "href" constant */
    /* DONE find all tag links with class active */
    /* DONE START LOOP: for each active tag link */
      /* DONE remove class active */
    /* DONE END LOOP: for each active tag link */
    /* DONE find all tag links with "href" attribute equal to the "href" constant */
    /* DONE START LOOP: for each found tag link */
      /* DONE add class active */
    /* DONE END LOOP: for each found tag link */
    /* DONE execute function "generateTitleLinks" with article selector as argument */
  }

  function addClickListenersToTags(){
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
      for(const tagLink of tagLinks){
        tagLink.addEventListener('click', tagClickHandler);
      }
    /* find all links to tags */
    /* START LOOP: for each link */
      /* add tagClickHandler as event listener for that link */
    /* END LOOP: for each link */
  }



addClickListenersToTags();
generateTitleLinks();
generateTags();
