const phases = [
  {
    id: 'P0', title: '연구 준비: 환경·출처·단위 확정',
    purpose: '시뮬레이션을 시작하기 전에 “어디서, 어떤 기준으로 계산했는지”부터 고정합니다.',
    plain: '나중에 결과가 이상할 때 코드 문제인지, 물리 모델 문제인지, 단위 문제인지 구분할 수 있도록 연구의 출발점을 정리하는 단계입니다.',
    finish: '사용한 TCAD 환경, 숫자의 출처, 단위, 아직 확인되지 않은 항목이 한 문서 안에서 구분됩니다.',
    body: `<h4>왜 필요한가</h4><p>같은 코드라도 버전·단위·파라미터 출처가 다르면 결과 해석이 달라질 수 있습니다. 그래서 계산 전에 기준부터 잠급니다.</p><h4>실제 작업</h4><ul><li>GaN PiN 공식 예제를 그대로 실행해 환경 확인</li><li>모든 파라미터를 ‘논문에서 가져온 값 / 프로젝트에서 정한 값 / 아직 미확정’으로 구분</li><li>길이·전류·전류밀도 단위 통일</li><li>SurfaceSRH, AreaFactor, polarization 명령은 Sentaurus T-2022.03 공식 자료와 대조</li></ul><div class="gate"><strong>Gate 0</strong> · 공식 예제가 재현되고, 출처와 단위가 정리되며, 모르는 문법을 추측해서 쓰지 않았으면 통과합니다.</div>`
  },
  {
    id: 'P1', title: '기본 GaN 다이오드가 정상인지 확인',
    purpose: 'Micro-LED를 만들기 전에 가장 단순한 GaN PiN 다이오드로 TCAD 실행 흐름을 검증합니다.',
    plain: '복잡한 Micro-LED부터 시작하지 않고, 기본 다이오드가 정상적으로 켜지고 꺼지는지 먼저 확인하는 단계입니다.',
    finish: 'SDE → Mesh → SDevice → I-V 전체 흐름이 정상이며, 결과를 믿고 다음 구조로 넘어갈 수 있다는 근거가 생깁니다.',
    body: `<h4>왜 필요한가</h4><p>기본 다이오드조차 정상적으로 동작하지 않으면 이후 Micro-LED 결과가 이상해도 원인을 찾기 어렵습니다.</p><h4>실제 작업</h4><ul><li>0 V에서 계산이 안정적으로 수렴하는지 확인</li><li>순방향/역방향 I-V 실행</li><li>전자·정공 분포, 전위, 밴드 구조 저장</li><li>격자를 더 촘촘히 해도 결과가 크게 바뀌지 않는지 확인</li><li>2D 계산의 전류를 어떤 기준으로 해석하는지 확정</li></ul><p><strong>중요:</strong> 이 단계의 PiN은 최종 Micro-LED가 아니라 실행 환경을 검증하기 위한 기준 소자입니다.</p><div class="gate"><strong>Gate 1</strong> · 다이오드다운 I-V가 나오고, 캐리어 분포가 물리적으로 말이 되며, 격자를 바꿔도 핵심 결과 변화가 작으면 통과합니다.</div>`
  },
  {
    id: 'P2', title: '실제 Micro-LED 기준 소자 만들기',
    purpose: '문헌 구조를 바탕으로 10 µm InGaN/GaN MQW Micro-LED를 Sentaurus에서 실행 가능한 기준 소자로 만듭니다.',
    plain: '앞으로 sidewall 손상을 넣고 비교할 “정상 상태의 10 µm Micro-LED”를 하나 제대로 만드는 단계입니다.',
    finish: '손상을 아직 넣지 않은 10 µm Micro-LED 기준 구조와 실행 코드가 확정됩니다.',
    body: `<h4>주요 기준 문헌</h4><p>Wu et al. (2023)의 10 µm 구조와 sidewall-trap 물리를 중심으로 사용하고, Shin/Wong 논문은 실험값과 공정 경향을 비교하는 별도 근거로 사용합니다.</p><h4>현재 직접 확인된 구조</h4><ul><li>n-GaN 3.9 µm, Si 5×10¹⁸ cm⁻³</li><li>4개의 In₀.₀₈GaN/GaN MQW · QW 3 nm / barrier 8 nm</li><li>p-GaN Mg 2×10¹⁹ cm⁻³</li><li>양쪽 sidewall에서 5 nm 이내 acceptor-like trap 개념</li></ul><p>p-GaN 두께, 완전한 contact geometry, 정확한 Sentaurus trap 입력값은 아직 모두 확정된 것이 아닙니다. 다른 논문의 값을 출처 표시 없이 섞지 않습니다.</p><div class="gate"><strong>Gate 2</strong> · 구조 출처가 정리되고, MQW 밴드·캐리어 주입·발광 재결합이 정상이며, QW 격자 변화에도 결과가 안정적이면 기준 소자로 확정합니다.</div>`
  },
  {
    id: 'P3', title: 'LED가 빛을 내고 잃는 물리 넣기',
    purpose: 'MQW에서 빛을 만드는 과정과 빛을 잃는 과정을 하나씩 넣어 각 모델의 역할을 확인합니다.',
    plain: '전자가 들어왔다고 전부 빛이 되는 것은 아닙니다. 어떤 재결합은 빛을 만들고, 어떤 재결합은 열이나 손실로 사라집니다. 그 차이를 모델에 넣는 단계입니다.',
    finish: '분극, SRH, 방사 재결합, Auger 재결합을 각각 넣었을 때 밴드와 발광이 어떻게 달라지는지 설명할 수 있습니다.',
    body: `<h4>실제 작업</h4><ul><li>III-nitride MQW의 polarization을 공식 문법으로 적용</li><li>SRH / Radiative / Auger 재결합을 단계적으로 활성화</li><li>각 모델을 켜고 끌 때 밴드·캐리어·재결합 분포 변화 비교</li><li>재결합 계수나 lifetime을 바꿨을 때 결론이 유지되는지 확인</li></ul><div class="gate"><strong>Gate 3</strong> · 각 물리 모델을 왜 넣었는지 근거가 있고, 입력값을 조금 바꿔도 핵심 결론이 유지되면 통과합니다.</div>`
  },
  {
    id: 'P4', title: '픽셀 크기 영향만 먼저 분리하기',
    purpose: 'sidewall 손상을 넣기 전에 10/20/50 µm처럼 크기만 바꿨을 때 생기는 변화를 확인합니다.',
    plain: '작은 LED가 성능이 나빠졌을 때 “작아져서 그런 것”과 “측벽 손상 때문인 것”을 섞어 해석하지 않기 위한 단계입니다.',
    finish: '측벽 손상이 없는 상태에서 크기 변화만으로 생기는 기준 결과와 2D 해석의 한계가 정리됩니다.',
    body: `<h4>실제 작업</h4><p>10 / 20 / 50 µm부터 같은 물리·격자 규칙으로 비교하고, 검증 후 5 µm 및 4 µm 영역으로 확장합니다.</p><h4>2D 계산에서 특히 주의할 점</h4><p>실제 사각 픽셀은 측벽이 4개지만 일반적인 2D 단면은 좌우 측벽 2개만 직접 표현합니다. AreaFactor 하나만 곱한다고 앞뒤 측벽이 자동으로 생기는 것은 아닙니다.</p><div class="gate"><strong>Gate 4</strong> · 모든 크기에서 동일한 계산 기준을 사용하고, 2D 결과를 실제 3D 픽셀에 어떻게 해석할지 한계를 명시하면 통과합니다.</div>`
  },
  {
    id: 'P5', title: '측벽 “표면” 손상 모델',
    purpose: '측벽 표면에서 발생하는 비발광 재결합만으로 크기 감소에 따른 효율 저하를 설명할 수 있는지 확인합니다.',
    plain: '첫 번째 손상 가설입니다. 측벽 바로 표면이 전자·정공을 잡아먹는다고 보고, 그 세기를 바꿔 보는 단계입니다.',
    finish: 'SRV가 커질수록 어디서 손실이 커지고, 작은 픽셀이 왜 더 민감해지는지 확인할 수 있습니다.',
    body: `<h4>바꾸는 값</h4><p>픽셀 크기 L과 측벽 표면 재결합 속도(SRV)를 바꿉니다. 초기 SRV 값은 특정 공정의 실측값으로 단정하지 않고 민감도 확인용 단계값으로 사용합니다.</p><h4>보는 결과</h4><ul><li>SRH / 방사 재결합 분포</li><li>전자·정공 분포</li><li>I-V 및 전류밀도</li><li>전류 기준 내부 발광효율</li><li>가능하면 측벽에서 발생한 손실의 비율</li></ul><div class="gate"><strong>Gate 5</strong> · SRV가 커질수록 측벽 손실이 증가하고, 작은 픽셀에서 그 영향이 더 커지는 흐름이 설명되면 통과합니다.</div>`
  },
  {
    id: 'P6', title: '측벽 “안쪽”까지 퍼진 손상 모델',
    purpose: '손상이 표면 한 줄이 아니라 측벽에서 일정 깊이 안쪽까지 존재하는 경우를 별도로 모델링합니다.',
    plain: '두 번째 손상 가설입니다. 식각 손상이 표면에만 있는 것이 아니라 재료 안쪽의 얇은 영역까지 퍼졌다고 보고 계산합니다.',
    finish: '표면만 손상된 모델과 내부까지 손상된 모델 중 어느 쪽이 문헌의 크기 효과를 더 잘 설명하는지 비교할 수 있습니다.',
    body: `<h4>핵심 구분</h4><ul><li>d_dmg: TCAD 안에서 설정한 손상 영역 두께</li><li>w_eff: 실험 결과를 설명하기 위해 해석된 유효 영향 폭</li><li>Wu 2023의 5 nm는 sidewall trap 위치 개념의 직접 근거이며, 정확한 Sentaurus trap 입력 세트는 별도 확인이 필요</li></ul><p>초기 damage width와 lifetime sweep은 프로젝트 모델 가정이며 특정 ICP 공정의 실측 손상 깊이라고 표현하지 않습니다.</p><div class="gate"><strong>Gate 6</strong> · 표면 모델과 내부 손상 모델을 같은 조건에서 따로 실행하고, 어떤 입력이 어떤 출처인지 기록하면 통과합니다.</div>`
  },
  {
    id: 'P7', title: '논문과 비교해 모델 검증하기',
    purpose: '한 논문의 데이터로 값을 정한 뒤, 그때 사용하지 않은 다른 논문 데이터에서도 결과가 맞는지 확인합니다.',
    plain: '시뮬레이션 값을 논문 그래프에 맞게 조정했다고 끝내지 않고, 다른 실험 결과도 설명할 수 있는지 시험하는 단계입니다.',
    finish: '최종적으로 사용할 sidewall 모델과 파라미터 범위를 선택할 수 있습니다.',
    body: `<h4>두 작업을 반드시 분리합니다</h4><ul><li><strong>값 정하기:</strong> 한 문헌 데이터와 비교하면서 모델 파라미터 범위를 정함</li><li><strong>독립 검증:</strong> 값을 정할 때 쓰지 않은 다른 문헌 데이터와 비교해 재현 가능한지 확인</li></ul><p>예를 들어 Shin 2024의 10 µm 누설전류 95.8% 감소는 모든 구조가 반드시 맞춰야 하는 숫자가 아니라 해당 실험 구조의 비교 기준입니다.</p><div class="gate"><strong>Gate 7</strong> · 값을 정할 때 쓴 데이터와 검증에 쓴 데이터를 분리하고, 독립 검증을 통과한 모델만 다음 단계로 보냅니다.</div>`
  },
  {
    id: 'P8', title: '허용 가능한 측벽 품질 범위 찾기',
    purpose: '검증된 모델로 “픽셀이 이 크기라면 측벽 손상이 어느 정도 이하여야 하는가?”를 정량화합니다.',
    plain: '이 프로젝트의 핵심 결과를 만드는 단계입니다. 단순히 그래프를 그리는 게 아니라, 크기별로 허용 가능한 측벽 품질 범위를 제시합니다.',
    finish: '픽셀 크기와 sidewall quality 사이의 5% / 10% / 20% 효율 저하 경계선을 제시할 수 있습니다.',
    body: `<h4>효율 저하율 계산</h4><div class="formula">Pη(L) = [1 − ηcase(L) / ηref(L)] × 100%</div><p>반드시 같은 픽셀 크기에서 손상 소자와 기준 소자를 비교합니다.</p><h4>표시할 경계</h4><ul><li>5%: 매우 엄격한 기준</li><li>10%: 이 프로젝트의 주 설계 기준</li><li>20%: 경고 수준의 느슨한 기준</li></ul><div class="gate"><strong>Gate 8</strong> · 독립 검증을 통과한 모델만 사용하고, 아직 확실하지 않은 입력값을 바꿨을 때 경계가 얼마나 움직이는지도 함께 제시합니다.</div>`
  },
  {
    id: 'P9', title: 'Wet/ALD 공정 의미로 연결하고 마무리',
    purpose: 'TCAD에서 확인한 sidewall 품질 조건을 실제 CMP 주제인 Wet treatment와 ALD passivation 공정으로 연결합니다.',
    plain: '마지막 단계입니다. “SRV가 몇이다”에서 끝내지 않고, Wet 처리와 ALD가 측벽의 어떤 문제를 줄이는 공정인지 발표 가능한 언어로 연결합니다.',
    finish: '최종 코드·파라미터·그래프·문헌 검증 근거와 함께, 어떤 공정이 어떤 측벽 문제를 개선하는지 정리된 최종 패키지가 만들어집니다.',
    body: `<h4>공정과 모델의 연결</h4><ul><li>ICP-RIE → 측벽 손상 발생</li><li>Wet chemical treatment → 손상된 표면/재료를 정리하거나 제거하는 효과와 주로 연결</li><li>ALD → 측벽 표면·계면의 결함 상태를 줄이는 효과와 주로 연결</li><li>Shin 2024의 Al₂O₃ 10 nm + PECVD 300 nm 결과는 해당 실험 구조의 공정 비교 근거로 사용</li></ul><p>공정시간·농도·막두께를 근거 없이 SRV나 trap density에 1:1로 대응시키지 않습니다.</p><div class="gate"><strong>Gate 9</strong> · 모든 그래프에 조건·단위·버전·가정이 기록되고, 다른 사람이 같은 코드로 다시 실행할 수 있으면 최종 완료입니다.</div>`
  }
];

