# P2 PARAMETER ASSURANCE — 기준 소자 값의 출처·가정·불확실성 관리

Updated: 2026-08-26
Status: **METHOD LOCK — BASELINE CANDIDATE NOT YET FINAL-LOCKED**

> 목적: 기준 소자의 값이 논문에 없을 때 임의로 채우지 않고, 발표·보고서에서도 출처와 불확실성을 방어할 수 있도록 모든 Sentaurus 입력을 provenance와 sensitivity 기준으로 관리한다.

---

## 1. 가장 중요한 원칙

기준 소자에서 **모든 숫자가 원 논문에 공개되어야 하는 것은 아니다.** 그러나 연구 결론에 영향을 줄 수 있는 값은 반드시 아래 중 하나의 상태를 가져야 한다.

1. 원 논문 직접값
2. 원 논문의 simulation input
3. Sentaurus translation 규칙
4. 명시적 모델 단순화
5. sensitivity/calibration으로 범위가 검증된 가정
6. 아직 해결되지 않은 blocker

**출처가 없는 단일 숫자를 조용히 넣는 것은 금지한다.**

---

## 2. 공식 상태 태그

| 태그 | 의미 | 발표 시 표현 |
|---|---|---|
| `[DIRECT-PHYSICAL]` | 실제 소자의 구조/실험 조건으로 원문에 직접 공개 | “원 논문에 보고된 구조값을 사용했다.” |
| `[DIRECT-SIM]` | 원 논문의 TCAD/APSYS simulation input | “원 논문의 simulation input을 사용했다.” |
| `[TRANSLATION]` | APSYS/generic TCAD 값을 Sentaurus 표현으로 번역 | “물리 의미를 유지하도록 Sentaurus 모델로 변환했다.” |
| `[SIMPLIFIED]` | 연구 목적상 생략/ideal boundary로 치환 | “해당 요소는 연구 변수와 직접 관련이 없어 단순화했다.” |
| `[SENSITIVITY-BOUND]` | 미공개값이나 범위를 sweep하여 결론의 민감도를 확인 | “공개되지 않은 값은 범위 해석을 수행했고 결론이 이 범위에서 유지됨을 확인했다.” |
| `[CALIBRATED]` | 실험 결과를 이용해 추정한 값 | “실험 observable에 대해 calibration한 모델값이며 직접 측정값은 아니다.” |
| `[BLOCKER]` | 결과에 중요하지만 값/범위/검증법이 없음 | “현재 고정 불가. 해결 전 final baseline coding 금지.” |

`[CALIBRATED]`와 `[DIRECT-*]`를 혼동하지 않는다. Calibration dataset과 validation dataset은 분리한다.

---

## 3. 미공개 파라미터 처리 Decision Tree

```text
논문에 값이 있는가?
 ├─ YES → DIRECT-PHYSICAL 또는 DIRECT-SIM
 └─ NO
      ↓
같은 논문 Supplement / 인용 원문 / 동일 wafer·동일 연구그룹 자료에서 확인 가능한가?
 ├─ YES → 출처를 명시하고 잠금
 └─ NO
      ↓
우리 연구 output에 물리적으로 필요한가?
 ├─ NO → SIMPLIFIED 또는 모델에서 제외
 └─ YES
      ↓
합리적인 문헌 범위를 만들 수 있는가?
 ├─ NO → BLOCKER
 └─ YES
      ↓
sensitivity sweep
      ↓
결론 변화가 작은가?
 ├─ YES → SENSITIVITY-BOUND representative value 사용 가능
 └─ NO
      ↓
같은 소자의 실험 observable로 calibration 가능한가?
 ├─ YES → CALIBRATED + independent validation
 └─ NO → BLOCKER / 결과를 uncertainty band로만 보고
```

---

## 4. 기준소자 후보: Chang et al. (2020)에서 직접 확인 가능한 것

Candidate reference:
Le Chang et al., *Alternative Strategy to Reduce Surface Recombination for InGaN/GaN Micro-light-Emitting Diodes—Thinning the Quantum Barriers to Manage the Current Spreading*, Nanoscale Research Letters 15, 160 (2020), DOI 10.1186/s11671-020-03372-3.

### 4.1 Physical/reference values

