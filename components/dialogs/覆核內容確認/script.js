
const closeModal = document.querySelectorAll(".overlay-close");
  const target = document.querySelector(
    "#content-overlay"
  );
  // 點擊所有彈窗的取消和X按鈕
  closeModal.forEach((btn) => {
    btn.addEventListener("click", function () {
      target.classList.remove("open");
    });
  });

// 處理覆核內容確認彈窗的客製化下拉
document.addEventListener("DOMContentLoaded", function () {
  const selectTrigger = document.getElementById("selectTrigger");
  const selectOptions = document.getElementById("selectOptions");
  const hiddenSelect = document.querySelector('select[name="reason"]');
  let isSelectOpen = false;

  // 切換下拉選單
  selectTrigger.addEventListener("click", () => {
    isSelectOpen = !isSelectOpen;
    selectOptions.classList.toggle("show");
  });

  // 點擊選項
  selectOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("select-option")) {
      const value = e.target.dataset.value;
      const text = e.target.textContent;
      selectTrigger.querySelector("span").textContent = text;
      hiddenSelect.value = value;
      selectOptions.classList.remove("show");
      isSelectOpen = false;
    }
  });

  // 控制上方選擇“退回給原承辦”該隱藏還顯示
  const reviewer8 = document.getElementById("reviewer8");
  const selectSection = document.querySelector(".select-section");
  function toggleSelectSection() {
    if (reviewer8.checked) {
      selectSection.style.display = "block";
    } else {
      selectSection.style.display = "none";
    }
  }
  // 初始化狀態
  toggleSelectSection();
  // 監聽 radio 變更事件
  document.querySelectorAll(".reviewer-radio").forEach((radio) => {
    radio.addEventListener("change", toggleSelectSection);
  });
});

// class ContentOverlayElement extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" });
//     const template = document
//       .getElementById("content-overlay-template")
//       .content.cloneNode(true);
//     this.shadowRoot.appendChild(template);

//     // 綁定 DOM 元素
//     this.overlay = this.shadowRoot.querySelector("#content-overlay");
//     this.selectTrigger = this.shadowRoot.querySelector(".select-trigger");
//     this.selectOptions = this.shadowRoot.querySelector(".select-options");
//     this.hiddenSelect = this.shadowRoot.querySelector(
//       'select[name="reason"]'
//     );
//     this.reviewer8 = this.shadowRoot.querySelector("#reviewer8");
//     this.selectSection = this.shadowRoot.querySelector(".select-section");
//     this.closeButtons = this.shadowRoot.querySelectorAll(".overlay-close");
//     this.confirmButton = this.shadowRoot.querySelector(".button-confirm");

//     // 初始化狀態
//     this.toggleSelectSection();
//     this.bindEvents();
//   }

//   // 屬性控制顯示
//   static get observedAttributes() {
//     return ["open"];
//   }

//   attributeChangedCallback(name, oldValue, newValue) {
//     if (name === "open") {
//       this.overlay.classList.toggle("open", newValue === "true");
//     }
//   }

//   // 綁定事件
//   bindEvents() {
//     // 下拉選單
//     this.selectTrigger.addEventListener("click", () => {
//       this.selectOptions.classList.toggle("show");
//     });

//     this.selectOptions.addEventListener("click", (e) => {
//       const option = e.target.closest(".select-option");
//       if (option) {
//         const value = option.dataset.value;
//         const text = option.textContent;
//         this.selectTrigger.querySelector("span").textContent = text;
//         this.hiddenSelect.value = value;
//         this.selectOptions.classList.remove("show");
//       }
//     });

//     // Radio 切換
//     this.shadowRoot.querySelectorAll(".reviewer-radio").forEach((radio) => {
//       radio.addEventListener("change", () => this.toggleSelectSection());
//     });

//     // 關閉按鈕
//     this.closeButtons.forEach((btn) => {
//       btn.addEventListener("click", () => {
//         this.removeAttribute("open");
//         this.dispatchEvent(
//           new CustomEvent("close", { detail: { action: "cancel" } })
//         );
//       });
//     });

//     // 確認按鈕
//     this.confirmButton.addEventListener("click", () => {
//       const data = {
//         reviewer: this.reviewer8.checked ? "reject" : "pass",
//         reason: this.hiddenSelect.value,
//         comments: this.shadowRoot.querySelector(".review-comments").value,
//       };
//       this.dispatchEvent(new CustomEvent("confirm", { detail: data }));
//       this.removeAttribute("open");
//     });
//   }

//   // 切換退回原因顯示
//   toggleSelectSection() {
//     this.selectSection.style.display = this.reviewer8.checked
//       ? "block"
//       : "none";
//   }
// }

// customElements.define("content-overlay-element", ContentOverlayElement);