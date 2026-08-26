# CMP Micro-LED Sidewall TCAD 연구 가이드라인 v1.1

> **공식 연구 주제**  
> AR/VR용 InGaN/GaN 청색 Micro-LED의 dry-etch sidewall damage를 TCAD로 정량화하고, wet chemical treatment + ALD passivation이 요구되는 sidewall-quality 범위를 도출하여 발광효율·누설전류·신뢰성 개선 방향을 제시한다.
>
> **실행용 핵심 질문**  
> “10 µm급 문헌 기반 InGaN/GaN Micro-LED에서 sidewall defect가 carrier loss와 leakage/efficiency에 어떤 영향을 주며, 그 손실을 줄이기 위해 어느 수준의 sidewall quality가 필요한가?”
>
> **이 문서의 지위**  
> 이 파일은 CMP TCAD 프로젝트의 **source-of-truth 가이드라인**이다. 대화 중 새 아이디어가 생겨도 이 문서와 충돌하면 먼저 근거를 검증하고 문서를 갱신한 뒤 진행한다.

---

## 0. 가장 중요한 운영 원칙

이 가이드라인은 “코드가 실행되면 성공”이라는 방식을 금지한다. **각 Phase의 Gate를 통과하지 못하면 다음 Phase로 넘어가지 않는다.** 특정 숫자를 원하는 결과에 맞추는 것이 아니라, 검증되지 않은 시뮬레이션을 최종 결과로 채택하지 않는 절차를 따른다.

### 0.1 출처 태그

- **[원문 확인]**: 논문/학위논문 원문에서 직접 확인한 사실
- **[출판사 원문 페이지 확인]**: 출판사 공식 full-text/본문 페이지에서 직접 확인한 사실
- **[원문 초록 확인]**: 공식 초록/출판 페이지에서 확인한 사실
- **[Review 재인용]**: 리뷰에서 확인했으나 원 실험 논문은 아직 직접 대조하지 않은 값
- **[현재 환경 확인]**: 현재 사용하는 Sentaurus 설치 환경에서 확인된 사실
- **[모델 가정]**: 실험에서 정해진 값이 아니라 계산을 위해 둔 가정
- **[프로젝트 기준]**: 본 CMP에서 비교를 위해 정의한 기준. 산업 표준이 아님
- **[Manual 확인 필요]**: Sentaurus T-2022.03 User Guide/설치 예제로 확인하기 전에는 문법을 확정하지 않음
- **[실험 calibration 필요]**: 공정시간·농도·두께와 TCAD 파라미터의 정량 대응을 TCAD만으로 확정할 수 없음
- **[미확정]**: 현재 신뢰 가능한 공개 근거로 확정하지 못한 값. 임의 입력 금지

### 0.2 절대 금지

1. SRV, Dit, Qf, damage width를 재료의 보편 상수처럼 사용하지 않는다.
2. `KOH 5 min → SRV = 1e3 cm/s`처럼 공정조건과 TCAD 파라미터를 근거 없이 1:1 연결하지 않는다.
3. `w_eff`를 실제 ICP-RIE lattice damage depth와 동일시하지 않는다.
4. 2D 결과에 단순히 ×2 또는 ×4를 해서 실제 정사각형 pixel의 네 sidewall 효과라고 주장하지 않는다.
5. 같은 데이터로 fitting하고 같은 데이터를 다시 validation이라고 부르지 않는다.
6. Reverse leakage 감소만으로 TAT 등 특정 mechanism을 확정하지 않는다.
7. 결과가 예상과 다르면 값을 억지로 조정해서 예상 그래프를 만들지 않는다.
8. 서로 다른 논문의 geometry/도핑/trap 값을 출처 표시 없이 섞어 하나의 “원 논문 구조”라고 부르지 않는다.
9. TCAD 논문이라는 이유만으로 사용 simulator가 Sentaurus라고 가정하지 않는다.
10. 상용 AR 글래스 업체의 비공개 pixel/epi 구조를 추정하여 “제품 구조”라고 사용하지 않는다.

---

# 전체 Research Workflow

