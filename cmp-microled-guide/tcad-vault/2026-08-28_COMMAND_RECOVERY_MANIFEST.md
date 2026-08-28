# 2026-08-28 TCAD Command Recovery Manifest

## Source backup

- Server-created archive: `CMP_COMMAND_BACKUP_20260828.tar.gz`
- Archive SHA256: `b58258d55abf39dbd61f85a9763aa39635c3c1226bf4560baf0b7f1a2a74daa1`
- File list: `CMP_COMMAND_FILELIST_20260828.txt`
- File-list SHA256: `4738e9561005308aefa0d9bbd781f4c62b84d1098a9d2a4bace30eafb216f26a`
- Extracted text files inspected: **71**

The original compressed backup remains the user's local recovery source. The public repository stores canonical research-modified commands and provenance rather than copying every vendor-origin/Workbench-generated duplicate.

## Phase mapping after review

| Server project | Official project location | Decision |
|---|---|---|
| `CMP_PIN_DIODE_Copy1` | P1 | baseline, mesh refinement, trap/no-trap sanity |
| `CMP_P2_MG_CALIBRATION` | P2-03 | Mg incomplete-ionization calibration |
| `CMP_P3A_MG_BASELINE_OK` | P2-04 history | Mg baseline checkpoint; not official Phase P3 |
| `CMP_P3_BASELINE_MICROLED` | P2-04 development | Micro-LED baseline construction history; not official Phase P3 |

## Canonical files uploaded

### P1-01
- `P1/P1-01/commands/sd_fdiv_des.cmd` — recovered baseline forward command with 0-V equilibrium snapshot.
- reverse baseline vendor-derived command was checksum-recorded in P1-01 README rather than republished unchanged.

### P1-02
- `P1/P1-02/commands/p1_refined_dvs.cmd`
- `P1/P1-02/commands/p1_refined_des.cmd`

### P1-04
- `P1/P1-04/commands/cmp_leakage_run.cmd`
- `P1/P1-04/commands/cmp_notrap_run.cmd`

### P2-03
- `P2/P2-03/commands/IgVg_des.cmd`
- `P2/P2-03/commands/sde_mg_sweep_template.cmd`
- `P2/P2-03/commands/sde_mg_9p59e18.cmd`
- `P2/P2-03/parameters/sdevice_mg_model.par`

### P2-04
- `P2/P2-04/commands/sde_mqw10_dev_20260827.cmd`
- `P2/P2-04/commands/sd_forward_mqw10_dev_20260827.cmd`
- `P2/P2-04/parameters/sdevice_mg_model.par`

## Key review findings

1. P1 refined SDE halves the main mesh dimensions relative to the baseline in the important global/interface/ni refinement settings and builds `p1_refined` directly.
2. P1 trap/no-trap direct runs differ materially by the GaN/Nitride donor trap block; the no-trap comparison is therefore a valid controlled sensitivity pair.
3. P2 Mg calibration contains a dedicated equilibrium-only SDevice command, a parameterized `@NMg@` SDE template, and an instantiated 9.59e18 cm^-3 version.
4. The recovered P2-04 development deck currently has **10 InGaN QWs** and the forward command uses **XFraction=0.18**. This is not the final Wu-2023-based 4-QW / In0.08 baseline and must not be presented as a locked project reference.
5. `CMP_P3A_MG_BASELINE_OK/sde_dvs.cmd` is hash-identical to `CMP_P3_BASELINE_MICROLED/sde_dvs_before_P3B_clean.cmd`; it is stored conceptually once in provenance instead of duplicated.
6. `pp62_des.par` and `pp66_des.par` are hash-identical; Workbench node duplicates are not copied into canonical storage.

## Files intentionally not copied as canonical

- `ORIGINAL/` vendor copies.
- unchanged shared `plot_fdiv_vis.tcl` / `plot_rviv_vis.tcl` files.
- `gexec.cmd` and routine Workbench glue.
- auto-generated `n*_msh.cmd`, `pp*_*.cmd`, and duplicate parameter snapshots when they contain no unique research setting. Their presence and important hashes are documented in the P2-03 README.
- unchanged or essentially vendor baseline files when a checksum/provenance record is sufficient.

## Original recovered file list

