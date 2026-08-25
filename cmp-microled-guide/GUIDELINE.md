# CMP Micro-LED Sidewall TCAD 연구 가이드라인 v1.0

> **연구 주제**  
> TCAD 기반 InGaN/GaN 청색 Micro-LED 사이드월 손상 모델링을 통한 Sidewall-Quality 설계 윈도우 도출
>
> **이 문서의 목적**  
> TCAD를 처음 다루는 사람도 **왜 이 계산을 하는지 → 무엇을 입력하는지 → 무엇을 확인해야 하는지 → 언제 다음 단계로 넘어가면 안 되는지**를 따라갈 수 있도록 만든 실행 Run Sheet이다.

---

## 0. 가장 중요한 운영 원칙

이 가이드라인은 "코드가 실행되면 성공"이라는 방식을 금지한다. **각 Phase의 Gate를 통과하지 못하면 다음 Phase로 넘어가지 않는다.** 따라서 이 문서를 따른다는 것은 특정 숫자가 무조건 실험과 일치한다는 뜻이 아니라, **검증되지 않은 시뮬레이션을 최종 결과로 채택하지 않는 절차**를 따른다는 뜻이다.

### 0.1 출처 태그

- **[원문 확인]**: 논문/학위논문 원문에서 직접 확인한 사실
- **[원문 초록 확인]**: 원 논문의 공식 초록/출판 페이지에서 확인한 사실
- **[Review 재인용]**: 리뷰에서 확인했으나 원 실험 논문은 아직 직접 대조하지 않은 값
- **[현재 환경 확인]**: 현재 사용하는 Sentaurus 설치 환경에서 확인된 사실
- **[모델 가정]**: 실험에서 정해진 값이 아니라 계산을 위해 둔 가정
- **[프로젝트 기준]**: 본 CMP에서 비교를 위해 정의한 기준. 산업 표준이 아님
- **[Manual 확인 필요]**: Sentaurus T-2022.03 User Guide/설치 예제로 확인하기 전에는 문법을 확정하지 않음
- **[실험 calibration 필요]**: 공정시간·농도·두께와 TCAD 파라미터의 정량 대응을 TCAD만으로 확정할 수 없음

### 0.2 절대 금지

1. SRV, Dit, Qf, damage width를 재료의 보편 상수처럼 사용하지 않는다.
2. `KOH 5 min → SRV = 1e3 cm/s`처럼 **공정조건과 TCAD 파라미터를 근거 없이 1:1 연결하지 않는다.**
3. `w_eff`를 실제 ICP-RIE lattice damage depth와 동일시하지 않는다.
4. 2D 결과에 단순히 ×2를 해서 3D 정사각형의 4개 sidewall 효과라고 주장하지 않는다.
5. 같은 데이터로 fitting하고 같은 데이터를 다시 "validation"이라고 부르지 않는다.
6. Reverse leakage가 줄었다는 결과만으로 TAT 등 특정 mechanism을 확정하지 않는다.
7. 결과가 예상과 다르면 값을 억지로 조정해서 예상 그래프를 만들지 않는다.

---

# 전체 Research Workflow

```text
Phase 0  환경·논문·단위 잠금
   ↓
Phase 1  GaN PiN 기준 소자 동작 확인
   ↓
Phase 2  InGaN/GaN MQW LED 기준 소자 구축
   ↓
Phase 3  Polarization + Recombination physics 고정
   ↓
Phase 4  Size scaling / 2D normalization sanity check
   ↓
Phase 5  Model A: Surface-only sidewall recombination
   ↓
Phase 6  Model B: Finite damaged-region model
   ↓
Phase 7  문헌 Calibration · 독립 Validation · 모델 선택
   ↓
Phase 8  Sidewall-quality Design Window 작성
   ↓
Phase 9  Wet/ALD 공정 해석 + CMP Runsheet + 최종 결과물
```

---

# Phase 0 — 환경·논문·단위 잠금

## 이 단계에서 하려는 것

TCAD 계산을 시작하기 전에 **어떤 Sentaurus 버전을 쓰는지, 어떤 구조/파라미터가 문헌값인지, 어떤 값이 가정인지**를 먼저 고정한다. 이 단계가 없으면 나중에 그래프가 이상해도 코드 문제인지 물리 문제인지 구분할 수 없다.

