/**
 * 條號下拉組件
 */
class ArticleNavigationSelector {
  /**
   * 建立一個新的條號選擇器實例
   * @param {Object} options - 配置選項
   * @param {string} options.container - 容器選擇器或元素
   * @param {Array} options.sections - 章節數據
   * @param {Array} options.statusOptions - 狀態選項
   * @param {string} options.initialStatus - 初始狀態 ('old', 'new', 'unlinked')
   * @param {string} options.initialChapter - 初始章節文本
   * @param {string} options.initialArticle - 初始條號文本
   * @param {Function} options.onSelect - 選擇條號時的回調函數
   * @param {Function} options.onStatusChange - 狀態變更時的回調函數
   */
  constructor(options) {
    this.instanceId = 'article-nav-' + Math.random().toString(36).substr(2, 9);
    this.options = Object.assign({
      container: null,
      sections: [],
      statusOptions: [
        { id: 'old', text: '舊條文', selected: false },
        { id: 'new', text: '新增', selected: false },
        { id: 'unlinked', text: '未關聯', selected: true }
      ],
      initialStatus: 'unlinked',
      initialChapter: '第 - 章',
      initialArticle: '第 - 條',
      onSelect: null,
      onStatusChange: null
    }, options);

    this.container = typeof this.options.container === 'string' 
      ? document.querySelector(this.options.container) 
      : this.options.container;

    if (!this.container) {
      throw new Error('必須提供有效的容器元素');
    }

    this.container.articleNavInstance = this;
    this.isOpen = false;
    this.currentStatus = this.options.initialStatus;
    this.selectedArticle = { chapter: this.options.initialChapter, article: this.options.initialArticle };

    this.options.statusOptions.forEach(option => {
      option.selected = option.id === this.currentStatus;
    });

    this.render();
    this.bindEvents();
  }

  /**
   * 渲染元件
   */
  render() {
    // 根據初始狀態確定頭部類別名
    let headerClass = 'not-link';
    let tagText = '未關聯';
    
    switch (this.currentStatus) {
      case 'old':
        headerClass = 'old-tag';
        tagText = '舊條文';
        break;
      case 'new':
        headerClass = 'create';
        tagText = '新增';
        break;
      case 'unlinked':
        headerClass = 'not-link';
        tagText = '未關聯';
        break;
    }

    // 建立基本結構，新增實例ID作為資料屬性
    this.container.innerHTML = `
      <div class="article-navigation selector-container" data-instance-id="${this.instanceId}">
        <div class="regulation-header ${headerClass}">
          <div class="tag">${tagText}</div>
          <div class="article-nav">
            <span class="chapter">${this.options.initialChapter}</span>
            <span class="article">${this.options.initialArticle}</span>
            <span class="arrow-outer">
              <img class="arrow" src="./assets/icons/icon_arrow_down.svg" alt="" />
            </span>
          </div>
        </div>

        <div class="article-navigation-select" style="display: none;">
          <div class="sidebar">
            <h2 class="sidebar-title">條號狀態</h2>
            ${this.renderStatusOptions()}
          </div>
          <div class="data-content">
            ${this.renderSections()}
          </div>
        </div>
      </div>
    `;

    // 取得重要元素的引用
    this.navigationEl = this.container.querySelector('.article-navigation');
    this.headerEl = this.container.querySelector('.regulation-header');
    this.tagEl = this.container.querySelector('.tag');
    this.chapterEl = this.container.querySelector('.chapter');
    this.articleEl = this.container.querySelector('.article');
    this.dropdownEl = this.container.querySelector('.article-navigation-select');
  }

  /**
   * 渲染狀態選項
   * @returns {string} 狀態選項的HTML
   */
  renderStatusOptions() {
    return this.options.statusOptions.map(option => `
      <div class="status-item ${option.selected ? 'selected' : ''}" data-status="${option.id}">
        <div class="status-circle ${option.selected ? 'selected' : ''}"></div>
        <span class="status-text">${option.text}</span>
        ${option.selected ? '<span class="arrow"><img src="./assets/icons/icon_arrow_right2.svg" alt=""></span>' : ''}
      </div>
    `).join('');
  }

