# P0 Upload / Recovery Verification

Verified: 2026-08-28

## User-supplied files

| File | Verification |
|---|---|
| `P0_COMMAND_BACKUP_20260828.tar.gz` | SHA256 `b3ae870b5713c11b30129475c8ec30c74d2d5ae3759c03ca7a8b7c45903d1677` — matches supplied checksum record |
| `P0_COMMAND_FILELIST_20260828.txt` | SHA256 `0ef3170dc257f2de9368bff721eaf885de18c256ee33d889c0695ec64deac2a5` — matches supplied checksum record |
| archive member list | 15 regular text files; exactly matches the 15 paths in the supplied file list |

## GitHub metadata-copy verification

The two user-generated recovery metadata files copied into GitHub are byte-identical to the supplied files:

- `recovery/P0_COMMAND_FILELIST_20260828.txt` — Git blob SHA `3365b2884564994f9086e707d08758e51eec96c8` matches local `git hash-object` semantics.
- `recovery/P0_COMMAND_SHA256_20260828.txt` — Git blob SHA `3483196e8de958c94e19ee4830a6ef8210e58259` matches local `git hash-object` semantics.

## Source-code handling

The archive contains an unmodified installed Synopsys reference example. The public repository therefore preserves exact file names, archive/per-file hashes, provenance, and the P0→P1 diff rather than republishing the full unchanged vendor source. The user's recovery archive remains the authoritative byte-level P0 source backup.

Research-modified P1/P2 commands remain archived in full and were separately verified byte-for-byte against their recovery archive.
