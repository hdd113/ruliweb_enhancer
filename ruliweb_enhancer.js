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

  // CDN에서 파일 URI가져오기
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
  // 현재 URL 분석
  ruliFunctions.uriMatch = function(pattern) {
    var windowLoc = window.location.href;
    if(windowLoc.match(pattern)) {
      return true;
    } else {
      return false;
    }
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
  // 댓삭기
  ruliFunctions.delAllComments = function () {
    var commentData = [];
    for (var i = 0; i < $(".d_mycomment").length; i++) {
      let commentItem = $(".d_mycomment")[i];
      let currentComment = {};
      currentComment.commentId = $(commentItem).attr("comment-id");
      currentComment.articleId = $(commentItem).attr("article-id");
      currentComment.boardId = $(commentItem).attr("board-id");
      currentComment.isDeleted = false;
      commentData.push(currentComment);
    }

    var t = 'https://api.ruliweb.com/';
    var deleteCounter = 0;
    for (var j = 0; j < commentData.length; j++) {
      var d = {};
      d.comment_id = commentData[j].commentId;
      d.article_id = commentData[j].articleId;
      d.board_id = commentData[j].boardId;

      $.ajax({
        url: t + "procDeleteMyComment",
        type: "POST",
        data: d,
        dataType: "json",
        xhrFields: {
          withCredentials: !0
        },
        success: function (e) {
          if (e.success) {
            deleteCounter++;
            if (deleteCounter == commentData.length) {
              alert("삭제완료");
              document.location.reload();
            }
          } else {
            console.log("success: ", e.commend_id)
          }
        },
        error: function () {
          alert("ajax failure")
        }
      })
    }
  }
  ruliFunctions.delAllCommentsBtn = function() {
    var $commentTable = $("#mycomment").find(".text_over_table");
    var delBtnHtml = "<div class=\"btn_light btn_delete\" style=\"\" onclick=\"ruliFunctions.delAllComments();\">전체 삭제</div>";
    $commentTable.append(delBtnHtml);
  }
  ruliFunctions.commentsPageProc = function() {
    $(document).ready(function() {
      if($(".d_mycomment").length>0) {
        ruliFunctions.delAllCommentsBtn();
      } else {
        var curPage = parseInt( window.location.href.match(/page\=(\d*)/)[1] );
        if(curPage>1) {
          var targetPage = window.location.href.replace( /page\=(\d*)/, "page="+(curPage-1) );
          window.location.href = targetPage;
        }
      }
    });
  }

  // 실행부분
  // 즉시실행
  ruliFunctions.execute = function() {
    ruliFunctions.enqueueStyle( ruliFunctions.getFileURIFromRepo("styles/style.css") );
  }
  // DOM 로드 이후 실행
  ruliFunctions.onLoad = function() {
    if( ruliFunctions.uriMatch(/.*bbs\.ruliweb\.com\/member\/mypage\/mycomment.*/) ) {
      ruliFunctions.commentsPageProc();
    }
  }

  // 실행 스크립트
  ruliFunctions.execute();
  window.addEventListener("load", ruliFunctions.onLoad);
})();