# P2 HIGH-RISK RESOLUTION — Chang 2020 → Sentaurus Translation

Updated: 2026-08-26
Status: **ACTIVE RESOLUTION — FINAL BASELINE NOT YET LOCKED**

> 목적: Chang et al. (2020) 10 µm InGaN/GaN µLED를 physical reference candidate로 사용할 때, 발표에서 약점이 될 수 있는 미공개/translation 파라미터를 숨기지 않고 근거·민감도·검증 절차로 해결한다.

---

## 1. 이번에 다시 확인한 핵심 사실

### 1.1 Chang 2020에서 직접 확인 가능한 구조

- 10 × 10 µm² blue InGaN µLED.
- Si(111) 위 MOCVD 성장.
- n-GaN 4 µm, reported electron concentration 5×10^18 cm^-3.
- 4-pair In0.18Ga0.82N/GaN MQW.
- QW 3 nm.
- QB A/B/C = 6/9/12 nm.
- p-Al0.15Ga0.85N EBL 26 nm, reported hole concentration 3×10^17 cm^-3.
- p-GaN 100 nm, reported hole concentration 3×10^17 cm^-3.
- top p-GaN 20 nm; 논문은 두께만 명시.
- ITO 200 nm, 500 °C 120 s anneal.
- Ti/Al/Ni/Au electrode material 명시.
- APSYS 사용.
- SRH lifetime 100 ns, Auger 1×10^-30 cm^6/s, ΔEc:ΔEv=70:30.
- µLED I/III 실험 EQE 및 EL과 계산을 비교했고 peak EL ≈450 nm.

### 1.2 매우 중요한 해석

Chang 논문의 5×10^18 / 3×10^17 cm^-3 표기는 각각 **electron concentration / hole concentration**이다.

따라서 이를 Sentaurus의 Si donor density / Mg acceptor density와 자동으로 동일시하지 않는다.

---

## 2. HIGH-RISK #1 — carrier concentration → dopant density

### 새로 확보한 보조 근거

Kou et al. (2019), 같은 Zi-Hui Zhang / Hao-Chung Kuo 연구계열의 blue µLED APSYS 논문은 다음을 명시한다.

- n-GaN 4 µm.
- **Si doping concentration = 5×10^18 cm^-3**.
- p-EBL / p-GaN의 **hole concentration = 3×10^17 cm^-3**.
- top 20 nm p-GaN은 **heavily doped p-GaN**이라고만 명시하고 exact Mg density는 공개하지 않음.

### 판정

- n-GaN `Si = 5×10^18 cm^-3`는 Chang의 reported electron concentration과 동일 연구계열의 explicit Si doping 값이 일치하므로 **강한 Sentaurus translation candidate**이다.
- 단, Chang actual wafer의 chemical Si concentration을 직접 측정했다는 뜻은 아니므로 `[TRANSLATION + SAME-GROUP-CORROBORATION]`으로 기록한다.
- p-EBL/p-GaN은 3×10^17 cm^-3를 Mg density로 직접 입력하지 않는다.

### Sentaurus 처리 원칙

Sentaurus GaN training은 Mg acceptor의 incomplete ionization을 명시적으로 지원한다. 따라서 p-region은:

```text
reported target free-hole concentration = 3×10^17 cm^-3
        ↓
Mg acceptor density를 변수로 설정
        ↓
IncompleteIonization ON
        ↓
300 K equilibrium bulk p-GaN의 hole concentration 확인
        ↓
3×10^17 cm^-3를 재현하는 Mg density를 translation value로 채택
```

으로 calibration한다.

이 값은 `[DIRECT-PHYSICAL]`이 아니라 `[TRANSLATION-CALIBRATED]`이다.

---

## 3. HIGH-RISK #2 — top 20 nm heavily doped p-GaN

Chang 2020과 Kou 2019 모두 top 20 nm p-GaN의 역할을 p-ohmic-contact용 **heavily doped p-GaN**으로 설명하지만 exact Mg density는 공개하지 않는다.

### 독립적인 peer-reviewed blue/GaN LED 문헌에서 확인한 범위 예

- Advanced Science 2018 InGaN/GaN LED: top 20 nm p-GaN, Mg = 1.5×10^20 cm^-3.
- ACS Omega 2024 GaN-on-Si InGaN device: top 20 nm heavily Mg-doped p-GaN, Mg ≈2×10^20 cm^-3.
- GaN-on-Si vertical diode literature에서도 20 nm p++-GaN에 ~1×10^20 cm^-3 수준의 Mg가 사용됨.

이 값들은 Chang 소자의 직접값이 아니다. **범위 근거**로만 사용한다.

### 사전 sensitivity plan

결과를 보기 전에 다음을 고정한다.

- Sweep parameter: top 20 nm p-GaN Mg density.
- Initial literature bracket: **1×10^20, 1.5×10^20, 2×10^20 cm^-3**.
- Main outputs:
  1. forward I–V,
  2. MQW electron/hole density,
  3. integrated radiative recombination,
  4. lateral carrier profile near sidewall,
  5. later P5/P6에서 동일 sidewall-damage penalty.

### 판정 규칙

- 핵심 sidewall relative penalty가 bracket 내에서 안정적이면 `[SENSITIVITY-BOUND]` representative value 사용.
- 결과가 크게 달라지면 single nominal value를 고정하지 않고 `[BLOCKER]` 또는 uncertainty band로 유지.

