// ==UserScript==
// @name         Ruliweb Enhancer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  근근웹++
// @author       hdd1013
// @match        *ruliweb.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...
  var ruliFunctions = window.ruliFunctions = {};
  var $commentTable = $("#mycomment").find(".text_over_table");
  var delBtnHtml = "<div class=\"btn_light btn_delete\" style=\"\" onclick=\"ruliFunctions.delAllComments();\">전체 삭제</div>";
  $commentTable.append(delBtnHtml);

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
})();