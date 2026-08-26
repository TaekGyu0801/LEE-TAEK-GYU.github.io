# P2 Mg incomplete-ionization local T-2022.03 audit

Date: 2026-08-27
Status: LOCAL INSTALLATION EVIDENCE CAPTURED — MODEL BRACKET NOT YET FINAL-LOCKED

## Purpose

Chang et al. (2020) reports p-GaN / p-EBL free-hole concentration rather than a directly usable Mg chemical/active dopant density. Before translating this to Sentaurus, the local T-2022.03 installation was audited to determine how official GaN examples represent Mg incomplete ionization.

## User-local evidence

### Existing P1 GaN PiN deck

`pp2_des.par` uses generic active dopants:

- `PDopantActiveConcentration`: `E_0=0.15 eV`, `alpha=0`, `g=4`, `Xsec=1e-12`
- `NDopantActiveConcentration`: `E_0=0.05 eV`, `alpha=0`, `g=2`, `Xsec=1e-12`

`pp2_des.cmd` has `IncompleteIonization` enabled.

### GettingStarted / pGate_HFET

Local `datexcodes.txt` defines:

- `MagnesiumActiveConcentration, MgActive` = substitutional Mg concentration, cm^-3
- `MagnesiumConcentration` = total chemical Mg concentration
- `MagnesiumMinusConcentration` = ionized Mg- concentration for incomplete ionization

Local `sdevice.par` contains GaN/AlGaN Mg species with `E_0=0.15 eV`, `alpha=0`, `g=4`.

### Power/GaN examples

Official local examples use `pMagnesiumActiveConcentration` in SDE/SDevice parameter files. The grep audit found multiple parameterizations, including:

- GaN-oriented power/p-gate examples with `E_0=0.29 eV`, `alpha=3e-8`, `g=4`
- p-gate examples with `E_0=0.20 eV`, `alpha=8e-9`, `g=4`
- additional `E_0=0`, `0.5`, and `1.0 eV` blocks also appear in the aggregate grep output, BUT their material/block context is not yet resolved and they must NOT be treated as GaN Mg alternatives until the surrounding `Material=...` sections are inspected.

## Critical conclusion

`E_0=0.15 eV` is NOT locked as a universal GaN:Mg constant. The local T-2022.03 applications library itself contains multiple Mg incomplete-ionization parameterizations. Therefore Chang's reported `p = 3e17 cm^-3` will not be translated by simply setting `Mg = 3e17 cm^-3` or by silently selecting one activation model.

## Planned translation method

1. Resolve which aggregate grep blocks actually correspond to GaN (not AlGaN or other regions).
2. Predeclare a small set of literature/official-example-supported GaN Mg ionization models.
3. For each model, calibrate `pMagnesiumActiveConcentration` so that a uniform 300 K bulk p-GaN slab reproduces Chang's target free-hole concentration `p = 3e17 cm^-3`.
4. Use the calibrated variants in later device-level sensitivity tests.
5. If the sidewall conclusions are insensitive to the Mg ionization model after equal-free-hole calibration, report the result as a bounded translation uncertainty. If sensitive, retain the model as an uncertainty/blocker rather than selecting a favorable value.

## Do-not-do rules

- Do not equate reported hole concentration with Mg dopant density.
- Do not call any one of 0.15/0.20/0.29 eV the universal Mg activation energy.
- Do not include 0/0.5/1.0 eV in the GaN bracket until their material context is verified.
- Do not tune Mg ionization parameters to force a desired Micro-LED result.
