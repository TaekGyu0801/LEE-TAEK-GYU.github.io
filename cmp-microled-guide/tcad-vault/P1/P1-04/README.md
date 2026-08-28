# P1-04 — Reverse I-V / trap sanity

Recovered: 2026-08-28

Server source project: `CMP_PIN_DIODE_Copy1`

이 소단원은 -3 V reverse leakage 비교에 실제 사용한 direct-run SDevice command 두 개를 보관한다.

- `cmp_leakage_run.cmd`: GaN/Nitride donor interface trap 포함
- `cmp_notrap_run.cmd`: 위 trap 블록만 제거한 비교 deck

회수본 diff를 확인한 결과 두 파일의 핵심 차이는 출력 파일명과 interface donor trap 블록의 유무이다. 기존 결과에서 trap 제거 시 reverse current가 오히려 증가했기 때문에 이 donor trap 설정은 Micro-LED dry-etch sidewall damage 모델로 승계하지 않는다.

SHA256:
- with trap: `1c9be2926d004f445737cad232fd69f253461c13078f8be8d7ddd6558c61be0f`
- no trap: `a3460caeea51b6a6356aec6fe6619327df529f3d9467cf27f6a6120e121fd38f`