```text
CMP_P2_MG_CALIBRATION/IgVg_des.cmd
CMP_P2_MG_CALIBRATION/IgVg_des_before_MgCal.cmd
CMP_P2_MG_CALIBRATION/IgVg_vis_vis.tcl
CMP_P2_MG_CALIBRATION/ORIGINAL/IgVg_des.cmd
CMP_P2_MG_CALIBRATION/ORIGINAL/sde_dvs.cmd
CMP_P2_MG_CALIBRATION/ORIGINAL/sdevice.par
CMP_P2_MG_CALIBRATION/extract_hdensity.tcl
CMP_P2_MG_CALIBRATION/extract_hdensity_n62.tcl
CMP_P2_MG_CALIBRATION/gexec.cmd
CMP_P2_MG_CALIBRATION/n6_msh.cmd
CMP_P2_MG_CALIBRATION/n7_msh.cmd
CMP_P2_MG_CALIBRATION/pp62_des.cmd
CMP_P2_MG_CALIBRATION/pp62_des.par
CMP_P2_MG_CALIBRATION/pp66_des.cmd
CMP_P2_MG_CALIBRATION/pp66_des.par
CMP_P2_MG_CALIBRATION/pp6_dvs.cmd
CMP_P2_MG_CALIBRATION/pp7_dvs.cmd
CMP_P2_MG_CALIBRATION/sde_dvs.cmd
CMP_P2_MG_CALIBRATION/sde_dvs_before_9p75e18.cmd
CMP_P2_MG_CALIBRATION/sdevice.par
CMP_P2_MG_CALIBRATION/sdevice_before_MgCal_fixed.par
CMP_P3A_MG_BASELINE_OK/gexec.cmd
CMP_P3A_MG_BASELINE_OK/n1_msh.cmd
CMP_P3A_MG_BASELINE_OK/plot_fdiv_vis.tcl
CMP_P3A_MG_BASELINE_OK/plot_rviv_vis.tcl
CMP_P3A_MG_BASELINE_OK/pp1_dvs.cmd
CMP_P3A_MG_BASELINE_OK/pp2_des.cmd
CMP_P3A_MG_BASELINE_OK/pp2_des.par
CMP_P3A_MG_BASELINE_OK/sd_fdiv_before_P3A_Mg.cmd
CMP_P3A_MG_BASELINE_OK/sd_fdiv_des.cmd
CMP_P3A_MG_BASELINE_OK/sd_rviv_des.cmd
CMP_P3A_MG_BASELINE_OK/sde_dvs.cmd
CMP_P3A_MG_BASELINE_OK/sde_dvs_before_P3A_Mg.cmd
CMP_P3A_MG_BASELINE_OK/sdevice.par
CMP_P3A_MG_BASELINE_OK/sdevice_before_P3A_Mg.par
CMP_P3_BASELINE_MICROLED/gexec.cmd
CMP_P3_BASELINE_MICROLED/n1_msh.cmd
CMP_P3_BASELINE_MICROLED/plot_fdiv_vis.tcl
CMP_P3_BASELINE_MICROLED/plot_rviv_vis.tcl
CMP_P3_BASELINE_MICROLED/pp1_dvs.cmd
CMP_P3_BASELINE_MICROLED/pp2_des.cmd
CMP_P3_BASELINE_MICROLED/pp2_des.par
CMP_P3_BASELINE_MICROLED/sd_fdiv_before_P3A_Mg.cmd
CMP_P3_BASELINE_MICROLED/sd_fdiv_before_P3B_clean.cmd
CMP_P3_BASELINE_MICROLED/sd_fdiv_before_P3C_II_scope_fix.cmd
CMP_P3_BASELINE_MICROLED/sd_fdiv_before_P3C_MQW.cmd
CMP_P3_BASELINE_MICROLED/sd_fdiv_des.cmd
CMP_P3_BASELINE_MICROLED/sd_rviv_des.cmd
CMP_P3_BASELINE_MICROLED/sde_dvs.cmd
CMP_P3_BASELINE_MICROLED/sde_dvs_before_P3A_Mg.cmd
CMP_P3_BASELINE_MICROLED/sde_dvs_before_P3B_clean.cmd
CMP_P3_BASELINE_MICROLED/sde_dvs_before_P3C_MQW.cmd
CMP_P3_BASELINE_MICROLED/sdevice.par
CMP_P3_BASELINE_MICROLED/sdevice_before_P3A_Mg.par
CMP_PIN_DIODE_Copy1/cmp_leakage_run.cmd
CMP_PIN_DIODE_Copy1/cmp_notrap_run.cmd
CMP_PIN_DIODE_Copy1/gexec.cmd
CMP_PIN_DIODE_Copy1/n1_msh.cmd
CMP_PIN_DIODE_Copy1/p1_refined_des.cmd
CMP_PIN_DIODE_Copy1/p1_refined_dvs.cmd
CMP_PIN_DIODE_Copy1/p1_refined_msh.cmd
CMP_PIN_DIODE_Copy1/plot_fdiv_vis.tcl
CMP_PIN_DIODE_Copy1/plot_rviv_vis.tcl
CMP_PIN_DIODE_Copy1/pp1_dvs.cmd
CMP_PIN_DIODE_Copy1/pp2_des.cmd
CMP_PIN_DIODE_Copy1/pp2_des.par
CMP_PIN_DIODE_Copy1/sd_cmp_leakage_des.cmd
CMP_PIN_DIODE_Copy1/sd_fdiv_des.cmd
CMP_PIN_DIODE_Copy1/sd_rviv_des.cmd
CMP_PIN_DIODE_Copy1/sde_dvs.cmd
CMP_PIN_DIODE_Copy1/sdevice.par
```
