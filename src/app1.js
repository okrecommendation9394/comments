"use strict";
import * as mydata from "../data.json";
export {
  addComment,
  addReplies,
  changeScore,
  commentsContainer,
  comments,
  replyContainer,
  data,
  updates,
};
const data = JSON.parse(JSON.stringify(mydata)).default;
const comments = data.comments;
const commentsContainer = document.querySelector(".comments-container");
const replyContainer = document.querySelector(".reply-container");
const updates = [...document.querySelectorAll(".update")];
function addComment(arr) {
  arr.forEach((comment) => {
    const wrapperHtml = `<div class='box'>
   <div class="wrapper" id=${comment.id}>
  <div class="score">
    <img
      src="../images/icon-plus.svg"
      alt="plus"
      class="score score-plus"
    />
    <div class="number">${comment.score}</div>
    <img
      src="../images/icon-minus.svg"
      alt="minus"
      class="score score-minus"
    />
  </div>
  <div class="control">
    <a class="reply">
      <img
        src="../images/icon-reply.svg"
        alt="rep"
        class="reply-btn"
      />Reply
    </a>
  </div>
  <div class="user">
    <img
      src=${comment.user.image.webp}
      alt="user1"
      class='user-img'
    />
    <p class="user-name">${comment.user.username}</p>
    <p>1 month ago</p>
  </div>
  <p class="text">
    <span>${comment.content}</span
    >
  </p>
  </div>
  <div class='reply-wrapper'>
  
  <div class='comment-replies wrapper invisible'>
  </div>
  </div>
  </div>
  </div>
  </div>
  `;
    const replies = document.createElement("div");
    replies.classList.add("replies");
    commentsContainer.insertAdjacentHTML("beforeend", wrapperHtml);
    const wrappers = document.querySelectorAll(".wrapper");
    const box = document.querySelector(".box");
    const commentReplies = document.querySelector(".comment-replies");
  });
  const replyWrappers = document.querySelectorAll(".reply-wrapper");
  addReplies(replyWrappers[1], comments[1].replies);
  const answerTo =
    document.querySelector(".reply-wrapper").previousElementSibling.id;
  const repliesTo = document.querySelectorAll(".replyTo");

  repliesTo.forEach((replyTo) => {
    replyTo.innerText = `@${data.comments[+answerTo].user.username}`;
  });
}
function addReplies(parent, arr) {
  arr.forEach((reply) => {
    const commentReplies = document.createElement("div");
    commentReplies.innerHTML = `
    <div class='comment-replies wrapper' id=${reply?.id}>
    <div class="score">
    <img
      src="../images/icon-plus.svg"
      alt="plus"
      class="score score-plus"
    />
    <div class="number">${reply?.score}</div>
    <img
      src="../images/icon-minus.svg"
      alt="minus"
      class="score score-minus"
    />
  </div>
  <div class="control">
    <a class="reply">
      <img
        src="../images/icon-reply.svg"
        alt="rep"
        class="reply-btn"
      />Reply
    </a>
    <a class="delete">
    <img
      src="../images/icon-delete.svg"
      alt="delete"
      class="delete-btn"
    />Delete
  </a>
  <a class='edit'>
  <img 
  src='../images/icon-edit.svg'
  alt="edit"
  class="edit-btn"/>Edit
  </a>
  </div>
  <div class="user">
    <img
      src=${reply?.user.image.webp}
      alt="user1"
      class='user-img'
    />
    <p class="user-name">${reply?.user.username}</p>
    <div class='you'>You</div>
    <p>${reply?.createdAt}</p>
  </div>
  <p class="text">
    <span><span class='replyTo'></span> ${reply?.content}</span
    >
  </p>
  <button type='button' class='update'>Update</button>
  </div>
    `;
    const replyToUser = commentReplies.querySelector(".reply");
    const del = commentReplies.querySelector(".delete");
    const edt = commentReplies.querySelector(".edit");
    const you = commentReplies.querySelector(".you");
    const update = commentReplies.querySelector(".update");
    if (reply?.user.username === "juliusomo") {
      replyToUser.classList.add("invisible");
      updates.push(update);
      update.style.display = "none";
    } else {
      del.classList.add("invisible");
      edt.classList.add("invisible");
      you.classList.add("invisible");
      update.classList.add("invisible");
    }
    parent.insertAdjacentHTML("beforeend", commentReplies.innerHTML);
  });
}
function changeScore() {
  const min2s = [...document.querySelectorAll(".score-minus")];
  const plus2s = [...document.querySelectorAll(".score-plus")];
  min2s.forEach((min2) => {
    min2.addEventListener("click", (e) => {
      e.currentTarget.previousElementSibling.innerText = String(
        Number(e.currentTarget.previousElementSibling.innerText) - 1
      );
    });
  });
  plus2s.forEach((plus2) => {
    plus2.addEventListener("click", (e) => {
      e.currentTarget.nextElementSibling.innerText = String(
        Number(e.currentTarget.nextElementSibling.innerText) + 1
      );
    });
  });
}
