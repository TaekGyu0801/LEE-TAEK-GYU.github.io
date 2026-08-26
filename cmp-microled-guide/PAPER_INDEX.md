# CMP Micro-LED — Paper Verification Index

Updated: 2026-08-26

이 문서는 CMP 사이트의 핵심 문헌을 실제 원문/공식 출판 페이지와 대조한 기록이다. 공개 GitHub에는 저작권이 불명확하거나 재배포 제한이 있는 PDF 자체를 복제하지 않고 DOI/출판사 공식 링크를 유지한다.

| ID | 검증된 문헌 | 원문 상태 | CMP에서의 역할 |
|---|---|---|---|
| R1 | Sunwoo Shin, **Study of Double-Layer Passivation Effects in InGaN-based Blue Micro LEDs**, GIST Master's Thesis, 2024 | 첨부 PDF 원문 대조 완료 · CC BY-NC-ND 2.0 KR | 실제 10 µm benchmark geometry, size series, J-V/J-L, leakage, ALD Al₂O₃ + PECVD double-passivation trend |
| R2 | Matthew S. Wong et al., **High efficiency of III-nitride micro-light-emitting diodes by sidewall passivation using atomic layer deposition**, *Optics Express* 26, 21324–21331 (2018), DOI: 10.1364/OE.26.021324 | 사용자 PDF 미첨부 · Optica 공식 PDF 제공 확인 | 상세 공개 full-epi/MQW auxiliary reference + ALD sidewall passivation trend |
| R3 | Matthew S. Wong et al., **Size-independent peak efficiency of III-nitride micro-light-emitting-diodes using chemical treatment and sidewall passivation**, *Applied Physics Express* 12, 097004 (2019), DOI: 10.7567/1882-0786/ab3949 | 첨부 PDF 원문 대조 완료 | KOH + ALD, size-dependent EQE, calibration 후보 |
| R4 | Ryan T. Ley et al., **Revealing the importance of light extraction efficiency in InGaN/GaN microLEDs via chemical treatment and dielectric passivation**, *Applied Physics Letters* 116, 251104 (2020), DOI: 10.1063/5.0011651 | 첨부 PDF 원문 대조 완료 | 독립 validation 후보, treated-device size trend, LEE 분리 해석 |
| R5 | Zhiyuan Liu et al., **Advanced technologies in InGaN micro-LED fabrication to mitigate the sidewall effect**, *Light: Science & Applications* 14, 64 (2025), DOI: 10.1038/s41377-025-01751-y | 첨부 PDF 원문 대조 완료 · Open Access CC BY 4.0 | sidewall damage review, physical damage depth와 effective influence width 구분, wet removal/passivation 분류 |
| R6 | Aurelien David, **Long-Range Carrier Diffusion in (In,Ga)N Quantum Wells and Implications from Fundamentals to Devices**, *Physical Review Applied* 15, 054015 (2021), DOI: 10.1103/PhysRevApplied.15.054015 | 첨부 PDF 원문 대조 완료 | carrier-density-dependent lateral diffusion; 고정 diffusion length를 보편값으로 쓰지 않기 위한 근거 |
| R7 | Juhyuk Park et al., **Understanding the Sidewall Passivation Effects in AlGaInP/GaInP Micro-LED**, *Nanoscale Research Letters* 17, 29 (2022), DOI: 10.1186/s11671-022-03669-5 | 첨부 PDF 원문 대조 완료 · Open Access CC BY 4.0 | ABC→effective SRV extraction 방법론. **AlGaInP 수치를 InGaN/GaN에 직접 이식하지 않음** |
| R8 | Kirill A. Bulashevich, Sergey S. Konoplev, Sergey Yu. Karpov, **Effect of Die Shape and Size on Performance of III-Nitride Micro-LEDs: A Modeling Study**, *Photonics* 5, 41 (2018), DOI: 10.3390/photonics5040041 | 첨부 PDF 원문 대조 완료 · Open Access CC BY 4.0 | 3D/size/current-crowding modeling 참고. 사용 SRV 7.5×10^3 cm/s는 선행문헌에서 가져온 modeling input |
| R9 | Qin Wang et al., **Optoelectronic performance enhancement of 1–5 μm InGaN-based micro-LEDs using chemical etching coupled with dielectric passivation**, *Applied Physics Letters* 129, 063309 (2026), DOI: 10.1063/5.0328266 | 첨부 PDF 원문 대조 완료 | 1–5 μm 실험 + ABC-derived SRV + APSYS sidewall-defect simulation. 최종 AR-class scaling/close competitor 후보 |
| **R10** | **Zhuang Wu et al., Physical mechanisms on the size-effect in GaN-based Micro-LEDs, Micro and Nanostructures 177, 207542 (2023), DOI: 10.1016/j.micrna.2023.207542** | **ScienceDirect 공식 본문 페이지 대조 완료. 사용자 PDF 미첨부. 사용 TCAD vendor는 현재 공식 본문에서 확인되지 않음.** | **Primary 10 µm TCAD physics/device reference: 3.9 µm n-GaN, Si 5×10^18 cm^-3, 4× In0.08GaN/GaN MQW (3/8 nm), p-GaN Mg 2×10^19 cm^-3, 양 sidewall 5 nm 내 acceptor-like traps, polarization/Mg incomplete ionization/trapping/Radiative-SRH-Auger physics** |

