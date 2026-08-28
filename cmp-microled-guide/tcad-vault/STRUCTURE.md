# CMP Micro-LED TCAD Vault Structure

이 저장소는 `Phase → 소주제 → 입력/코드/결과/해석` 계층으로 관리한다.

## 기본 구조

```text
tcad-vault/
├─ P0_environment_and_reference/
│  ├─ 01_environment/
│  ├─ 02_reference_example/
│  ├─ 03_command/
│  ├─ 04_results/
│  └─ 05_validation/
├─ P1_GaN_PiN_pipeline/
│  ├─ 01_baseline/
│  ├─ 02_mesh_refinement/
│  ├─ 03_forward_IV/
│  ├─ 04_reverse_IV/
│  ├─ 05_current_normalization/
│  └─ 90_command_archive/
├─ P2_10um_MicroLED_baseline/
│  ├─ 01_reference_selection/
│  ├─ 02_structure/
│  ├─ 03_material_and_doping/
│  ├─ 04_physics_models/
│  ├─ 05_Mg_ionization/
│  ├─ 06_contacts/
│  ├─ 07_mesh/
│  ├─ 08_baseline_run/
│  └─ 90_command_archive/
├─ P3_sidewall_model/
├─ P4_surface_SRH_sweep/
├─ P5_damaged_region_sweep/
├─ P6_passivation_calibration/
├─ P7_size_scaling/
├─ P8_design_window/
└─ P9_final_validation/
```

## 소주제 폴더 내부 기본 파일

각 소주제는 필요에 따라 다음 파일로 나눈다.

- `README.md` — 목적, 현재 상태, 결론
- `INPUT.md` — 사용 파라미터와 출처
- `COMMANDS/` — 실제 실행한 `.cmd` 원본/수정본
- `RESULTS.md` — 수치 결과 표
- `INTERPRETATION.md` — 물리적 해석
- `ISSUES.md` — 오류, blocker, 미확정 사항

## 운영 규칙

1. 사용자가 새 결과, 코드, 터미널 출력 또는 파일을 보내면 ChatGPT가 Phase와 소주제를 판단해 적절한 위치에 정리한다.
2. 실제 실행한 command는 텍스트 요약만 남기지 않고 가능한 경우 `.cmd` 자체를 보존한다.
3. 수정본은 원본을 덮어쓰지 않고 버전 또는 날짜가 드러나는 이름으로 보존한다.
4. 각 수치에는 `문헌값 / 현재 환경 확인 / 모델 가정 / 프로젝트 기준 / 미확정` provenance를 유지한다.
5. `submissions/`는 Gate 제출용, `tcad-vault/`는 장기 연구기록 및 재현용으로 역할을 분리한다.
6. 서버에만 존재하고 ChatGPT가 실제 파일 내용을 전달받지 못한 command는 자동 백업된 것으로 간주하지 않는다.
