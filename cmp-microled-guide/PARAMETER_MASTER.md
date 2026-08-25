# CMP Micro-LED TCAD — PARAMETER MASTER

> 목적: CMP에서 사용하는 숫자를 `문헌값 / 현재 환경 확인 / 모델 가정 / 프로젝트 기준`으로 분리하여, 근거 없는 값 튜닝을 막는다.
>
> 공식 연구 목표: **Micro-LED 소형화에 따라 증가하는 sidewall 비방사 재결합 및 누설 손실을 검증된 TCAD 모델로 정량화하고, 10 µm InGaN/GaN Micro-LED에서 −3 V 역방향 누설전류를 선행연구 수준인 약 95.8%까지 저감하기 위해 필요한 SRV 및 sidewall-damage 조건을 재현 가능하게 도출한다.**

---

## 1. 출처 태그

- `[원문 확인]`: 논문/학위논문 원문에서 직접 확인
- `[현재 환경 확인]`: 현재 T-2022.03 설치 예제/Training에서 직접 확인
- `[모델 가정]`: sensitivity/비교를 위해 둔 계산 가정
- `[프로젝트 기준]`: CMP 내부 Gate/비교 기준이며 산업 표준이 아님
- `[실험 calibration 필요]`: 공정조건과 TCAD parameter의 직접 1:1 대응은 아직 불가

---

## 2. 핵심 실험 benchmark — Shin (2024)

| 항목 | 값 | 태그 / 용도 |
|---|---:|---|
| 기준 pixel size | **10 µm** | `[원문 확인]` CMP main benchmark |
| −3 V reverse leakage current density, reference | **4.713×10⁻⁵ A/cm²** | `[원문 확인]` |
| Al₂O₃ + SiNₓ 후 leakage reduction | **95.8%** | `[원문 확인]` |
| 95.8% 저감 시 환산 J | **≈1.98×10⁻⁶ A/cm²** | `[원문 확인에서 계산]` = 4.713×10⁻⁵×0.042 |
| u-GaN | **1.0–1.2 µm** | `[원문 확인]` |
| n-GaN | **2 µm** | `[원문 확인]` |
| total MQW active thickness | **0.125 µm** | `[원문 확인]`; 개별 QW/barrier 정보는 미공개 |
| p-GaN | **0.2 µm** | `[원문 확인]` |
| ITO | **100 nm** | `[원문 확인]` |
| mesa etch depth | **1.0–1.1 µm** | `[원문 확인]` |
| ALD Al₂O₃ | **10 nm** | `[원문 확인]` |
| PECVD SiO₂ or SiNₓ | **300 nm** | `[원문 확인]` |

> 주의: **95.8%는 TCAD가 반드시 맞춰야 하는 보편 목표가 아니라 10 µm benchmark이다.** 모델 calibration/validation 과정에서 사용하며, 구조·물성 차이를 숨기지 않는다.

---

## 3. 실행 가능한 MQW proxy — Wong et al. (2018)

Shin 구조는 개별 QW/barrier가 공개되지 않았으므로, MQW 구현 단계에서는 공개 구조를 가진 Wong 2018을 **execution proxy**로 사용한다.

| 항목 | 값 | 태그 / 용도 |
|---|---:|---|
| MQW count | **6** | `[원문 확인]` |
| InGaN QW | **2.4 nm** | `[원문 확인]` |
| GaN barrier | **22 nm** | `[원문 확인]` |
| AlGaN EBL | **26 nm** | `[원문 확인]` |
| p-GaN | **120 nm** | `[원문 확인]` |
| p⁺-GaN | **17 nm** | `[원문 확인]` |
| n-GaN | **4 µm** | `[원문 확인]` |
| UID GaN | **1.4 µm** | `[원문 확인]` |
| 20×20 µm peak EQE, unpassivated | **≈24%** | `[원문 확인]`; 10 µm benchmark와 혼용 금지 |
| 20×20 µm peak EQE, ALD passivated | **≈33%** | `[원문 확인]`; validation/reference trend |

---

## 4. Sidewall model sweep

