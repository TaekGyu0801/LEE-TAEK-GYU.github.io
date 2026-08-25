# CMP Micro-LED 가이드 — 결과 업로드 방식

이 사이트는 로그인 없이 보는 **GitHub Pages 기반 정적 연구 대시보드**로 운영한다.

## 사용 흐름

1. 사이트에서 현재 Phase의 목적·작업·Gate를 확인한다.
2. Sentaurus/Python 작업을 수행한다.
3. 결과 파일을 정리한다.
4. 결과를 ChatGPT에 보내거나 GitHub에 직접 업로드한다.
5. 검토 후 `cmp-microled-guide/artifacts/<PHASE>/` 아래에 결과물을 저장한다.
6. `progress.json`의 해당 Phase 상태와 artifact 목록을 갱신한다.
7. GitHub Pages가 갱신되면 사이트에서 결과 링크와 공식 진행 상태를 바로 확인한다.

## 권장 결과 파일

각 Phase에서 최소한 다음을 남긴다.

- `README.md` : 무엇을 했는지, 조건, 결론, Gate 판정
- `*.cmd`, `*.par`, `*.tdr`, `*.plt` 등 재현에 필요한 TCAD 입력/설정 정보
- 핵심 그래프 PNG/PDF
- 결과 CSV
- 사용한 parameter와 출처표
- 오류/수렴 이슈가 있었다면 `NOTES.md`

대용량 TDR/로그 파일은 GitHub 용량을 고려해 필요 최소한만 올리고, 최종 재현에 필요한 설정·CSV·그림·코드 위주로 보존한다.

## Phase별 폴더 예시

```text
cmp-microled-guide/
├─ artifacts/
│  ├─ P0/
│  ├─ P1/
│  ├─ P2/
│  ├─ ...
│  └─ P9/
├─ progress.json
├─ GUIDELINE.md
├─ index.html
├─ app.js
└─ style.css
```

## 상태 정의

- `pending` : 아직 시작 전 또는 Gate 판정 전
- `in-progress` : 작업 중이며 결과가 일부 존재
- `complete` : 요구 결과물이 업로드되었고 Gate를 통과
- `blocked` : 오류/근거 부족으로 다음 단계 진행 금지

**중요:** 사이트에서 `complete`라고 표시하려면 단순히 계산이 끝난 것이 아니라 해당 Phase의 Gate 조건을 통과해야 한다.

## 가장 쉬운 운영 방법

GitHub를 직접 다루기 어렵다면 결과 파일을 이 채팅에 올리고 “P3 결과 업로드해줘”처럼 말하면 된다. 검토 후 GitHub 결과 폴더와 `progress.json`을 함께 갱신하는 방식으로 운영한다.
