const submitPhase = document.getElementById('submitPhase');
const submitTitle = document.getElementById('submitTitle');
const submitText = document.getElementById('submitText');
const submitFiles = document.getElementById('submitFiles');
const fileSummary = document.getElementById('fileSummary');
const copyStatus = document.getElementById('copyStatus');
const loginBtn = document.getElementById('githubLoginBtn');
const uploadBtn = document.getElementById('githubUploadBtn');
const newTextBtn = document.getElementById('githubNewTextBtn');
const copyBtn = document.getElementById('copySubmissionBtn');

const repoBase = 'https://github.com/TaekGyu0801/LEE-TAEK-GYU.github.io';

function selectedPhase(){ return submitPhase?.value || 'P0'; }
function phasePath(){ return `cmp-microled-guide/submissions/${selectedPhase()}`; }
function loginUrl(){
  const returnTo = `/TaekGyu0801/LEE-TAEK-GYU.github.io/tree/main/${phasePath()}`;
  return `https://github.com/login?return_to=${encodeURIComponent(returnTo)}`;
}
function uploadUrl(){ return `${repoBase}/upload/main/${phasePath()}`; }
function newTextUrl(){ return `${repoBase}/new/main/${phasePath()}?filename=result-note.md`; }

function buildTemplate(){
  const now = new Date();
  const date = now.toISOString().slice(0,10);
  const files = submitFiles?.files?.length ? Array.from(submitFiles.files).map(f=>`- ${f.name}`).join('\n') : '- 없음 / GitHub에서 별도 업로드';
  return `# ${selectedPhase()} 결과 제출\n\n- 날짜: ${date}\n- 제목: ${submitTitle?.value?.trim() || '(제목 입력)'}\n- 상태: 제출됨 / 검토 전\n\n## 결과 설명\n\n${submitText?.value?.trim() || '(여기에 결과 설명, 실행 조건, 에러 로그 등을 작성)'}\n\n## 첨부 예정 파일\n\n${files}\n\n## 검토 체크\n\n- [ ] 단위 확인\n- [ ] 실행 조건 기록\n- [ ] Gate 조건 대조\n- [ ] ChatGPT 검토 요청\n`;
}

if (loginBtn) loginBtn.addEventListener('click', ()=> window.open(loginUrl(), '_blank', 'noopener'));
if (uploadBtn) uploadBtn.addEventListener('click', ()=> window.open(uploadUrl(), '_blank', 'noopener'));
if (newTextBtn) newTextBtn.addEventListener('click', ()=> {
  navigator.clipboard?.writeText(buildTemplate()).catch(()=>{});
  copyStatus.textContent = '제출 템플릿을 복사했습니다. GitHub 새 파일 화면에서 붙여넣으면 됩니다.';
  window.open(newTextUrl(), '_blank', 'noopener');
});
if (copyBtn) copyBtn.addEventListener('click', async ()=> {
  try {
    await navigator.clipboard.writeText(buildTemplate());
    copyStatus.textContent = '제출 내용을 클립보드에 복사했습니다.';
  } catch(e) {
    copyStatus.textContent = '자동 복사가 막혔습니다. 아래 텍스트를 직접 복사해 주세요.';
    submitText.focus();
  }
});
if (submitFiles) submitFiles.addEventListener('change', ()=> {
  const names = Array.from(submitFiles.files || []).map(f=>f.name);
  fileSummary.textContent = names.length ? `선택됨: ${names.join(', ')}` : '선택된 파일 없음';
});

// Paper verification state — checked against the PDFs supplied on 2026-08-25.
const paperVerification = {
  R1: { verified: true, oa: 'CC BY-NC-ND 2.0 KR' },
  R2: { verified: false, officialPdf: 'https://opg.optica.org/oe/viewmedia.cfm?seq=0&uri=oe-26-16-21324' },
  R3: { verified: true },
  R4: { verified: true },
  R5: { verified: true, oa: 'CC BY 4.0' },
  R6: { verified: true },
  R7: { verified: true, oa: 'CC BY 4.0' },
  R8: { verified: true, oa: 'CC BY 4.0' },
  R9: { verified: true }
};

function badge(text, className = ''){
  const el = document.createElement('span');
  el.className = `paper-badge paper-status ${className}`.trim();
  el.textContent = text;
  return el;
}

function linkBadge(text, href){
  const el = document.createElement('a');
  el.className = 'paper-badge';
  el.href = href;
  el.target = '_blank';
  el.rel = 'noopener';
  el.textContent = text;
  return el;
}

function applyPaperVerification(){
  const referenceSection = document.getElementById('references');
  if (!referenceSection) return;

  const intro = referenceSection.querySelector('.section-intro');
  if (intro) {
    intro.innerHTML = 'R1, R3–R9는 <strong>사용자 첨부 PDF로 원문 대조 완료</strong>했습니다. R2는 사용자 첨부본은 없지만 Optica 공식 PDF를 확인했습니다. 저작권 제한 문헌은 공개 GitHub에 PDF 복제본을 올리지 않고 DOI/출판사 원문을 연결합니다. <a class="paper-link" href="PAPER_INDEX.md">검증 기록 보기 ↗</a>';
  }

  const rows = referenceSection.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const id = row.cells?.[0]?.textContent?.trim();
    const meta = paperVerification[id];
    if (!id || !meta) return;
    const paperCell = row.cells[1];
    let actions = paperCell.querySelector('.paper-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'paper-actions';
      paperCell.appendChild(actions);
    }

    if (meta.verified && !actions.querySelector('.paper-status')) {
      actions.prepend(badge('PDF 검토 완료', 'verified'));
    }
    if (meta.oa && !actions.querySelector('.oa-status')) {
      const oa = badge(`OA · ${meta.oa}`, 'oa-status');
      actions.appendChild(oa);
    }
    if (meta.officialPdf && !actions.querySelector('.official-pdf')) {
      const pdf = linkBadge('Optica 공식 PDF ↗', meta.officialPdf);
      pdf.classList.add('official-pdf');
      actions.prepend(pdf);
    }
  });

  // Strengthen two rows after checking the actual PDFs.
  rows.forEach(row => {
    const id = row.cells?.[0]?.textContent?.trim();
    if (id === 'R8') {
      row.cells[2].innerHTML = '3D/size/LEE/current crowding + modeling 참고. <strong>VS = 7.5×10³ cm/s</strong>는 R8이 새로 측정한 값이 아니라 선행문헌 [22]에서 가져와 사용한 simulation input.';
    }
    if (id === 'R9') {
      row.cells[2].innerHTML = '1–5 μm 직접 실험 + EQE/ABC 기반 SRV fitting + APSYS sidewall-defect-density simulation. 최신 close competitor이자 validation/scope-check 후보.';
    }
  });
}

applyPaperVerification();
