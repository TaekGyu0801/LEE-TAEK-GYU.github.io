const phases = [
  {
    id: 'P0', title: '환경·논문·단위 잠금',
    purpose: 'TCAD를 돌리기 전에 버전, 출처, 단위, 미확인 항목을 먼저 고정합니다.',
    body: `<h4>이 단계에서 하려는 것</h4><p>계산 환경과 파라미터 출처를 잠가서 나중에 결과가 이상할 때 코드 문제인지 물리 문제인지 분리합니다.</p><h4>해야 할 일</h4><ul><li>GaN_PiN_Diode 원본 예제를 복사 후 그대로 실행</li><li>모든 파라미터에 논문/모델 가정/미확인 태그 부착</li><li>길이·전류·전류밀도 단위 통일</li><li>SurfaceSRH, AreaFactor, polarization syntax는 T-2022.03 manual 대조</li></ul><div class="gate"><strong>Gate 0</strong> · 원본 예제 실행 + 출처표 + 단위 정의 + 미확인 syntax를 추측하지 않았으면 통과.</div><div class="stop">실패하면 Phase 1로 가지 않습니다.</div>`
  },
  {
    id: 'P1', title: 'GaN PiN 파이프라인 기준 소자',
    purpose: '최종 Micro-LED 전 단계에서 SDE→mesh→SDevice→I-V 파이프라인과 기본 GaN diode 동작을 검증합니다.',
    body: `<h4>핵심 작업</h4><ul><li>0 V equilibrium 수렴</li><li>forward / reverse bias run</li><li>I-V, electron/hole density, potential, band edge 저장</li><li>mesh refinement sanity check</li><li>current normalization 설명</li></ul><p><strong>중요:</strong> 현재 PiN은 InGaN MQW가 없는 pipeline prototype이며 최종 Micro-LED가 아닙니다. 기존 GaN/Nitride donor trap도 Micro-LED dry-etch damage 값으로 승계하지 않습니다.</p><div class="gate"><strong>Gate 1</strong> · diode-like I-V + 물리적으로 타당한 carrier 분포 + mesh refinement 변화 ≤5% + current normalization 설명.</div>`
  },
  {
    id: 'P2', title: '10 µm InGaN/GaN MQW Micro-LED baseline',
    purpose: 'Wu et al. (2023)의 공개 10 µm TCAD 구조/물리를 primary reference로 새 기준 소자를 구축합니다.',
    body: `<h4>Primary reference · R10 Wu 2023</h4><ul><li>10 µm lateral dimension</li><li>n-GaN 3.9 µm, Si 5×10¹⁸ cm⁻³</li><li>4× In₀.₀₈GaN/GaN MQW · QW 3 nm / barrier 8 nm</li><li>p-GaN Mg 2×10¹⁹ cm⁻³</li><li>양 sidewall 5 nm 이내 acceptor-like traps</li></ul><p>p-GaN thickness, complete contact geometry, exact Sentaurus trap set, simulator vendor는 아직 <strong>미확정</strong>입니다. 따라서 Wong/Shin 값을 무표시로 섞지 않습니다.</p><h4>역할 분리</h4><ul><li>Wu 2023 = primary TCAD physics/device baseline</li><li>Shin 2024 = 실제 10 µm passivation/leakage benchmark</li><li>Wong 2018/2019 = auxiliary full-epi + wet/ALD trend</li></ul><div class="gate"><strong>Gate 2</strong> · source-tagged spec 고정 + MQW band profile + forward carrier injection + active-region radiative recombination + QW mesh convergence + ideal/no-damage baseline 저장.</div>`
  },
  {
    id: 'P3', title: 'Polarization + Recombination physics',
    purpose: 'III-nitride MQW의 핵심 물리와 SRH/radiative/Auger 모델을 고정합니다.',
    body: `<h4>핵심 작업</h4><ul><li>SRH/Radiative/Auger를 단계적으로 활성화</li><li>polarization은 T-2022.03 manual/검증 예제 확인 후 적용</li><li>Wu 논문의 physics 선택과 Sentaurus의 exact 구현 문법을 구분</li><li>ON/OFF band·carrier·recombination 변화 확인</li><li>A/B/C 또는 lifetime sensitivity 수행</li></ul><p>David (2021)의 A/B/C는 representative sensitivity baseline이지 보편 물성값이 아닙니다.</p><div class="gate"><strong>Gate 3</strong> · 모델/파라미터 출처 문서화 + polarization 근거 확보 + sensitivity에서도 핵심 결론 유지.</div>`
  },
  {
    id: 'P4', title: 'Size scaling / 2D normalization',
    purpose: 'sidewall defect를 넣기 전에 pixel size와 2D geometry가 만드는 수치 artifact를 분리합니다.',
    body: `<h4>Size set</h4><p>10 / 20 / 50 µm부터 시작하고 validation 뒤 5 µm 및 4 µm AR-class 영역으로 확장합니다.</p><h4>주의</h4><p>실제 square pixel은 4개 sidewall을 가지지만 일반 2D 단면은 좌/우 2개만 직접 가집니다. <strong>AreaFactor만으로 앞/뒤 sidewall이 생기지 않습니다.</strong></p><div class="gate"><strong>Gate 4</strong> · 모든 size에서 동일 normalization/mesh/physics + 2D↔3D mapping 한계를 명시.</div>`
  },
  {
    id: 'P5', title: 'Model A · Surface-only',
    purpose: '가장 단순한 가설인 “sidewall surface recombination만으로 size effect를 설명할 수 있는가?”를 테스트합니다.',
    body: `<h4>입력</h4><p>L = 10/20/50 µm, SRV = 10³/10⁴/10⁵ cm/s <em>[모델 가정: log sensitivity levels]</em>; 10⁶은 severe-damage extension.</p><h4>출력</h4><ul><li>R_SRH / R_rad maps</li><li>electron/hole density</li><li>I-V, current density</li><li>η_rec diagnostic</li><li><strong>η_int,I</strong> main metric</li><li>가능하면 sidewall SRH loss fraction</li></ul><div class="gate"><strong>Gate 5</strong> · SRV 변화에 따른 spatial loss 변화가 보이고, 작은 L에서 sidewall sensitivity 증가가 설명 가능.</div>`
  },
  {
    id: 'P6', title: 'Model B · Finite damaged region / trap',
    purpose: '유한 defect-rich region 또는 Wu 계열 sidewall-trap representation이 필요한지 독립적으로 테스트합니다.',
    body: `<h4>입력과 용어</h4><ul><li>d_dmg = TCAD modeled damaged-region thickness</li><li>w_eff = fitted/derived effective influence width</li><li>Wu 2023의 5 nm sidewall trap-location concept은 직접 근거가 있지만 exact Sentaurus trap set은 별도 확인</li></ul><p>d_dmg/lifetime 초기 sweep은 <strong>[모델 가정]</strong>이고 특정 ICP 공정의 실측값처럼 쓰지 않습니다.</p><div class="gate"><strong>Gate 6</strong> · Model A/B를 독립 실행 + 동일 조건 비교 + 모든 trap/lifetime 입력의 출처 기록.</div>`
  },
  {
    id: 'P7', title: 'Calibration · 독립 Validation · 모델 선택',
    purpose: '시뮬레이션이 “넣은 값을 그대로 꺼내는 것”이 되지 않도록 문헌 데이터로 검증합니다.',
    body: `<h4>역할</h4><ul><li>Wu 2023: sidewall-trap TCAD physics / size-effect reference</li><li>Wong 2019: chemical treatment + ALD calibration 후보</li><li>Ley 2020: independent validation 후보</li><li>Shin 2024: -3 V leakage / passivation cross-check</li><li>Wang 2026: 1–5 µm final scaling / close-competitor check</li></ul><p>Shin의 95.8%는 모든 구조가 의무적으로 맞춰야 하는 target이 아니라 해당 10 µm 실험의 benchmark입니다.</p><div class="gate"><strong>Gate 7</strong> · calibration과 validation dataset 분리 + 독립 validation 성공. 실패하면 Design Window로 가지 않음.</div>`
  },
  {
    id: 'P8', title: 'Sidewall-Quality Design Window',
    purpose: '검증된 모델을 사용해 pixel size별 요구 sidewall quality를 contour로 정리합니다.',
    body: `<h4>Penalty</h4><div class="formula">Pη(L) = [1 − ηcase(L) / ηref(L)] × 100%</div><p>반드시 <strong>같은 L</strong>에서 reference와 비교합니다.</p><h4>Contour</h4><ul><li>5% · stringent</li><li>10% · primary engineering criterion <em>[프로젝트 기준]</em></li><li>20% · warning/loose criterion</li></ul><div class="gate"><strong>Gate 8</strong> · 독립 validation을 통과한 모델만 사용 + reference 정의 고정 + uncertainty/sensitivity 병기.</div>`
  },
  {
    id: 'P9', title: 'Wet/ALD 해석 · CMP Runsheet · 최종 패키지',
    purpose: '검증된 sidewall parameter space를 공식 CMP 주제인 wet chemical treatment + ALD passivation으로 연결합니다.',
    body: `<h4>공정 연결</h4><ul><li>ICP-RIE → sidewall damage</li><li>Wet chemical treatment → damaged material/surface cleanup과 주로 연결</li><li>ALD → surface/interface state suppression과 주로 연결</li><li>Shin 2024의 Al₂O₃ 10 nm + PECVD 300 nm는 해당 실험 benchmark로 사용 가능</li></ul><p>공정시간/농도/막두께를 SRV·Dit와 근거 없이 1:1 매핑하지 않습니다.</p><div class="gate"><strong>Gate 9</strong> · 모든 graph에 조건/단위/버전 기록 + 가정 표기 + 독립 validation + 재실행 가능성 확보.</div>`
  }
];

