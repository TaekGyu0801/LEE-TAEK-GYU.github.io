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
- 각 Phase 작업 완료 후 결과를 GitHub에 업로드하고, 사이트가 해당 결과 링크와 공식 상태를 표시하는 방식으로 운영하기로 함.
- 신규 파일:
  - `cmp-microled-guide/progress.json` — Phase별 공식 상태 및 artifact 목록
  - `cmp-microled-guide/UPLOAD_GUIDE.md` — 결과 업로드 방식
- 사이트의 localStorage 체크박스 방식은 공식 진행상태 방식으로 변경함.
- `pending / in-progress / complete / blocked` 상태를 사용함.
- 결과물이 업로드되고 Gate를 통과해야 `complete`로 처리함.
- 사용자가 ChatGPT에 결과 파일을 보내고 “P# 결과 업로드해줘”라고 요청하면, 검토 후 artifact 업로드 + progress 갱신하는 방식이 기본 워크플로우임.

### 2026-08-25 추가 — GitHub 로그인/제출 센터

- 사용자가 사이트에서 직접 Phase별 결과 제출 위치로 이동할 수 있도록 `결과 제출 센터`를 추가함.
- 상단과 제출 센터에 `GitHub 로그인` 버튼 추가.
- P0~P9 각각 `cmp-microled-guide/submissions/P#/` 제출 폴더 생성.
- 사이트에서 Phase, 결과 제목, 첨부 예정 파일, 결과 설명/코드/로그를 입력할 수 있음.
- `파일·Excel·이미지 GitHub 업로드` 버튼은 선택 Phase의 GitHub 공식 upload 화면으로 연결.
- `텍스트 결과 파일 만들기`는 Phase별 GitHub new-file 화면을 열고 제출 템플릿을 클립보드에 복사함.
- GitHub Pages는 정적 사이트이므로 GitHub 비밀번호/PAT/token을 코드에 저장하지 않음. 실제 인증과 파일 저장은 GitHub 공식 화면에서 수행.
- 관련 파일: `submit.css`, `submit.js`.
- 논문 traceability 표에는 정확한 논문 제목과 DOI/원문 링크를 추가함.

### 2026-08-25 추가 — 사용자 제공 PDF 원문 검증

- 사용자가 R1, R3, R4, R5, R6, R7, R8, R9 PDF를 제공함. 제목/저자/연도/DOI를 실제 원문과 대조했고 번호는 모두 맞았음. R2만 사용자 첨부 PDF가 없음.
- `cmp-microled-guide/PAPER_INDEX.md`를 생성하여 R1–R9의 검증 상태, CMP 사용 위치, 공개 재배포 주의사항을 기록함.
- 사이트 문헌표에 `PDF 검토 완료`, Open Access 상태, R2 `Optica 공식 PDF` 링크를 동적으로 표시하도록 `submit.js`를 갱신함.
- R8 저자 표기는 Bulashevich, **Konoplev**, Karpov 3인으로 확인함.
- R8에서 사용한 `VS = 7.5×10^3 cm/s`는 R8이 새로 측정한 값이 아니라 선행문헌 [22]에서 가져온 simulation input임을 기록함.
- R9는 단순 scope-check를 넘어 1–5 μm 직접 실험, EQE/ABC 기반 SRV fitting, APSYS sidewall-defect-density simulation을 포함하므로 close competitor 및 validation 후보로 강화함.
- 저작권/라이선스: R5/R7/R8은 CC BY 4.0, R1은 CC BY-NC-ND 2.0 KR을 첨부본에서 확인. R3/R4/R6/R9는 첨부본에서 공개 재배포를 허용하는 CC 라이선스를 확인하지 못했으므로 공개 GitHub에는 PDF 복제본을 올리지 않고 DOI/출판사 링크를 유지함.
- R2는 Optica 공식 issue page에서 PDF 제공을 확인했으며 공식 endpoint는 `https://opg.optica.org/oe/viewmedia.cfm?seq=0&uri=oe-26-16-21324`.

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
- Bulashevich, Konoplev & Karpov (2018), Photonics — III-nitride micro-LED modeling / size effect reference
- Wang et al. (2026), Applied Physics Letters — 1–5 μm experiment + ABC/SRV fitting + APSYS sidewall-defect modeling

### 다음 작업 / blocker

1. Sentaurus T-2022.03에서 SurfaceSRH syntax/단위 확인
2. 2D integrated recombination, terminal current, AreaFactor의 정확한 단위 확인
3. polarization implementation의 설치 버전 예제/매뉴얼 근거 확보
4. Wong(2019) calibration dataset과 Ley(2020) independent validation dataset의 full numeric extraction
5. Phase 0부터 실제 실행 시작 후 `progress.json` 및 artifact 링크 업데이트
6. 필요 시 각 원문의 Figure/Table/Page를 Phase별 근거에 더 세밀하게 연결

### 주의

- 실험 calibration 없이 `KOH 시간/농도 → SRV`, `ALD 두께 → Dit/SRV`를 정량 1:1 매핑하지 말 것.
- 예상과 다른 결과가 나오면 파라미터를 억지로 바꾸지 말고 Gate fail로 기록하고 원인을 추적할 것.
