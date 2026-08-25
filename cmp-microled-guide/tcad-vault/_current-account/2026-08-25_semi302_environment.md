# TCAD Current Account Environment Snapshot — 2026-08-25

## Confirmed from terminal

- Account: `semi302`
- Host prompt: `ssudisu1`
- Home/current directory: `/user/semi/semi302`
- Shell: `/bin/csh`
- `STROOT`: undefined in current shell
- `STRELEASE`: undefined in current shell
- `sdevice`: `/user/tools/synopsys/sentaurus/T-2022.03/bin/sdevice`
- `sde`: `/user/tools/synopsys/sentaurus/T-2022.03/bin/sde`
- `swb`: `/user/tools/synopsys/sentaurus/T-2022.03/bin/swb`
- `sprocess`: `/user/tools/synopsys/sentaurus/T-2022.03/bin/sprocess`
- Python: `3.8.11`

## Important observation

The previously known example path `/home/eda/synopsys/tcad/T-2022.03/Applications_Library/GettingStarted/sdevice/GaN_PiN_Diode` does **not** exist on this account/server. Do not assume paths from another server/account.

The executable paths show that the active Sentaurus installation root is likely under `/user/tools/synopsys/sentaurus/T-2022.03`, but the exact application-library location must be discovered before using/copying any example.

## P0 next action

Search the active T-2022.03 installation tree for the `GaN_PiN_Diode` example directory. Do not set `STROOT`/`STRELEASE` manually yet; the current PATH already resolves the Sentaurus executables, and environment variables should only be changed after confirming the server's intended setup.
