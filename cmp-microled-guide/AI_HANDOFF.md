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

### 2026-08-25 추가 — 로그인 후 CMP 페이지 복귀 UX

- 사용자가 GitHub 로그인 후 CMP 사이트를 다시 찾아올 필요가 없도록 로그인 방식을 수정함.
- `GitHub 로그인` 버튼은 현재 CMP 페이지를 이동시키지 않고 별도 팝업 창으로 GitHub 로그인 화면을 엶.
- 사용자가 로그인 창을 닫으면 원래 CMP 페이지를 다시 포커스하고 `결과 제출 센터` 위치로 자동 스크롤함.
- GitHub Pages 정적 사이트는 다른 도메인인 GitHub의 로그인 성공 여부를 직접 읽을 수 없으므로, 로그인 성공 순간 팝업을 자동 종료하는 완전한 OAuth callback 방식은 현재 사용하지 않음. 이를 구현하려면 GitHub OAuth/GitHub App 등록과 callback 구성이 필요함.

### 2026-08-25 추가 — TCAD 계정 교체 대비 Research Vault

- 사용자가 현재 사용하는 TCAD 계정이 2026년 8월 말까지이고 이후 새 계정으로 교체될 가능성이 있으므로, 기존 계정에서 만든 예제/코드/결과/환경 메모를 잃지 않도록 **결과 제출과 별개의 장기 백업 저장소**를 추가함.
- 신규 저장소 루트: `cmp-microled-guide/tcad-vault/`
- 폴더 구성:
  - `_inbox` — 분류 전 빠른 백업
  - `_shared` — 여러 Phase에서 공통으로 사용하는 사용자 작성 자료
  - `_current-account` — 현재 계정의 버전/환경/재실행 메모
  - `P0`~`P9` — Phase별 자유 백업
- 신규 UI 파일: `vault.js`, `vault.css`.
- 사이트 오른쪽에 `TCAD Research Vault` 사이드바를 추가함. 데스크톱에서는 오른쪽 고정, 좁은 화면에서는 하단 고정/접기 방식.
- 각 P0~P9 카드 오른쪽에 `📦 저장소` 버튼을 추가함. 누르면 사이트 안 모달에서 해당 Phase의 GitHub 저장 파일 목록을 확인하고 `파일 업로드`/`GitHub 폴더 보기`를 실행할 수 있음.
- 파일 목록은 공개 GitHub Contents API에서 동적으로 불러오며 README는 목록에서 숨김.
- `결과 제출(submissions)`은 Gate 검토용, `tcad-vault`는 재현/보존용으로 역할을 분리함.
- 공개 저장소 보안/라이선스 경고를 사이드바와 README에 명시함. 비밀번호, 토큰, SSH key, 라이선스 파일, 민감한 서버 내부정보, 배포 권한이 확인되지 않은 Synopsys 매뉴얼/설치 라이브러리 원본은 업로드하지 않음.
- Synopsys 설치 예제는 원본 전체 공개 복제보다 **예제명/설치 경로/사용한 설정을 기록하고 사용자가 작성·수정한 파일 위주로 백업**하는 것을 기본 원칙으로 함.

### 2026-08-25 추가 — P0 실제 환경 확인 + ChatGPT/Claude 역할 분담

- 실제 현재 TCAD 세션에서 확인한 환경:
  - account `semi302`
  - host prompt `ssudisu1`
  - current/home path `/user/semi/semi302`
  - shell `/bin/csh`
  - `STROOT`, `STRELEASE`는 현재 shell에서 undefined
  - `sdevice`, `sde`, `swb`, `sprocess`는 모두 `/user/tools/synopsys/sentaurus/T-2022.03/bin/`에서 resolve
  - Python `3.8.11`
- 이전 다른 서버에서 확인했던 `/home/eda/synopsys/tcad/T-2022.03/Applications_Library/GettingStarted/sdevice/GaN_PiN_Diode` 경로는 현재 환경에는 존재하지 않음. 서버/계정 간 경로를 추측해서 재사용하지 말 것.
- 환경 스냅샷을 `tcad-vault/_current-account/2026-08-25_semi302_environment.md`에 저장함.
- 사용자 요청에 따른 역할 분담:
  - **ChatGPT**: 연구 논리, 물리적 타당성, 문헌 근거, 단계 설계, Gate 판정, 결과 검토를 담당.
  - **Claude**: 실제 Sentaurus 코드 작성/수정 또는 구체적 파라미터 구성 작업이 필요할 때 코드 작성 역할로 활용.
  - 코드/파라미터 작업 전 ChatGPT가 Claude에게 전달할 프롬프트를 작성하며, 프롬프트에는 현재 Phase, 목적, 검증된 환경/버전, 물리 가정, 금지사항, 필요한 입력/출력, 모르는 값은 추측하지 말라는 규칙을 포함.
  - Claude가 만든 코드/파라미터는 바로 채택하지 않고 ChatGPT가 논리·단위·문헌·Sentaurus 버전 적합성을 다시 검토한 뒤 사용.
  - 단순한 파일 탐색/터미널 확인에는 Claude를 불필요하게 호출하지 않음.

### 2026-08-25 추가 — 기존 GaN PiN Workbench 작업본 확인

- 사용자가 Sentaurus Workbench에 GaN_PiN_Diode 계열 공식 예제를 이미 가져와 과거에 실행해 둔 작업본이 있으며, 화면 가운데 프로젝트로 이름을 바꿔 보관 중임을 확인함.
- 따라서 설치 트리에서 예제를 다시 찾는 작업은 우선순위에서 제외하고, 현재 작업본의 원본 대비 수정 여부·실행 성공 여부·생성 산출물·재실행 가능성을 먼저 확인하기로 함.
- Gate 0는 아직 자동 통과 처리하지 않음. 공식 예제 기반임을 확인하더라도 수정 여부와 결과 상태를 확인한 후 PASS 판정.

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

1. **계정 교체 전 현재 작업 디렉터리에서 사용자 작성/수정 파일을 우선 백업**하고 P0 Vault에 환경/버전/예제 경로 기록
2. 현재 Workbench의 이름 변경된 GaN PiN 작업본에서 원본 대비 수정 여부, node 성공 상태, 생성 파일/로그를 확인
3. Sentaurus T-2022.03에서 SurfaceSRH syntax/단위 확인
4. 2D integrated recombination, terminal current, AreaFactor의 정확한 단위 확인
5. polarization implementation의 설치 버전 예제/매뉴얼 근거 확보
6. Wong(2019) calibration dataset과 Ley(2020) independent validation dataset의 full numeric extraction
7. Phase 0부터 실제 실행 시작 후 `progress.json` 및 artifact 링크 업데이트
8. 필요 시 각 원문의 Figure/Table/Page를 Phase별 근거에 더 세밀하게 연결

### 주의

- 실험 calibration 없이 `KOH 시간/농도 → SRV`, `ALD 두께 → Dit/SRV`를 정량 1:1 매핑하지 말 것.
- 예상과 다른 결과가 나오면 파라미터를 억지로 바꾸지 말고 Gate fail로 기록하고 원인을 추적할 것.