```text
Phase 0  환경·논문·단위 잠금
   ↓
Phase 1  GaN PiN 파이프라인/기준 소자 동작 확인
   ↓
Phase 2  10 µm InGaN/GaN MQW Micro-LED 기준 소자 구축
   ↓
Phase 3  Polarization + Recombination physics 고정
   ↓
Phase 4  Size scaling / 2D normalization sanity check
   ↓
Phase 5  Model A: Surface-only sidewall recombination
   ↓
Phase 6  Model B: Finite damaged-region / trap model
   ↓
Phase 7  문헌 Calibration · 독립 Validation · 모델 선택
   ↓
Phase 8  Sidewall-quality Design Window 작성
   ↓
Phase 9  Wet/ALD 공정 해석 + CMP Runsheet + 최종 결과물
```

---

# Phase 0 — 환경·논문·단위 잠금

## 목적

TCAD 계산 전에 Sentaurus 버전, 구조/파라미터 출처, 단위와 미확정 항목을 잠근다. 그래프가 이상할 때 코드 문제인지 물리 문제인지 분리할 수 있어야 한다.

## 현재 확인된 환경

- Sentaurus release: **T-2022.03** [현재 환경 확인]
- Shell: **csh/tcsh 계열** [현재 환경 확인]
- 현재 실행 확인 도구: `sde`, `sdevice`, `swb`, `sprocess` [현재 환경 확인]
- GaN PiN 공식 예제 계열 작업본을 별도 보존 [현재 환경 확인]
- EMW license: **미확인**

## 해야 할 일

1. 공식 예제 원본과 작업본을 분리한다.
2. solver/license/environment 정상 동작을 확인한다.
3. `PARAMETER_MASTER.md`를 모든 수치의 source-of-truth로 사용한다.
4. Geometry는 µm를 사용해도 되지만 cm 기반 식/파라미터와 변환을 명시한다.
5. Current, current density, 2D/cylindrical normalization의 정의를 기록한다.
6. 모르는 Sentaurus keyword는 추측하지 않는다.

## 필수 단위 검산

정사각형 pixel에서

\[
P/A=4/L
\]

SRV가 cm/s이면 L을 µm로 쓸 때

\[
P/A=4\times10^4/L_{\mu m}\;[cm^{-1}]
\]

이다.

## Gate 0

- [ ] 실행 환경과 버전이 확인되어 있다.
- [ ] 파라미터 표의 모든 숫자에 출처 또는 `[모델 가정]`이 붙어 있다.
- [ ] 길이/전류/전류밀도 단위 정의가 문서화되어 있다.
- [ ] 모르는 Sentaurus keyword를 추측해 넣지 않았다.

---

# Phase 1 — GaN PiN 파이프라인/기준 소자 동작 확인

## 목적

최종 Micro-LED를 만들기 전 **SDE → mesh → SDevice → equilibrium → forward/reverse sweep → 결과 저장** 파이프라인과 기본 GaN diode physics를 검증한다. 이 소자는 최종 Micro-LED 구조가 아니다.

## 현재 prototype의 지위

현재 `CMP_PIN_DIODE_Copy1`은 GaN PiN 계열 prototype이다. InGaN MQW가 없으므로 최종 소자로 승계하지 않는다. 다만 mesh/interface refinement, bias sweep, SDevice 실행·로그 확인 방식은 재사용할 수 있다.

## 해야 할 일

1. 0 V equilibrium solution을 확인한다.
2. 순방향 I–V가 diode-like인지 확인한다.
3. 역방향 sweep을 안전 범위에서 확인한다.
4. electron/hole density, potential, band edge를 저장한다.
5. Mesh를 한 단계 세밀하게 만든 케이스와 기준 케이스를 비교한다.
6. terminal current normalization을 설명한다.
7. 기존 GaN/Nitride donor trap은 Micro-LED dry-etch damage parameter로 사용하지 않는다. 현재 sensitivity에서 trap 제거 시 -3 V reverse current가 증가했으므로 damage 모델로 검증되지 않았다. [현재 환경 확인]

## Gate 1

