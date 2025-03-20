/**
 * 關鍵字搜尋下拉組件
 */
class KeywordSearch {
  /**
   * 初始化關鍵字搜尋下拉組件
   * @param {Object} options - 配置選項
   * @param {string|HTMLElement} options.container - 組件容器元素或選擇器
   * @param {string} options.inputSelector - 輸入框的選擇器（相對於容器）
   * @param {string} options.suggestionsSelector - 下拉容器的選擇器（相對於容器）
   * @param {Array<string>} options.dataSource - 數據源，包含所有可能的建議項
   * @param {Function} options.onSelect - 選擇項目時的回調函數
   */
  constructor(options) {
    // 必要參數檢查
    if (!options.container) {
      throw new Error('必須提供容器元素或選擇器');
    }
    
    if (!options.inputSelector) {
      throw new Error('必須提供輸入框選擇器');
    }
    
    // 設置默認值
    this.options = Object.assign({
      dataSource: [],
      onSelect: () => {},
    }, options);
    
    // 獲取容器元素
    this.container = typeof options.container === 'string' 
      ? document.querySelector(options.container) 
      : options.container;
      
    if (!this.container) {
      throw new Error(`找不到容器元素: ${options.container}`);
    }
    
    // 獲取輸入框元素（在容器內查找）
    this.inputElement = this.container.querySelector(options.inputSelector);
    if (!this.inputElement) {
      throw new Error(`在容器內找不到輸入框元素: ${options.inputSelector}`);
    }
    
    // 初始化下拉容器
    this.initSuggestionsContainer();
    
    
    // 初始化狀態
    this.selectedIndex = -1;
    
    // 綁定事件
    this.bindEvents();
  }
  
  /**
   * 初始化下拉建議容器
   */
  initSuggestionsContainer() {
    if (this.options.suggestionsSelector) {
      // 先在容器內查找
      this.suggestionsContainer = this.container.querySelector(this.options.suggestionsSelector);
      
      // 如果找不到，則創建一個
      if (!this.suggestionsContainer) {
        this.createSuggestionsContainer();
      }
    } else {
      this.createSuggestionsContainer();
    }
  }
  
  /**
   * 創建下拉建議容器
   */
  createSuggestionsContainer() {
    // 創建容器元素
    this.suggestionsContainer = document.createElement('div');
    this.suggestionsContainer.className = 'suggestions-container';
    
    // 將容器添加到輸入框的父元素
    const inputParent = this.inputElement.parentElement;
    if (!inputParent.style.position || inputParent.style.position === 'static') {
      inputParent.style.position = 'relative';
    }
    inputParent.appendChild(this.suggestionsContainer);
  }
  
  /**
   * 綁定事件
   */
  bindEvents() {
    // 輸入事件
    this.inputElement.addEventListener('input', () => this.handleInput());
    
    // 鍵盤事件
    this.inputElement.addEventListener('keydown', (e) => this.handleKeyDown(e));
    
    // 點擊其他地方時隱藏建議
    document.addEventListener('click', (e) => {
      if (e.target !== this.inputElement && !this.suggestionsContainer.contains(e.target)) {
        this.hideSuggestions();
      }
    });
  }
  
  /**
   * 處理輸入事件
   */
  handleInput() {
    const keyword = this.inputElement.value.trim();
    
    // 重置選擇的索引
    this.selectedIndex = -1;
    
    if (keyword.length > 0) {
      // 過濾符合的選項
      const filteredItems = this.options.dataSource.filter(item => 
        item.toLowerCase().includes(keyword.toLowerCase())
      );
      
      // 顯示符合的選項
      this.displaySuggestions(filteredItems, keyword);
    } else {
      // 如果沒有輸入，隱藏建議
      this.hideSuggestions();
    }
  }
  
  /**
   * 處理鍵盤事件
   */
  handleKeyDown(e) {
    const suggestionItems = this.suggestionsContainer.querySelectorAll('.suggestion-item');
    
    if (suggestionItems.length === 0) return;
    
    // 向下鍵
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % suggestionItems.length;
      this.updateSelection(suggestionItems);
    }
    
    // 向上鍵
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + suggestionItems.length) % suggestionItems.length;
      this.updateSelection(suggestionItems);
    }
    
    // Enter鍵
    else if (e.key === 'Enter' && this.selectedIndex >= 0) {
      e.preventDefault();
      const selectedText = suggestionItems[this.selectedIndex].textContent;
      this.selectItem(selectedText);
    }
    
    // Escape鍵
    else if (e.key === 'Escape') {
      this.hideSuggestions();
    }
  }
  
  /**
   * 顯示建議選項
   */
  displaySuggestions(items, keyword) {
    this.suggestionsContainer.innerHTML = '';
    
    if (items.length === 0) {
      this.hideSuggestions();
      return;
    }
    
    items.forEach(item => {
      const suggestionItem = document.createElement('div');
      suggestionItem.className = 'suggestion-item';
      
      // 高亮顯示關鍵字
      const regex = new RegExp(`(${keyword})`, 'gi');
      const highlightedText = item.replace(regex, '<span class="highlight">$1</span>');
      suggestionItem.innerHTML = highlightedText;
      
      // 點擊選項時
      suggestionItem.addEventListener('click', () => this.selectItem(item));
      
      this.suggestionsContainer.appendChild(suggestionItem);
    });
    
    this.suggestionsContainer.style.display = 'block';
  }
  
  /**
   * 更新選擇的項目
   */
  updateSelection(items) {
    items.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.classList.add('selected');
        // 確保選中項目在視野內
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }
  
  /**
   * 選擇項目
   */
  selectItem(text) {
    this.inputElement.value = text;
    this.hideSuggestions();

    // 調用選擇回調
    this.options.onSelect(text);
  }
  
  /**
   * 隱藏建議
   */
  hideSuggestions() {
    this.suggestionsContainer.style.display = 'none';
    this.suggestionsContainer.innerHTML = '';
  }

}

// 如果在全局範圍使用
if (typeof window !== 'undefined') {
  window.KeywordSearch = KeywordSearch;
}