## 현재 확인된 환경

- Sentaurus release: **T-2022.03** [현재 환경 확인]
- Shell: **tcsh** [현재 환경 확인]
- 사용 가능 확인: `sde`, `sdevice`, `swb`, `sptopo3d` [현재 환경 확인]
- 출발 예제: `Applications_Library/GettingStarted/sdevice/GaN_PiN_Diode` [현재 환경 확인]
- EMW license: **미확인**

## 해야 할 일

1. GaN_PiN_Diode 원본 예제를 **절대 수정하지 않고 복사**한다.
2. 원본 예제를 그대로 실행해 solver/license/environment가 정상인지 확인한다.
3. `PARAMETER_MASTER.md` 또는 CSV를 만들고 모든 값에 출처 태그를 붙인다.
4. 길이 단위를 하나로 통일한다. Geometry는 µm를 써도 되지만 식에 cm 단위가 필요한 경우 반드시 변환한다.
5. Current, current density, 2D depth normalization의 정의를 기록한다.
6. 다음 미확인 항목을 Gate 0 blocker로 관리한다.
   - SurfaceSRH의 T-2022.03 정확한 syntax/단위
   - 2D AreaFactor와 integrated recombination의 단위
   - Polarization 설정 방식

## 필수 단위 검산

정사각형 pixel에서

\[
P/A = 4/L
\]

이지만 SRV가 cm/s이면 P/A도 cm⁻¹이어야 한다. L을 µm로 입력하면

\[
\frac{P}{A}=\frac{4\times10^4}{L_{\mu m}}\;cm^{-1}
\]

이다.

## Gate 0 — 통과 조건

- [ ] GaN_PiN_Diode 원본 예제가 수정 없이 실행된다.
- [ ] 파라미터 표의 모든 숫자에 출처 또는 `[모델 가정]`이 붙어 있다.
- [ ] 길이/전류/전류밀도 단위 정의가 문서화되어 있다.
- [ ] 모르는 Sentaurus keyword를 추측해 넣지 않았다.

**하나라도 실패하면 Phase 1로 가지 않는다.**

---

# Phase 1 — GaN PiN 기준 소자 동작 확인

## 이 단계에서 하려는 것

MQW와 sidewall을 넣기 전에 **GaN pn diode 자체가 정상적인 diode로 동작하는지** 확인한다. 처음부터 MQW+polarization+sidewall을 모두 넣으면 수렴 실패 원인을 찾기 어렵다.

## 입력

- 구조/도핑/물성: 우선 `GaN_PiN_Diode` 예제의 검증된 기본값 사용 [현재 환경 확인]
- 이 단계의 도핑값은 최종 Micro-LED의 실험 도핑값이라고 주장하지 않는다.

## 해야 할 일

1. 예제 구조를 작업 폴더에 복사한다.
2. 구조를 `n-GaN / intrinsic-or-active placeholder / p-GaN` 형태로 단순화한다.
3. 0 V에서 equilibrium solution이 수렴하는지 확인한다.
4. 순방향 bias를 작은 step부터 증가시킨다.
5. 다음을 저장한다.
   - I-V
   - electron density
   - hole density
   - electrostatic potential
   - conduction/valence band edge
6. Mesh를 한 단계 세밀하게 만든 케이스와 기준 케이스를 비교한다.

## 무엇을 이해해야 하는가

- forward bias를 걸면 junction barrier가 낮아지고 electron/hole injection이 증가한다.
- 이 단계에서는 "빛"을 맞추는 게 목적이 아니다. **전기적 diode baseline**이 목적이다.

## Gate 1 — 통과 조건

- [ ] 0 V equilibrium이 안정적으로 수렴한다.
- [ ] forward bias에서 current가 증가하는 diode-like I-V가 나온다.
- [ ] electron/hole 분포가 비물리적으로 음수가 되지 않는다.
- [ ] Mesh refinement 후 핵심 I-V 값의 변화가 **5% 이하**이다. `[프로젝트 수치 기준]`
- [ ] Current normalization 방식을 설명할 수 있다.