- [ ] 0 V equilibrium이 안정적으로 수렴한다.
- [ ] forward bias에서 current가 증가한다.
- [ ] carrier 분포가 물리적으로 설명 가능하다.
- [ ] Mesh refinement 후 핵심 I–V 값 변화가 **≤5%**이다. `[프로젝트 기준]`
- [ ] Current normalization 방식을 설명할 수 있다.

**하나라도 남으면 Phase 2 구조 작성 준비는 할 수 있으나, Phase 1을 complete로 표시하지 않는다.**

---

# Phase 2 — 10 µm InGaN/GaN MQW Micro-LED 기준 소자 구축

## 목적

GaN PiN prototype을 버리지 않고 보존하되, 최종 연구용 기준 소자는 별도 프로젝트로 **문헌 기반 10 µm InGaN/GaN blue Micro-LED**를 새로 구축한다.

## 2.1 Primary TCAD physics baseline — Wu et al. (2023), R10

출판사 공식 본문 페이지에서 다음을 직접 확인하였다. [출판사 원문 페이지 확인]

- lateral dimension: **10 µm**
- n-GaN thickness: **3.9 µm**
- n-GaN Si doping: **5×10¹⁸ cm⁻³**
- **4 × InGaN/GaN MQW**
- In composition in InGaN QW: **0.08**
- InGaN QW thickness: **3 nm**
- GaN barrier thickness: **8 nm**
- p-GaN Mg doping: **2×10¹⁹ cm⁻³**
- acceptor-like traps: **both sidewalls에서 5 nm 이내**에 배치
- applied physics: piezoelectric polarization, Mg incomplete ionization, local-electric-field-related trapping, Radiative/SRH/Auger recombination
- 논문은 AR glasses를 Micro-LED의 응용 예로 명시

### 매우 중요한 미확정 항목

현재 공개 본문에서 아래는 확정하지 않았다.

- p-GaN thickness [미확정]
- contact/metal geometry의 재현에 필요한 모든 치수 [미확정]
- sidewall trap density의 단일 baseline 값과 Sentaurus 입력에 필요한 완전한 trap parameter set [추가 원문 추적 필요]
- 논문에서 사용한 TCAD software vendor가 Sentaurus인지 여부 [미확정]

따라서 **Wu 2023을 “Sentaurus 프로젝트를 그대로 복사할 수 있는 완전한 deck”이라고 부르지 않는다.** 이 논문은 10 µm device geometry의 핵심 MQW/도핑과 sidewall-trap physics를 잡는 primary reference이다.

## 2.2 Experimental/CMP benchmark — Shin (2024), R1

Shin의 GIST 석사학위논문에서 확인된 실제 InGaN/GaN blue Micro-LED 구조/공정 [원문 확인]:

- u-GaN: **1.0–1.2 µm**
- n-GaN: **2 µm**
- InGaN/GaN MQW active layer total: **0.125 µm**
- p-GaN: **0.2 µm**
- ITO: **100 nm**
- mesa etch depth: **1.0–1.1 µm**
- ALD Al₂O₃: **10 nm**
- PECVD SiO₂ 또는 SiNx: **300 nm**
- 10 µm reference의 -3 V reverse leakage current density: **4.713×10⁻⁵ A/cm²**
- 10 µm Al₂O₃+SiNx case의 leakage reduction: **95.8%**

Shin은 개별 QW count/QW/barrier thickness를 명확히 공개하지 않으므로 **Wu의 MQW와 Shin의 전체 epi를 합쳐서 “Shin 구조”라고 부르지 않는다.** Shin은 실제 passivation 및 electrical/optical benchmark 역할을 한다.

## 2.3 Auxiliary full-epi reference — Wong et al. (2018), R2

Wong 2018에서 공개된 구조 [원문 확인]:

- p⁺-GaN: **17 nm**
- p-GaN: **120 nm**
- AlGaN EBL: **26 nm**
- **6 × InGaN/GaN MQW**
  - InGaN QW: **2.4 nm**
  - GaN barrier: **22 nm**
- n-GaN: **4 µm**
- UID GaN: **1.4 µm**

