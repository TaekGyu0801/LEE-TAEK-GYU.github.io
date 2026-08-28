# P2-04 — Baseline Micro-LED command 구축 · recovered development snapshot

Recovered: 2026-08-28

Server projects inspected:
- `CMP_P3A_MG_BASELINE_OK`
- `CMP_P3_BASELINE_MICROLED`

## 매우 중요: 서버 프로젝트명 ≠ 공식 Phase 번호

서버 폴더명에 `P3`가 들어가지만 이 작업은 현재 공식 연구 단계에서는 **P2-04 baseline command 구축 이력**으로 분류한다. 공식 P3(Polarization/Recombination physics)를 완료한 것으로 해석하면 안 된다.

## 현재 회수된 development deck

`CMP_P3_BASELINE_MICROLED`의 최신 command는 다음 특징을 가진다.

- cylindrical 2D GaN-based structure
- p-side Mg active concentration: `9.59e18 cm^-3`
- MQW development geometry: **10 QWs**
- each QW: 3 nm, barrier: 10 nm 수준으로 작성
- current forward SDevice에서 InGaN `XFraction=0.18`
- GaN에 incomplete ionization 적용
- forward recombination: SRH + Auger + Radiative

이 값은 현재 프로젝트의 최종 문헌 기준 baseline과 일치하지 않는다. 현재 공식 baseline 후보인 Wu 2023의 4-QW / In0.08 구조로 lock된 것이 아니므로 **historical development snapshot**으로만 보관한다.

## 회수 과정에서 확인한 주요 버전 변화

1. `P3A_MG_BASELINE_OK` / `before_P3B_clean`: p-side dopant를 `PDopantActiveConcentration 1e19`에서 `pMagnesiumActiveConcentration 9.59e18`로 변경.
2. `before_P3C_MQW`: Nitride passivation geometry/interface refinement를 제거한 clean intermediate.
3. current SDE: 10-QW InGaN/GaN geometry와 MQW refinement window 추가.
4. forward SDevice: interface donor trap 제거 → InGaN mole fraction 0.18 추가 → incomplete ionization scope를 global에서 GaN material scope로 제한.

Historical files의 원본 SHA256은 root recovery manifest에 남기며, canonical 폴더에는 현재 development command만 저장한다. 이 command를 P2-06 final lock 또는 후속 P3의 기준으로 자동 승격하지 않는다.
