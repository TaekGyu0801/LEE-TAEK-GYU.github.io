# P2 SPEC — 10 µm InGaN/GaN Micro-LED Baseline

Updated: 2026-08-26
Status: **SPEC PREPARATION — NOT READY FOR FINAL SDE CODING**

> 이 파일은 `GUIDELINE.md` v1.1과 `PARAMETER_MASTER.md`를 따르는 Phase 2 기준 소자 specification이다.  
> 목적은 “빈칸을 그럴듯한 값으로 채우는 것”이 아니라 **직접 확인값 / 보조 문헌값 / 모델 가정 / 미확정값을 분리한 상태로 소자를 잠그는 것**이다.

---

## 1. 기준 소자 정의

**Primary reference:** R10, Zhuang Wu et al., *Physical mechanisms on the size-effect in GaN-based Micro-LEDs*, Micro and Nanostructures 177, 207542 (2023), DOI 10.1016/j.micrna.2023.207542.

**CMP에서의 정확한 표현:**

> Wu et al. (2023)의 공개 TCAD structure/physics를 primary reference로 사용하는 10 µm InGaN/GaN blue Micro-LED Sentaurus translation baseline.

**금지 표현:**

- “Wu 논문의 Sentaurus deck을 그대로 재현했다” — simulator vendor와 일부 입력이 미확정.
- “상용 AR glass pixel 구조를 복제했다” — 상용 구조가 아님.
- “Shin/Wong/Wu 값을 합친 원 논문 구조” — 서로 다른 문헌임.

---

## 2. R10에서 직접 잠근 값

| 항목 | 잠금값 | 출처 상태 | P2 사용 여부 |
|---|---:|---|---|
| Lateral dimension | **10 µm** | `[출판사 원문 페이지 확인]` | YES |
| n-GaN thickness | **3.9 µm** | `[출판사 원문 페이지 확인]` | YES |
| n-GaN Si doping | **5×10¹⁸ cm⁻³** | `[출판사 원문 페이지 확인]` | YES |
| MQW count | **4** | `[출판사 원문 페이지 확인]` | YES |
| In mole fraction in QW | **0.08** | `[출판사 원문 페이지 확인]` | YES |
| InGaN QW thickness | **3 nm = 0.003 µm** | `[출판사 원문 페이지 확인]` | YES |
| GaN barrier thickness | **8 nm = 0.008 µm** | `[출판사 원문 페이지 확인]` | YES |
| p-GaN Mg doping | **2×10¹⁹ cm⁻³** | `[출판사 원문 페이지 확인]` | YES |
| Sidewall trap type | **acceptor-like** | `[출판사 원문 페이지 확인]` | Phase 6/B2에서 사용 |
| Trap spatial location | **both sidewalls에서 5 nm 이내** | `[출판사 원문 페이지 확인]` | Phase 6/B2에서 사용 |
| Piezoelectric polarization | used | `[출판사 원문 페이지 확인]` | P3에서 Sentaurus 방식 검증 후 ON |
| Mg incomplete ionization | used | `[출판사 원문 페이지 확인]` | P3에서 구현 |
| Local-electric-field-related trapping | used | `[출판사 원문 페이지 확인]` | exact Sentaurus equivalent 확인 필요 |
| Radiative/SRH/Auger | used | `[출판사 원문 페이지 확인]` | P3에서 단계적 활성화 |

### MQW vertical thickness sanity check

4개의 QW만 합치면:

```text
4 × 3 nm = 12 nm
```

barrier 개수는 **구조 그림/본문 정의를 더 확인하기 전에는 4개인지 5개인지 임의 확정하지 않는다.** 따라서 total active-region thickness를 지금 계산해서 geometry로 잠그지 않는다.

---

## 3. 현재 미확정 — 코드 입력 blocker