const list = document.getElementById('phaseList');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
let official = { updated: '', phases: {} };

const statusLabel = {
  pending: '대기',
  'in-progress': '진행 중',
  complete: '완료',
  blocked: '중단/확인 필요'
};

function artifactHTML(items = []) {
  if (!items.length) return '<p class="artifact-empty">아직 공식 업로드 결과물이 없습니다.</p>';
  return `<div class="artifact-list">${items.map(a => `<a class="artifact-link" href="${a.path}" target="_blank" rel="noopener">${a.label || a.path}</a>`).join('')}</div>`;
}

function render() {
  list.innerHTML = phases.map((p, idx) => {
    const meta = official.phases[p.id] || { status: 'pending', note: '', artifacts: [] };
    return `
      <article class="phase-card status-${meta.status}" data-id="${p.id}">
        <div class="phase-top">
          <div class="phase-num">${idx}</div>
          <div class="phase-title">
            <div class="title-line"><h3>${p.id} · ${p.title}</h3><span class="status-badge ${meta.status}">${statusLabel[meta.status] || meta.status}</span></div>
            <p>${p.purpose}</p>
          </div>
          <div class="phase-actions"><button class="toggle" type="button">내용 보기</button></div>
        </div>
        <div class="phase-body">
          ${p.body}
          <h4>공식 진행 기록</h4>
          <p>${meta.note || '아직 기록 없음.'}</p>
          <h4>업로드된 결과물</h4>
          ${artifactHTML(meta.artifacts)}
          <p class="phase-links"><a class="btn small" href="GUIDELINE.md">전체 Run Sheet</a><a class="btn small" href="UPLOAD_GUIDE.md">결과 업로드 방법</a></p>
        </div>
      </article>`;
  }).join('');

  document.querySelectorAll('.phase-card').forEach(card => {
    card.querySelector('.toggle').addEventListener('click', () => {
      card.classList.toggle('open');
      card.querySelector('.toggle').textContent = card.classList.contains('open') ? '접기' : '내용 보기';
    });
  });
  updateProgress();
}