이 구조는 Wu 2023의 빈칸을 자동으로 채우는 값이 아니다. Wu 구조의 미확정 값을 해결하지 못했을 때 **별도 full-epi reference device**로 구현하거나, 특정 값을 차용해야 할 경우 반드시 `[보조 문헌값]`으로 분리 표기한다.

## 2.4 Phase 2 구현 순서

1. 새 프로젝트 `CMP_MICROLED_BASELINE`을 만든다. 기존 PiN prototype은 보존한다.
2. 먼저 Wu 2023에서 확정된 `n-GaN / 4×MQW / p-GaN doping`과 10 µm lateral dimension을 spec sheet에 잠근다.
3. 미확정 geometry/contact/trap 항목을 원문·동일 저자 논문·신뢰 가능한 보조 문헌에서 추가 추적한다.
4. 미확정값이 반드시 필요한데 근거를 찾지 못한 경우 임의 입력하지 않고 `[모델 가정]` 후보를 별도 승인받는다.
5. sidewall trap을 넣기 전에 **ideal/no-sidewall-damage baseline**을 먼저 수렴시킨다.
6. MQW mesh는 QW 3 nm를 충분히 해상할 수 있도록 별도 convergence check를 수행한다.
7. EBL/ITO/복잡 contact는 primary reference와 역할이 확인된 경우에만 단계적으로 추가한다.

## 뽑을 결과

- geometry + mesh cross-section
- band diagram
- electron/hole density in each well
- radiative recombination map
- SRH recombination map
- forward I–V
- current normalization metadata

## Gate 2

- [ ] 사용한 모든 layer thickness/doping/composition이 `PARAMETER_MASTER.md`와 일치한다.
- [ ] Wu 2023 직접값, 보조 문헌값, 모델 가정을 명확히 구분했다.
- [ ] MQW 위치에 quantum-well band profile이 형성된다.
- [ ] forward bias에서 MQW carrier population이 증가한다.
- [ ] radiative recombination이 active region에 집중된다.
- [ ] QW mesh refinement에 대해 핵심 결과의 수렴성을 확인했다.
- [ ] 아직 sidewall damage를 넣지 않은 ideal baseline 결과가 저장되어 있다.

---

# Phase 3 — Polarization + Recombination physics 고정

## 목적

III-nitride MQW에서 중요한 polarization과 SRH/radiative/Auger recombination을 고정한다. 이 단계가 끝나야 이후 sidewall 효과를 추가 손실로 해석할 수 있다.

## Recombination

\[
R=R_{SRH}+R_{rad}+R_{Auger}
\]

ABC reduced model에서는

\[
R\approx An+Bn^2+Cn^3
\]

으로 표현할 수 있다.

David (2021)의 thin-blue-QW discussion에서 사용된 representative sensitivity 값 [원문 확인]:

- A = **1.2×10⁶ s⁻¹**
- B = **3×10⁻¹² cm³/s**
- C = **1×10⁻³¹ cm⁶/s**

이 값은 보편 물성값이 아니라 sensitivity/reference baseline이다.

## 해야 할 일

1. SRH / Radiative / Auger를 단계적으로 활성화하여 수렴을 확인한다.
2. Polarization은 T-2022.03 manual/검증 예제에서 문법과 orientation을 확인한다.
3. Wu 2023에서 사용했다는 사실과 Sentaurus에서 구현하는 구체적 방식은 구분한다.
4. Polarization ON/OFF의 band, carrier, recombination 변화를 확인한다.
5. lifetime/A-B-C/material parameter sensitivity를 수행한다.
6. diffusion length는 full drift-diffusion에서 독립 knob로 두지 않고 derived quantity로 해석한다.

## Gate 3

- [ ] 사용한 recombination model/parameter 출처가 기록되어 있다.
- [ ] Polarization 설정 근거가 T-2022.03 manual/example에 연결되어 있다.
- [ ] radiative/SRH/Auger rate가 공간적으로 설명 가능하다.
- [ ] sensitivity에서도 핵심 결론이 한 임의 숫자에만 의존하지 않는다.

---

# Phase 4 — Size scaling / 2D normalization sanity check

## 목적

