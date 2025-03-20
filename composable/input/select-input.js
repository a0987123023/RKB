/**
 * 一般下拉選單組件
 */
class CustomDropdown {
  /**
   * 創建一個新的下拉選單
   * @param {Object} options - 配置選項
   * @param {string|HTMLElement} options.container - 容器選擇器或DOM元素
   * @param {Array} options.items - 下拉選項列表
   * @param {string} options.placeholder - 預設顯示文字
   * @param {Function} options.onChange - 選擇變更時的回調函數
   * @param {string} options.labelId - 關聯的標籤ID（可選）
   */
  constructor(options) {
    this.container = options.container;
    this.items = options.items || [];
    this.placeholder = options.placeholder || '請選擇';
    this.onChange = options.onChange || function() {};
    this.labelId = options.labelId || null;
    this.element = null;
    this.selected = null;
    this.itemsContainer = null;
    
    this.init();
  }
  
  /**
   * 初始化下拉選單
   */
  init() {
    // 創建下拉選單元素
    this.element = document.createElement('div');
    this.element.className = 'custom-select';
    
    // 創建選擇框
    this.selected = document.createElement('div');
    this.selected.className = 'select-selected';
    this.selected.textContent = this.placeholder;
    this.element.appendChild(this.selected);
    
    // 創建選項容器
    this.itemsContainer = document.createElement('div');
    this.itemsContainer.className = 'card_shadow select-items select-hide';
    
    // 添加選項
    this.items.forEach(item => {
      const option = document.createElement('div');
      option.className = 'select-item';
      option.textContent = item;
      this.itemsContainer.appendChild(option);
      
      // 點擊選項時的事件
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selected.textContent = item;
        this.itemsContainer.classList.add('select-hide');
        this.selected.classList.remove('select-arrow-active');
        
        // 移除之前的選中樣式
        this.itemsContainer.querySelectorAll('.select-item').forEach(el => {
          el.classList.remove('same-as-selected');
        });
        
        // 添加選中樣式
        option.classList.add('same-as-selected');
        
        // 調用回調函數
        if (typeof this.onChange === 'function') {
          this.onChange(item);
        }
      });
    });
    
    this.element.appendChild(this.itemsContainer);
    
    // 點擊選擇框時顯示/隱藏選項
    this.selected.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });
    
    // 將下拉選單添加到容器中
    let containerElement;
    if (typeof this.container === 'string') {
      containerElement = document.querySelector(this.container);
    } else if (this.container instanceof HTMLElement) {
      containerElement = this.container;
    }
    
    if (containerElement) {
      containerElement.appendChild(this.element);
    }
    
    // 如果提供了標籤ID，添加點擊事件
    if (this.labelId) {
      const label = document.getElementById(this.labelId);
      if (label) {
        label.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleDropdown();
        });
      }
    }
    
    // 點擊其他地方時關閉所有下拉選單
    document.addEventListener('click', this.closeAllSelect.bind(this));
  }
  
  /**
   * 切換下拉選單的顯示/隱藏
   */
  toggleDropdown() {
    this.closeAllSelect(this.selected);
    this.itemsContainer.classList.toggle('select-hide');
    this.selected.classList.toggle('select-arrow-active');
  }
  
  /**
   * 關閉所有下拉選單，除了指定的元素
   * @param {HTMLElement} elmnt - 不需要關閉的元素
   */
  closeAllSelect(elmnt) {
    const selectItems = document.querySelectorAll('.select-items');
    const selectSelected = document.querySelectorAll('.select-selected');
    
    selectItems.forEach((item, index) => {
      if (elmnt !== selectSelected[index]) {
        item.classList.add('select-hide');
        selectSelected[index].classList.remove('select-arrow-active');
      }
    });
  }
  
  /**
   * 獲取當前選中的值
   * @returns {string} 選中的值
   */
  getValue() {
    return this.selected.textContent === this.placeholder ? '' : this.selected.textContent;
  }
  
  /**
   * 設置下拉選單的值
   * @param {string} value - 要設置的值
   */
  setValue(value) {
    const items = this.element.querySelectorAll('.select-item');
    
    let found = false;
    items.forEach(item => {
      if (item.textContent === value) {
        this.selected.textContent = value;
        items.forEach(el => el.classList.remove('same-as-selected'));
        item.classList.add('same-as-selected');
        found = true;
        
        // 調用回調函數
        if (typeof this.onChange === 'function') {
          this.onChange(value);
        }
      }
    });
    
    // 如果沒有找到匹配的值，則設置為預設值
    if (!found) {
      this.selected.textContent = this.placeholder;
      items.forEach(el => el.classList.remove('same-as-selected'));
    }
  }
  
  /**
   * 重置下拉選單為預設值
   */
  reset() {
    this.selected.textContent = this.placeholder;
    const items = this.element.querySelectorAll('.select-item');
    items.forEach(el => el.classList.remove('same-as-selected'));
    
    // 調用回調函數
    if (typeof this.onChange === 'function') {
      this.onChange('');
    }
  }
  
  /**
   * 更新下拉選單的選項
   * @param {Array} items - 新的選項列表
   */
  updateItems(items) {
    this.items = items;
    
    // 清空現有選項
    this.itemsContainer.innerHTML = '';
    
    // 重置選擇框
    this.selected.textContent = this.placeholder;
    
    // 添加新選項
    this.items.forEach(item => {
      const option = document.createElement('div');
      option.className = 'select-item';
      option.textContent = item;
      this.itemsContainer.appendChild(option);
      
      // 點擊選項時的事件
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selected.textContent = item;
        this.itemsContainer.classList.add('select-hide');
        this.selected.classList.remove('select-arrow-active');
        
        // 移除之前的選中樣式
        this.itemsContainer.querySelectorAll('.select-item').forEach(el => {
          el.classList.remove('same-as-selected');
        });
        
        // 添加選中樣式
        option.classList.add('same-as-selected');
        
        // 調用回調函數
        if (typeof this.onChange === 'function') {
          this.onChange(item);
        }
      });
    });
  }
}