const closeModal = document.querySelectorAll(".overlay-close");
  const target = document.querySelector(
    "#dialog-modal"
  );
  // 點擊所有彈窗的取消和X按鈕
  closeModal.forEach((btn) => {
    btn.addEventListener("click", function () {
      target.classList.remove("open");
    });
  });
  // class reviewOpinionOverlayElement extends HTMLElement {
  //   constructor() {
  //     super();
  //     const template = document.getElementById(
  //       "dialog-modal-template"
  //     ).content;
  //     const shadowRoot = this.attachShadow({ mode: "open" });
  //     shadowRoot.appendChild(template.cloneNode(true));
  //   }
  // }
  // customElements.define(
  //   "dialog-modal-element",
  //   reviewOpinionOverlayElement
  // );