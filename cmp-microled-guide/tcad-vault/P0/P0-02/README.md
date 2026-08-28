# P0-02 — GaN PiN official example reproduction · recovery record

Recovered: 2026-08-28

Server source project: `CMP_PIN_DIODE`

## Recovery integrity

- Recovery archive: `P0_COMMAND_BACKUP_20260828.tar.gz`
- Archive SHA256: `b3ae870b5713c11b30129475c8ec30c74d2d5ae3759c03ca7a8b7c45903d1677`
- File list SHA256: `0ef3170dc257f2de9368bff721eaf885de18c256ee33d889c0695ec64deac2a5`
- Archive text files: **15**
- The 15 paths in `P0_COMMAND_FILELIST_20260828.txt` match the 15 archive members exactly.

## Role in the project

This is the unmodified reference project used for P0 reproduction before the P1 work copy was changed. It establishes the starting SDE → mesh → SDevice → SVisual workflow and the original forward/reverse GaN PiN behavior.

## Public-repository handling

The recovered project is an installed Synopsys example. The user's local/server recovery archive is therefore the authoritative byte-level backup. The public GitHub repository records the exact file list, archive checksum, per-file SHA256, and the P0→P1 comparison, but does **not** republish the complete unchanged vendor example source.

Research-modified commands are archived separately under P1/P2 as canonical source files.

## P0 → P1 relationship

Comparison against the recovered `CMP_PIN_DIODE_Copy1` backup found **11 common filenames**:

- **8 files byte-identical**
- **3 files changed**
- **4 P0-only generated/visualization node files** were not present in the P1 recovery package.

The research-relevant source change is the forward SDevice deck: P1 adds a 0 V equilibrium `Plot(FilePrefix=...)` snapshot after the initial coupled solution. `pp2_des.cmd` reflects the same instantiated Workbench change. `gexec.cmd` changes project metadata/check bookkeeping.

See `P0_TO_P1_DIFF.md` and `P0_FILE_SHA256_MANIFEST.md`.

## Recovered path list

```text
CMP_PIN_DIODE/gexec.cmd
CMP_PIN_DIODE/n1_msh.cmd
CMP_PIN_DIODE/plot_fdiv_vis.tcl
CMP_PIN_DIODE/plot_rviv_vis.tcl
CMP_PIN_DIODE/pp1_dvs.cmd
CMP_PIN_DIODE/pp2_des.cmd
CMP_PIN_DIODE/pp2_des.par
CMP_PIN_DIODE/pp3_vis.cmd
CMP_PIN_DIODE/pp4_des.cmd
CMP_PIN_DIODE/pp4_des.par
CMP_PIN_DIODE/pp5_vis.cmd
CMP_PIN_DIODE/sd_fdiv_des.cmd
CMP_PIN_DIODE/sd_rviv_des.cmd
CMP_PIN_DIODE/sde_dvs.cmd
CMP_PIN_DIODE/sdevice.par
```