### 실패 시

- MQW를 추가하지 않는다.
- Contact, doping, mesh, solver ramp 순으로 점검한다.

---

# Phase 2 — InGaN/GaN MQW LED 기준 소자 구축

## 이 단계에서 하려는 것

pn diode를 실제 청색 LED의 핵심인 **InGaN/GaN MQW active region**으로 확장하고, sidewall 없이도 carrier가 MQW에 모여 radiative recombination을 할 수 있는 기준 구조를 만든다.

## 구조 기준

### A. Shin(2024) 기준 — 실제 CMP baseline geometry

Shin의 GIST 석사학위논문에서 확인된 구조 [원문 확인]:

- u-GaN: 1.0–1.2 µm
- n-GaN: 2 µm
- InGaN/GaN MQW active layer 전체: 0.125 µm
- p-GaN: 0.2 µm
- ITO: 100 nm
- mesa etch depth: 1.0–1.1 µm
- ALD Al₂O₃: 10 nm
- PECVD SiO₂ 또는 SiNx: 300 nm

**문제:** Shin은 QW 개수와 개별 QW/barrier 두께를 명확히 제시하지 않는다.

### B. 실행 가능한 MQW proxy — Wong et al. (2018)

Wong et al.의 청색 III-nitride µLED 구조 [원문 확인]:

- p+-GaN: 17 nm
- p-GaN: 120 nm
- AlGaN EBL: 26 nm
- **6 × InGaN/GaN MQW**
  - InGaN QW: **2.4 nm**
  - GaN barrier: **22 nm**
- n-GaN: 4 µm
- UID GaN: 1.4 µm

> **중요:** 이 구조는 Shin 소자의 정확한 복제본이 아니라, QW 구조가 명확히 공개된 **문헌 기반 실행용 proxy**이다.

## 초보자용 구축 순서

1. 처음에는 `n-GaN / 6×MQW / p-GaN`만 만든다.
2. 정상 수렴 후 AlGaN EBL을 추가한다.
3. ITO/복잡한 reflector/광학 구조는 전기적 baseline이 안정화된 뒤 추가한다.
4. Wong 논문에 없는 doping 값은 GaN example의 값을 임시로 유지하거나 별도 문헌값을 사용하되 `[모델 가정]`으로 표시한다.

## 뽑을 결과

- band diagram
- electron/hole density in each well
- radiative recombination map
- SRH recombination map
- I-V

## Gate 2 — 통과 조건

- [ ] MQW 위치에 quantum-well band profile이 형성된다.
- [ ] forward bias에서 MQW 내 electron/hole population이 증가한다.
- [ ] radiative recombination이 active region에 집중된다.
- [ ] MQW 추가 전/후의 변화 이유를 설명할 수 있다.
- [ ] 사용한 QW 구조가 Shin 원구조인지 Wong proxy인지 plot/report에 명시되어 있다.

---

# Phase 3 — Polarization + Recombination physics 고정

## 이 단계에서 하려는 것

III-nitride MQW에서 중요한 polarization과 SRH/radiative/Auger recombination을 정의한다. 이 단계가 끝나야 이후 sidewall 효과를 "추가 손실"로 해석할 수 있다.

## Recombination 기본 개념

\[
R = R_{SRH}+R_{rad}+R_{Auger}
\]

ABC reduced model에서는

\[
R \approx An+Bn^2+Cn^3
\]

으로 표현한다.

David (2021)는 thin blue InGaN QW device-design discussion에서 representative coefficients로 [원문 확인]

- A = 1.2×10⁶ s⁻¹
- B = 3×10⁻¹² cm³/s
- C = 1×10⁻³¹ cm⁶/s

를 사용했다. **이 값은 보편 물성값이 아니며 sensitivity baseline이다.**

## 해야 할 일

1. SRH / Radiative / Auger를 한 번에 넣지 말고 하나씩 활성화하여 수렴을 확인한다.
2. Polarization은 T-2022.03 manual/예제에서 정확한 방법을 확인한 후 추가한다. `[Manual 확인 필요]`
3. Polarization ON/OFF의 band profile, carrier distribution, recombination 변화가 물리적으로 설명 가능한지 확인한다.
4. A/B/C 또는 lifetime 관련 값은 ±범위 sensitivity를 수행하고 결과 순위가 뒤집히는지 확인한다.