| ID | 항목 | 현재 상태 | 처리 원칙 |
|---|---|---|---|
| B01 | p-GaN thickness | **미확정** | R10 원문/동일 연구그룹 자료 추가 추적 |
| B02 | MQW barrier count / top-bottom boundary layer arrangement | **미확정** | Fig.1 또는 원문 구조 정의 확인 |
| B03 | complete anode/cathode geometry | **미확정** | baseline에 필수인 최소 contact boundary만 원문 근거 확인 |
| B04 | sidewall trap density sweep values | **미확정** | R10 Figure/본문 숫자 추출 필요 |
| B05 | sidewall trap energy-level sweep values | **미확정** | R10 Figure/본문 숫자 추출 필요 |
| B06 | trap capture cross sections / Sentaurus trap syntax equivalent | **미확정** | 원문에 없으면 T-2022.03 + 별도 문헌 근거 필요 |
| B07 | TCAD software vendor | **미확정** | 확인 안 되면 `generic TCAD → Sentaurus translation`으로 유지 |
| B08 | p-contact/n-contact work function/contact resistance | **미확정** | ideal Ohmic baseline 가능 여부를 T-2022.03 및 연구목적 기준으로 검토 |

**B01–B03 중 baseline electrical solution에 필요한 항목이 해결되기 전에는 최종 geometry code를 잠그지 않는다.**

B04–B06은 ideal/no-sidewall-damage P2 baseline에는 넣지 않으며 Phase 6 전에 반드시 해결하거나 `[모델 가정]`으로 별도 승인한다.

---

## 4. 다른 문헌의 역할 — 자동 차용 금지

### R1 Shin (2024)

역할: **실제 10 µm passivation/electrical benchmark**

- u-GaN 1.0–1.2 µm
- n-GaN 2 µm
- total MQW active layer 0.125 µm
- p-GaN 0.2 µm
- ITO 100 nm
- mesa etch 1.0–1.1 µm
- ALD Al₂O₃ 10 nm
- PECVD SiO₂/SiNx 300 nm
- reference J(-3 V) = 4.713×10⁻⁵ A/cm²
- Al₂O₃+SiNx leakage reduction = 95.8%

**R10의 빈칸을 채우는 default 값이 아니다.**

### R2 Wong (2018)

역할: **상세 공개 full-epi / ALD auxiliary reference**

- p⁺-GaN 17 nm
- p-GaN 120 nm
- AlGaN EBL 26 nm
- 6× MQW: InGaN 2.4 nm / GaN 22 nm
- n-GaN 4 µm
- UID GaN 1.4 µm

**R10의 4×MQW 구조와 무표시 혼합하지 않는다.**

---

## 5. 최초 Sentaurus P2 baseline의 허용 범위

최초 run은 반드시 **ideal/no-sidewall-damage baseline**이다.

```text
10 µm InGaN/GaN Micro-LED
  ↓
R10에서 확인된 n-GaN / 4×MQW / p-GaN doping
  ↓
sidewall trap OFF
SurfaceSRH damage OFF
wet/ALD OFF
  ↓
Equilibrium
  ↓
Low forward bias ramp
  ↓
I-V + band + carrier + Rrad/RSRH 확인
```

Passivation material을 먼저 넣거나 leakage 95.8%를 맞추는 fitting은 금지한다.

---

## 6. Mesh 사전 원칙

QW thickness가 3 nm이므로 MQW에 global mesh를 그대로 사용하지 않는다.

- QW/barrier interface local refinement 필요.
- exact element size는 Sentaurus convergence test로 결정한다.
- “3 nm QW니까 1 nm mesh면 충분”처럼 사전 단정하지 않는다.
- 최소 2개 mesh 수준에서 band profile / carrier / I-V / recombination sensitivity를 비교하고 convergence를 기록한다.

---

## 7. P2 Gate용 필수 결과

- [ ] geometry cross-section
- [ ] mesh cross-section
- [ ] source-tagged final parameter table
- [ ] 0 V equilibrium convergence
- [ ] conduction/valence band profile through MQW
- [ ] forward-bias electron/hole density in MQW
- [ ] Radiative recombination spatial map
- [ ] SRH recombination spatial map
- [ ] forward I-V
- [ ] current normalization method
- [ ] QW mesh convergence record
- [ ] no-sidewall-damage baseline file set

---

## 8. 현재 결론

현재 R10은 **10 µm InGaN/GaN TCAD baseline으로 적합**하지만, 공개 정보만으로 완전한 Sentaurus deck을 즉시 작성할 만큼 모든 숫자가 잠긴 상태는 아니다.

따라서 다음 순서는:

```text
R10 미확정값 추가 추적
→ baseline에 필수인 값 잠금
→ Sentaurus T-2022.03 구현 문법 검증
→ CMP_MICROLED_BASELINE 새 프로젝트 생성
→ 10 µm ideal/no-damage baseline 실행
```

으로 고정한다.
