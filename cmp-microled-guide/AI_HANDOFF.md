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

### 2026-08-25 추가 — 업로드형 사이트 운영 방식

- 사용자는 GitHub 파일을 하나씩 직접 열어보는 방식보다 VCAT 경진대회 사이트처럼 브라우저에서 Phase별 가이드와 결과물을 보는 방식을 선호함.
- 로그인 기능은 필요 없음.
- 각 Phase 작업 완료 후 결과를 GitHub에 업로드하고, 사이트가 해당 결과 링크와 공식 상태를 표시하는 방식으로 운영하기로 함.
- 신규 파일:
  - `cmp-microled-guide/progress.json` — Phase별 공식 상태 및 artifact 목록
  - `cmp-microled-guide/UPLOAD_GUIDE.md` — 결과 업로드 방식
- 사이트의 localStorage 체크박스 방식은 공식 진행상태 방식으로 변경함.
- `pending / in-progress / complete / blocked` 상태를 사용함.
- 결과물이 업로드되고 Gate를 통과해야 `complete`로 처리함.
- 사용자가 ChatGPT에 결과 파일을 보내고 “P# 결과 업로드해줘”라고 요청하면, 검토 후 artifact 업로드 + progress 갱신하는 방식이 기본 워크플로우임.

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
- Wong et al. (2018), Optics Express — 공개된 InGaN/GaN MQW 구조 proxy + ALD passivation trend
- Wong et al. (2019), Applied Physics Express — chemical treatment + ALD size-dependent calibration candidate
- Ley et al. (2020), Applied Physics Letters — independent validation / treated size trend
- Liu et al. (2025), Light: Science & Applications — sidewall damage/passivation review, physical damage vs effective influence width
- David (2021), Physical Review Applied — carrier-density-dependent lateral diffusion + representative ABC set
- Park et al. (2022), Nanoscale Research Letters — ABC→effective SRV methodology; AlGaInP 수치는 InGaN에 직접 이식 금지
- Bulashevich & Karpov (2018), Photonics — InGaN modeling SRV order-of-magnitude reference
- Wang et al. (2026), Applied Physics Letters — recent chemical etching + dielectric passivation + APSYS scope check

### 다음 작업 / blocker

1. GitHub Pages 배포 활성화 여부 확인. 현재 connector에서는 Pages 설정 변경 기능이 없음.
2. Sentaurus T-2022.03에서 SurfaceSRH syntax/단위 확인
3. 2D integrated recombination, terminal current, AreaFactor의 정확한 단위 확인
4. polarization implementation의 설치 버전 예제/매뉴얼 근거 확보
5. Wong(2019) calibration dataset과 Ley(2020) independent validation dataset의 full numeric extraction
6. Phase 0부터 실제 실행 시작 후 `progress.json` 및 artifact 링크 업데이트

### 주의

- 실험 calibration 없이 `KOH 시간/농도 → SRV`, `ALD 두께 → Dit/SRV`를 정량 1:1 매핑하지 말 것.
- 예상과 다른 결과가 나오면 파라미터를 억지로 바꾸지 말고 Gate fail로 기록하고 원인을 추적할 것.
