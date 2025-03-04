
const closeModal = document.querySelectorAll(".overlay-close");
  const target = document.querySelector(
    "#upload-regulations-modal"
  );
  // 點擊所有彈窗的取消和X按鈕
  closeModal.forEach((btn) => {
    btn.addEventListener("click", function () {
      target.classList.remove("open");
    });
  });

// 處理覆核內容確認彈窗的客製化下拉
document.addEventListener("DOMContentLoaded", function () {
  // 控制上方選擇“更新既有法規”該隱藏還顯示
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
