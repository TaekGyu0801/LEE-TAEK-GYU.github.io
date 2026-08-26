# P2 Mg Incomplete-Ionization Audit — Sentaurus T-2022.03

Date: 2026-08-27
Status: **OPEN — Mg activation-energy model not yet locked**

## Purpose

Chang et al. (2020) reports a p-GaN / p-EBL **hole concentration** of 3×10^17 cm^-3, not an explicit chemical Mg concentration. The P2 translation therefore must not set Mg=3×10^17 cm^-3 directly. This audit checks the local Sentaurus T-2022.03 installation before defining the Mg→free-hole calibration.

## Local installation evidence

### Existing P1 deck

`CMP_PIN_DIODE_Copy1/n1_dvs.cmd` uses generic species:
- `PDopantActiveConcentration`
- `NDopantActiveConcentration`

`pp2_des.par` defines for GaN:
- `PDopantActiveConcentration`: E0=0.15 eV, alpha=0, g=4, Xsec=1e-12
- `NDopantActiveConcentration`: E0=0.05 eV, alpha=0, g=2, Xsec=1e-12

`pp2_des.cmd` has `IncompleteIonization` enabled.

### Official/local pGate_HFET example

Path: `Applications_Library/GettingStarted/sdevice/pGate_HFET/`

`datexcodes.txt` explicitly defines:
- `MagnesiumActiveConcentration, MgActive` = substitutional Magnesium concentration
- `MagnesiumConcentration` = total chemical Mg concentration
- Mg is an acceptor with active=`MagnesiumActiveConcentration` and ionized=`MagnesiumMinusConcentration`

`sdevice.par` defines for GaN:
- `Species ("MagnesiumActiveConcentration")`
- E0=0.15 eV
- alpha=0
- g=4
- Xsec=1e-12

### Official/local GaN_Vertical_MOSFET_SW example

Path: `Applications_Library/Power/GaN/GaN_Vertical_MOSFET_SW/`

`MOS_dvs.cmd` uses:
- n-type GaN: `nSiliconActiveConcentration`
- p-type GaN: `pMagnesiumActiveConcentration`

`diode_mod.par` defines for GaN:
- `Species ("pMagnesiumActiveConcentration")`
- `type=acceptor`
- E0=0.29 eV
- alpha=3e-8
- g=4
- Xsec=1e-12
- file comment: `Matches well average value in publications`

No local `datexcodes.txt` definition for `pMagnesiumActiveConcentration` was found inside this example folder by the attempted scoped search.

## Critical finding

The local T-2022.03 Applications Library contains **at least two official GaN Mg incomplete-ionization parameterizations**:

1. E0=0.15 eV, alpha=0, g=4 using `MagnesiumActiveConcentration`.
2. E0=0.29 eV, alpha=3e-8, g=4 using `pMagnesiumActiveConcentration`.

Therefore, **E0=0.15 eV must not be treated as a universal Sentaurus Mg constant**. The earlier idea of locking the Chang translation solely to E0=0.15 is withdrawn.

## P2 decision rule

For Chang translation:

- Reported target remains `p = 3×10^17 cm^-3 at 300 K`.
- Mg active concentration will be calibrated to reproduce that free-hole target with `IncompleteIonization` enabled.
- Mg ionization parameterization itself is an uncertainty/model-choice item until justified.
- Do not label the calibrated Mg value as the actual SIMS/chemical Mg concentration of the Chang wafer.
- If two defensible ionization models are retained, recalibrate Mg separately for each model to the same 300 K target hole concentration before comparing device outputs.
- If the final sidewall metrics depend materially on the ionization model after equal-hole calibration, report a sensitivity/uncertainty band rather than a single hidden parameter choice.

## Next checks

1. Search local official GaN examples for all occurrences of `Species ("MagnesiumActiveConcentration")` and `Species ("pMagnesiumActiveConcentration")` and collect E0/alpha/g.
2. Use peer-reviewed Mg:GaN activation-energy literature to define a defensible model bracket; do not use Applications Library examples as experimental truth.
3. Build a minimal uniform p-GaN calibration deck only after the parameter bracket is locked.
4. Calibration observable: bulk free-hole concentration at 300 K = 3×10^17 cm^-3.
5. Later check whether equal-hole calibrated Mg models materially change P2 I–V, MQW carrier distribution, radiative recombination, and sidewall penalty.