sidewall defect를 넣기 전에 pixel size 및 2D geometry가 만드는 수치 artifact를 분리한다.

## Size set

초기 필수:

- **10 µm** — Wu primary TCAD baseline + Shin experimental benchmark 연결점
- **20 µm**
- **50 µm**

필요 시 validation 후 **5 µm / 4 µm / 100 µm**로 확장한다. 4–5 µm는 최종 AR-class scaling study이며, 10 µm baseline 검증 전에 먼저 적용하지 않는다.

## 2D 한계

실제 square pixel은 네 sidewall을 가지지만 일반 2D vertical cross-section은 좌/우 두 sidewall만 직접 가진다. `AreaFactor`는 없는 front/back sidewall boundary를 자동 생성하지 않는다.

## 해야 할 일

1. sidewall defect가 없는 상태에서 L만 변경한다.
2. 동일 mesh policy/bias/physics를 사용한다.
3. 모든 size의 current-density normalization을 동일 정의로 유지한다.
4. 2D↔3D mapping은 문헌/manual 근거를 가진 방법만 사용한다.

## Gate 4

- [ ] size 변경으로 solver/mesh artifact가 발생하지 않는다.
- [ ] 모든 size에서 동일 current-density 정의를 사용한다.
- [ ] 2D와 실제 square device의 차이를 보고서에 명시한다.

---

# Phase 5 — Model A: Surface-only Sidewall Recombination

## 목적

가장 단순한 가설부터 검증한다.

> “sidewall 문제를 surface boundary의 재결합만으로 설명할 수 있는가?”

## 초기 Input

- L = **10 / 20 / 50 µm**
- SRV sensitivity: **10³ / 10⁴ / 10⁵ cm/s** `[모델 가정: log-scale sensitivity]`
- 10⁶ cm/s: severe-damage extension `[모델 가정]`

Bulashevich et al. (2018)의 7.5×10³ cm/s는 그 논문이 선행 문헌에서 가져온 modeling input이며 보편 GaN 상수가 아니다.

## 해야 할 일

1. T-2022.03에서 `SurfaceSRH` 문법/단위를 사용한다. 현재 공식 example에서 S0 단위 cm/s 확인 완료.
2. sidewall boundary에만 surface recombination을 적용한다.
3. 각 L에서 동일 SRV set을 sweep한다.
4. I–V, R_SRH, R_rad, carrier density, current density, efficiency metric을 저장한다.

## Efficiency metric

Diagnostic:

\[
\eta_{rec}=\frac{\int_{MQW}R_{rad}dV}{\int_{MQW}(R_{rad}+R_{SRH}+R_{Auger})dV}
\]

Main candidate:

\[
\eta_{int,I}=\frac{q\int_{MQW}R_{rad}dV}{I_{terminal}}
\]

2D integrated-rate와 terminal current의 단위/normalization을 검증한 방식만 사용한다.

## Gate 5

- [ ] SRV 변화에 따른 sidewall 인근 recombination 변화가 spatial map에서 확인된다.
- [ ] 작은 L에서 surface contribution이 증가하는지 검증한다.
- [ ] 예상과 다를 경우 SRV를 조작해 맞추지 않고 원인을 기록한다.

---

# Phase 6 — Model B: Finite Damaged-Region / Trap Model

## 목적

surface boundary 하나가 아니라 sidewall 안쪽의 유한 폭 defect-rich region 또는 Wu 계열 sidewall-trap representation이 필요한지 독립 검증한다.

## 용어

- `d_dmg`: TCAD에서 실제 정의하는 modeled damaged-region thickness
- `w_eff`: fitting/해석으로 얻는 effective recombination influence width

둘을 동일시하지 않는다.

## 두 경로

### B1. Finite damaged region

초기 sensitivity:

- d_dmg = **20 / 50 / 100 nm** `[모델 가정]`
- τ_dmg / τ_bulk = **0.1 / 0.01** `[모델 가정]`

### B2. Wu 2023 sidewall-trap representation

