# CMP Micro-LED TCAD — PARAMETER MASTER

> 목적: CMP에서 사용하는 숫자를 `문헌값 / 현재 환경 확인 / 모델 가정 / 프로젝트 기준 / 미확정`으로 분리하여, 근거 없는 값 튜닝과 서로 다른 논문값의 무표시 혼합을 막는다.
>
> 공식 연구 목표: **공개·검증 가능한 10 µm InGaN/GaN 청색 Micro-LED를 기준 소자로 구축하고, dry-etch sidewall defect가 leakage와 radiative/SRH recombination에 미치는 영향을 TCAD로 검증한 뒤, wet chemical treatment + ALD passivation의 효과를 문헌 benchmark와 교차검증하여 sidewall-quality 설계 범위를 도출한다. 이후 검증된 모델만 4–5 µm AR-class scaling으로 확장한다.**

---

## 1. 출처 태그

- `[원문 확인]`: 논문/학위논문 원문에서 직접 확인
- `[출판사 원문 페이지 확인]`: 출판사 공식 full-text/본문 페이지에서 직접 확인
- `[현재 환경 확인]`: 현재 T-2022.03 설치 예제/Training 또는 실제 실행에서 직접 확인
- `[모델 가정]`: sensitivity/비교를 위해 둔 계산 가정
- `[프로젝트 기준]`: CMP 내부 Gate/비교 기준이며 산업 표준이 아님
- `[실험 calibration 필요]`: 공정조건과 TCAD parameter의 직접 1:1 대응은 아직 불가
- `[미확정]`: 현재 신뢰 가능한 공개 근거로 확정하지 못한 값. 임의 확정 금지
- `[보조 문헌값]`: primary device와 다른 논문에서 가져오는 값. 사용 시 원 구조와 혼동 금지

---

## 2. Primary 10 µm TCAD physics baseline — Wu et al. (2023), R10

Z. Wu et al., *Physical mechanisms on the size-effect in GaN-based Micro-LEDs*, Micro and Nanostructures 177 (2023) 207542, DOI 10.1016/j.micrna.2023.207542.

출판사 공식 본문 페이지에서 다음을 확인했다. `[출판사 원문 페이지 확인]`

| 항목 | 값 | 태그 / 용도 |
|---|---:|---|
| lateral dimension | **10 µm** | `[출판사 원문 페이지 확인]` primary baseline |
| n-GaN thickness | **3.9 µm** | `[출판사 원문 페이지 확인]` |
| n-GaN Si doping | **5×10¹⁸ cm⁻³** | `[출판사 원문 페이지 확인]` |
| MQW count | **4** | `[출판사 원문 페이지 확인]` |
| In composition in QW | **0.08** | `[출판사 원문 페이지 확인]` → In₀.₀₈Ga₀.₉₂N |
| InGaN QW thickness | **3 nm** | `[출판사 원문 페이지 확인]` |
| GaN barrier thickness | **8 nm** | `[출판사 원문 페이지 확인]` |
| p-GaN Mg doping | **2×10¹⁹ cm⁻³** | `[출판사 원문 페이지 확인]` |
| sidewall trap type | **acceptor-like** | `[출판사 원문 페이지 확인]` |
| sidewall trap location | **both sidewalls에서 5 nm 이내** | `[출판사 원문 페이지 확인]` |
| physics | piezoelectric polarization, Mg incomplete ionization, local-electric-field-related trapping, Radiative/SRH/Auger | `[출판사 원문 페이지 확인]` |
| target application context | AR glasses 포함 next-generation display | `[출판사 원문 페이지 확인]` |

### R10 미확정 항목 — 코드 입력 전 blocker

