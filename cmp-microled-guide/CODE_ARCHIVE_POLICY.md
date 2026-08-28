# CMP Micro-LED — Code Archive Policy

Updated: 2026-08-28

## 원칙

각 Phase는 다시 여러 개의 **소단원(Subunit)** 으로 나눈다. 각 소단원은 결과 문서만으로 완료 처리하지 않으며, 실제 실행에 사용한 코드/Command를 함께 보관하는 것을 기본 조건으로 한다.

## 소단원 완료 조건

각 소단원에는 가능한 경우 다음 5종을 연결한다.

1. `README / 목적` — 무엇을 검증하는 작업인지
2. `PARAMETER / INPUT` — 입력값, 단위, 출처, 미확정 항목
3. `COMMAND` — 실제 실행에 사용한 `.cmd`, `.par`, `.tcl`, `.py`, `.plt` 등
4. `RESULT` — 그래프, 수치표, 로그 요약, 결과 이미지
5. `VALIDATION / INTERPRETATION` — 결과 해석, Gate 판정, 문제점, 다음 작업

### Command 의무 규칙

- TCAD를 실제 실행한 소단원은 **실행한 최종 Command 파일이 없으면 complete 처리하지 않는다.**
- 원본과 수정본이 둘 다 의미가 있으면 둘 다 보관하고 파일명/README에 역할을 표시한다.
- 코드가 본질적으로 없는 문헌 검토/판정 작업은 `NO_CODE_REASON.md`를 두어 왜 실행 코드가 없는지 기록한다.
- PPT Appendix에는 기억이나 재작성 코드가 아니라 **GitHub에 보관된 실제 실행 Command**를 사용한다.

## 권장 폴더 형식

```text
P#/<subunit>/
├─ README.md
├─ INPUT.md
├─ commands/
│  ├─ *.cmd
│  ├─ *.par
│  └─ ...
├─ RESULTS.md
├─ validation/
└─ issues/
```

## 파일을 전달받았을 때의 분류 규칙

사용자가 `.cmd`, 로그, 결과 이미지, Excel, 터미널 출력 등을 전달하면 별도 경로 지시가 없어도 현재 연구 맥락을 기준으로 해당 `Phase → Subunit → 파일 종류`에 분류한다. 불확실할 때만 사용자에게 확인한다.

## 재현성 우선순위

`실제 실행 코드 → 입력 파라미터와 출처 → 실행 결과 → 해석/판정` 순으로 연결한다. 결과 요약만 있고 실행 코드가 없는 기록은 재현성 미완료 상태로 표시한다.
