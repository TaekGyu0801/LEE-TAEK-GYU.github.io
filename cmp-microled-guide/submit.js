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
