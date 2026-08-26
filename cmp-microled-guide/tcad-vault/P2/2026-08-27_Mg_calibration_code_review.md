# P2 Mg Calibration Code Review — Claude Draft Audit

Date: 2026-08-27
Status: **REVIEWED — SMOKE TEST PENDING**

## Scope

Reviewed the Claude-generated P2 p-GaN Mg calibration bundle against:

- the actual copied T-2022.03 `Power/GaN/pGate_Schottky_1D` files shown from the local server,
- the previously locked Mg Model-B tuple,
- Sentaurus Device training/user-guide syntax for `CurrentPlot`, global `Physics`, and SWB placeholders.

## Critical corrections

### 1. `sde_dvs.cmd` draft must NOT replace the real file

The actual source file was available and had already been shown. The Claude draft incorrectly stated otherwise and contains guessed API calls.

The real file already has the correct:
- 0.1 µm GaN domain,
- `gate` and `source` contact geometry,
- uniform `pMagnesiumActiveConcentration @NMg@`,
- `sdeio:save-1d-tdr-bnd (get-body-list) ...`,
- `sdedr:write-cmd-file`,
- `snmesh` invocation.

Therefore the safest calibration policy is: **leave the actual `sde_dvs.cmd` unchanged for the first smoke test**. Its tunneling-oriented local mesh is unnecessary but harmless for this 1D equilibrium test and avoids introducing geometry/mesh syntax errors.

### 2. Claude `MgCal_des.cmd` Grid path is wrong/high-risk

Claude hard-coded:

`Grid = "n@node@_bnd.tdr"`

But the actual official SDevice command uses:

`Grid = "@tdr@"`

The SDE flow writes the boundary TDR and then invokes `snmesh`; SWB's `@tdr@` placeholder resolves the actual mesh output passed from the upstream node. The boundary file should not be silently substituted as the SDevice grid.

**Decision:** retain the official SWB placeholders:
- `Grid="@tdr@"`
- `Parameter="@parameter@"`
- `Current="@plot@"`
- `Plot="@tdrdat@"`
- `Output="@log@"`

### 3. `CurrentPlot` coordinate syntax is supported

Sentaurus Device documentation/training shows that quantities from the `Plot` section can be monitored in a top-level `CurrentPlot` section at coordinates, and a list of coordinates is allowed. A 2D example is `hDensity((0 1))`.

For the 1D grid, the intended form:

```text
CurrentPlot {
  hDensity(
    (0.04)
    (0.05)
    (0.06)
  )
}
```

is consistent with the documented coordinate-list grammar, but a one-point smoke test is still required before the full sweep.

Because the documentation says any quantity available in `Plot` can be monitored, `pMagnesiumActiveConcentration` and `pMagnesiumMinusConcentration` are also defensible `CurrentPlot` candidates. Their local names are additionally corroborated by the original official command file's `Plot` list. Smoke-test confirmation remains required.

### 4. `DefaultParametersFromFile` scope is resolved

The actual T-2022.03 copied example uses `DefaultParametersFromFile` directly inside the global `Physics {}` block. Therefore there is no need to move it to `Physics(Material="GaN")` for this calibration.

### 5. Claude's `sdevice.par` explanation was inaccurate

The actual local `sdevice.par` had already been shown. It contains project-specific overrides (lattice orientation, tunneling parameters, mobility/SRH/impact/quantum-potential overrides, Mg ionization tuple), not a complete copy of all GaN bandgap/permittivity/effective-density parameters.

With `DefaultParametersFromFile`, the MaterialDB supplies the default material parameters. Therefore a calibration parameter file can be minimal and contain only the required Model-B Mg ionization override (plus optional retained lattice parameters, which are not needed by the active equilibrium physics).

### 6. Generic Claude Math block is not accepted as 'final'

`Derivatives`, `RelErrControl`, `Digits=5`, `Notdamped=50`, and `Iterations=20` were not taken from the copied T-2022.03 example and were therefore not source-locked.

For the smoke test, use a small, explicit solver block based on the validated GaN example philosophy rather than claiming these generic values are official.

## Locked Model-B tuple

Use the complete tuple without mixing terms:

- species: `pMagnesiumActiveConcentration`
- type: acceptor
- `E_0 = 0.20 eV`
- `alpha = 8e-9`
- `g = 4`
- `Xsec = 1e-14`

Target observable remains:

`hDensity(x=0.05 µm, 300 K) = 3×10^17 cm^-3`

## First-run policy

1. Do not run the 7-point sweep yet.
2. First run a single Model-B node, preferably with `NMg=1e19 cm^-3`, only to validate parsing/output/convergence.
3. Confirm:
   - SDE/SNMesh success,
   - SDevice equilibrium success,
   - `hDensity` appears at x=0.04/0.05/0.06 µm,
   - Mg active and ionized concentrations appear if requested,
   - center values are spatially flat enough for a bulk-like interpretation.
4. Only after this smoke test passes, start the broad Mg sweep.

## Remaining gate

**Gate P2-Mg-Cal-0:** corrected command/parameter files parse and one-node equilibrium smoke test passes. No calibrated Mg value is accepted before this gate.