| 항목 | 값 | 태그 / 의미 |
|---|---:|---|
| Surface-only Model A SRV | **10³, 10⁴, 10⁵ cm/s** | `[모델 가정: log-scale sensitivity]` |
| severe SRV extension | **10⁶ cm/s** | `[모델 가정]` 필요 시만 |
| finite damaged-region thickness `d_dmg` | **20, 50, 100 nm** | `[모델 가정]`; tens-nm literature에만 anchored, 특정 ICP damage depth 측정값 아님 |
| damaged/bulk lifetime ratio | **0.1, 0.01** | `[모델 가정]` |

### 절대 구분

- `d_dmg`: TCAD에 넣는 physical-like defect-rich thickness.
- `w_eff`: fitting/해석에서 얻는 **effective recombination influence width**. 실제 lattice damage depth와 동일시 금지.
- full drift-diffusion TCAD에서는 diffusion length를 독립 knob로 넣지 않는다.

---

## 5. SurfaceSRH — T-2022.03 검증

`[현재 환경 확인]`

공식 Applications Library에서 특정 interface에 다음 활성화 문법을 확인함.

```text
Physics (RegionInterface="...") {
  Recombination(SurfaceSRH)
}
```

parameter block 공식 예:

```text
RegionInterface="frontArc/substrate" {
  SurfaceRecombination {
    S0   = 1000, 1000 * [cm/s]
    Sref = 0 * [1]
  }
}
```

- `S0` 단위: **cm/s** `[현재 환경 확인]`
- `Sref=0`이면 doping-dependent 추가 scaling 없이 **s = S0** `[현재 환경 확인]`
- `S0` 두 값의 electron/hole 순서는 현재 확인 문구만으로 명시 확정하지 않음.
- CMP 초기 sweep에서는 두 값을 동일하게 두므로 e/h 순서 미확정이 sweep 자체를 막지는 않음.

---

## 6. 2D current / AreaFactor / recombination normalization

### 6.1 Terminal current

T-2022.03 Sentaurus Training 공식 설명 `[현재 환경 확인]`:

- 2D simulation 기본 simulated width = **1 µm**
- 기본 simulated current의 해석 단위 = **A/µm**
- `AreaFactor`는 실제 device width를 정의하여 terminal current를 해당 폭에 맞게 scaling

따라서 예를 들어 `AreaFactor=10`이면 **10 µm device width**에 대응하는 terminal-current scaling으로 사용한다.

> 주의: 2D AreaFactor는 out-of-plane width를 scaling할 뿐이며, square pixel의 누락된 front/back sidewall을 자동 생성하지 않는다.

### 6.2 Integrated recombination

T-2022.03 `TunnelDiode_IV` 공식 예 `[현재 환경 확인]`:

```text
CurrentPlot {
  srhRecombination(Integrate(Semiconductor))
  AugerRecombination(Integrate(Semiconductor))
  RadiativeRecombination(Integrate(Semiconductor))
}
```

2D raw integrated recombination 주석 단위:

```text
[cm^-3 s^-1] * [um^2]
```

공식 Visual Tcl 후처리:

```text
umtocm = 1e-4
AtomA  = 1e3
q      = ElementaryCharge
wtot   = device width [um]

Jrec[mA/cm^2] = umtocm * AtomA * q * intR / wtot
```

따라서 CMP는 재결합 loss를 current density로 비교할 때 이 **명시적 후처리 방식**을 우선 사용한다.

> `CurrentPlot(...Integrate...)` raw dataset 자체에 `AreaFactor`가 자동 적용되는지 여부는 별도 직접 검증 전까지 주장하지 않는다.

---

## 7. Polarization — T-2022.03 검증

`[현재 환경 확인]`

### 7.1 공통

```text
Piezoelectric_Polarization(strain)
```

은 공식 GaN 예제의 strain-based polarization model이다.

### 7.2 Full strain model

총 polarization은 개념적으로

```text
P = P_sp + e · strain_tensor
```

이므로 **spontaneous + strain-induced piezoelectric polarization**을 함께 포함한다.

### 7.3 Simplified strain model

공식 Training이 제시하는 적용 가정:

- [0001] growth direction
- layer 내부 mole fraction이 일정
- reference layer lattice constant `a0`에 대한 pseudomorphic growth

strain:

```text
strain = (1-relax) * (a0-a)/a
```