Wu 2023은 acceptor-like traps를 sidewall에서 5 nm 이내에 둔다. 이 geometry concept은 primary physics reference로 사용 가능하다. 하지만 trap density/energy/capture parameter를 Sentaurus에 입력할 때는 **원문에서 직접 확정된 값만 사용**한다. 부족한 값은 추측하지 않는다.

## Model competition 규칙

- Model A = surface-only
- Model B = damaged-region/trap-only

먼저 독립 비교한다. 둘 다 validation에 실패한 경우에만 hybrid를 고려한다.

## Gate 6

- [ ] d_dmg와 w_eff를 구분했다.
- [ ] 모든 trap/lifetime 입력의 출처를 기록했다.
- [ ] Model A/B를 동일 bias/mesh/output 기준으로 비교했다.
- [ ] 자유도가 많다는 이유만으로 Model B를 우월하다고 결론내리지 않았다.

---

# Phase 7 — Calibration · 독립 Validation · 모델 선택

## 목적

TCAD가 넣은 값을 그대로 되돌려주는 순환논증이 되지 않도록 문헌 데이터로 calibration하고 다른 데이터로 validation한다.

## Calibration/validation 후보

### Wu et al. (2023), R10

- 10 µm TCAD baseline geometry/physics
- sidewall trap density/energy와 radiative recombination size effect 분석
- literature experimental data와 model agreement 보고

→ **sidewall-trap physics 및 size-effect TCAD trend reference**

### Wong et al. (2019), R3

- InGaN/GaN µLED 10×10 ~ 100×100 µm²
- chemical treatment + ALD
- treated device의 size-independent peak EQE

→ treatment/passivation size trend calibration 후보

### Wong et al. (2018), R2

- 20×20 µm peak EQE 약 24% → 33% ALD passivation

→ ALD 전후 상대 optical/electrical trend

### Ley et al. (2020), R4

- InGaN/GaN, mesa 2–100 µm
- chemical treatment + Al₂O₃

→ calibration에 사용하지 않은 경우 independent validation 후보

### Shin (2024), R1

- 10/20/50/100/300 µm
- leakage / ideality / J-L / low-current EL
- 10 µm Al₂O₃+SiNx에서 -3 V leakage **95.8% 감소**

→ **electrical/passivation benchmark**. 95.8%를 모든 TCAD 구조의 의무 target으로 사용하지 않는다.

### Wang et al. (2026), R9

- 1–5 µm InGaN experiment
- ABC-derived SRV + APSYS sidewall-defect simulation

→ 최종 4–5 µm scaling 단계의 close-competitor/scope check 및 validation 후보

## Model selection 기준

1. size trend를 설명하는가?
2. current-dependent efficiency/leakage trend를 설명하는가?
3. spatial recombination map이 plausible한가?
4. parameter가 문헌 근거와 일치하는가?
5. 자유 parameter 수가 과도하지 않은가?

## Gate 7

- [ ] calibration/validation dataset이 겹치지 않는다.
- [ ] model 선택 이유가 error metric + physical plausibility로 설명된다.
- [ ] fitting parameter를 재료 고유 상수라고 부르지 않는다.
- [ ] validation 실패 시 Phase 8로 넘어가지 않는다.

---

# Phase 8 — Sidewall-Quality Design Window

## 목적

검증된 모델로 “pixel이 작아질수록 어느 수준의 sidewall quality가 필요한가?”를 map으로 만든다.

같은 L에서

\[
P_{\eta}(L)=\left[1-\frac{\eta_{case}(L)}{\eta_{reference}(L)}\right]\times100\%
\]

을 사용한다.

## Reference

- 같은 L
- 같은 epi/contact/bias
- sidewall만 idealized 또는 best-calibrated condition

100 µm device를 모든 size의 reference로 쓰지 않는다.

## Project contour

- **5%**: stringent
- **10%**: primary engineering criterion `[프로젝트 기준]`
- **20%**: warning/loose

10%를 산업 표준이라고 부르지 않는다.

## 필수 Figure

1. efficiency metric vs J — size별
2. efficiency metric vs J — sidewall parameter별
3. R_SRH map
4. R_rad map
5. electron/hole map
6. sidewall/volume loss contribution
7. 5/10/20% Design Window
8. Model A/B validation plot