const subunitPlain = {
  'P0-01': '어떤 서버·계정·Sentaurus 버전에서 계산했는지 기록해 두는 작업입니다.',
  'P0-02': '공식 GaN PiN 예제가 현재 환경에서도 그대로 돌아가는지 확인합니다.',
  'P0-03': '전류가 A인지 A/cm²인지 등 결과 해석에 필요한 단위와 2D 전류 계산 기준을 확정합니다.',
  'P0-04': '측벽 재결합과 분극 모델을 Sentaurus에서 어떤 명령으로 써야 하는지 공식 자료로 확인합니다.',
  'P0-05': '각 숫자가 어느 논문에서 왔는지, 우리가 정한 값인지, 아직 모르는 값인지 구분합니다.',
  'P1-01': '가장 단순한 GaN 다이오드가 정상적으로 켜지고 꺼지는지 다시 확인합니다.',
  'P1-02': '격자를 더 촘촘하게 만들어도 핵심 I-V 결과가 거의 같게 나오는지 확인합니다.',
  'P1-03': '순방향 전압을 올렸을 때 전류가 정상적으로 증가하는지 확인합니다.',
  'P1-04': '역방향 누설을 확인하고, 예제에 있던 trap을 Micro-LED 측벽 손상값으로 잘못 가져가지 않도록 분리합니다.',
  'P1-05': '2D 시뮬레이션에서 나온 terminal current를 실제 소자 전류처럼 해석하는 기준을 확정합니다.',
  'P2-01': '어떤 논문 구조를 앞으로의 기준 Micro-LED로 삼을지 결정합니다.',
  'P2-02': '층 두께·조성·도핑·접촉 조건을 하나씩 출처와 함께 확정합니다.',
  'P2-03': 'p-GaN의 Mg 도핑이 실제 전기적으로 얼마나 활성화되는지 모델 후보를 비교합니다.',
  'P2-04': '논문에 있는 Micro-LED 구조를 Sentaurus에서 실제 실행 가능한 코드로 옮깁니다.',
  'P2-05': '만든 기준 소자가 계산 중 발산하지 않고, 전류·밴드·캐리어·재결합이 말이 되는지 확인합니다.',
  'P2-06': '문헌과 결과를 비교한 뒤 앞으로 계속 사용할 “손상 없는 기준 소자” 버전을 확정합니다.',
  'P3-01': 'GaN계 LED 특유의 분극 전기장이 MQW 밴드 구조에 미치는 영향을 넣고 확인합니다.',
  'P3-02': '빛을 만드는 재결합과 빛을 만들지 못하는 손실 재결합을 각각 켜서 역할을 확인합니다.',
  'P3-03': '재결합 관련 숫자를 조금 바꿔도 연구 결론이 유지되는지 확인합니다.',
  'P4-01': '같은 구조를 10/20/50 µm처럼 여러 크기로 만들어 비교 준비를 합니다.',
  'P4-02': '2D 단면이 실제 사각 픽셀의 4개 측벽을 완전히 표현하지 못하는 한계를 계산에 반영합니다.',
  'P4-03': '측벽 손상을 넣기 전, 크기만 달라졌을 때의 기준 결과를 저장합니다.',
  'P5-01': '측벽 바로 표면에서 발생하는 재결합 손실을 모델에 넣습니다.',
  'P5-02': '측벽 표면 재결합 속도(SRV)를 여러 단계로 바꿔 손상 정도에 따른 변화를 봅니다.',
  'P5-03': '손실이 어디에서 생기는지 재결합 지도와 I-V·효율 값으로 뽑아냅니다.',
  'P6-01': '식각 손상이 표면 한 줄이 아니라 측벽 안쪽 일정 두께까지 퍼졌다고 보고 모델링합니다.',
  'P6-02': 'Wu 논문의 “측벽 5 nm 이내 trap” 개념을 Sentaurus에서 구현 가능한 형태로 옮깁니다.',
  'P6-03': '표면 손상 모델과 내부 손상 모델 중 어느 쪽이 문헌 결과를 더 잘 설명하는지 비교합니다.',
  'P7-01': '한 문헌 데이터와 비교하면서 어떤 파라미터를 어느 범위에서 정할지 결정합니다.',
  'P7-02': '값을 정할 때 사용하지 않은 다른 문헌 데이터에서도 모델이 맞는지 시험합니다.',
  'P7-03': '독립 검증 결과를 바탕으로 최종 sidewall 모델을 선택합니다.',
  'P8-01': '같은 크기의 손상 없는 소자와 비교해 효율이 몇 % 떨어졌는지 계산합니다.',
  'P8-02': '픽셀 크기별로 허용 가능한 측벽 손상 수준을 5%·10%·20% 경계선으로 그립니다.',
  'P8-03': '아직 확실하지 않은 입력값을 바꿨을 때 설계 범위가 얼마나 흔들리는지 확인합니다.',
  'P9-01': 'Wet 처리로 측벽의 어떤 손상 항목이 좋아졌다고 해석할 수 있는지 연결합니다.',
  'P9-02': 'ALD가 표면·계면 결함을 줄이는 효과를 검증된 TCAD 파라미터 변화와 연결합니다.',
  'P9-03': '최종 코드·파라미터·그래프·검증 근거를 다른 사람이 다시 실행할 수 있게 한 묶음으로 정리합니다.'
};