| 항목 | 상태 | 규칙 |
|---|---|---|
| p-GaN thickness | `[미확정]` | 원문/동일 저자 자료 추가 추적 후 결정 |
| complete contact geometry | `[미확정]` | 그림/원문에서 재현 가능한 치수 확인 전 임의 설정 금지 |
| exact sidewall trap density baseline | `[미확정]` | 논문 sweep/figure 원값 추가 추적 필요 |
| exact trap energy/capture parameter set for Sentaurus | `[미확정]` | Sentaurus 형식으로 임의 번역 금지 |
| TCAD software vendor | `[미확정]` | **Sentaurus라고 주장하지 않음** |

> R10은 **primary TCAD physics/device reference**이지, 현재 단계에서 “Sentaurus deck을 그대로 복사 가능한 완전한 구조”는 아니다.

---

## 3. 핵심 실험/CMP benchmark — Shin (2024), R1

| 항목 | 값 | 태그 / 용도 |
|---|---:|---|
| 기준 device size | **10 µm** | `[원문 확인]` main experimental benchmark |
| −3 V reverse leakage current density, reference | **4.713×10⁻⁵ A/cm²** | `[원문 확인]` |
| Al₂O₃ + SiNₓ 후 leakage reduction | **95.8%** | `[원문 확인]` |
| 95.8% 저감 시 환산 J | **≈1.98×10⁻⁶ A/cm²** | `[원문 확인에서 계산]` = 4.713×10⁻⁵×0.042 |
| u-GaN | **1.0–1.2 µm** | `[원문 확인]` |
| n-GaN | **2 µm** | `[원문 확인]` |
| total MQW active thickness | **0.125 µm** | `[원문 확인]`; 개별 QW/barrier 정보 미공개 |
| p-GaN | **0.2 µm** | `[원문 확인]` |
| ITO | **100 nm** | `[원문 확인]` |
| mesa etch depth | **1.0–1.1 µm** | `[원문 확인]` |
| ALD Al₂O₃ | **10 nm** | `[원문 확인]` |
| PECVD SiO₂ or SiNₓ | **300 nm** | `[원문 확인]` |

> **95.8%는 모든 TCAD 모델이 의무적으로 맞춰야 하는 target이 아니다.** Shin의 10 µm 구조/공정에서 얻은 experimental benchmark이다. 다른 epi/geometry를 쓰면서 95.8%를 억지 fitting하지 않는다.

---

## 4. Auxiliary full-epi / MQW reference — Wong et al. (2018), R2

Wu 2023의 미공개 항목을 자동으로 채우는 값이 아니라, 구조가 상세 공개된 **별도 auxiliary reference**이다.

| 항목 | 값 | 태그 / 용도 |
|---|---:|---|
| MQW count | **6** | `[원문 확인] [보조 문헌값]` |
| InGaN QW | **2.4 nm** | `[원문 확인] [보조 문헌값]` |
| GaN barrier | **22 nm** | `[원문 확인] [보조 문헌값]` |
| AlGaN EBL | **26 nm** | `[원문 확인] [보조 문헌값]` |
| p-GaN | **120 nm** | `[원문 확인] [보조 문헌값]` |
| p⁺-GaN | **17 nm** | `[원문 확인] [보조 문헌값]` |
| n-GaN | **4 µm** | `[원문 확인] [보조 문헌값]` |
| UID GaN | **1.4 µm** | `[원문 확인] [보조 문헌값]` |
| 20×20 µm peak EQE, unpassivated | **≈24%** | `[원문 확인]` |
| 20×20 µm peak EQE, ALD passivated | **≈33%** | `[원문 확인]` |

### 혼용 규칙

- Wu의 4×MQW에 Wong의 p-GaN thickness/EBL을 넣으면 **Wu 논문 재현 구조가 아니다.**
- 그런 합성 구조가 필요하면 각 layer마다 `R10`, `R2`, `[모델 가정]`을 표시하고 별도 버전명으로 저장한다.
- 가능하면 R10 미확정값을 먼저 원문/동일 저자 후속 자료에서 해결한다.

---

## 5. 현재 GaN PiN prototype — P1 검증용, 최종 Micro-LED 아님

