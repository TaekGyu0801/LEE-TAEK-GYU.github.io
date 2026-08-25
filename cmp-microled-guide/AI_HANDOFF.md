# AI HANDOFF — CMP Micro-LED TCAD Guide

## 2026-08-25 — ChatGPT

### 이번 작업

- VCAT-1T1C DRAM TCAD Research Dashboard의 구조(Phase → Input → Output → Gate → Validation → Window)를 참고하여 CMP Micro-LED용 실행 가이드라인을 새로 구성함.
- 생성 파일:
  - `cmp-microled-guide/GUIDELINE.md`
  - `cmp-microled-guide/index.html`
  - `cmp-microled-guide/style.css`
  - `cmp-microled-guide/app.js`
- 각 Phase에 초보자용 목적 설명, 수행 순서, Gate/중단 조건을 포함함.
- 문헌 traceability table을 가이드 하단과 사이트에 포함함.

### 현재 공식 연구 방향

**TCAD 기반 InGaN/GaN 청색 Micro-LED 사이드월 손상 모델링을 통한 Sidewall-Quality 설계 윈도우 도출**

최근 브레인스토밍 아이디어(MQW 변경, anneal 변수, high-k 확장 등)는 사용자가 명시적으로 채택하기 전까지 공식 주제에 포함하지 않음.

### 핵심 모델링 원칙

- `w_eff`는 physical lattice-damage depth가 아님. reduced/fitted effective influence width로 사용.
- full TCAD finite damaged-region 입력은 `d_dmg` + lifetime/trap으로 분리.
- Surface-only Model A와 damaged-region-only Model B를 먼저 독립 검증하며 hybrid는 필요할 때만 도입.
- full drift-diffusion TCAD에서 `L_D`는 독립 knob가 아니라 derived/diagnostic quantity로 취급.
- main efficiency metric 후보: `eta_int,I = q∫R_rad dV / I_terminal` (2D 단위/AreaFactor manual 검증 필수).
- diagnostic: MQW recombination fraction `eta_rec`.
- sidewall SRH loss contribution을 핵심 output으로 추가할 예정.
- 2D AreaFactor만으로 실제 square pixel의 front/back sidewall을 재현할 수 없음을 명시.
- Design Window penalty는 동일 size reference와 비교. 5/10/20% contour를 모두 제시하며 10%는 프로젝트 engineering criterion일 뿐 산업 표준이 아님.

### 문헌 기반 핵심 소스

- Shin (2024), GIST Master Thesis — baseline geometry / size / passivation electrical-optical trend
- Wong et al. (2018), Optics Express — 공개된 6× InGaN/GaN MQW 구조 proxy + ALD passivation trend
- Wong et al. (2019), Applied Physics Express — chemical treatment + ALD size-dependent calibration candidate
- Ley et al. (2020), Applied Physics Letters — independent validation / treated size trend
- Liu et al. (2025), Light: Science & Applications — sidewall damage/passivation review, physical damage vs effective influence width
- David (2021), Physical Review Applied — carrier-density-dependent lateral diffusion + representative ABC set
- Park et al. (2022), Nanoscale Research Letters — ABC→effective SRV methodology; AlGaInP 수치는 InGaN에 직접 이식 금지
- Bulashevich & Karpov (2018), Photonics — InGaN modeling SRV order-of-magnitude reference
- Wang et al. (2026), Applied Physics Letters — recent chemical etching + dielectric passivation + APSYS scope check

### 다음 작업 / blocker

1. Sentaurus T-2022.03에서 SurfaceSRH syntax/단위 확인
2. 2D integrated recombination, terminal current, AreaFactor의 정확한 단위 확인
3. polarization implementation의 설치 버전 예제/매뉴얼 근거 확보
4. Wong(2019) calibration dataset과 Ley(2020) independent validation dataset의 full numeric extraction
5. Phase 0부터 실제 실행 시작 후 사이트 progress tracker 업데이트

### 주의

- 실험 calibration 없이 `KOH 시간/농도 → SRV`, `ALD 두께 → Dit/SRV`를 정량 1:1 매핑하지 말 것.
- 예상과 다른 결과가 나오면 파라미터를 억지로 바꾸지 말고 Gate fail로 기록하고 원인을 추적할 것.
