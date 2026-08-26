# P2 Mg Incomplete-Ionization Audit — Sentaurus T-2022.03

Date: 2026-08-27
Status: **MODEL BRACKET LOCKED — CALIBRATION NOT YET RUN**

## Purpose

Chang et al. (2020) reports a p-GaN / p-EBL **hole concentration** of 3×10^17 cm^-3, not an explicit chemical Mg concentration. The P2 translation therefore must not set Mg=3×10^17 cm^-3 directly. This audit checks the local Sentaurus T-2022.03 installation and defines a defensible Mg incomplete-ionization model bracket before Mg→free-hole calibration.

## Local installation evidence

### Existing P1 deck

`CMP_PIN_DIODE_Copy1/n1_dvs.cmd` uses generic species:
- `PDopantActiveConcentration`
- `NDopantActiveConcentration`

`pp2_des.par` defines for GaN:
- `PDopantActiveConcentration`: E0=0.15 eV, alpha=0, g=4, Xsec=1e-12
- `NDopantActiveConcentration`: E0=0.05 eV, alpha=0, g=2, Xsec=1e-12

`pp2_des.cmd` has `IncompleteIonization` enabled.

### Official/local GettingStarted pGate_HFET example

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

### Official/local Power/GaN pGate_HEMT example

Path: `Applications_Library/Power/GaN/pGate_HEMT/`

The GaN `Material` block defines:
- `Species ("pMagnesiumActiveConcentration")`
- `type=acceptor`
- E0=0.20 eV
- alpha=8e-9
- g=4
- Xsec=1e-14
- file comment: `Matches values in publications`

The following AlGaN `Material` block uses E0=0.5 eV. **This 0.5 eV value is not a GaN Mg model and is excluded from the GaN calibration bracket.**

The `E0=1.0` line seen earlier in this file belongs to the van Overstraeten-de Man impact-ionization model and is **not** a Mg acceptor ionization energy.

### Official/local Power/GaN GaN_Vertical_MOSFET_SW example

Path: `Applications_Library/Power/GaN/GaN_Vertical_MOSFET_SW/`

`MOS_dvs.cmd` uses:
- n-type GaN: `nSiliconActiveConcentration`
- p-type GaN: `pMagnesiumActiveConcentration`

The GaN `Material` block in `sdevice.par` defines:
- `Species ("pMagnesiumActiveConcentration")`
- `type=acceptor`
- E0=0.29 eV
- alpha=3e-8
- g=4
- Xsec=1e-12
- file comment: `Matches well average value in publications`

The same GaN block defines n-Si donor E0=0.015 eV and notes a 7–20 meV literature range.

## Critical findings

1. The local T-2022.03 Applications Library contains multiple official GaN Mg incomplete-ionization parameterizations. There is no single universal Mg E0 that can be silently adopted.
2. `E0`, `alpha`, `g`, and `Xsec` form a **parameterization tuple**. P2 will not vary only E0 while silently mixing the other terms from a different official example.
3. The 0.5 eV value identified in `pGate_HEMT` belongs to **AlGaN**, not GaN.
4. The `E0=1.0` value near the top of `pGate_HEMT/sdevice.par` is an impact-ionization electric-field model parameter, not Mg activation energy.
5. Literature reports Mg:GaN activation energies over a substantial range and with doping dependence; therefore Applications Library values are treated as model choices, not experimental truth for the Chang wafer.

## Locked calibration model bracket

### Primary Model B — Power/GaN pGate family

Use the complete local official tuple:
- species: `pMagnesiumActiveConcentration`
- E0 = 0.20 eV
- alpha = 8e-9
- g = 4
- Xsec = 1e-14

Role: **primary lower/central Power-GaN model**.

### Primary Model C — Power/GaN vertical-device family

Use the complete local official tuple:
- species: `pMagnesiumActiveConcentration`
- E0 = 0.29 eV
- alpha = 3e-8
- g = 4
- Xsec = 1e-12

Role: **primary higher-energy Power-GaN model**.

### Secondary Model A — GettingStarted cross-check

Use the complete local official tuple:
- species: `MagnesiumActiveConcentration`
- E0 = 0.15 eV
- alpha = 0
- g = 4
- Xsec = 1e-12

Role: **secondary lower-bound/tool-family cross-check**, not the sole P2 model. It uses a different project-specific species/datacode route from the Power/GaN examples, so it is not mixed silently with Models B/C.

## P2 calibration rule

For every retained model:

```text
Chang reported target: p = 3×10^17 cm^-3 at 300 K
        ↓
choose one complete official Mg ionization tuple
        ↓
set Mg active concentration as sweep variable
        ↓
IncompleteIonization ON
        ↓
300 K equilibrium uniform p-GaN
        ↓
measure bulk free-hole concentration away from contacts
        ↓
find Mg active concentration that reproduces p≈3×10^17 cm^-3
```

The resulting Mg value is tagged `[TRANSLATION-CALIBRATED]` and is **not** reported as the actual SIMS/chemical Mg concentration of the Chang wafer.

## Model-selection / sensitivity rule

- Models B and C are the **primary calibration bracket** because both are Power/GaN examples and use `pMagnesiumActiveConcentration`.
- Model A is a secondary cross-check.
- Each model must be calibrated separately to the same 300 K free-hole target before any Micro-LED device comparison.
- If equal-hole-calibrated models give materially different P2/P5/P6 outputs, the Mg ionization model remains an uncertainty source and results must be reported as a sensitivity band.
- If the core sidewall metrics are stable, a representative translation model may be selected with the other model retained as validation/sensitivity evidence.

## Literature context

Peer-reviewed Mg:GaN literature reports activation energies roughly in the ~0.12–0.25 eV regime in many experimental studies, with strong dependence on Mg concentration, compensation, growth, and annealing. A constant E0 therefore should not be presented as a universal physical constant. The Sentaurus 0.29 eV tuple is retained as a **tool-model sensitivity branch**, especially because it also includes a nonzero doping-dependence coefficient `alpha`; it is not claimed to be the measured Chang-wafer Mg level.

## Next action

1. Create a local-only calibration workspace from a known-valid official 1D GaN p-gate example.
2. Build a minimal uniform p-GaN equilibrium test with center-region hole-concentration extraction.
3. Run Models B and C first; Model A second as cross-check.
4. Initial Mg sweep is broad/logarithmic and is refined around the p=3×10^17 cm^-3 crossing.
5. Record calibrated Mg values and convergence evidence before final P2 baseline locking.
