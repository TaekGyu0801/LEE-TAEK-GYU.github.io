# P2-03 — Mg incomplete-ionization calibration

Recovered: 2026-08-28

Server source project: `CMP_P2_MG_CALIBRATION`

## 역할

300 K p-GaN에서 target hole density `p = 3e17 cm^-3`에 대응하는 Mg active concentration을 확인하기 위한 calibration deck이다.

## Canonical command

- `commands/IgVg_des.cmd`: 기존 p-gate example physics를 제거하고 equilibrium carrier-density calibration 용도로 단순화한 SDevice command.
- `commands/sde_mg_sweep_template.cmd`: `@NMg@` parameter를 받는 SDE sweep template.
- `commands/sde_mg_9p59e18.cmd`: Mg = `9.59e18 cm^-3`로 고정한 회수본.
- `parameters/sdevice_mg_model.par`: 현재 calibration에 사용된 Model-B 계열 Mg incomplete-ionization parameter (`E0=0.20 eV`, `alpha=8e-9`, `g=4`, `Xsec=1e-14`).

## 실제 Workbench instantiated node 확인

회수본에는 9.59e18 및 1.0e19 실행 node가 함께 존재했다.

- `pp6_dvs.cmd`: Mg `9.59e18`, SHA256 `abe3d47fe61fd995a7a3cbd66e9941e3dcc8538d8239cd7a3a9c80e64bc682a6`
- `pp62_des.cmd`: node 62 SDevice, SHA256 `537d4f1c22d2b640d427ec54f1eef4660adbd0a81d72d2bc40039cb4d49f736d`
- `pp7_dvs.cmd`: Mg `1.0e19`, SHA256 `02834c2dc378c7c4e5971ff6f3d025f08a567b8212a87fe5e92d9f8157217243`
- `pp66_des.cmd`: node 66 SDevice, SHA256 `68a21852a6f9a2c3c6bc7cdfe6efd9cc3c9042a94db6c429ea6399b5eab78d9d`

자동 생성된 node/glue 파일과 `ORIGINAL/` vendor 사본은 중복 및 공개 재배포를 피하기 위해 canonical 폴더에 복제하지 않는다. 전체 회수 목록과 SHA는 root recovery manifest에 기록한다.
