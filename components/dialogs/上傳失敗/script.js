const closeModal = document.querySelectorAll(".overlay-close");
  const target = document.querySelector(
    "#upload-fail-dialog-modal"
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
  //       "upload-fail-dialog-modal-template"
  //     ).content;
  //     const shadowRoot = this.attachShadow({ mode: "open" });
  //     shadowRoot.appendChild(template.cloneNode(true));
  //   }
  // }
  // customElements.define(
  //   "upload-fail-dialog-modal-element",
  //   reviewOpinionOverlayElement
  // );