function updateProgress() {
  const metas = phases.map(p => official.phases[p.id] || { status: 'pending' });
  const done = metas.filter(p => p.status === 'complete').length;
  const active = metas.filter(p => p.status === 'in-progress').length;
  const pct = Math.round((done / phases.length) * 100);
  progressBar.style.width = `${pct}%`;
  progressText.textContent = `${pct}% · 완료 ${done}/${phases.length}${active ? ` · 진행 ${active}` : ''}`;
}

async function loadOfficialProgress() {
  try {
    const res = await fetch(`progress.json?v=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    official = await res.json();
  } catch (err) {
    console.warn('progress.json을 불러오지 못했습니다.', err);
    official = { updated: '', phases: {} };
  }
  render();
}

const paperLinks = {
  R1: 'https://scholar.gist.ac.kr/handle/local/19726',
  R2: 'https://doi.org/10.1364/OE.26.021324',
  R3: 'https://doi.org/10.7567/1882-0786/ab3949',
  R4: 'https://doi.org/10.1063/5.0011651',
  R5: 'https://doi.org/10.1038/s41377-025-01751-y',
  R6: 'https://doi.org/10.1103/PhysRevApplied.15.054015',
  R7: 'https://doi.org/10.1186/s11671-022-03669-5',
  R8: 'https://doi.org/10.3390/photonics5040041',
  R9: 'https://doi.org/10.1063/5.0328266',
  R10: 'https://doi.org/10.1016/j.micrna.2023.207542'
};

function linkReferencePapers() {
  document.querySelectorAll('#references tbody tr').forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length < 2) return;
    const id = cells[0].textContent.trim();
    const href = paperLinks[id];
    if (!href) return;
    const title = cells[1].textContent.trim();
    cells[1].innerHTML = `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color:#175cd3;font-weight:700;text-decoration:none">${title}</a><br><a class="artifact-link" href="${href}" target="_blank" rel="noopener noreferrer" style="margin-top:6px">논문/원문 열기 ↗</a>`;
  });
}

linkReferencePapers();
loadOfficialProgress();