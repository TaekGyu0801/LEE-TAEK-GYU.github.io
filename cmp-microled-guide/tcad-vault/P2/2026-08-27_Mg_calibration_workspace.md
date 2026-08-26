# P2 Mg Calibration Workspace — local Sentaurus T-2022.03

Date: 2026-08-27
Status: **WORKSPACE VERIFIED — DECK SIMPLIFICATION PENDING**

## Local workspace

User created:

`~/CMP_P2_MG_CALIBRATION`

by copying the local official application-library example:

`Applications_Library/Power/GaN/pGate_Schottky_1D`

An `ORIGINAL/` snapshot was created containing:
- `sde_dvs.cmd`
- `IgVg_des.cmd`
- `sdevice.par`
- `datexcodes.txt`

The proprietary `greadme.pdf` is not to be uploaded to the public repository.

## Verified SDE structure

`sde_dvs.cmd` currently:
- creates a single GaN rectangle from `(0,0)` to `(0.1,0.1)` in SDE units,
- defines `gate` and `source` contacts on opposite x-normal edges,
- applies `pMagnesiumActiveConcentration = @NMg@` uniformly to GaN,
- contains dense tunneling/depletion mesh refinements that are specific to the original Schottky-current example,
- converts/saves the geometry as a 1D boundary/mesh using `sdeio:save-1d-tdr-bnd` and `snmesh`.

For the P2 Mg calibration objective, the Schottky/tunneling-specific mesh refinement is not part of the target physics and will be removed or simplified only after the SDevice deck is fully inspected.

## Verified parameter-file context

The copied `sdevice.par` GaN block contains the Power/GaN Mg Model B tuple:
- species: `pMagnesiumActiveConcentration`
- `type=acceptor`
- `E_0=0.20 eV`
- `alpha=8e-9`
- `g=4`
- `Xsec=1e-14`

The file also contains mobility, SRH, impact-ionization, quantum-potential, thermionic, and nonlocal-tunneling parameter blocks from the original Schottky example. These do **not** automatically become P2 calibration physics. Only models explicitly activated in the calibration `Physics` section are to affect the equilibrium Mg→free-hole conversion.

## Current calibration target

Chang et al. reported target:

`p = 3×10^17 cm^-3 at 300 K`

The calibration workspace will be reduced to:

```text
uniform GaN
+ pMagnesiumActiveConcentration = sweep variable
+ Fermi statistics
+ IncompleteIonization
+ 300 K equilibrium
+ hole-density extraction in bulk/interior
```

No MQW, polarization, sidewall trap, wet treatment, ALD, tunneling-current model, or bias sweep belongs in this auxiliary calibration test.

## Next verification before editing

Before modifying `IgVg_des.cmd`, inspect the full `File`, `Electrode`, `Physics`, `Plot`, `Math`, and `Solve` sections to identify every original Schottky/TAT/tunneling model and solver dependency.

For automated extraction, prefer a scalar `CurrentPlot` quantity such as `hDensity` at a verified interior coordinate or an average over the GaN domain. The exact T-2022.03 syntax must be confirmed against the local installation/examples before coding.
