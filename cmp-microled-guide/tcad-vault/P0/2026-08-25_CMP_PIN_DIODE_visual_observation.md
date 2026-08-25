# P0 visual observation — CMP_PIN_DIODE

Date: 2026-08-25
Source: user-provided Sentaurus Visual screenshots from `CMP_PIN_DIODE`

## What is directly visible

- Boundary file: `n1_bnd`
- Mesh/doping file: `n1_msh`
- Materials list visibly includes `GaN`; boundary view also shows `Nitride` and `Contact` entries.
- Geometry is a 2D mesa-like GaN structure with a sloped right sidewall and a contact/overlay region following part of the right/top edge.
- In `n1_msh`, `DopingConcentration` is displayed with a signed range approximately from `-1e19` to `+1e19 cm^-3`.
- The vertical stack visibly contains multiple doping zones: a negative-sign upper zone, a transition/near-neutral middle zone, and a positive-sign lower zone.
- Exact assignment of p-type/n-type, exact layer names/thicknesses, contact names, and the meaning of each narrow transition layer are **not finalized from color alone**. These must be confirmed from the SDE command/region definitions or Sentaurus Visual region/contact metadata.

## Interpretation for CMP workflow

- This is suitable as a candidate P1 GaN diode baseline because it is a GaN-only diode structure without an InGaN MQW active region.
- The mesa/sloped sidewall geometry is relevant to the later Micro-LED sidewall project, but P1 should first verify the baseline diode behavior before adding MQW or sidewall-defect physics.
- Do not change geometry or doping yet.

## Next verification

1. Read exact region names from the `Regions` tab.
2. Read exact contact names/location from the contact display/metadata.
3. Inspect SDE command file for numeric layer thicknesses, doping species/concentrations, and mesh rules.
4. Only after these are confirmed decide whether this project is locked as the P1 baseline.