  /**
   * 渲染章節和條號
   * @returns {string} 章節和條號的HTML
   */
  renderSections() {
    if (!this.options.sections || this.options.sections.length === 0) {
      return `
        <div class="confirm-content">
          <img src="./assets/icons/illustration_search.svg" alt="">
          <p>待確認條號</p>
        </div>
      `;
    }

    return this.options.sections.map(section => `
      <div class="article-navigation-section-header">
        <h2 class="section-title">${section.title}</h2>
      </div>
      ${section.articles.map(article => `
        <div class="article-item" data-article="${article.id}" data-chapter="${section.id}">
          <h3 class="article-title">${article.title}</h3>
        </div>
      `).join('')}
    `).join('');
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    // 使用實例方法的綁定版本，確保this指向正確
    this._handleHeaderClick = this._handleHeaderClick.bind(this);
    this._handleStatusClick = this._handleStatusClick.bind(this);
    this._handleArticleClick = this._handleArticleClick.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    
    // 點選頭部開啟/關閉下拉框
    this.headerEl.addEventListener('click', this._handleHeaderClick);

    // 點選狀態選項
    this.container.querySelectorAll('.status-item').forEach(item => {
      item.addEventListener('click', this._handleStatusClick);
    });

    // 點擊條號項
    this.container.querySelectorAll('.article-item').forEach(item => {
      item.addEventListener('click', this._handleArticleClick);
    });

    // 點擊外部關閉下拉框 - 使用捕獲階段以確保先於其他點擊處理
    document.addEventListener('click', this._handleDocumentClick, true);
  }
  
  /**
   * 處理頭部點擊事件
   */
  _handleHeaderClick(e) {
    e.stopPropagation();
    this.toggleDropdown();
  }
  
  /**
   * 處理狀態選項點擊事件
   */
  _handleStatusClick(e) {
    e.stopPropagation();
    const statusId = e.currentTarget.dataset.status;
    this.selectStatus(statusId);
  }
  
  /**
   * 處理條號項點擊事件
   */

  _handleArticleClick(e) {
    e.stopPropagation();
    const item = e.currentTarget;
    this.selectedArticle = {
      articleId: item.dataset.article,
      chapterId: item.dataset.chapter,
      articleText: item.querySelector('.article-title').textContent
    };
    // 關閉下拉框
    this.closeDropdown();
    console.log('所屬容器 ID:', this.container.id);
    console.log('選取的條號:', this.selectedArticle);
  }
  
  /**
   * 處理文件點選事件，用於關閉下拉框
   */
  _handleDocumentClick(e) {
    // 只有當下拉框開啟且點擊不在目前導航元素內時才關閉
    if (this.isOpen && !this.navigationEl.contains(e.target)) {
      this.closeDropdown();
    }
  }