## 확산길이 주의

David (2021)는 InGaN QW에서 carrier diffusion length가 carrier density에 크게 의존하며 낮은 excitation에서 수십 µm까지 갈 수 있음을 보였다. 따라서 full drift-diffusion TCAD에서는 `L_D = 5 µm`처럼 diffusion length를 독립 knob로 직접 넣기보다, mobility/diffusion/lifetime을 통해 **derived quantity**로 해석한다.

## Gate 3 — 통과 조건

- [ ] 사용한 recombination model과 파라미터 출처가 기록되어 있다.
- [ ] Polarization 설정 근거가 manual 또는 검증된 example에 연결되어 있다.
- [ ] radiative/SRH/Auger rate가 모두 0 이상이며 공간적으로 설명 가능하다.
- [ ] 파라미터 sensitivity를 통해 결론이 한 숫자에만 의존하지 않는지 확인했다.

---

# Phase 4 — Size scaling / 2D normalization sanity check

## 이 단계에서 하려는 것

sidewall defect를 넣기 전에 pixel size 자체와 2D geometry 때문에 생기는 **수치적 artifact**를 분리한다.

## Size set

초기 필수:

- 10 µm
- 20 µm
- 50 µm

Shin의 실측 size series와 연결되는 범위이다. [원문 확인]

필요 시 validation 후 5 µm / 100 µm 확장.

## 중요한 2D 한계

실제 square pixel은

\[
P/A=4/L
\]

이고 네 sidewall을 가진다. 일반적인 2D vertical cross-section은 좌/우 두 sidewall만 직접 가진다.

> **AreaFactor는 없는 앞/뒤 sidewall boundary를 자동으로 생성하지 않는다.**

따라서 2D 결과를 단순 ×2해서 실제 square pixel의 sidewall physics라고 주장하지 않는다.

## 해야 할 일

1. sidewall recombination을 아직 넣지 않은 상태에서 L만 변경한다.
2. 모든 size에서 동일한 mesh policy, bias sweep, physics model을 사용한다.
3. current density normalization이 모든 size에서 동일한 정의인지 확인한다.
4. 2D↔3D mapping 방법은 다음 중 하나를 문헌/manual 확인 후 채택한다.
   - mechanism-only 2D + reduced-order 4/L 보정
   - experimental size trend에 effective parameter calibration
   - 검증 가능한 symmetry/geometry 방법
   - 제한된 3D sanity check

## Gate 4 — 통과 조건

- [ ] size 변경으로 solver/mesh artifact가 발생하지 않는다.
- [ ] 모든 size에서 동일한 current-density 정의를 사용한다.
- [ ] 2D와 실제 square device의 차이를 보고서에 명시했다.
- [ ] AreaFactor 하나만으로 4-sidewall physics가 해결된다고 주장하지 않는다.

---

# Phase 5 — Model A: Surface-only Sidewall Recombination

## 이 단계에서 하려는 것

가장 단순한 가설부터 검증한다.

> **"sidewall 문제를 surface boundary의 재결합만으로 설명할 수 있는가?"**

## Input

- L = 10 / 20 / 50 µm
- SRV sensitivity levels:
  - 10³ cm/s
  - 10⁴ cm/s
  - 10⁵ cm/s
- 10⁶ cm/s: extended severe-damage sensitivity case

> 위 SRV 값들은 **[모델 가정: log-scale sensitivity levels]**이다. "GaN의 물리 범위"나 상한으로 부르지 않는다.

문헌 참고: InGaN µLED modeling에서 7.5×10³ cm/s가 size-dependent data로부터 추정된 사례가 있다. 단 이는 특정 모델/데이터의 effective value이다.

## 해야 할 일

1. T-2022.03 manual에서 SurfaceSRH syntax와 단위를 먼저 확인한다.
2. sidewall boundary에만 surface recombination을 적용한다.
3. 각 L에서 동일한 SRV set을 sweep한다.
4. 다음 결과를 저장한다.
   - I-V
   - R_SRH map
   - R_rad map
   - electron/hole density
   - current density
   - efficiency metrics