`CMP_PIN_DIODE_Copy1`에서 현재 확인한 핵심 값 `[현재 환경 확인]`:

| 항목 | 값 |
|---|---:|
| 구조 | GaN PiN 계열 2D cylindrical prototype |
| p-GaN thickness | 0.2 µm |
| lightly n-doped placeholder thickness | 0.5 µm |
| n-GaN side thickness to cathode | 총 구조 기준 0.5 µm 영역 포함 |
| p doping | 1×10¹⁹ cm⁻³ |
| placeholder n doping | 1×10¹⁵ cm⁻³ |
| n doping | 1×10¹⁹ cm⁻³ |
| top radius | 2.0 µm |
| bottom radius | 2.45 µm |
| passivation material label | Nitride |
| passivation thickness parameter | 0.1 µm |

### 기존 interface trap sensitivity 결과

기존 GaN/Nitride interface donor trap:

```text
Donor
Conc = 3e13 cm^-2
EnergyMid = 0.36 eV from midgap
 eXsection = 1e-30 cm^2
 hXsection = 1e-14 cm^2
```

실행 결과:

| Case | |Irev| @ −3 V |
|---|---:|
| 기존 3×10¹³ cm⁻² trap | **8.85×10⁻¹⁵ A** |
| no trap | **1.68×10⁻¹⁴ A** |

`[현재 환경 확인]`

이 결과에서는 trap 제거 시 reverse current가 약 1.9배 증가했다. 따라서 **이 donor trap set을 Micro-LED dry-etch sidewall damage parameter로 사용하지 않는다.** P1 파이프라인 검증 결과로만 보존한다.

---

## 6. Sidewall model sensitivity set

### Model A — SurfaceSRH

| 항목 | 값 | 태그 |
|---|---:|---|
| SRV | **10³, 10⁴, 10⁵ cm/s** | `[모델 가정: log-scale sensitivity]` |
| severe extension | **10⁶ cm/s** | `[모델 가정]` 필요 시만 |

### Model B1 — finite damaged region

| 항목 | 값 | 태그 |
|---|---:|---|
| d_dmg | **20, 50, 100 nm** | `[모델 가정]` |
| τ_dmg / τ_bulk | **0.1, 0.01** | `[모델 가정]` |

### Model B2 — Wu sidewall-trap concept

- acceptor-like traps located within **5 nm** of both sidewalls `[출판사 원문 페이지 확인]`
- exact Sentaurus trap spectrum/density/capture parameters: `[미확정]`

### 절대 구분

- `d_dmg`: TCAD에 넣는 modeled defect-rich thickness.
- `w_eff`: fitting/해석에서 얻는 effective influence width.
- full drift-diffusion TCAD에서 diffusion length를 독립 fitting knob로 넣지 않는다.

---

## 7. SurfaceSRH — T-2022.03 검증

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

- `S0` 단위: **cm/s**
- `Sref=0`이면 doping-dependent additional scaling 없이 `s = S0`
- `S0` pair의 electron/hole 순서는 현재 문구만으로 확정하지 않음.
- 초기 sweep에서 두 값을 동일하게 두므로 이 미확정은 blocker가 아님.

---

## 8. 2D current / AreaFactor / recombination normalization

### 8.1 일반 2D

T-2022.03 Training 공식 설명 `[현재 환경 확인]`:

- 일반 2D simulation 기본 simulated width = **1 µm**
- `AreaFactor`는 out-of-plane device width scaling에 사용

> `AreaFactor`는 square pixel의 누락된 front/back sidewall을 생성하지 않는다.

### 8.2 현재 PiN cylindrical prototype

현재 P1은 `Cylindrical(yAxis=0)` 설정을 사용하므로 일반 planar 2D의 A/µm 해석을 그대로 적용하지 않는다. cylindrical terminal current 해석은 현재 실제 run/매뉴얼 확인 내용을 기준으로 별도 기록한다. `[현재 환경 확인]`

### 8.3 Integrated recombination

공식 예:

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

