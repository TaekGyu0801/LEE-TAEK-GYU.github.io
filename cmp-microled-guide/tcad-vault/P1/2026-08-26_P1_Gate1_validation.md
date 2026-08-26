# P1 Gate 1 Validation — GaN PiN pipeline prototype

Date: 2026-08-26

## Scope

This document records the final Phase 1 mesh-convergence and cylindrical-current-normalization checks for the existing `CMP_PIN_DIODE_Copy1` GaN PiN pipeline prototype. This device is not the final InGaN/GaN Micro-LED baseline.

## Mesh comparison

Baseline mesh:
- vertices: 3,728
- elements: 7,054

Refined mesh:
- vertices: 9,991
- elements: 19,291

Only mesh settings and output filenames were changed between the baseline and refined SDevice runs. Electrode, physics, trap, solver, and transient bias conditions were unchanged.

### Fixed-voltage conduction-current comparison

Conduction current was evaluated as `anode eCurrent + anode hCurrent`. Because the diode current changes exponentially near turn-on, current between solver points was compared using log-current interpolation rather than linear-current interpolation.

| Voltage | Baseline I (A) | Refined I (A) | Change |
|---:|---:|---:|---:|
| 3.0 V | 8.739064e-7 | 8.751933e-7 | 0.1473% |
| 3.2 V | 1.240914e-4 | 1.278860e-4 | 3.0579% |
| 3.5 V | 6.450880e-3 | 6.269828e-3 | 2.8066% |
| 5.0 V | 7.710818e-2 | 7.709408e-2 | 0.0183% |
| 10.0 V | 3.398912e-1 | 3.624365e-1 | 6.6331% |

Core forward region (3–5 V) satisfies the project mesh criterion of <=5%. A high-bias sensitivity remains at the 10 V endpoint and is retained as a caveat rather than hidden.

### Fixed-current voltage comparison

| Current | Baseline V | Refined V | |Delta V| |
|---:|---:|---:|---:|
| 1 uA | 3.00531 V | 3.00536 V | 0.051 mV |
| 10 uA | 3.09879 V | 3.10022 V | 1.432 mV |
| 100 uA | 3.19044 V | 3.19016 V | 0.279 mV |
| 1 mA | 3.30496 V | 3.30638 V | 1.418 mV |
| 10 mA | 3.58760 V | 3.59342 V | 5.826 mV |
| 50 mA | 4.43930 V | 4.44312 V | 3.828 mV |
| 100 mA | 5.46707 V | 5.46090 V | 6.175 mV |

The turn-on region is therefore stable to only a few millivolts under the tested mesh refinement.

## Displacement-current check

The transient output was checked because `TotalCurrent` can include displacement current. The displacement-current fraction was negligible in the forward range:

- 3.0 V: ~7e-7 %
- 3.2 V: ~1e-8 %
- 3.5 V: ~1e-10 %
- 5.0 V: ~1e-10 to 1e-11 %
- 10 V: ~1e-11 %

Thus the forward-I-V comparison is effectively a conduction-current comparison.

## Cylindrical current normalization

The active SDevice deck contains:

```text
Math {
  ...
  Cylindrical(yAxis=0)
}
```

No `AreaFactor` is present in the global Physics section or Electrode section.

The SDE structure is drawn with `y >= 0` and the symmetry axis at `y = 0`. With `Cylindrical(yAxis=0)`, Sentaurus Device interprets the 2D cross-section as a body of revolution around the x-axis and integrates over the full 2*pi azimuth. Therefore the terminal current written to `*_des.plt` is an absolute axisymmetric-device current in amperes (A), not the default planar-2D A/um current.

Consequences:

1. Do not multiply the cylindrical terminal current by an assumed 1 um device width.
2. Do not additionally multiply it by 2*pi; the cylindrical formulation already performs the rotational integration.
3. No additional AreaFactor scaling is applied in the present deck.
4. If a current density in A/cm^2 is required later, the physical normalization area must be explicitly defined from the chosen contact/device area before dividing the terminal current. Do not mix that conversion with planar-2D width normalization.
5. This cylindrical normalization applies only to the current P1 GaN PiN prototype. It must not be copied automatically to the later 10 um Micro-LED model if that model uses a different 2D geometry or normalization scheme.

## Gate 1 conclusion

- equilibrium convergence: PASS
- forward diode-like response: PASS
- reverse test run: PASS
- mesh-refinement sanity check in core forward region: PASS
- cylindrical terminal-current normalization: PASS

Phase 1 can be marked complete, with the 10 V high-bias mesh sensitivity retained as a documented caveat.