## Efficiency metric 정의

### Diagnostic A — MQW recombination quality

\[
\eta_{rec}=\frac{\int_{MQW}R_{rad}dV}{\int_{MQW}(R_{rad}+R_{SRH}+R_{Auger})dV}
\]

MQW 안에서 재결합한 carrier 중 radiative fraction을 본다.

### Main B — current-normalized internal efficiency

\[
\eta_{int,I}=\frac{q\int_{MQW}R_{rad}dV}{I_{terminal}}
\]

이 값을 **Design Window의 주 효율 지표**로 사용한다. 단, 2D integrated rate와 terminal current의 단위가 일치하는지 manual로 검증하기 전에는 최종값으로 채택하지 않는다. `[Manual 확인 필요]`

## Sidewall loss output

가능하면

\[
f_{SRH,side}=\frac{q\int_{sidewall}R_{SRH,surf}dA}{I_{terminal}}
\]

형태의 surface loss fraction을 계산한다. 정확한 Sentaurus integration 방법은 manual 확인 후 구현한다.

## Gate 5 — 통과 조건

- [ ] SRV가 변할 때 sidewall 인근 recombination 변화가 spatial map에서 확인된다.
- [ ] 작은 L일수록 surface contribution이 커지는 trend가 문헌과 정성적으로 일치하는지 확인했다.
- [ ] η_rec와 η_int,I의 차이를 설명할 수 있다.
- [ ] 결과가 이상하면 SRV를 조작해 맞추지 않고 원인을 기록한다.

---

# Phase 6 — Model B: Finite Damaged-Region Model

## 이 단계에서 하려는 것

두 번째 가설을 독립적으로 검증한다.

> **"surface boundary 하나가 아니라 sidewall 안쪽의 유한 폭 defect-rich region이 필요할까?"**

## 핵심 용어

- **d_dmg**: TCAD에서 실제로 정의하는 `modeled damaged-region thickness`
- **w_eff**: 실험/fitting/simulation에서 관측되는 `effective sidewall recombination-affected width`

두 개를 같은 값으로 쓰지 않는다.

Liu (2025) review는 plasma structural damage가 수십 nm 수준으로 보고된 사례들과, 발광/수명 영향 영역이 수백 nm~µm로 확장되는 사례를 구분한다. [원문 확인 Review / 일부 값은 Review 재인용]

## 왜 w_eff를 geometry input으로 직접 쓰지 않는가

w_eff에는 diffusion/transport 영향이 이미 포함될 수 있다. Sentaurus는 carrier diffusion을 다시 계산하므로 w_eff를 그대로 defect region 두께로 사용하면 sidewall effect를 **double-counting**할 위험이 있다.

## 초기 d_dmg sensitivity

- 20 nm
- 50 nm
- 100 nm

`[모델 가정: Liu review의 tens-of-nm structural damage 보고를 참고한 sensitivity set. 특정 ICP 조건의 실측값으로 주장하지 않음]`

## damaged region의 defect strength

초기에는 복잡한 trap spectrum 대신 damaged-region lifetime을 bulk 대비 단계적으로 감소시키는 reduced model을 사용한다.

예: τ_dmg / τ_bulk = 0.1 / 0.01 `[모델 가정]`

정확한 trap energy/cross-section을 사용할 경우 반드시 원논문 또는 T-2022.03 지원 모델을 확인한 뒤 별도 버전으로 확장한다.

## Model competition 규칙

Phase 6에서는 SurfaceSRH를 동시에 자유 fitting하지 않는다.

- Model A = surface-only
- Model B = damaged-region-only

**둘을 먼저 독립적으로 비교한다.**

## Gate 6 — 통과 조건

- [ ] d_dmg와 w_eff를 명확히 구분했다.
- [ ] damaged-region parameter가 `[모델 가정]`인지 문헌값인지 구분했다.
- [ ] Model B 결과를 Model A와 동일 bias/mesh/output 기준으로 비교했다.
- [ ] 더 많은 fitting parameter가 있다는 이유만으로 RMSE가 낮아진 것을 "물리적으로 더 맞다"고 결론내리지 않았다.

