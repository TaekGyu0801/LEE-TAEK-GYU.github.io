; Simple 1-D structure used to investigate a typical pGate HEMT with Schottky for blocking
; excessive gate current

; Boundary
(sdegeo:create-rectangle (position 0   0 0) (position 0.1 0.1 0) "GaN" "pGate")

; Contacts
(sdegeo:define-contact-set "gate")
(sdegeo:set-current-contact-set "gate")
(sdegeo:define-2d-contact (find-edge-id (position 0 0.05 0)) "gate")

(sdegeo:define-contact-set "source")
(sdegeo:set-current-contact-set "source")
(sdegeo:define-2d-contact (find-edge-id (position 0.1 0.05 0)) "source")

; Doping
(sdedr:define-constant-profile "DC.nbg" "pMagnesiumActiveConcentration" 9.59e18)
(sdedr:define-constant-profile-material "CPM.nbg" "DC.nbg" "GaN")

; Mesh
(sdedr:define-refinement-size "RS.global" 0.002 999 0.001 888)
(sdedr:define-refinement-material "RP.global" "RS.global" "GaN")

; Very dense mesh in depletion for smooth tunneling curves
; Assume minimum Mg doping will be ~5e18 cm^-3
(sdedr:define-refinement-window "RW.tun" "Rectangle" 
	(position 0.000 0 0) (position 0.03 0.1 0) 
)
(sdedr:define-refinement-size "RS.tun" @<f*0.00025>@ 8888 0.00005 888)
(sdedr:define-refinement-placement "RP.tun" "RS.tun" "RW.tun")	

(sdedr:define-refinement-size  "RS.depletion" 0.001 888 0.0002 888)
(sdedr:define-refinement-region "RP.depletion" "RS.depletion" "pGate.t")

; Build 1D mesh
(sde:set-process-up-direction "-x")
(sdeio:save-1d-tdr-bnd (get-body-list) "n@node@_bnd.tdr")
(sdedr:write-cmd-file "n@node@_msh.cmd")
(system:command "snmesh n@node@_msh")
