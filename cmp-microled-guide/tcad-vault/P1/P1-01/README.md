# P1-01 — PiN baseline 재실행 command recovery

Recovered: 2026-08-28

Server source project: `CMP_PIN_DIODE_Copy1`

## 보관 원칙

- 이 소단원에는 실제 P1 baseline 재실행에 사용된 연구 수정본을 보관한다.
- `sd_fdiv_des.cmd`에는 0 V equilibrium snapshot 저장 구문이 추가되어 있다.
- reverse breakdown용 `sd_rviv_des.cmd`는 회수본에서 확인되었지만 Synopsys 예제 기반의 사실상 비수정 파일이므로 공개 저장소에 그대로 재배포하지 않고 SHA256만 기록한다.
- 원본 vendor 예제/`ORIGINAL` 사본은 공개 GitHub에 복제하지 않는다.

## 회수 확인

- `sd_fdiv_des.cmd` SHA256: `5bf472e1e6f9116eeb823d7e78742af70fd3d7a65f65b041d1a02c267171da68`
- local `sd_rviv_des.cmd` SHA256: `70947e9ba44ad692e1f7f73d3868b8bc32768bb51038332f300ffee1562eed6b`
- local baseline `sde_dvs.cmd` SHA256: `165eb677d1cb4f306bfb8af2377ec431be21096959cc8589bb0536bf033e4cb2`
- local `sdevice.par` SHA256: `4d85e05c0f304bd6e83d3add92adc5f8228a77c428bef408f0f6665154ed13d3`

P1의 mesh refinement는 `P1-02`, trap/no-trap reverse sanity는 `P1-04`에 별도 command로 보관한다.