---

# Phase 7 — Calibration · 독립 Validation · 모델 선택

## 이 단계에서 하려는 것

이제부터가 실제 연구의 신뢰도를 결정한다. TCAD가 우리가 넣은 값을 그대로 되돌려주는 순환논증이 되지 않도록 **문헌 데이터로 calibration하고 다른 데이터로 validation**한다.

## Calibration 후보

### Wong et al. (2019) [원문 초록 확인]

- InGaN/GaN µLED
- 10×10 ~ 100×100 µm²
- chemical treatment + ALD passivation
- treated device에서 size-independent peak EQE 보고

→ size-dependent treatment trend calibration에 적합.

### Wong et al. (2018) [원문 확인]

- 20×20 µm² peak EQE: no passivation 24%, ALD passivation 33%
- ALD가 PECVD 대비 uniform emission / lower leakage를 보였음

→ passivation 전후 상대 trend 검토에 사용.

## Independent validation 후보

### Ley et al. (2020) [원문 초록/공식 publication page 확인]

- InGaN/GaN, mesa diameter 2–100 µm
- chemical treatment + Al₂O₃
- peak EQE 약 8–10% → 12–13.5% (100→2 µm 방향)
- 처리 후 size-dependent ABC curve shape가 거의 동일
- measurable leakage가 없었다고 보고

→ calibration에 사용하지 않은 경우 validation/upper-bound trend로 활용.

### Shin (2024) [원문 확인]

- size 10/20/50/100/300 µm
- leakage / ideality factor / J-L / low-current EL 비교
- 10 µm Al₂O₃+SiNx double passivation에서 −3 V leakage 95.8% 감소

→ optical IQE anchoring보다는 electrical/size/passivation trend cross-check에 사용.

## Model selection 기준

단순 RMSE 하나만 보지 않는다.

1. size trend를 설명하는가?
2. J@peak 또는 current-dependent efficiency trend를 설명하는가?
3. spatial recombination map이 물리적으로 plausible한가?
4. 필요한 parameter가 문헌상 가능한 범위인가?
5. parameter 수가 지나치게 많지 않은가?

## Hybrid model 도입 조건

Model A와 Model B 중 하나로 독립 validation까지 충분히 설명되면 **hybrid를 만들지 않는다.**

둘 다 실패한 경우에만

`SurfaceSRH + finite damaged region`

hybrid model을 추가한다.

## Gate 7 — 통과 조건

- [ ] calibration dataset과 validation dataset이 겹치지 않는다.
- [ ] model 선택 이유가 RMSE + physical plausibility로 설명된다.
- [ ] fitting한 parameter를 재료 고유 상수라고 부르지 않는다.
- [ ] validation 실패 시 Design Window 작성으로 넘어가지 않는다.

---

# Phase 8 — Sidewall-Quality Design Window

## 이 단계에서 하려는 것

검증된 모델을 사용해서 **"몇 µm에서 sidewall quality가 어느 수준이어야 효율 손실이 허용 범위 안인가?"**를 map으로 만든다.

## Efficiency penalty 정의

같은 pixel size L에서 비교한다.

\[
P_{\eta}(L)=\left[1-\frac{\eta_{case}(L)}{\eta_{reference}(L)}\right]\times100\%
\]

주 지표는 `η_int,I`를 사용한다.

### Reference 정의

- 같은 L
- 같은 epi/contact/bias
- sidewall만 idealized 또는 best-calibrated condition

**100 µm device를 모든 size의 reference로 쓰지 않는다.** 그러면 size 자체의 다른 효과가 섞인다.

## Penalty contour

문헌에는 universal allowable sidewall-induced efficiency loss = 10%라는 표준이 확인되지 않았다.

따라서 모두 표시한다.

- **5% contour**: stringent
- **10% contour**: primary engineering criterion `[프로젝트 기준]`
- **20% contour**: warning / loose criterion

10%를 산업 표준이라고 부르지 않는다.

## Peak vs operating-point

가능하면 둘 다 계산한다.

