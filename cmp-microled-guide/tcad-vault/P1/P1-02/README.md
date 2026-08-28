# P1-02 — Mesh refinement

Recovered: 2026-08-28

Server source project: `CMP_PIN_DIODE_Copy1`

이 폴더의 command는 P1 Gate 1에서 사용한 refined mesh 실행본이다.

- `p1_refined_dvs.cmd`: baseline 구조의 mesh rule을 2배 수준으로 세분화한 SDE command. `p1_refined` mesh를 직접 생성한다.
- `p1_refined_des.cmd`: 생성된 `p1_refined_msh.tdr`를 사용해 forward I-V를 다시 실행한 SDevice command.
- 회수된 생성 mesh command `p1_refined_msh.cmd` SHA256: `6bdcf71347671b0faaf92fd294b59f61a48ecb90716bd8466c265c097cface7d`. 생성물은 SDE command로 재생성 가능하므로 canonical copy는 SDE/SDevice 2개만 둔다.

검증 결과는 `../2026-08-26_P1_Gate1_validation.md`에 연결한다.
