# CMP Micro-LED — Paper Verification Index

Updated: 2026-08-25

이 문서는 CMP 사이트의 R1–R9 문헌을 실제 원문과 대조한 기록이다. 사용자가 첨부한 PDF는 제목·저자·연도·DOI를 확인한 뒤 아래 상태로 기록했다. 공개 GitHub 저장소에는 저작권이 불명확하거나 재배포 제한이 있는 PDF 자체를 복제하지 않고 DOI/출판사 공식 링크를 유지한다.

| ID | 검증된 문헌 | 원문 상태 | CMP에서의 역할 |
|---|---|---|---|
| R1 | Sunwoo Shin, **Study of Double-Layer Passivation Effects in InGaN-based Blue Micro LEDs**, GIST Master's Thesis, 2024 | 첨부 PDF 원문 대조 완료 · CC BY-NC-ND 2.0 KR | baseline geometry, size series, J-V/J-L, leakage, double-layer passivation trend |
| R2 | Matthew S. Wong et al., **High efficiency of III-nitride micro-light-emitting diodes by sidewall passivation using atomic layer deposition**, *Optics Express* 26, 21324–21331 (2018), DOI: 10.1364/OE.26.021324 | 사용자 PDF 미첨부 · Optica 공식 PDF 제공 확인 | 공개된 InGaN/GaN MQW 실행 proxy와 ALD sidewall passivation trend |
| R3 | Matthew S. Wong et al., **Size-independent peak efficiency of III-nitride micro-light-emitting-diodes using chemical treatment and sidewall passivation**, *Applied Physics Express* 12, 097004 (2019), DOI: 10.7567/1882-0786/ab3949 | 첨부 PDF 원문 대조 완료 | KOH + ALD, size-dependent EQE, calibration 후보 |
| R4 | Ryan T. Ley et al., **Revealing the importance of light extraction efficiency in InGaN/GaN microLEDs via chemical treatment and dielectric passivation**, *Applied Physics Letters* 116, 251104 (2020), DOI: 10.1063/5.0011651 | 첨부 PDF 원문 대조 완료 | 독립 validation 후보, treated-device size trend, LEE 분리 해석 |
| R5 | Zhiyuan Liu et al., **Advanced technologies in InGaN micro-LED fabrication to mitigate the sidewall effect**, *Light: Science & Applications* 14, 64 (2025), DOI: 10.1038/s41377-025-01751-y | 첨부 PDF 원문 대조 완료 · Open Access CC BY 4.0 | sidewall damage review, physical damage depth와 effective influence width 구분, wet removal/passivation 분류 |
| R6 | Aurelien David, **Long-Range Carrier Diffusion in (In,Ga)N Quantum Wells and Implications from Fundamentals to Devices**, *Physical Review Applied* 15, 054015 (2021), DOI: 10.1103/PhysRevApplied.15.054015 | 첨부 PDF 원문 대조 완료 | carrier-density-dependent lateral diffusion; 고정 diffusion length를 보편값으로 쓰지 않기 위한 근거 |
| R7 | Juhyuk Park et al., **Understanding the Sidewall Passivation Effects in AlGaInP/GaInP Micro-LED**, *Nanoscale Research Letters* 17, 29 (2022), DOI: 10.1186/s11671-022-03669-5 | 첨부 PDF 원문 대조 완료 · Open Access CC BY 4.0 | ABC→effective SRV extraction 방법론과 J@peak 분석. **AlGaInP 수치를 InGaN에 직접 이식하지 않음** |
| R8 | Kirill A. Bulashevich, Sergey S. Konoplev, Sergey Yu. Karpov, **Effect of Die Shape and Size on Performance of III-Nitride Micro-LEDs: A Modeling Study**, *Photonics* 5, 41 (2018), DOI: 10.3390/photonics5040041 | 첨부 PDF 원문 대조 완료 · Open Access CC BY 4.0 | 3D/size/LEE/current crowding 및 modeling 참고. 논문에서 사용한 SRV 7.5×10^3 cm/s는 R8이 새로 측정한 값이 아니라 선행문헌 [22]에서 가져온 modeling input |
| R9 | Qin Wang et al., **Optoelectronic performance enhancement of 1–5 μm InGaN-based micro-LEDs using chemical etching coupled with dielectric passivation**, *Applied Physics Letters* 129, 063309 (2026), DOI: 10.1063/5.0328266 | 첨부 PDF 원문 대조 완료 | 1–5 μm 실험 + ABC-derived SRV + APSYS sidewall-defect simulation. 최신 close competitor 및 validation/scope-check 후보 |

## R2 공식 PDF

Optica의 *Optics Express* Volume 26 Issue 16 페이지에서 R2에 `PDF`가 제공되는 것을 확인했다.

- DOI: https://doi.org/10.1364/OE.26.021324
- Optica PDF endpoint: https://opg.optica.org/oe/viewmedia.cfm?seq=0&uri=oe-26-16-21324

## PDF 공개 저장 원칙

- 원문을 프로젝트 연구 근거로 검토하는 것과, PDF 파일 자체를 공개 GitHub에 재배포하는 것은 구분한다.
- R5/R7/R8은 첨부본에서 CC BY 4.0 Open Access임을 확인했다.
- R1은 CC BY-NC-ND 2.0 Korea 조건을 표시하고 있다.
- R3/R4/R6/R9는 첨부본에서 공개 재배포를 허용하는 CC 라이선스를 확인하지 못했으므로, CMP 공개 저장소에는 복제본을 올리지 않고 DOI/출판사 링크를 사용한다.
- 따라서 사이트의 `PDF 검토 완료` 표시는 **원문 내용 확인 완료**라는 뜻이며, 반드시 GitHub에 PDF binary가 저장되어 있다는 뜻은 아니다.

## 검증 시 발견한 주의점

1. R8 저자는 Bulashevich와 Karpov 둘만이 아니라 **Bulashevich, Konoplev, Karpov 3인**이다.
2. R8의 `VS = 7.5×10^3 cm/s`는 해당 논문이 선행문헌에서 가져와 simulation에 사용한 값이다. 보편적인 InGaN SRV 상수로 취급하지 않는다.
3. R9는 단순한 scope-check 문헌보다 강한 근거다. 1–5 μm 실험, EQE 기반 SRV fitting, APSYS sidewall-defect-density simulation을 모두 포함한다.
4. R7은 red AlGaInP/GaInP 계열이므로 extraction 방법론만 참고하고 수치 자체를 InGaN/GaN에 직접 적용하지 않는다.
5. R6는 diffusion length가 carrier density에 따라 크게 달라질 수 있음을 보여주므로, full drift-diffusion TCAD에서 고정 `L_D`를 독립 fitting knob로 두지 않는다.
