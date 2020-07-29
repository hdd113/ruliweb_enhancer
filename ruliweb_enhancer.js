// ==UserScript==
// @name         Ruliweb Enhancer
// @namespace    https://github.com/hdd1013/ruliweb_enhancer/
// @version      0.1
// @description  근근웹++
// @author       hdd1013
// @match        *.ruliweb.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...
  var ruliFunctions = window.ruliFunctions = {};

  // Github의 파일 URI가져오기
  ruliFunctions.getFileURIFromRepo = function(filePath, queryString) {
    const repoAddress = 'https://cdn.jsdelivr.net/gh/hdd1013/ruliweb_enhancer/';
    const repoFilePathString = '';
    const defaultQueryString = '';
    if(!queryString) {
      queryString = defaultQueryString;
    }
    if(queryString.length > 0) {
      queryString = '?'+queryString;
    }
    return (repoAddress+repoFilePathString+filePath+queryString);
  }

  // 스타일시트 추가
  ruliFunctions.enqueueStyle = function(styleSheetURI) {
    var style  = document.createElement("link");
    style.rel  = "stylesheet";
    style.type = "text/css";
    style.href = styleSheetURI;
    document.head.appendChild(style);
  }
  ruliFunctions.appendStyle = function(contents) {
    var styleElement = document.createElement("style");
    styleElement.textContent = contents;
    styleElement.type = "text/css";
    document.head.appendChild(styleElement);
  }
  // 실행부분
  ruliFunctions.execute = function() {
    console.log("execute");
    ruliFunctions.enqueueStyle( ruliFunctions.getFileURIFromRepo("styles/style.css") );
    console.log("execute end");
  }


  ruliFunctions.execute();
})();