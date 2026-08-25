const phases = [
  {
    id: 'P0', title: '환경·논문·단위 잠금',
    purpose: 'TCAD를 돌리기 전에 버전, 출처, 단위, 미확인 항목을 먼저 고정합니다.',
    body: `<h4>이 단계에서 하려는 것</h4><p>계산 환경과 파라미터 출처를 잠가서 나중에 결과가 이상할 때 코드 문제인지 물리 문제인지 분리합니다.</p><h4>해야 할 일</h4><ul><li>GaN_PiN_Diode 원본 예제를 복사 후 그대로 실행</li><li>모든 파라미터에 논문/모델 가정/미확인 태그 부착</li><li>길이·전류·전류밀도 단위 통일</li><li>SurfaceSRH, AreaFactor, polarization syntax는 T-2022.03 manual 대조</li></ul><div class="gate"><strong>Gate 0</strong> · 원본 예제 실행 + 출처표 + 단위 정의 + 미확인 syntax를 추측하지 않았으면 통과.</div><div class="stop">실패하면 Phase 1로 가지 않습니다.</div>`
  },
  {
    id: 'P1', title: 'GaN PiN 기준 소자',
    purpose: 'MQW와 sidewall을 넣기 전에 기본 GaN pn diode가 정상 동작하는지 확인합니다.',
    body: `<h4>핵심 작업</h4><ul><li>0 V equilibrium 수렴</li><li>작은 step으로 forward bias ramp</li><li>I-V, electron/hole density, potential, band edge 저장</li><li>mesh refinement sanity check</li></ul><h4>왜 먼저 하나?</h4><p>처음부터 MQW+polarization+sidewall을 동시에 넣으면 수렴 실패 원인을 찾기 어렵습니다.</p><div class="gate"><strong>Gate 1</strong> · diode-like I-V + 물리적으로 타당한 carrier 분포 + mesh refinement 변화 ≤5% <em>[프로젝트 수치 기준]</em>.</div>`
  },
  {
    id: 'P2', title: 'InGaN/GaN MQW LED baseline',
    purpose: '기준 pn diode를 실제 청색 LED의 MQW active region으로 확장합니다.',
    body: `<h4>구조 원칙</h4><p>Shin(2024)은 실제 CMP baseline geometry에 사용하고, 개별 QW 구조가 공개되지 않은 부분은 Wong et al. (2018)의 MQW 구조를 <strong>실행용 proxy</strong>로 사용합니다.</p><ul><li>MQW proxy 값은 원문 확인 후 고정</li><li>n-GaN / MQW / p-GaN부터 시작</li><li>수렴 후 EBL 등 복잡 요소 추가</li></ul><div class="gate"><strong>Gate 2</strong> · MQW band profile 형성 + forward bias에서 well carrier 증가 + radiative recombination이 active region에 집중.</div>`
  },
  {
    id: 'P3', title: 'Polarization + Recombination physics',
    purpose: 'III-nitride MQW의 핵심 물리와 SRH/radiative/Auger 모델을 고정합니다.',
    body: `<h4>핵심 작업</h4><ul><li>SRH/Radiative/Auger를 단계적으로 활성화</li><li>polarization은 manual/검증 예제 확인 후 적용</li><li>ON/OFF band·carrier·recombination 변화 확인</li><li>A/B/C 또는 lifetime sensitivity 수행</li></ul><p>David (2021)의 A/B/C는 representative sensitivity baseline이지 보편 물성값이 아닙니다.</p><div class="gate"><strong>Gate 3</strong> · 모델/파라미터 출처 문서화 + polarization 근거 확보 + sensitivity에서도 핵심 결론이 유지.</div>`
  },
  {
    id: 'P4', title: 'Size scaling / 2D normalization',
    purpose: 'sidewall defect를 넣기 전에 pixel size와 2D geometry가 만드는 수치 artifact를 분리합니다.',
    body: `<h4>Size set</h4><p>10 / 20 / 50 µm부터 시작하고 validation 뒤 필요 시 확장합니다.</p><h4>주의</h4><p>실제 square pixel은 4개 sidewall을 가지지만 일반 2D 단면은 좌/우 2개만 직접 가집니다. <strong>AreaFactor만으로 앞/뒤 sidewall이 생기지 않습니다.</strong></p><div class="gate"><strong>Gate 4</strong> · 모든 size에서 동일 normalization/mesh/physics + 2D↔3D mapping 한계를 명시.</div>`
  },
  {
    id: 'P5', title: 'Model A · Surface-only',
    purpose: '가장 단순한 가설인 “sidewall surface recombination만으로 size effect를 설명할 수 있는가?”를 테스트합니다.',
    body: `<h4>입력</h4><p>L = 10/20/50 µm, SRV = 10³/10⁴/10⁵ cm/s <em>[모델 가정: log sensitivity levels]</em>; 10⁶은 severe-damage extension.</p><h4>출력</h4><ul><li>R_SRH / R_rad maps</li><li>electron/hole density</li><li>I-V, current density</li><li>η_rec diagnostic</li><li><strong>η_int,I</strong> main metric</li><li>가능하면 sidewall SRH loss fraction</li></ul><div class="gate"><strong>Gate 5</strong> · SRV 변화에 따른 spatial loss 변화가 보이고, 작은 L에서 sidewall sensitivity 증가가 설명 가능.</div>`
  },
  {
    id: 'P6', title: 'Model B · Finite damaged region',
    purpose: 'surface boundary 하나가 아니라 유한 폭의 defect-rich region이 필요한지 독립적으로 테스트합니다.',
    body: `<h4>입력과 용어</h4><ul><li>d_dmg = TCAD modeled damaged-region thickness</li><li>w_eff = fitted/derived effective influence width</li><li>둘을 같은 값으로 사용하지 않음</li></ul><p>d_dmg와 lifetime/trap 초기 sweep 값은 <strong>[모델 가정]</strong>으로 명시하고 특정 ICP 공정의 실측값처럼 쓰지 않습니다.</p><div class="gate"><strong>Gate 6</strong> · Model B를 SurfaceSRH 자유 fitting 없이 독립 실행 + Model A와 동일 조건 비교 + 추가 자유도만으로 우수하다고 결론내리지 않음.</div>`
  },
  {
    id: 'P7', title: 'Calibration · 독립 Validation · 모델 선택',
    purpose: '시뮬레이션이 “넣은 값을 그대로 꺼내는 것”이 되지 않도록 문헌 데이터로 검증합니다.',
    body: `<h4>권장 구조</h4><ul><li>Calibration: Wong 2019 등 size-dependent treated/untreated data</li><li>Validation: Ley 2020 또는 calibration에 쓰지 않은 독립 dataset</li><li>Shin 2024: leakage/J-L/size/passivation cross-check</li></ul><h4>모델 선택 기준</h4><p>RMSE뿐 아니라 size trend, J@peak, spatial map, parameter plausibility, parameter 수를 함께 봅니다.</p><div class="gate"><strong>Gate 7</strong> · calibration과 validation dataset 분리 + 독립 validation 성공. 실패하면 Design Window로 가지 않음.</div>`
  },
  {
    id: 'P8', title: 'Sidewall-Quality Design Window',
    purpose: '검증된 모델을 사용해 pixel size별 요구 sidewall quality를 contour로 정리합니다.',
    body: `<h4>Penalty</h4><div class="formula">Pη(L) = [1 − ηcase(L) / ηref(L)] × 100%</div><p>반드시 <strong>같은 L</strong>에서 reference와 비교합니다.</p><h4>Contour</h4><ul><li>5% · stringent</li><li>10% · primary engineering criterion <em>[프로젝트 기준]</em></li><li>20% · warning/loose criterion</li></ul><div class="gate"><strong>Gate 8</strong> · 독립 validation을 통과한 모델만 사용 + reference 정의 고정 + uncertainty/sensitivity 병기.</div>`
  },
  {
    id: 'P9', title: 'Wet/ALD 해석 · CMP Runsheet · 최종 패키지',
    purpose: '검증된 sidewall parameter space를 실제 공정 언어로 연결하되, 실험 없는 공정 최적값을 만들지 않습니다.',
    body: `<h4>공정 연결</h4><ul><li>Wet chemical treatment → damaged material removal과 주로 연결</li><li>ALD → surface/interface state suppression과 주로 연결</li><li>단, 1:1 mapping이 아니며 정량 mapping은 실험 calibration 필요</li></ul><h4>최종 패키지</h4><p>baseline 구조, source-tagged parameter table, code/version, mesh policy, Model A/B 비교, validation, loss budget, Design Window, conceptual Runsheet, limitations.</p><div class="gate"><strong>Gate 9</strong> · 모든 graph에 조건/단위/버전 기록 + 가정 표기 + 독립 validation + 재실행 가능성 확보.</div>`
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
  R9: 'https://doi.org/10.1063/5.0328266'
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