- `relax=0`: no stress relaxation
- `relax=1`: fully relaxed
- `Formula=1`: stress-charge coefficient `d31` 기반
- `Formula=2`: strain-charge coefficient `e31` 기반
- 공식 문서는 두 formulation을 equivalent simplified models로 설명함.

### 7.4 GaN parameter-set 예

`DefaultParametersFromFile`과 함께 material DB 값을 사용할 수 있으며, Training의 GaN 예에는:

```text
formula = 1
psp_z   = -3.4e-6 C/cm^2
```

등이 포함됨.

### 7.5 Activation

`activation`은 abrupt polarization change가 만드는 **interface polarization charge를 scaling**한다.

- `activation=0`: 해당 interface polarization effect off
- GaN MOSCAP Training의 `Activation=0.05`는 interface fixed-charge compensation을 가정한 **그 예제 고유 가정**이며 CMP universal default가 아님.

### CMP 적용 원칙

- InGaN/GaN MQW가 [0001], layerwise constant composition, pseudomorphic assumption에 부합하면 **simplified strain model을 baseline 후보**로 사용한다.
- 구조가 이 가정을 벗어나거나 실제 strain tensor가 필요한 경우 full strain model을 고려한다.
- `Activation` 값은 결과를 맞추기 위한 임의 tuning knob로 사용하지 않는다.
- crystal orientation은 TDR 또는 `LatticeParameters`로 반드시 확인한다.

---

## 8. Reduced-model recombination sensitivity

David (2021)의 representative thin-blue-QW coefficients `[원문 확인]`:

| 계수 | 값 |
|---|---:|
| A | **1.2×10⁶ s⁻¹** |
| B | **3×10⁻¹² cm³/s** |
| C | **1×10⁻³¹ cm⁶/s** |

이 값은 보편 물성값이 아니라 **sensitivity/reference baseline**이다. Full TCAD의 실제 material recombination parameter와 무비판적으로 동일시하지 않는다.

---

## 9. 프로젝트 수치 기준

| 기준 | 값 | 태그 |
|---|---:|---|
| Gate 1 mesh refinement 핵심 I–V 변화 | **≤5%** | `[프로젝트 기준]` |
| Design Window penalty contour | **5%, 10%, 20%** | `[프로젝트 기준]` |
| 대표 decision contour | **10%** | `[프로젝트 기준]`; 산업 표준 아님 |

---

## 10. 단위 규칙

- Geometry 표기 기준: **µm**를 기본 working unit으로 사용.
- nm 입력은 필요 시 µm 또는 cm로 명시 변환.
- `1 µm = 10⁻⁴ cm`
- `1 nm = 10⁻⁷ cm`
- square pixel perimeter/area ratio:

```text
P/A = 4/L
```

SRV가 cm/s이면:

```text
P/A = 4×10^4 / L_µm   [cm^-1]
```

- terminal current와 current density를 절대 혼용하지 않는다.
- 논문 leakage benchmark와 비교할 때 최종 단위는 **A/cm²**로 맞춘다.
- 2D 결과를 3D square 4-sidewall 효과라고 단순 ×2/×4 하지 않는다.

---

## 11. 현재 P0 미확정 / 다음 검증 대상

1. SurfaceRecombination `S0=(first,second)` pair의 electron/hole 순서 — 초기 동일 SRV sweep에는 영향 없음.
2. `CurrentPlot(Integrate(...))` raw dataset에 AreaFactor가 직접 적용되는지 — 명시적 후처리식을 쓰므로 현재 핵심 blocker는 아님.
3. 실제 MQW 구축 시 InGaN mole fraction, doping, strain/pseudomorphic assumption은 **P2/P3에서 문헌 근거 또는 `[모델 가정]` 태그로 고정**.

---

## Gate 0 상태

현재까지 T-2022.03에서 **SurfaceSRH / AreaFactor / integrated recombination / polarization 핵심 문법·단위·의미를 검증**하였다.

Gate 0 최종 PASS 전 확인할 것:

- 이 문서를 실제 실행 parameter의 source-of-truth로 사용
- 이후 추가되는 모든 숫자에도 출처 태그 유지
- P1에서 사용할 GaN_PiN baseline의 current normalization을 이 문서 기준으로 설명