const list = document.getElementById('phaseList');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
let official = { updated: '', phases: {} };
let detailManifest = { rules: {}, phases: {} };

const statusLabel = {
  pending: '대기',
  'in-progress': '진행 중',
  complete: '완료',
  blocked: '중단/확인 필요'
};

const codeKinds = ['cmd', 'code', 'par', 'tcl', 'py', 'plt'];

function artifactHTML(items = []) {
  if (!items.length) return '<p class="artifact-empty">아직 공식 업로드 결과물이 없습니다.</p>';
  return `<div class="artifact-list">${items.map(a => `<a class="artifact-link" href="${a.path}" target="_blank" rel="noopener">${a.label || a.path}</a>`).join('')}</div>`;
}

function detailFilesHTML(files = []) {
  if (!files.length) return '<span class="detail-no-files">연결된 파일 없음</span>';
  return files.map(f => `<a class="detail-file kind-${f.kind || 'record'}" href="${f.path}" target="_blank" rel="noopener">${f.label || f.path}</a>`).join('');
}

function hasCode(files = []) {
  return files.some(f => codeKinds.includes(f.kind));
}

function findSubunit(id) {
  if (!id) return null;
  for (const items of Object.values(detailManifest.phases || {})) {
    const found = items.find(item => item.id === id);
    if (found) return found;
  }
  return null;
}

