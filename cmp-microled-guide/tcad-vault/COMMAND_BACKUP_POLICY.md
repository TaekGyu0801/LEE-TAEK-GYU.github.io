# Command Backup Policy

CMP TCAD 프로젝트에서 실제 실행한 Sentaurus command 파일은 연구 재현성을 위해 GitHub에 별도 보관한다.

## 백업 대상

- SDE / geometry command
- S-Process command
- S-Device command
- S-Visual 또는 후처리 command/script
- Workbench에서 실제 실행된 `.cmd` 파일
- 파라미터 sweep에 사용한 command template

## 저장 원칙

- 실제 실행 파일을 전달받은 경우 원문 그대로 저장한다.
- 원본과 수정본을 구분한다.
- 파일명에는 Phase, 목적, 버전 또는 날짜를 포함한다.
- 발표 Appendix에는 이 archive의 실제 command 내용을 사용한다.
- ChatGPT가 대화에서 코드 블록을 제안했다는 사실만으로는 GitHub 백업 완료로 간주하지 않는다. 실제 실행본 또는 사용자가 실제 사용했다고 확인한 최종 코드를 저장해야 한다.

## 현재 상태 — 2026-08-28

현재 저장소 검색 기준으로 실제 `.cmd` 원본 파일 백업은 확인되지 않았다. 기존 GitHub에는 환경/검증 결과/파라미터/가이드 문서가 주로 저장되어 있다. 이후부터 실제 실행 command를 전달받는 즉시 해당 Phase의 command archive에 함께 저장한다.