- Peak efficiency penalty
- 특정 operating current density에서의 penalty

단, AR/VR용 operating current density는 근거 없이 정하지 않는다. 문헌/시스템 요구가 확보되기 전에는 여러 J에서 비교한다.

## 필수 Figure

1. η_int,I vs J — size별
2. η_int,I vs J — sidewall parameter별
3. R_SRH 2D map
4. R_rad 2D map
5. electron/hole density map
6. surface/volume loss contribution
7. 5/10/20% Design Window contour
8. Model A vs B validation plot

## Gate 8 — 통과 조건

- [ ] Design Window는 독립 validation을 통과한 모델로만 작성했다.
- [ ] 10%가 프로젝트 engineering criterion임을 명시했다.
- [ ] 모든 contour의 reference 정의가 같다.
- [ ] 결과에 uncertainty/sensitivity를 함께 표시했다.

---

# Phase 9 — Wet/ALD 공정 해석 + CMP Runsheet + 최종 패키지

## 이 단계에서 하려는 것

TCAD parameter space를 실제 CMP 공정 언어로 번역하되, **실험 calibration이 없는 공정시간·농도·막두께의 최적값을 꾸며내지 않는다.**

## 공정 해석 원칙

Liu (2025) review는 sidewall mitigation을 크게

1. damaged layer removal
2. sidewall surface passivation
3. carrier transport control

로 분류한다. [원문 확인 Review]

본 CMP에서는 현재 주제 범위를 유지하여:

- Wet chemical treatment → damaged material removal에 주로 연결
- ALD passivation → surface/interface state suppression에 주로 연결

한다.

하지만 이것은 1:1 mapping이 아니다.

- Wet도 SRV/Dit/morphology/band bending을 바꿀 수 있다.
- ALD도 Qf/band bending 등 여러 효과를 가질 수 있다.

## CMP conceptual Runsheet

```text
MOCVD InGaN/GaN epi
  ↓
ITO / contact preparation
  ↓
Mesa definition + ICP-RIE
  ↓
Wet chemical treatment (KOH or TMAH candidate)
  ↓
ALD conformal passivation
  ↓
[optional baseline comparison] PECVD second layer
  ↓
Contact opening / metal
  ↓
Electrical + optical characterization
```

> 위 Runsheet는 **공정 순서 개념도**이다. Wet 농도·시간, ALD 두께의 최적값은 `[실험 calibration 필요]`이다.

## 최종 결과물

1. 연구 목적 1페이지
2. baseline device cross-section
3. source-tagged parameter table
4. Phase별 TCAD code/version
5. mesh policy
6. Model A/B 비교
7. independent validation
8. loss budget
9. Design Window map
10. conceptual process Runsheet
11. limitations / unverified items
12. 논문–가이드라인 traceability table

## Gate 9 — 최종 완료 조건

- [ ] 그래프마다 입력조건/단위/모델 버전이 기록되어 있다.
- [ ] 예상과 실제 시뮬레이션 결과가 구분되어 있다.
- [ ] 가정값은 모두 `[모델 가정]`으로 표시되어 있다.
- [ ] 공정 최적값을 실험 없이 주장하지 않는다.
- [ ] 독립 validation이 존재한다.
- [ ] 다른 사람이 같은 파일과 조건으로 재실행할 수 있다.

---

# 공통 결과 저장 규칙

각 Run은 최소한 아래 metadata를 남긴다.

```text
RUN_ID
Phase
Date
Sentaurus Release
Geometry version
Mesh version
Physics version
Pixel size L
SRV
Damage-region model
Modeled d_dmg
Damage lifetime/trap setting
Bias range
Current normalization
Output file path
Converged? Y/N
Gate pass? Y/N
Notes
```

파일명 예:

```text
P05_L10_SRV1e4_v01_des.plt
P06_L10_DMG50nm_TAU001_v01_des.plt
```

---

# 초보자용 "결과가 이상할 때" 순서

