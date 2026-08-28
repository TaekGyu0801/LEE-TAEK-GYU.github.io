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
- 동일 파일/Workbench 자동생성 duplicate는 canonical copy 하나만 두고 SHA256/provenance로 추적한다.
- 공개 저장소에는 `ORIGINAL/` vendor example 사본이나 불필요한 설치 예제 복제본을 무작정 올리지 않는다. 연구자가 수정·실행한 command와 재현에 필요한 provenance를 우선한다.
- 설치된 vendor example을 무수정 재현한 P0 reference처럼 public redistribution 권한이 불명확한 원본은 사용자의 local/server recovery archive를 authoritative copy로 유지하고, GitHub에는 exact file list·archive/per-file checksum·diff/provenance를 보존한다.

## 현재 상태 — 2026-08-28

실제 서버 command recovery를 수행했다.

### P0 reference recovery

- source project: `CMP_PIN_DIODE`
- archive: `P0_COMMAND_BACKUP_20260828.tar.gz`
- 15 text files recovered; archive/file-list SHA256 verified
- public provenance: `P0/P0-02/`
- P0→P1 diff verified: 8 common files exact, 3 common files changed; research-relevant change is the P1 forward 0 V equilibrium snapshot addition

### P1/P2 research command recovery

- 원본 회수 archive: `CMP_COMMAND_BACKUP_20260828.tar.gz`
- 회수된 text command/parameter/script: 71 files
- reviewed manifest: `2026-08-28_COMMAND_RECOVERY_MANIFEST.md`
- byte-level verification: `2026-08-28_COMMAND_BYTE_VERIFICATION.md`
- canonical command 보관:
  - `P1/P1-01/commands/`
  - `P1/P1-02/commands/`
  - `P1/P1-04/commands/`
  - `P2/P2-03/commands/`, `parameters/`, `postprocess/`
  - `P2/P2-04/commands/`, `parameters/`, `history/`

서버 프로젝트의 숫자 이름을 공식 Phase 번호로 자동 해석하지 않는다. 예를 들어 `CMP_P3_BASELINE_MICROLED` 회수본은 검토 결과 공식 **P2-04 baseline development history**로 분류되었다.