---

## 4. HIGH-RISK #3 — p/n contact lateral geometry

### Chang에서 확인되는 것

- 200 nm ITO current-spreading layer.
- Ti/Al/Ni/Au가 ITO와 n-GaN에 각각 p/n electrode로 사용됨.
- 하지만 공개 text만으로 exact p-contact width, n-contact lateral position/width를 완전히 숫자로 잠글 수 없음.

### 왜 단순화 위험도가 높은가

Behrman & Kymissis (Optics Express 2021)는 실제 fabricated 10 µm-class GaN/InGaN microLED에서 **p-GaN contact geometry 자체가 current spreading과 surface recombination을 크게 바꿀 수 있음**을 실험/모델로 보였다.

특히 10 µm pixel에서 p-contact diameter 4–10 µm를 바꾸면 low-current 조건의 output이 크게 달라졌고, 1 µm edge gap만으로도 surface-recombination loss가 억제되는 결과를 보고했다.

따라서 Chang exact contact geometry가 없다고 해서 full-width ideal p-contact를 조용히 넣는 것은 금지한다.

### 처리 원칙

1. Chang Fig./related device paper에서 exact lateral dimension을 계속 추적.
2. 끝까지 안 나오면 `contact geometry` 자체를 uncertainty parameter로 둔다.
3. baseline에서는 최소 3개 contact-coverage case를 사전 정의하여 lateral carrier spreading sensitivity를 확인한다.
4. contact geometry에 따라 sidewall penalty가 크게 달라질 경우, Chang을 final baseline으로 쓰는 선택 자체를 재검토한다.

즉 contact는 현재 **[BLOCKER-CANDIDATE]**이며, 단순 금속 두께보다 훨씬 중요하다.

---

## 5. HIGH-RISK #4 — polarization

Chang 2020은 measured ~450 nm EL가 계산으로 재현됐고, 이를 근거로 polarization level과 InN composition이 적절하게 설정되었다고 말하지만 **polarization percentage 숫자는 공개하지 않는다.**

### 같은 모델 계열의 보조 근거

Zi-Hui Zhang 계열 APSYS InGaN/GaN LED 연구에서는 theoretical polarization charge의 약 **40%**를 사용하는 사례가 반복적으로 존재한다.

또 다른 GaN-on-Si blue LED 실험/시뮬레이션 연구에서는 Si substrate의 MQW internal field가 theoretical value의 약 **58%**에 해당한다고 보고했다.

따라서 Chang의 polarization을 100% 또는 40%라고 단정할 수 없다.

### Sentaurus 처리 원칙

- Sentaurus native spontaneous + piezoelectric polarization model을 기준으로 구현.
- 임의 `activation` 값을 곧바로 fitting knob로 사용하지 않는다.
- 우선 native/full model을 실행하고 band profile과 emission-related behavior를 확인.
- Chang의 measured ~450 nm EL 및 MQW carrier distribution trend를 validation observable로 사용.
- 필요 시 literature-supported polarization sensitivity를 별도 수행하되, 결과를 보기 전에 range를 문서화한다.

현재 상태: **[TRANSLATION-BLOCKER until P3 validation rule is locked]**.

---

## 6. 현재 해결 상태

| 항목 | 이전 | 현재 |
|---|---|---|
| n-GaN donor translation | HIGH unresolved | **strong candidate: Si 5×10^18 cm^-3**; same-group corroborated |
| p-EBL / p-GaN Mg density | HIGH unresolved | **target-hole-concentration calibration protocol 확정** |
| top 20 nm p+ doping | HIGH/MEDIUM unresolved | **1–2×10^20 cm^-3 literature bracket 확보; sensitivity 필요** |
| contact lateral geometry | HIGH unresolved | **여전히 가장 큰 geometry blocker 중 하나** |
| polarization | HIGH unresolved | **same-model 40% precedent + GaN-on-Si ~58% field evidence 확보; exact Chang value 미공개** |

---

## 7. Final-lock 전에 남은 작업

1. Chang figure/related paper에서 exact contact lateral geometry 추가 추적.
2. 1D/vertical Sentaurus doping-calibration test로 `p = 3×10^17 cm^-3 @300 K`를 재현하는 Mg density를 결정.
3. top 20 nm p+ sensitivity sweep 계획을 실제 deck 변수로 구현.
4. P3 polarization validation criterion을 먼저 잠근 뒤 polarization translation.
5. 위 결과가 확보되기 전 `Chang physical reference = Sentaurus exact replica`라고 표현하지 않음.

---

## 8. 발표용 방어 문장

> “기준 소자의 공개 epi 구조는 실제 제작·측정된 Chang et al. 소자를 기반으로 했습니다. 원 논문이 직접 공개하지 않은 Sentaurus 입력은 실물값으로 임의 고정하지 않았습니다. 자유전자/정공 농도와 chemical dopant density의 차이는 incomplete-ionization calibration으로 변환했고, p+ contact doping과 contact geometry처럼 결과에 영향을 줄 수 있는 항목은 문헌 범위 sensitivity로 검증했습니다. 따라서 최종 sidewall 결론이 하나의 미공개 파라미터를 임의 선택한 결과가 되지 않도록 관리했습니다.”

이 문장은 실제 sensitivity/calibration 완료 후에만 최종 발표에 사용한다.