명시적 후처리식과 단위 검산을 사용한다. raw dataset에 `AreaFactor`가 자동 적용되는지 확인 전에는 추정하지 않는다.

---

## 9. Polarization — T-2022.03 검증

`[현재 환경 확인]`

```text
Piezoelectric_Polarization(strain)
```

은 공식 GaN 예제의 strain-based polarization model이다.

### Full strain

개념적으로:

```text
P = P_sp + e · strain_tensor
```

### Simplified strain

공식 Training 적용 가정:

- [0001] growth
- layer 내부 mole fraction 일정
- pseudomorphic growth assumption

```text
strain = (1-relax) * (a0-a)/a
```

- `relax=0`: no stress relaxation
- `relax=1`: fully relaxed
- Formula=1 / Formula=2는 공식 문서의 simplified formulations

### CMP 적용 원칙

- Wu 2023이 polarization model을 사용했다는 사실과 **Sentaurus에서 어떤 exact implementation을 선택하는지**는 구분한다.
- MQW orientation/strain assumption을 확인한 뒤 T-2022.03 방식으로 구현한다.
- `Activation`을 결과 fitting용 임의 knob로 쓰지 않는다.

---

## 10. Reduced-model recombination sensitivity

David (2021)의 representative thin-blue-QW coefficients `[원문 확인]`:

| 계수 | 값 |
|---|---:|
| A | **1.2×10⁶ s⁻¹** |
| B | **3×10⁻¹² cm³/s** |
| C | **1×10⁻³¹ cm⁶/s** |

이 값은 sensitivity/reference baseline이며 full TCAD material parameter와 무비판적으로 동일시하지 않는다.

---

## 11. 프로젝트 수치 기준

| 기준 | 값 | 태그 |
|---|---:|---|
| Gate 1 mesh refinement 핵심 I–V 변화 | **≤5%** | `[프로젝트 기준]` |
| Design Window penalty contour | **5%, 10%, 20%** | `[프로젝트 기준]` |
| 대표 decision contour | **10%** | `[프로젝트 기준]`; 산업 표준 아님 |

---

## 12. 단위 규칙

- Geometry working unit: **µm**
- `1 µm = 10⁻⁴ cm`
- `1 nm = 10⁻⁷ cm`
- square pixel: `P/A = 4/L`
- SRV가 cm/s일 때: `P/A = 4×10⁴ / L_µm [cm⁻¹]`
- terminal current와 current density를 혼용하지 않는다.
- Shin leakage benchmark 비교 단위는 **A/cm²**.
- planar 2D, cylindrical 2D, 실제 square 3D의 normalization을 구분한다.

---

## 13. 현재 blocker / 다음 검증 대상

### P1 잔여

1. mesh refinement 후 핵심 forward I–V/Vknee 변화 ≤5% 확인.
2. 현재 cylindrical prototype의 current normalization 설명 최종 문서화.

### P2 시작 전/초기

1. R10 p-GaN thickness 추가 추적.
2. R10 contact/metal geometry 중 baseline 구현에 필수인 치수 확인.
3. R10 sidewall trap density/energy sweep의 원 숫자 추출.
4. R10 simulator vendor 확인 시도. 확인되지 않으면 “generic TCAD → Sentaurus translation”으로 명시.
5. Wu 직접값과 보조 문헌값을 섞지 않는 `P2_SPEC.md` 작성.

---

# 역할 분담 요약

```text
R10 Wu 2023
= Primary 10 µm TCAD physics/device baseline

R1 Shin 2024
= Real 10 µm experimental/passivation benchmark

R2/R3 Wong 2018/2019
= Auxiliary full-epi + wet/ALD trend

R9 Wang 2026
= 1–5 µm final scaling / competitor validation

Current GaN PiN
= Pipeline prototype only
```

**새로운 숫자는 이 파일에 출처 태그를 붙여 등록하기 전에는 공식 CMP 입력값으로 취급하지 않는다.**