## Gate 8

- [ ] 독립 validation을 통과한 모델만 사용한다.
- [ ] reference 정의를 고정한다.
- [ ] uncertainty/sensitivity를 표시한다.

---

# Phase 9 — Wet/ALD 공정 해석 + CMP Runsheet + 최종 패키지

## 목적

TCAD parameter space를 실제 CMP 공정 언어로 번역하되 **실험 calibration 없이 공정시간·농도·막두께의 최적값을 꾸며내지 않는다.**

## 공식 주제와의 연결

본 CMP의 최종 공정 방향은 유지한다.

- ICP-RIE mesa formation → sidewall damage 발생
- Wet chemical treatment → damaged material/surface cleanup에 주로 연결
- ALD passivation → surface/interface-state suppression에 주로 연결
- 필요 시 double-layer passivation(예: ALD Al₂O₃ + PECVD SiNx)은 Shin 2024 benchmark와 비교

단, Wet/ALD와 SRV/Dit/Qf/damage width는 1:1 mapping이 아니다.

## Conceptual Runsheet

```text
MOCVD InGaN/GaN epi
  ↓
ITO / contact preparation
  ↓
Mesa definition + ICP-RIE
  ↓
Wet chemical treatment (KOH/TMAH 등 문헌 후보)
  ↓
ALD conformal passivation
  ↓
[optional benchmark] PECVD second layer
  ↓
Contact opening / metal
  ↓
Electrical + optical characterization
```

Wet 농도/시간과 ALD 두께의 최적값은 `[실험 calibration 필요]`이다. 단, Shin 2024의 **ALD Al₂O₃ 10 nm + PECVD 300 nm**는 해당 실험의 문헌값으로 benchmark에 사용할 수 있다.

## 최종 결과물

1. 연구 목적
2. baseline cross-section
3. source-tagged parameter table
4. Phase별 TCAD code/version
5. mesh policy/convergence
6. Model A/B 비교
7. independent validation
8. leakage/recombination loss budget
9. Design Window
10. conceptual process Runsheet
11. limitations/unverified items
12. 논문–가이드라인 traceability table

## Gate 9

- [ ] 그래프마다 조건/단위/모델 버전이 기록되어 있다.
- [ ] 예상과 실제 simulation 결과를 구분했다.
- [ ] 가정은 `[모델 가정]`으로 표시했다.
- [ ] 실험 없이 공정 최적값을 주장하지 않는다.
- [ ] 독립 validation이 존재한다.
- [ ] 다른 사람이 같은 파일/조건으로 재실행할 수 있다.

---

# 공통 결과 저장 규칙

각 Run은 최소한 아래 metadata를 남긴다.

```text
RUN_ID
Phase
Date
Sentaurus Release
Reference device / paper ID
Geometry version
Mesh version
Physics version
Pixel size L
SRV / trap setting
Damage model
Modeled d_dmg
Bias range
Current normalization
Output file path
Converged? Y/N
Gate pass? Y/N
Notes
```

파일명 예:

```text
P02_L10_WU2023_IDEAL_v01_des.plt
P05_L10_SRV1e4_v01_des.plt
P06_L10_DMG50nm_TAU001_v01_des.plt
```

---

# 결과가 이상할 때 순서

1. 단위를 확인한다.
2. Contact/bias polarity를 확인한다.
3. mesh가 MQW/sidewall을 해상하는지 확인한다.
4. 한 번에 넣은 physics를 하나씩 끈다.
5. equilibrium → low bias → high bias 순으로 ramp한다.
6. 이전 Phase의 정상 baseline으로 돌아간다.
7. 논문/Manual의 original context와 현재 입력을 비교한다.
8. 예상 그래프를 만들기 위해 parameter를 임의 조작하지 않는다.

---

# 참고 논문 및 가이드라인 사용 위치

