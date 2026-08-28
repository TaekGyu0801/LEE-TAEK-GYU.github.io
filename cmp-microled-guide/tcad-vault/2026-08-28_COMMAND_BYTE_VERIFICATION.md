# 2026-08-28 TCAD Command Byte Verification

Source archive: `CMP_COMMAND_BACKUP_20260828.tar.gz`

Verification method: compare each recovered source file with the GitHub canonical file using the Git blob SHA-1 (`git hash-object` semantics). A matching blob SHA means the file content is byte-for-byte identical, including leading/trailing newlines.

## Final result

**17 / 17 archived canonical/history/postprocess files verified byte-for-byte identical to the user-supplied recovery archive.**

| Official location | Source in recovery archive | Git blob SHA | Result |
|---|---|---|---|
| P1-01 `commands/sd_fdiv_des.cmd` | `CMP_PIN_DIODE_Copy1/sd_fdiv_des.cmd` | `ad5f346f0d34ef00a2833a8749b55c3ae3d506d7` | EXACT |
| P1-02 `commands/p1_refined_des.cmd` | `CMP_PIN_DIODE_Copy1/p1_refined_des.cmd` | `23ba4a717389ade0d8757241743bab07e5b9fc1a` | EXACT |
| P1-02 `commands/p1_refined_dvs.cmd` | `CMP_PIN_DIODE_Copy1/p1_refined_dvs.cmd` | `790bedef2861a9fa1673fc9424eb83eadb8ed62c` | EXACT |
| P1-04 `commands/cmp_leakage_run.cmd` | `CMP_PIN_DIODE_Copy1/cmp_leakage_run.cmd` | `9b23b9f107b09341267fee0b34fdf66247d6e61d` | EXACT |
| P1-04 `commands/cmp_notrap_run.cmd` | `CMP_PIN_DIODE_Copy1/cmp_notrap_run.cmd` | `37fd5108b134c2dcb02f3b2c8d54751266a990da` | EXACT |
| P2-03 `commands/IgVg_des.cmd` | `CMP_P2_MG_CALIBRATION/IgVg_des.cmd` | `efaf2e563c3b7107d0c2977a2beb34f481829f29` | EXACT |
| P2-03 `commands/sde_mg_9p59e18.cmd` | `CMP_P2_MG_CALIBRATION/sde_dvs.cmd` | `165198d977eb8ec75c74f7a881bb9be1d15a04c2` | EXACT |
| P2-03 `commands/sde_mg_sweep_template.cmd` | `CMP_P2_MG_CALIBRATION/sde_dvs_before_9p75e18.cmd` | `96f6eef5fb2318504de0de2eeffc5efe5956aca1` | EXACT |
| P2-03 `parameters/sdevice_mg_model.par` | `CMP_P2_MG_CALIBRATION/sdevice.par` | `ba222aa5849b0ed6183e9532cfdfb7d4bfd02600` | EXACT |
| P2-03 `postprocess/extract_hdensity_n62.tcl` | `CMP_P2_MG_CALIBRATION/extract_hdensity_n62.tcl` | `06e0428c7e3006c14140111d5780e3b88d94870d` | EXACT |
| P2-04 `commands/sde_mqw10_dev_20260827.cmd` | `CMP_P3_BASELINE_MICROLED/sde_dvs.cmd` | `fdfa30015834ae0f333f20d77b8e9eaf57594018` | EXACT |
| P2-04 `commands/sd_forward_mqw10_dev_20260827.cmd` | `CMP_P3_BASELINE_MICROLED/sd_fdiv_des.cmd` | `4647fae46947e058702125ee4e01dc1c4c8660cc` | EXACT |
| P2-04 `parameters/sdevice_mg_model.par` | `CMP_P3_BASELINE_MICROLED/sdevice.par` | `7e12f2b29ac25f4a013f526917c301703d0fdeb8` | EXACT |
| P2-04 `history/01_p3a_mg_baseline_ok_sde.cmd` | `CMP_P3A_MG_BASELINE_OK/sde_dvs.cmd` | `ae4a872d38e2eab71eb538b478b8e6f0c7bda8d7` | EXACT |
| P2-04 `history/02_before_p3c_mqw_clean_sde.cmd` | `CMP_P3_BASELINE_MICROLED/sde_dvs_before_P3C_MQW.cmd` | `91211ec9d0e22c46194fa297fd059b03d75910b8` | EXACT |
| P2-04 `history/03_before_p3c_mqw_forward.cmd` | `CMP_P3_BASELINE_MICROLED/sd_fdiv_before_P3C_MQW.cmd` | `023a56ff006b481e27d271c83c57393d67daeac6` | EXACT |
| P2-04 `history/04_before_ii_scope_fix_forward.cmd` | `CMP_P3_BASELINE_MICROLED/sd_fdiv_before_P3C_II_scope_fix.cmd` | `88d492464674fd981e6d492aae6ca56a4640516d` | EXACT |

## Note on the first upload pass

The first text upload pass preserved all code/parameter lines, but eight files had only leading/trailing blank-line bytes trimmed by the text transfer. No executable statement or parameter value differed. Those edge newlines were restored on 2026-08-28, and the final Git blob hashes above now match the recovery archive exactly.

Files intentionally excluded from canonical storage (vendor `ORIGINAL/`, Workbench glue/generated duplicates, unchanged shared visualization scripts) remain documented in `2026-08-28_COMMAND_RECOVERY_MANIFEST.md`; exclusion is deliberate and is not a verification failure.