## R10 검증 메모 — 2026-08-26

ScienceDirect 공식 본문에서 다음을 직접 확인했다.

- Micro-LED 응용으로 **AR glasses**를 명시.
- 10 µm TCAD device를 예로 제시.
- n-GaN 3.9 µm, Si 5×10^18 cm^-3.
- 4개의 InGaN/GaN MQW.
- In composition = 0.08, InGaN well = 3 nm, GaN barrier = 8 nm.
- p-GaN Mg doping = 2×10^19 cm^-3.
- acceptor-like traps를 양쪽 sidewall edge에서 5 nm 이내에 설정.
- piezoelectric polarization, Mg incomplete ionization, local-electric-field-related trapping, Radiative/SRH/Auger models를 사용.

현재 공식 본문에서 **확정하지 못한 항목**:

1. p-GaN thickness.
2. Sentaurus 입력에 필요한 complete contact geometry.
3. exact sidewall trap density/energy/capture parameter의 baseline set.
4. 사용 TCAD software가 Synopsys Sentaurus인지 여부.

따라서 R10을 **“Sentaurus 예제를 그대로 복사 가능한 완전한 deck”으로 표현하지 않는다.** CMP에서는 R10을 primary TCAD physics/device baseline으로 사용하고, Sentaurus 구현 과정에서 누락값은 별도 검증한다.

## 역할 분리

- **R10 Wu 2023**: primary 10 µm TCAD physics/device baseline.
- **R1 Shin 2024**: 실제 10 µm CMP/passivation electrical benchmark.
- **R2/R3 Wong 2018/2019**: 상세 epi auxiliary reference + wet/ALD optical/passivation trend.
- **R9 Wang 2026**: 최종 1–5 µm scaling 및 competitor validation.

서로 다른 문헌의 값은 출처 태그 없이 합치지 않는다.

## R2 공식 PDF

- DOI: https://doi.org/10.1364/OE.26.021324
- Optica PDF endpoint: https://opg.optica.org/oe/viewmedia.cfm?seq=0&uri=oe-26-16-21324

## PDF 공개 저장 원칙

- 원문을 프로젝트 연구 근거로 검토하는 것과 PDF 파일 자체를 공개 GitHub에 재배포하는 것은 구분한다.
- R5/R7/R8은 첨부본에서 CC BY 4.0 Open Access임을 확인했다.
- R1은 CC BY-NC-ND 2.0 Korea 조건을 표시하고 있다.
- R3/R4/R6/R9는 첨부본에서 공개 재배포를 허용하는 CC 라이선스를 확인하지 못했으므로 CMP 공개 저장소에는 복제본을 올리지 않고 DOI/출판사 링크를 사용한다.
- R10은 현재 사용자 제공 PDF가 없으므로 출판사 공식 페이지/DOI 링크만 유지한다.

## 검증 시 발견한 주의점

1. R8 저자는 Bulashevich, Konoplev, Karpov 3인이다.
2. R8의 `VS = 7.5×10^3 cm/s`는 보편적인 InGaN SRV 상수가 아니다.
3. R9는 1–5 μm 실험, EQE/ABC 기반 SRV fitting, APSYS sidewall-defect-density simulation을 포함한다.
4. R7은 red AlGaInP/GaInP 계열이므로 extraction 방법론만 참고한다.
5. R6는 diffusion length가 carrier density에 따라 크게 달라질 수 있음을 보여준다.
6. **R10은 현재 가장 직접적인 10 µm sidewall-trap TCAD reference지만, simulator vendor와 일부 geometry/trap 입력이 미공개이므로 Sentaurus에서 구현할 때 ‘translation’ 단계가 필요하다.**