| 항목 | 원문값 | 현재 판정 |
|---|---:|---|
| chip dimension | 10 × 10 µm² | `[DIRECT-PHYSICAL]` |
| substrate orientation | Si (111) | `[DIRECT-PHYSICAL]` |
| n-GaN thickness | 4 µm | `[DIRECT-PHYSICAL]` |
| n-GaN electron concentration | 5×10^18 cm^-3 | `[DIRECT-PHYSICAL]` **carrier concentration이지 donor doping과 동일하다고 가정하지 않음** |
| MQW count | 4-pair | `[DIRECT-PHYSICAL]` |
| QW composition | In0.18Ga0.82N | `[DIRECT-PHYSICAL]` |
| QW thickness | 3 nm | `[DIRECT-PHYSICAL]` |
| barrier thickness for C/III | 12 nm | `[DIRECT-PHYSICAL]` if C/III is selected |
| p-Al0.15Ga0.85N EBL thickness | 26 nm | `[DIRECT-PHYSICAL]` |
| p-EBL hole concentration | 3×10^17 cm^-3 | `[DIRECT-PHYSICAL]` **Mg dopant density와 동일시 금지** |
| p-GaN thickness | 100 nm | `[DIRECT-PHYSICAL]` |
| p-GaN hole concentration | 3×10^17 cm^-3 | `[DIRECT-PHYSICAL]` **Mg dopant density와 동일시 금지** |
| upper p-GaN | 20 nm | `[DIRECT-PHYSICAL]` thickness only |
| ITO thickness | 200 nm | `[DIRECT-PHYSICAL]` |
| electrode material | Ti/Al/Ni/Au | `[DIRECT-PHYSICAL]` |
| fabricated/experiment | µLED I and III experimentally compared with calculation; ~450 nm EL | `[DIRECT-PHYSICAL]` |

### 4.2 Original simulation inputs

| 항목 | 원문값 | 현재 판정 |
|---|---:|---|
| simulator | APSYS | `[DIRECT-SIM]` |
| ΔEc:ΔEv | 70:30 | `[DIRECT-SIM]` |
| SRH lifetime | 100 ns | `[DIRECT-SIM]` |
| Auger coefficient | 1×10^-30 cm^6/s | `[DIRECT-SIM]` |
| light extraction efficiency | 88.1% | `[DIRECT-SIM]`; electrical baseline에는 필수 아님 |
| electron surface trap | Ec−0.24 eV, σ=3.4×10^-17 cm², N=1×10^13 cm^-3 | `[DIRECT-SIM]`; P2 no-damage에서는 OFF |
| hole surface trap | Ev+0.46 eV, σ=2.1×10^-15 cm², N=1.6×10^13 cm^-3 | `[DIRECT-SIM]`; P2 no-damage에서는 OFF |

---

## 5. 현재 가장 중요한 미확정/translation 항목

| 항목 | 위험도 | 이유 | 우선 처리 |
|---|---|---|---|
| electron/hole concentration → Sentaurus donor/acceptor doping | **HIGH** | 원문은 carrier concentration을 보고하며, incomplete ionization을 쓰는 Sentaurus에서 dopant density와 동일하지 않을 수 있음 | target carrier concentration을 재현하는 doping calibration 또는 동일 epi 출처 추적 |
| upper 20 nm p-GaN doping | **HIGH/MEDIUM** | 두께만 공개. contact injection/series resistance에 영향 가능 | 동일 wafer/인용문헌 추적 → 실패 시 sensitivity |
| exact p/n electrode lateral geometry | **HIGH for lateral current spreading** | sidewall current distribution과 직접 연결될 수 있음 | Figure/동일 device paper에서 치수 추적. full-width contact로 조용히 치환 금지 |
| contact resistance/work function | MEDIUM | absolute I–V와 injection에 영향 | ideal-contact baseline 가능성 검토 + sensitivity/실험 I–V calibration |
| ITO carrier density/mobility/contact resistivity | MEDIUM/HIGH if lateral transport modeled | current spreading에 영향 | ITO를 실제 transport layer로 쓸지, boundary로 추상화할지 먼저 연구 scope 기준으로 결정 |
| exact MQW end-barrier arrangement | MEDIUM | “4-pair”와 Table 1은 공개되나 top/bottom terminal barrier 배치는 Sentaurus geometry에서 명시 필요 | Figure/원문 구조 추적 후 translation rule 기록 |
| polarization magnitude/activation | **HIGH** | InGaN/GaN band profile, carrier overlap, emission에 직접 영향 | Sentaurus native polarization model + ~450 nm EL/band behavior validation; 임의 activation fitting 금지 |
| mobility/material parameters | MEDIUM | current and transport에 영향 | T-2022.03 material DB와 원 논문의 cited parameter source 비교 |

