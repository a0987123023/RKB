const closeModal = document.querySelectorAll(".overlay-close");
  const target = document.querySelector(
    "#regulatory-history"
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
  //       "regulatory-history-template"
  //     ).content;
  //     const shadowRoot = this.attachShadow({ mode: "open" });
  //     shadowRoot.appendChild(template.cloneNode(true));
  //   }
  // }
  // customElements.define(
  //   "regulatory-history-element",
  //   reviewOpinionOverlayElement
  // );