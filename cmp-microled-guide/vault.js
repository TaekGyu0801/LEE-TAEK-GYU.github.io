(() => {
  const repo = 'TaekGyu0801/LEE-TAEK-GYU.github.io';
  const repoBase = `https://github.com/${repo}`;
  const apiBase = `https://api.github.com/repos/${repo}/contents`;
  const vaultRoot = 'cmp-microled-guide/tcad-vault';

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = `vault.css?v=20260825-vault1`;
  document.head.appendChild(css);

  const folderUrl = path => `${repoBase}/tree/main/${path}`;
  const uploadUrl = path => `${repoBase}/upload/main/${path}`;

  function makeSidebar(){
    if (document.getElementById('tcadVaultSidebar')) return;
    const aside = document.createElement('aside');
    aside.id = 'tcadVaultSidebar';
    aside.className = 'vault-sidebar';
    aside.innerHTML = `
      <div class="vault-side-head">
        <div><span class="vault-kicker">TCAD BACKUP</span><h3>Research Vault</h3></div>
        <button class="vault-collapse" id="vaultCollapseBtn" type="button" aria-label="저장소 접기">×</button>
      </div>
      <div class="vault-expiry"><b>계정 교체 대비</b><span>현재 TCAD 계정 자료를 이번 달 안에 백업</span></div>
      <p class="vault-side-copy">결과 제출과 별개로, 재실행에 필요한 코드·설정·로그·그래프를 자유롭게 보관합니다.</p>
      <div class="vault-quick-grid">
        <button class="vault-quick primary" data-vault="_inbox">＋ 빠른 백업</button>
        <button class="vault-quick" data-vault="_shared">공용 자료</button>
        <button class="vault-quick" data-vault="_current-account">계정 백업</button>
        <a class="vault-quick" href="${folderUrl(vaultRoot)}" target="_blank" rel="noopener">전체 보기 ↗</a>
      </div>
      <div class="vault-checklist">
        <b>우선 저장할 것</b>
        <span>① 내가 작성/수정한 .cmd · .par · scripts</span>
        <span>② 프로젝트 폴더 · 로그 · CSV · 그래프</span>
        <span>③ 버전/환경 설정 메모</span>
        <span>④ 재실행에 필요한 경로·실행순서</span>
      </div>
      <div class="vault-public-warning"><b>주의</b> 이 저장소는 공개 상태입니다. 라이선스 파일, 비밀번호, 서버 내부정보, 배포권한 없는 Synopsys 매뉴얼/원본 라이브러리는 업로드하지 마세요.</div>
    `;
    document.body.appendChild(aside);

    const reopen = document.createElement('button');
    reopen.id = 'vaultReopenBtn';
    reopen.className = 'vault-reopen';
    reopen.type = 'button';
    reopen.textContent = '📦 TCAD 저장소';
    document.body.appendChild(reopen);

    aside.querySelectorAll('[data-vault]').forEach(btn => btn.addEventListener('click', () => openVault(btn.dataset.vault)));
    document.getElementById('vaultCollapseBtn')?.addEventListener('click', () => {
      aside.classList.add('collapsed');
      reopen.classList.add('show');
    });
    reopen.addEventListener('click', () => {
      aside.classList.remove('collapsed');
      reopen.classList.remove('show');
    });
  }

  function makeModal(){
    if (document.getElementById('vaultModal')) return;
    const modal = document.createElement('div');
    modal.id = 'vaultModal';
    modal.className = 'vault-modal';
    modal.innerHTML = `
      <div class="vault-modal-card" role="dialog" aria-modal="true" aria-labelledby="vaultModalTitle">
        <div class="vault-modal-head">
          <div><span class="vault-kicker">TCAD BACKUP VAULT</span><h3 id="vaultModalTitle">저장소</h3></div>
          <button class="vault-modal-close" type="button">×</button>
        </div>
        <p id="vaultModalDesc" class="vault-modal-desc"></p>
        <div class="vault-modal-actions">
          <a id="vaultUploadLink" class="btn primary" target="_blank" rel="noopener">파일 업로드 ↗</a>
          <a id="vaultFolderLink" class="btn" target="_blank" rel="noopener">GitHub 폴더 보기 ↗</a>
          <button id="vaultRefreshBtn" class="btn" type="button">목록 새로고침</button>
        </div>
        <div id="vaultFileList" class="vault-file-list"><div class="vault-loading">파일 목록 불러오는 중…</div></div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.vault-modal-close').addEventListener('click', closeVault);
    modal.addEventListener('click', e => { if (e.target === modal) closeVault(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVault(); });
  }

  function labelFor(key){
    if (/^P\d$/.test(key)) return `${key} 백업 저장소`;
    if (key === '_inbox') return '빠른 임시 보관함';
    if (key === '_shared') return '공용 자료 저장소';
    if (key === '_current-account') return '현재 계정 백업';
    return key;
  }

  function descFor(key){
    if (/^P\d$/.test(key)) return `${key} 작업 중 생성한 코드, 설정, 로그, 데이터, 이미지 등을 Gate 판정과 무관하게 보존하는 공간입니다.`;
    if (key === '_inbox') return '분류할 시간이 없을 때 우선 넣어두는 공간입니다. 나중에 P0~P9 또는 공용 자료로 정리하면 됩니다.';
    if (key === '_shared') return '여러 Phase에서 같이 쓰는 사용자 작성 스크립트, 템플릿, 환경 메모를 보관합니다.';
    if (key === '_current-account') return '계정이 바뀌기 전에 현재 환경에서 재실행에 필요한 사용자 작성 자료와 설정 메모를 모읍니다.';
    return '';
  }

  let currentKey = 'P0';
  function openVault(key){
    makeModal();
    currentKey = key;
    const path = `${vaultRoot}/${key}`;
    document.getElementById('vaultModalTitle').textContent = labelFor(key);
    document.getElementById('vaultModalDesc').textContent = descFor(key);
    document.getElementById('vaultUploadLink').href = uploadUrl(path);
    document.getElementById('vaultFolderLink').href = folderUrl(path);
    document.getElementById('vaultModal').classList.add('open');
    document.body.classList.add('vault-modal-open');
    loadFiles(key);
  }

  function closeVault(){
    document.getElementById('vaultModal')?.classList.remove('open');
    document.body.classList.remove('vault-modal-open');
  }

  async function loadFiles(key){
    const list = document.getElementById('vaultFileList');
    if (!list) return;
    list.innerHTML = '<div class="vault-loading">파일 목록 불러오는 중…</div>';
    try {
      const path = `${vaultRoot}/${key}`;
      const res = await fetch(`${apiBase}/${path}?ref=main&t=${Date.now()}`, {cache:'no-store'});
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items = (Array.isArray(data) ? data : [data]).filter(x => x.name !== 'README.md' && x.name !== '.gitkeep');
      if (!items.length){
        list.innerHTML = '<div class="vault-empty">아직 저장된 파일이 없습니다.<br><b>파일 업로드</b>를 눌러 첫 백업을 남겨보세요.</div>';
        return;
      }
      list.innerHTML = items.map(item => `
        <a class="vault-file" href="${item.html_url}" target="_blank" rel="noopener">
          <span class="vault-file-icon">${item.type === 'dir' ? '📁' : '📄'}</span>
          <span class="vault-file-name">${item.name}</span>
          <span class="vault-file-meta">${item.type === 'file' && typeof item.size === 'number' ? formatBytes(item.size) : '폴더'}</span>
        </a>`).join('');
    } catch (e){
      list.innerHTML = `<div class="vault-empty">파일 목록을 자동으로 불러오지 못했습니다.<br><a href="${folderUrl(`${vaultRoot}/${key}`)}" target="_blank" rel="noopener">GitHub에서 직접 보기 ↗</a></div>`;
    }
  }

  function formatBytes(bytes){
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024*1024) return `${(bytes/1024).toFixed(1)} KB`;
    return `${(bytes/1024/1024).toFixed(1)} MB`;
  }

  function addPhaseVaultButtons(){
    document.querySelectorAll('.phase-card').forEach(card => {
      const id = card.dataset.id;
      const actions = card.querySelector('.phase-actions');
      if (!id || !actions || actions.querySelector('.vault-phase-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'toggle vault-phase-btn';
      btn.type = 'button';
      btn.textContent = '파일 보기';
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openVault(id);
      });
      actions.prepend(btn);
    });
  }

  function addCodeHubButton(){
    const actions = document.querySelector('.hero-actions');
    if (!actions || document.getElementById('tcadCodeHubBtn')) return;
    const link = document.createElement('a');
    link.id = 'tcadCodeHubBtn';
    link.className = 'btn';
    link.href = '../cmp-microled-code/';
    link.textContent = '⌘ TCAD 코드 모음';
    link.title = '실제 회수·검증한 .cmd / .par / .tcl 코드 전용 페이지';
    actions.insertBefore(link, actions.querySelector('.login-btn'));
  }

  function init(){
    makeSidebar();
    makeModal();
    addCodeHubButton();
    addPhaseVaultButtons();
    document.getElementById('vaultRefreshBtn')?.addEventListener('click', () => loadFiles(currentKey));
    const phaseList = document.getElementById('phaseList');
    if (phaseList){
      new MutationObserver(addPhaseVaultButtons).observe(phaseList, {childList:true, subtree:true});
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