---

## 6. 중요도에 따른 처리 규칙

### 6.1 구조는 모르지만 연구 결론과 거의 무관한 값

예: 실제 금속 stack의 각 층 두께가 contact resistance를 별도로 모델링하지 않는 electrical baseline에서 불필요한 경우.

→ `[SIMPLIFIED]` 처리 가능.

단, “실제 장치와 동일한 metal geometry를 재현했다”라고 표현하지 않는다.

### 6.2 값이 없지만 영향이 작을 것으로 예상되는 경우

‘영향이 작을 것’이라는 예상만으로 값을 잠그지 않는다.

→ 문헌 범위를 정하고 최소 3점(low/nominal/high) sensitivity를 수행한다.
→ 주요 output(I–V, MQW carrier, Rrad, RSRH, sidewall penalty)의 변화가 사전에 정한 허용범위 안이면 `[SENSITIVITY-BOUND]`로 승격한다.

### 6.3 값이 없고 영향이 큰 경우

→ 가능한 경우 동일 소자의 실험 I–V/EQE/EL를 이용해 `[CALIBRATED]`.
→ calibration에 사용하지 않은 별도 observable 또는 별도 조건으로 validation한다.
→ calibration할 실험도, 신뢰할 범위도 없으면 `[BLOCKER]`로 남긴다.

---

## 7. 발표에서 약점으로 보이지 않게 만드는 핵심

미공개값 자체보다 위험한 것은 **미공개값을 논문값처럼 말하는 것**이다.

발표에서는 다음과 같이 구분한다.

> “기준 epi의 공개 구조값은 원 논문을 그대로 사용했습니다. 논문에서 직접 공개하지 않은 Sentaurus 입력은 별도 uncertainty register로 관리했습니다. 연구 결과에 영향이 작은 항목은 단순화했고, 영향 가능성이 있는 항목은 sensitivity analysis 또는 실험 calibration을 통해 범위를 검증했습니다. 따라서 미공개 파라미터 하나의 임의 선택에 의해 sidewall 결론이 결정되지 않도록 설계했습니다.”

이 문장을 증명하기 위해 최종 발표에 **Parameter provenance / uncertainty 표 1장**을 포함한다.

---

## 8. P2 coding 전 Gate

Final baseline coding 시작 전 아래를 모두 만족해야 한다.

- [ ] 기준 소자 논문/variant 최종 선택
- [ ] 모든 geometry parameter에 상태 태그 부여
- [ ] 모든 doping/carrier parameter에 “reported carrier concentration vs dopant density” 구분
- [ ] contact geometry가 sidewall/current-spreading 결과에 미치는 위험 판정
- [ ] polarization translation rule 잠금
- [ ] `[BLOCKER]` 중 baseline solution에 필수인 항목 0개
- [ ] `[SENSITIVITY-BOUND]` 예정 항목의 sweep range와 output metric을 **결과를 보기 전에** 정의
- [ ] calibration parameter와 calibration target 정의
- [ ] independent validation target 정의

---

## 9. 현재 결론

Chang 2020은 실제 제작·측정된 10 µm InGaN/GaN µLED이면서 구조와 APSYS input이 상당히 공개되어 있어 강한 baseline 후보이다.

그러나 **아직 그대로 final lock하지 않는다.** 특히 carrier concentration→dopant density translation, 20 nm p-GaN doping, contact/ITO lateral-current-spreading 조건, polarization은 우리 sidewall 연구 결론에 영향을 줄 수 있어 먼저 해결해야 한다.

따라서 지금의 공식 상태는:

```text
Physical reference candidate: Chang µLED III (12 nm QB)
Sentaurus translation: OPEN
Unknown values: provenance/sensitivity/calibration protocol로 관리
Final P2 baseline lock: 아직 아님
```