1. **단위**를 먼저 확인한다.
2. Contact와 bias direction을 확인한다.
3. Mesh가 MQW와 sidewall에 충분한지 확인한다.
4. 한 번에 넣은 physics를 하나씩 끈다.
5. equilibrium → low bias → high bias 순으로 ramp한다.
6. 이전 Phase의 정상 baseline으로 돌아간다.
7. 예상 그래프를 만들기 위해 parameter를 임의 조작하지 않는다.

---

# 참고 논문 및 가이드라인 사용 위치

| ID | 문헌 | 이 가이드에서 사용한 부분 |
|---|---|---|
| R1 | Shin, S. (2024), *Study of Double-Layer Passivation Effects in InGaN-based Blue Micro LEDs*, GIST Master Thesis | Phase 2의 baseline geometry, Phase 4 size set, Phase 7 electrical/passivation cross-check, Phase 9 double-layer process context |
| R2 | Wong et al. (2018), *High efficiency of III-nitride micro-light-emitting diodes by sidewall passivation using atomic layer deposition*, Optics Express 26, 21324–21331, DOI 10.1364/OE.26.021324 | Phase 2의 6×MQW 실행 proxy, Phase 7 ALD vs no-passivation trend, EQE 24→33% @20 µm |
| R3 | Wong et al. (2019), *Size-independent peak efficiency of III-nitride micro-light-emitting-diodes using chemical treatment and sidewall passivation*, Applied Physics Express 12, 097004, DOI 10.7567/1882-0786/ab3949 | Phase 7 calibration 후보, chemical treatment + ALD 후 10–100 µm size-independent peak EQE trend |
| R4 | Ley et al. (2020), *Revealing the importance of light extraction efficiency in InGaN/GaN microLEDs via chemical treatment and dielectric passivation*, Applied Physics Letters 116, 251104, DOI 10.1063/5.0011651 | Phase 7 independent validation/treated upper-bound trend, Phase 8에서 LEE와 internal efficiency 구분 |
| R5 | Liu et al. (2025), *Advanced technologies in InGaN micro-LED fabrication to mitigate the sidewall effect*, Light: Science & Applications 14:64, DOI 10.1038/s41377-025-01751-y | Phase 6의 physical damage vs effective influence width 구분, Phase 9의 damaged-layer removal/passivation/carrier-path 분류 |
| R6 | David, A. (2021), *Long-Range Carrier Diffusion in (In,Ga)N Quantum Wells and Implications from Fundamentals to Devices*, Physical Review Applied 15, 054015, DOI 10.1103/PhysRevApplied.15.054015 | Phase 3의 carrier-density-dependent diffusion, representative A/B/C sensitivity baseline, L_D를 full TCAD independent knob로 쓰지 않는 근거 |
| R7 | Park et al. (2022), *Understanding the Sidewall Passivation Effects in AlGaInP/GaInP Micro-LED*, Nanoscale Research Letters 17:29, DOI 10.1186/s11671-022-03669-5 | Phase 7의 ABC→effective SRV extraction 방법론, J@peak의 sidewall sensitivity. **AlGaInP 수치는 InGaN에 직접 이식하지 않음** |
| R8 | Bulashevich & Karpov (2018), *Effect of Die Shape and Size on Performance of III-Nitride Micro-LEDs: A Modeling Study*, Photonics 5(4), 41 | Phase 5의 SRV order-of-magnitude 참고(7.5×10³ cm/s effective extraction 사례). 본 프로젝트 SRV set의 확정값 아님 |
| R9 | Wang et al. (2026), *Optoelectronic performance enhancement of 1–5 μm InGaN-based micro-LEDs using chemical etching coupled with dielectric passivation*, Applied Physics Letters, DOI 10.1063/5.0328266 | 최신 문헌 scope check. Chemical etching + dielectric passivation + APSYS가 이미 수행되었음을 고려해 본 CMP의 기여를 "validated parameter design window"로 제한하는 근거 |

---

# 마지막 한 문장

> **이 프로젝트의 성공은 특정 KOH 시간이나 Al₂O₃ 두께를 맞히는 것이 아니라, 문헌으로 검증된 TCAD 모델을 통해 “소자가 작아질수록 sidewall에서 어디로 carrier가 손실되고, 그 손실을 어느 수준까지 줄여야 하는가”를 재현 가능하게 제시하는 것이다.**