function codeState(item) {
  const files = item.files || [];
  const policy = item.codePolicy || (item.codeRequired === false ? 'none' : 'required');

  if (policy === 'none') {
    return { className: 'na', text: '실행 코드 없음', style: '', warning: '', sharedLink: '' };
  }

  if (policy === 'shared') {
    const source = findSubunit(item.sharedFrom);
    const sourceHasCode = source ? hasCode(source.files || []) : false;
    return {
      className: sourceHasCode ? 'ok' : 'missing',
      text: sourceHasCode ? `앞 단계 코드 사용 · ${item.sharedFrom}` : `공유 코드 확인 필요 · ${item.sharedFrom || '?'}`,
      style: sourceHasCode
        ? 'color:#6941c6;border-color:#d2c2f4;background:#f5f3ff'
        : 'color:#b54708;border-color:#fed7aa;background:#fff7ed',
      warning: sourceHasCode
        ? `${item.sharedFrom}에서 사용한 동일 실행 코드를 다시 복사하지 않고 그대로 참조합니다.`
        : `이 소단원은 ${item.sharedFrom || '앞 소단원'}의 실행 코드를 사용하므로, 먼저 그 코드가 첨부되어 있는지 확인해야 합니다.`,
      sharedLink: item.sharedFrom ? `<a class="detail-file" href="#subunit-${item.sharedFrom}">사용하는 원본 코드 · ${item.sharedFrom}</a>` : ''
    };
  }

  const ownHasCode = hasCode(files);
  return {
    className: ownHasCode ? 'ok' : 'missing',
    text: ownHasCode ? '실행 코드 있음' : '실행 코드 아직 없음',
    style: '',
    warning: ownHasCode ? '' : '이 소단원은 실제 실행 코드가 있어야 재현할 수 있습니다. 코드를 회수하면 여기에 연결합니다.',
    sharedLink: ''
  };
}