| ID | 문헌 | 이 가이드에서 사용한 부분 |
|---|---|---|
| R1 | Shin, S. (2024), *Study of Double-Layer Passivation Effects in InGaN-based Blue Micro LEDs*, GIST Master Thesis | 실제 10 µm benchmark geometry/process, size series, -3 V leakage, ALD Al₂O₃ + PECVD SiNx/SiO₂ passivation |
| R2 | Wong et al. (2018), *High efficiency of III-nitride micro-light-emitting diodes by sidewall passivation using atomic layer deposition*, Optics Express 26, 21324–21331, DOI 10.1364/OE.26.021324 | 공개 full-epi/MQW auxiliary reference, ALD passivation trend |
| R3 | Wong et al. (2019), *Size-independent peak efficiency of III-nitride micro-light-emitting-diodes using chemical treatment and sidewall passivation*, Applied Physics Express 12, 097004, DOI 10.7567/1882-0786/ab3949 | chemical treatment + ALD calibration candidate |
| R4 | Ley et al. (2020), *Revealing the importance of light extraction efficiency in InGaN/GaN microLEDs via chemical treatment and dielectric passivation*, Applied Physics Letters 116, 251104, DOI 10.1063/5.0011651 | independent validation / LEE와 internal efficiency 분리 |
| R5 | Liu et al. (2025), *Advanced technologies in InGaN micro-LED fabrication to mitigate the sidewall effect*, Light: Science & Applications 14:64, DOI 10.1038/s41377-025-01751-y | damage vs effective influence width, wet removal/passivation 분류 |
| R6 | David, A. (2021), *Long-Range Carrier Diffusion in (In,Ga)N Quantum Wells and Implications from Fundamentals to Devices*, Physical Review Applied 15, 054015 | carrier-density-dependent diffusion, representative ABC sensitivity |
| R7 | Park et al. (2022), *Understanding the Sidewall Passivation Effects in AlGaInP/GaInP Micro-LED*, Nanoscale Research Letters 17:29 | extraction methodology만 참고; AlGaInP 수치는 InGaN에 직접 이식 금지 |
| R8 | Bulashevich, Konoplev & Karpov (2018), *Effect of Die Shape and Size on Performance of III-Nitride Micro-LEDs: A Modeling Study*, Photonics 5, 41 | 3D/size/modeling 및 effective SRV 참고 |
| R9 | Wang et al. (2026), *Optoelectronic performance enhancement of 1–5 μm InGaN-based micro-LEDs using chemical etching coupled with dielectric passivation*, Applied Physics Letters, DOI 10.1063/5.0328266 | 1–5 µm scaling, APSYS sidewall-defect model, close competitor/validation |
| **R10** | **Z. Wu et al. (2023), *Physical mechanisms on the size-effect in GaN-based Micro-LEDs*, Micro and Nanostructures 177, 207542, DOI 10.1016/j.micrna.2023.207542** | **Primary 10 µm TCAD physics baseline: 3.9 µm n-GaN, 4× In₀.₀₈GaN/GaN MQW (3/8 nm), n/p doping, 5 nm sidewall-trap region, polarization/trapping/recombination physics** |

---

# 기준 소자 역할 분담 — 혼용 금지 요약

```text
Wu 2023 (R10)
→ Primary 10 µm TCAD physics/device baseline
→ MQW + doping + sidewall trap mechanism

Shin 2024 (R1)
→ Real fabricated 10 µm CMP/passivation benchmark
→ -3 V leakage + ALD/PECVD process trend

Wong 2018/2019 (R2/R3)
→ Full epi auxiliary reference + wet/ALD optical trend

Wang 2026 (R9)
→ 1–5 µm final scaling / close-competitor validation
```

**서로 다른 문헌의 값을 합칠 경우 반드시 항목별 출처를 유지하고, 합성 구조를 특정 원 논문의 ‘그대로 재현’이라고 표현하지 않는다.**

---

# 마지막 한 문장

> **본 프로젝트는 상용 AR 글래스의 비공개 소자를 추정하는 연구가 아니라, 공개·검증 가능한 10 µm InGaN/GaN Micro-LED TCAD/실험 문헌을 기준으로 sidewall damage physics를 재현하고, 검증된 모델을 통해 wet + ALD sidewall healing이 요구되는 설계 범위를 도출한 뒤 4–5 µm AR-class 영역으로 확장하는 연구이다.**