# P0 → P1 Command Comparison

Compared on: 2026-08-28

Sources:
- P0: `P0_COMMAND_BACKUP_20260828.tar.gz` → `CMP_PIN_DIODE`
- P1 recovery: `CMP_COMMAND_BACKUP_20260828.tar.gz` → `CMP_PIN_DIODE_Copy1`

## Summary

Among filenames present in both recovered projects, 8 are byte-identical and 3 differ.

| File | P0 vs P1 | Interpretation |
|---|---|---|
| `n1_msh.cmd` | EXACT | same instantiated mesh command |
| `plot_fdiv_vis.tcl` | EXACT | same forward SVisual script |
| `plot_rviv_vis.tcl` | EXACT | same reverse SVisual script |
| `pp1_dvs.cmd` | EXACT | same instantiated SDE command |
| `pp2_des.par` | EXACT | same parameter snapshot |
| `sd_rviv_des.cmd` | EXACT | same reverse SDevice source |
| `sde_dvs.cmd` | EXACT | same SDE source |
| `sdevice.par` | EXACT | same SDevice parameter source |
| `sd_fdiv_des.cmd` | CHANGED | P1 adds 0 V equilibrium snapshot |
| `pp2_des.cmd` | CHANGED | instantiated form of the same forward-deck change |
| `gexec.cmd` | CHANGED | project name / execution bookkeeping metadata |

P0-only files in this recovery package: `pp3_vis.cmd`, `pp4_des.cmd`, `pp4_des.par`, `pp5_vis.cmd`.

## Research-relevant forward-deck diff

P0 original:

```text
Coupled (Iterations= 500 LineSearchDamping= 1e-2) { Poisson }
Coupled (Iterations= 100) { Poisson Electron Hole }

Transient (
```

P1 work copy:

```text
Coupled (Iterations= 500 LineSearchDamping= 1e-2) { Poisson }
Coupled (Iterations= 100) { Poisson Electron Hole }
#----- [ADDED] 0 V equilibrium snapshot
Plot(FilePrefix= "n@node@_equilibrium")

Transient (
```

Therefore P1-01 is traceable to P0 with the explicit addition of the equilibrium output snapshot. The SDE geometry, reverse source deck, visualization scripts, and main parameter source remained unchanged in the recovered pair.