function subunitHTML(phaseId) {
  const items = detailManifest.phases?.[phaseId] || [];
  if (!items.length) return '<p class="artifact-empty">세부 소단원이 아직 등록되지 않았습니다.</p>';

  return `
    <div class="subunit-head">
      <div>
        <h4>이 Phase를 쪼개서 보면</h4>
        <p>각 소단원마다 먼저 “쉽게 말하면 무엇을 하는지”를 적고, 그 아래에 실제 기술 작업을 표시합니다.</p>
      </div>
      <a class="btn small" href="CODE_ARCHIVE_POLICY.md" target="_blank" rel="noopener">코드 보관 규칙</a>
    </div>
    <div class="subunit-grid">
      ${items.map(item => {
        const files = item.files || [];
        const state = codeState(item);
        const plain = subunitPlain[item.id] || item.summary || '';
        return `
          <section id="subunit-${item.id}" class="subunit-card status-${item.status || 'pending'}">
            <div class="subunit-top">
              <div>
                <div class="subunit-id">${item.id}</div>
                <h5>${item.title}</h5>
              </div>
              <div class="subunit-badges">
                <span class="status-badge ${item.status || 'pending'}">${statusLabel[item.status] || item.status || '대기'}</span>
                <span class="code-badge ${state.className}"${state.style ? ` style="${state.style}"` : ''}>${state.text}</span>
              </div>
            </div>
            <div style="margin:10px 0;padding:10px 12px;border-radius:9px;background:#f4f8ff;border:1px solid #d8e6fb;font-size:12px;line-height:1.6"><strong style="color:#175cd3">쉽게 말하면</strong> · ${plain}</div>
            <p class="subunit-summary"><strong>실제 작업</strong> · ${item.summary || ''}</p>
            <div class="detail-files">${detailFilesHTML(files)}${state.sharedLink}</div>
            ${state.warning ? `<div class="code-warning">${state.warning}</div>` : ''}
          </section>`;
      }).join('')}
    </div>`;
}

