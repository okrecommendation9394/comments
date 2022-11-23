"use strict";
import * as mydata from "../data.json";
import "../src/reset.css";
import "../src/index.css";
import {
  addComment,
  changeScore,
  commentsContainer,
  comments,
  replyContainer,
  data,
  addReplies,
  updates,
} from "./app1.js";
addComment(data.comments);
changeScore();
const replies = document.createElement("div");
replies.classList.add("replies");
commentsContainer.appendChild(replies);
const replyBtns = document.querySelectorAll(".reply");
const replyContainerClone = replyContainer.cloneNode(true);
replyContainerClone.classList.add("invisible");
replyContainerClone.classList.add("replyClone");
const sendClone = replyContainerClone.children[2];
replyBtns.forEach((replyBtn) => {
  replyBtn.addEventListener("click", () => {
    replyContainerClone.classList.remove("invisible");
    replyBtn.parentElement.parentElement.insertAdjacentElement(
      "afterend",
      replyContainerClone
    );
  });
});
//writing comment
const sendBtns = [...document.querySelectorAll(".button-send")];
sendBtns.push(sendClone);
const editBtns = [...document.querySelectorAll(".edit")];
const deleteBtns = [...document.querySelectorAll(".delete")];
sendBtns.forEach((sendBtn) => {
  sendBtn.addEventListener("click", (e) => {
    let initialScore = 0;
    const reply = document.createElement("div");
    reply.classList.add(`myReply`);
    reply.innerHTML = `
<div class="score">
  <img
    src="./images/icon-plus.svg"
    alt="plus"
    class="score score-plus"
  />
  <div class="number">0</div>
  <img
    src="./images/icon-minus.svg"
    alt="minus"
    class="score score-minus"
  />
</div>
<div class="control">
  <a class="delete">
    <img
      src="./images/icon-delete.svg"
      alt="delete"
      class="delete-btn"
    />Delete
  </a>
  <a class='edit'>
  <img
  src='./images/icon-edit.svg'
  alt="edit"
  class="edit-btn"/>Edit
  </a>
</div>
<div class="user">
  <img
    src=${data.currentUser.image.webp}
    alt="user1"
    class='user-img'
  />
  <p class="user-name">${data.currentUser.username}</p>
  <div class='you'>You</div>
  <p>${"Just now"}</p>
</div>
<p class="text" id="replyText">
  <span class="text-wrapper">${e.target.previousElementSibling.value}</span>
</p>
<button type='button' class='update newComment'>Update</button>
</div>
`;
    updates.push(reply.querySelector(".update"));
    reply.querySelector(".update").style.display = "none";
    const min = reply.querySelector(".score-minus");
    const plus = reply.querySelector(".score-plus");
    const number = reply.querySelector(".number");
    min.addEventListener("click", () => {
      number.innerText = String(Number(number.innerText) - 1);
    });
    plus.addEventListener("click", () => {
      number.innerText = String(Number(number.innerText) + 1);
    });
    if (
      e.target.parentElement.previousElementSibling.classList.contains(
        "comment-replies"
      )
    ) {
      e.target.parentElement.previousElementSibling.parentElement.appendChild(
        reply
      );
      e.target.parentElement.remove();
    } else if (e.target.parentElement.classList.contains("replyClone")) {
      e.target.parentElement.parentElement.children[2].appendChild(reply);
      e.target.parentElement.remove();
    } else {
      commentsContainer.appendChild(reply);
    }
    e.target.previousElementSibling.value = "";
    e.target.previousElementSibling.placeholder = "Add new comment...";
    const deleteComment = reply.querySelector(".delete");
    const edit = reply.querySelector(".edit");
    editBtns.push(edit);
    deleteBtns.push(deleteComment);
    const textWrapper = document.querySelector(".text-wrapper");
  });
});

process();
deleteProcess();
function process() {
  let editable = false;
  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const replyText = editBtn.parentElement.parentElement.children[3];
      editable = true;
      replyText.style.backgroundColor = "hsl(228, 33%, 97%)";
      const localUpdate =
        e.currentTarget.parentElement.parentElement.children[4];
      localUpdate.style.display = "block";
      localUpdate.onclick = function (e) {
        e.stopPropagation();
        editable = false;
        replyText.contentEditable = editable;
        replyText.style.backgroundColor = "hsl(0, 0%, 100%)";
        localUpdate.style.display = "none";
      };
      replyText.contentEditable = editable;
    });
  });
}
function deleteProcess() {
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      deleteBtn.parentElement.parentElement.remove();
    });
  });
}
editBtns.push = function () {
  Array.prototype.push.apply(this, arguments);
  process();
};
deleteBtns.push = function () {
  Array.prototype.push.apply(this, arguments);
  deleteProcess();
};