  /**
   * 切換下拉方塊的顯示狀態
   */
  toggleDropdown() {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      // 關閉所有其他實例的下拉框
      document.querySelectorAll('.article-navigation-select').forEach(container => {
        if (container !== this.dropdownEl && container.style.display === 'flex') {
          // 找到對應的實例並關閉
          const navEl = container.closest('.article-navigation');
          if (navEl) {
            const instanceId = navEl.dataset.instanceId;
            if (instanceId && instanceId !== this.instanceId) {
              const containerEl = navEl.closest('[id^="selector-container-"]');
              if (containerEl && containerEl.articleNavInstance) {
                containerEl.articleNavInstance.closeDropdown();
              }
            }
          }
        }
      });
      
      this.openDropdown();
    }
  }

  /**
   * 開啟下拉框
   */
  openDropdown() {
    this.dropdownEl.style.display = 'flex';
    this.isOpen = true;
  }

  /**
   * 關閉下拉框
   */
  closeDropdown() {
    this.dropdownEl.style.display = 'none';
    this.isOpen = false;
  }

  /**
   * 選擇狀態
   * @param {string} statusId - 狀態ID
   */
  selectStatus(statusId) {
    // 更新狀態
    this.currentStatus = statusId;
    
    // 更新UI
    this.container.querySelectorAll('.status-item').forEach(item => {
      const isSelected = item.dataset.status === statusId;
      item.classList.toggle('selected', isSelected);
      
      const circle = item.querySelector('.status-circle');
      if (circle) {
        circle.classList.toggle('selected', isSelected);
      }
      
      // 更新箭頭
      let arrow = item.querySelector('.arrow');
      if (isSelected && !arrow) {
        item.innerHTML += '<span class="arrow"><img src="./assets/icons/icon_arrow_right2.svg" alt=""></span>';
      } else if (!isSelected && arrow) {
        arrow.remove();
      }
    });
    
    // 調用回調
    if (typeof this.options.onStatusChange === 'function') {
      const selectedOption = this.options.statusOptions.find(opt => opt.id === statusId);
      this.options.onStatusChange.call(this, statusId, selectedOption?.text);
    }
  }

  /**
   * 選擇條號
   * @param {string} articleId - 條號ID
   * @param {string} chapterId - 章節ID
   * @param {string} articleText - 條號文字
   */
  selectArticle(articleId, chapterId, articleText) {
    
    // 關閉下拉框
    this.closeDropdown();
    
    // 調用回調
    if (typeof this.options.onSelect === 'function') {
      this.options.onSelect.call(this, {
        articleId,
        chapterId,
        articleText,
        status: this.currentStatus,
        instanceId: this.instanceId
      });
    }
  }


  /**
   * 設定章節數據
   * @param {Array} sections - 章節數據
   */
  setSections(sections) {
    this.options.sections = sections;
    const dataContent = this.container.querySelector('.data-content');
    if (dataContent) {
      dataContent.innerHTML = this.renderSections();
      // 重新綁定條號項目點擊事件
      this.container.querySelectorAll('.article-item').forEach(item => {
        item.addEventListener('click', this._handleArticleClick);
      });
    }
  }

  /**
   * 設定狀態選項
   * @param {Array} statusOptions - 狀態選項
   */
  setStatusOptions(statusOptions) {
    this.options.statusOptions = statusOptions;
    const sidebar = this.container.querySelector('.sidebar');
    if (sidebar) {
      sidebar.innerHTML = `<h2 class="sidebar-title">條號狀態</h2>${this.renderStatusOptions()}`;
      // 重新綁定狀態選項點擊事件
      this.container.querySelectorAll('.status-item').forEach(item => {
        item.addEventListener('click', this._handleStatusClick);
      });
    }
  }

  /**
   * 取得目前選擇的數據
   * @returns {Object} 目前選擇的數據
   */
  getSelection() {
    return {
      chapter: this.chapterEl.textContent,
      article: this.articleEl.textContent,
      status: this.currentStatus,
      instanceId: this.instanceId
    };
  }

  /**
   * 重置组件
   */
  reset() {
    this.chapterEl.textContent = '第 - 章';
    this.articleEl.textContent = '第 - 條';
    this.headerEl.classList.remove('old-tag', 'create');
    this.headerEl.classList.add('not-link');
    this.tagEl.textContent = '未關聯';
    this.closeDropdown();
  }
  
  /**
   * 銷毀組件，移除事件監聽器
   */
  destroy() {
    // 移除事件監聽器
    this.headerEl.removeEventListener('click', this._handleHeaderClick);
    
    this.container.querySelectorAll('.status-item').forEach(item => {
      item.removeEventListener('click', this._handleStatusClick);
    });
    
    this.container.querySelectorAll('.article-item').forEach(item => {
      item.removeEventListener('click', this._handleArticleClick);
    });
    
    document.removeEventListener('click', this._handleDocumentClick, true);
    
    // 清除容器引用
    delete this.container.articleNavInstance;
  }
}