function render() {
  const overview = `
    <div class="gate" style="margin-bottom:16px">
      <strong>처음 보는 사람은 이것만 먼저 보면 됩니다.</strong><br>
      <b>P0–P2</b>는 믿을 수 있는 기준 소자를 만드는 구간 →
      <b>P3–P6</b>는 측벽 손상이 효율을 떨어뜨리는 방식을 모델링하는 구간 →
      <b>P7–P9</b>는 논문과 비교해 검증하고 실제 Wet/ALD 공정 의미로 연결하는 구간입니다.
    </div>`;

  list.innerHTML = overview + phases.map(p => {
    const meta = official.phases[p.id] || { status: 'pending', note: '', artifacts: [] };
    return `
      <article class="phase-card status-${meta.status}" data-id="${p.id}">
        <div class="phase-top">
          <div class="phase-num">${p.id}</div>
          <div class="phase-title">
            <div class="title-line"><h3>${p.title}</h3><span class="status-badge ${meta.status}">${statusLabel[meta.status] || meta.status}</span></div>
            <p>${p.purpose}</p>
          </div>
          <div class="phase-actions"><button class="toggle" type="button">쉽게 보기</button></div>
        </div>
        <div class="phase-body">
          <div style="padding:14px 16px;border:1px solid #cfe0fb;background:#f4f8ff;border-radius:12px;margin-bottom:16px"><strong style="color:#175cd3">쉽게 말하면</strong><p style="margin:4px 0 0">${p.plain}</p></div>
          ${p.body}
          <h4>이 단계가 끝나면</h4>
          <p>${p.finish}</p>
          ${subunitHTML(p.id)}
          <h4>현재 공식 진행 기록</h4>
          <p>${meta.note || '아직 기록 없음.'}</p>
          <h4>이 Phase의 대표 결과물</h4>
          ${artifactHTML(meta.artifacts)}
          <p class="phase-links"><a class="btn small" href="GUIDELINE.md">전체 실행 순서</a><a class="btn small" href="UPLOAD_GUIDE.md">결과 올리는 방법</a><a class="btn small" href="CODE_ARCHIVE_POLICY.md">코드 보관 규칙</a></p>
        </div>
      </article>`;
  }).join('');

  document.querySelectorAll('.phase-card').forEach(card => {
    card.querySelector('.toggle').addEventListener('click', () => {
      card.classList.toggle('open');
      card.querySelector('.toggle').textContent = card.classList.contains('open') ? '접기' : '쉽게 보기';
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

async function loadDashboardData() {
  try {
    const [progressRes, detailRes] = await Promise.all([
      fetch(`progress.json?v=${Date.now()}`, { cache: 'no-store' }),
      fetch(`phase-details.json?v=${Date.now()}`, { cache: 'no-store' })
    ]);
    if (!progressRes.ok) throw new Error(`progress HTTP ${progressRes.status}`);
    official = await progressRes.json();
    if (detailRes.ok) detailManifest = await detailRes.json();
    else console.warn(`phase-details HTTP ${detailRes.status}`);
  } catch (err) {
    console.warn('대시보드 데이터를 불러오지 못했습니다.', err);
    official = { updated: '', phases: {} };
  }
  render();
}

const paperLinks = {
  R1: {
    pdf: 'https://gist.dcollection.net/common/orgView/200000880198',
    source: 'https://scholar.gist.ac.kr/handle/local/19726'
  },
  R2: {
    pdf: 'https://opg.optica.org/oe/viewmedia.cfm?seq=0&uri=oe-26-16-21324',
    source: 'https://doi.org/10.1364/OE.26.021324'
  },
  R3: {
    pdf: 'https://iopscience.iop.org/article/10.7567/1882-0786/ab3949/pdf',
    source: 'https://doi.org/10.7567/1882-0786/ab3949'
  },
  R4: {
    pdf: 'https://doi.org/10.1063/5.0011651',
    source: 'https://doi.org/10.1063/5.0011651',
    fallback: true
  },
  R5: {
    pdf: 'https://www.nature.com/articles/s41377-025-01751-y.pdf',
    source: 'https://doi.org/10.1038/s41377-025-01751-y'
  },
  R6: {
    pdf: 'https://journals.aps.org/prapplied/pdf/10.1103/PhysRevApplied.15.054015',
    source: 'https://doi.org/10.1103/PhysRevApplied.15.054015'
  },
  R7: {
    pdf: 'https://nanoscalereslett.springeropen.com/counter/pdf/10.1186/s11671-022-03669-5.pdf',
    source: 'https://doi.org/10.1186/s11671-022-03669-5'
  },
  R8: {
    pdf: 'https://www.mdpi.com/2304-6732/5/4/41/pdf',
    source: 'https://doi.org/10.3390/photonics5040041'
  },
  R9: {
    pdf: 'https://doi.org/10.1063/5.0328266',
    source: 'https://doi.org/10.1063/5.0328266',
    fallback: true
  },
  R10: {
    pdf: 'https://doi.org/10.1016/j.micrna.2023.207542',
    source: 'https://doi.org/10.1016/j.micrna.2023.207542',
    fallback: true
  }
};

function linkReferencePapers() {
  document.querySelectorAll('#references tbody tr').forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length < 2) return;
    const id = cells[0].textContent.trim();
    const link = paperLinks[id];
    if (!link) return;
    const title = cells[1].textContent.trim();
    const primaryLabel = link.fallback ? '원문/PDF 보기 ↗' : 'PDF 바로 열기 ↗';
    cells[1].innerHTML = `
      <a href="${link.pdf}" target="_blank" rel="noopener noreferrer" style="color:#175cd3;font-weight:700;text-decoration:none">${title}</a><br>
      <a class="artifact-link" href="${link.pdf}" target="_blank" rel="noopener noreferrer" style="margin-top:6px">${primaryLabel}</a>
      ${link.source !== link.pdf ? `<a class="artifact-link" href="${link.source}" target="_blank" rel="noopener noreferrer" style="margin-top:6px">출판사/논문 정보 ↗</a>` : ''}`;
  });
}

linkReferencePapers();
loadDashboardData();