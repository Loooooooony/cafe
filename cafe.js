function renderSharedItems() {
  sharedItemsContainer.innerHTML = '';
  if (state.sharedItems.length === 0) {
    sharedItemsContainer.innerHTML = '<span class="shared-empty-hint">طاولة التجهيز فارغة. جهزي صنفاً وضعيها هنا! 🍰</span>';
    return;
  }

  state.sharedItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.style.cssText = 'display:flex; flex-direction:column; align-items:center; background:var(--gold-light); border:1.5px solid #ffde8a; border-radius:12px; padding:6px 8px; gap:4px; margin-left:6px; min-width:110px;';
    
    card.innerHTML = `
      <div style="font-size:12px; font-weight:800; color:#7a4f00; display:flex; align-items:center; gap:4px; white-space:nowrap;">
        <span>${item.icon}</span> <span>${item.name}</span>
      </div>
      <div style="font-size:9.5px; color:#a87400; font-weight:700;">(${item.makerName})</div>
      <div style="display:flex; gap:4px; width:100%; margin-top:2px;">
        <button class="quick-serve-btn" style="background:var(--pink-main); color:#fff; border:none; border-radius:10px; padding:4px 6px; font-size:11px; font-weight:800; cursor:pointer; flex:1; box-shadow:0 2px 6px rgba(255,117,151,0.3); transition:all 0.2s;">
          🛎️ تقديم
        </button>
        <button class="trash-item-btn" title="رمي في السلة" style="background:#ff4757; color:#fff; border:none; border-radius:10px; padding:4px 8px; font-size:11px; font-weight:800; cursor:pointer; box-shadow:0 2px 6px rgba(255,71,87,0.3); transition:all 0.2s;">
          🗑️
        </button>
      </div>
    `;
    
    // زر التقديم الفوري للزبون
    const serveBtn = card.querySelector('.quick-serve-btn');
    serveBtn.addEventListener('click', () => {
      directServeSharedItem(item);
    });

    // زر الحذف والرمي في المهملات
    const trashBtn = card.querySelector('.trash-item-btn');
    trashBtn.addEventListener('click', () => {
      discardSharedItem(item.id);
    });

    sharedItemsContainer.appendChild(card);
  });
}

// دالة إتلاف/رمي الطلب الزائد
function discardSharedItem(itemId) {
  audio.playPop();
  const idx = state.sharedItems.findIndex(i => i.id === itemId);
  if (idx !== -1) {
    const removed = state.sharedItems.splice(idx, 1)[0];
    showToast(`تم رمي (${removed.name}) في السلة! 🗑️`);
    renderSharedItems();
    
    // مزامنة حذف الصنف مع بقية الصديقات
    net.send({
      type: 'DISCARD_SHARED_ITEM',
      itemId: itemId
    });

    if (state.isHost) broadcastState();
  }
}
