# P0 Vault — 환경·논문·단위 잠금

환경 확인 출력, 사용자 작성 setup 메모, 예제명/경로, 단위표, 버전 기록 등을 보존한다.

## P0-02 official GaN PiN reproduction recovery

2026-08-28에 서버 `CMP_PIN_DIODE`에서 command/parameter/SVisual 관련 text files 15개를 별도 recovery archive로 회수하고 SHA256을 검증했다.

- recovery record: `P0-02/README.md`
- upload/integrity verification: `P0-02/P0_UPLOAD_VERIFICATION.md`
- per-file SHA256: `P0-02/P0_FILE_SHA256_MANIFEST.md`
- P0→P1 comparison: `P0-02/P0_TO_P1_DIFF.md`
- original path list/checksums: `P0-02/recovery/`

`CMP_PIN_DIODE`는 설치된 Synopsys example의 무수정 reference이므로 public repository에는 vendor 원문 전체를 복제하지 않고, 사용자의 local/server archive를 authoritative copy로 유지하면서 정확한 파일 목록·checksum·P1과의 diff를 보존한다. 연구자가 수정한 실제 command는 P1/P2 canonical archive에 원문 그대로 보존한다.
