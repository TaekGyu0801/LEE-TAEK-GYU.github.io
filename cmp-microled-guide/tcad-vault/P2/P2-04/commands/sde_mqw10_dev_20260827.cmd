(sde:clear)

(define dx_pside 0.2)
(define dx_int 0.5)
(define dx_nside 0.2)
(define dx_sub   0.3)

(define xp dx_pside)
(define xi (+ xp dx_int))
(define xn (+ xi dx_nside))
(define xs (+ xn dx_sub))

(define radius_top     2.0)
(define radius_bottom  (+ radius_top (* 0.5 xn)))
(define radius_max radius_bottom)
(define radius_sub (+ radius_bottom 0.2))

(define th_nitride 0.1)

(define dyC 0.1)

(sdegeo:create-rectangle (position  0 0 0) (position xp radius_sub 0) 
  "GaN" "pside")
(sdegeo:create-rectangle (position xp 0 0) (position (+ xp 0.185) radius_sub 0)
  "GaN" "iGaN_p")
(sdegeo:create-rectangle (position (+ xp 0.185) 0 0) (position (+ xp 0.195) radius_sub 0)
  "GaN" "QB1")
(sdegeo:create-rectangle (position (+ xp 0.195) 0 0) (position (+ xp 0.198) radius_sub 0)
  "InGaN" "QW1")
(sdegeo:create-rectangle (position (+ xp 0.198) 0 0) (position (+ xp 0.208) radius_sub 0)
  "GaN" "QB2")
(sdegeo:create-rectangle (position (+ xp 0.208) 0 0) (position (+ xp 0.211) radius_sub 0)
  "InGaN" "QW2")
(sdegeo:create-rectangle (position (+ xp 0.211) 0 0) (position (+ xp 0.221) radius_sub 0)
  "GaN" "QB3")
(sdegeo:create-rectangle (position (+ xp 0.221) 0 0) (position (+ xp 0.224) radius_sub 0)
  "InGaN" "QW3")
(sdegeo:create-rectangle (position (+ xp 0.224) 0 0) (position (+ xp 0.234) radius_sub 0)
  "GaN" "QB4")
(sdegeo:create-rectangle (position (+ xp 0.234) 0 0) (position (+ xp 0.237) radius_sub 0)
  "InGaN" "QW4")
(sdegeo:create-rectangle (position (+ xp 0.237) 0 0) (position (+ xp 0.247) radius_sub 0)
  "GaN" "QB5")
(sdegeo:create-rectangle (position (+ xp 0.247) 0 0) (position (+ xp 0.250) radius_sub 0)
  "InGaN" "QW5")
(sdegeo:create-rectangle (position (+ xp 0.250) 0 0) (position (+ xp 0.260) radius_sub 0)
  "GaN" "QB6")
(sdegeo:create-rectangle (position (+ xp 0.260) 0 0) (position (+ xp 0.263) radius_sub 0)
  "InGaN" "QW6")
(sdegeo:create-rectangle (position (+ xp 0.263) 0 0) (position (+ xp 0.273) radius_sub 0)
  "GaN" "QB7")
(sdegeo:create-rectangle (position (+ xp 0.273) 0 0) (position (+ xp 0.276) radius_sub 0)
  "InGaN" "QW7")
(sdegeo:create-rectangle (position (+ xp 0.276) 0 0) (position (+ xp 0.286) radius_sub 0)
  "GaN" "QB8")
(sdegeo:create-rectangle (position (+ xp 0.286) 0 0) (position (+ xp 0.289) radius_sub 0)
  "InGaN" "QW8")
(sdegeo:create-rectangle (position (+ xp 0.289) 0 0) (position (+ xp 0.299) radius_sub 0)
  "GaN" "QB9")
(sdegeo:create-rectangle (position (+ xp 0.299) 0 0) (position (+ xp 0.302) radius_sub 0)
  "InGaN" "QW9")
(sdegeo:create-rectangle (position (+ xp 0.302) 0 0) (position (+ xp 0.312) radius_sub 0)
  "GaN" "QB10")
(sdegeo:create-rectangle (position (+ xp 0.312) 0 0) (position (+ xp 0.315) radius_sub 0)
  "InGaN" "QW10")
(sdegeo:create-rectangle (position (+ xp 0.315) 0 0) (position xi radius_sub 0)
  "GaN" "iGaN_n")
(sdegeo:create-rectangle (position xi 0 0) (position xn radius_sub 0) 
  "GaN" "nside")
(sdegeo:create-rectangle (position xn 0 0) (position xs radius_sub 0) 
  "GaN" "nside")
(sdegeo:bool-unite (find-region-id "nside"))

(sdegeo:create-polygon (list (position 0  radius_top 0) 
  (position 0  radius_sub 0)
  (position xn radius_sub 0)
  (position xn radius_max 0)
  (position 0  radius_top 0)
  )
  "Gas" "tmp_mesa")
(sdegeo:delete-region (find-region-id "tmp_mesa"))


(sdegeo:insert-vertex (position 0  (- radius_top dyC) 0))
(sdegeo:set-contact (list (car (find-edge-id (position xs 0.01 0)))) "cathode")
(sdegeo:set-contact (list (car (find-edge-id (position 0  0.01 0)))) "anode")


;--- doping -------------------------------------------------------------------;
(sdedr:define-refeval-window "REW_iside" "Rectangle"
  (position xp 0 0) (position xi radius_sub 0))
(sdedr:define-constant-profile "CPD_iside" "NDopantActiveConcentration" 1e15)
(sdedr:define-constant-profile-placement "CPP_iside" "CPD_iside" "REW_iside")

(extract-refwindow (car (entity:faces (find-region-id "pside"))) "REW_pside" )
(sdedr:define-constant-profile "CPD_pside" "pMagnesiumActiveConcentration" 9.59e18)
(sdedr:define-constant-profile-placement "CPP_pside" "CPD_pside" "REW_pside" 
  0.010 "Gauss")

(extract-refwindow (car (entity:faces (find-region-id "nside"))) "REW_nside" )
(sdedr:define-constant-profile "CPD_nside" "NDopantActiveConcentration" 1e19)
(sdedr:define-constant-profile-placement "CPP_nside" "CPD_nside" "REW_nside" 
  0.010 "Gauss")

(sdegeo:bool-unite (find-material-id "GaN"))
(sde:add-material  (find-material-id "GaN") "GaN" "allGaN")

;--- meshing ------------------------------------------------------------------;
(define xmin (sde:min-x (get-body-list)))
(define xmax (sde:max-x (get-body-list)))
(define ymin (sde:min-y (get-body-list)))
(define ymax (sde:max-y (get-body-list)))

(sdedr:define-refeval-window       "Ref.Win.Global" 
  "Rectangle" (position xmin ymin 0) (position xmax ymax 0))
(sdedr:define-refinement-size      "Ref.Def.Global" 
  0.05 0.1 0.005 0.005 )
(sdedr:define-refinement-function  "Ref.Def.Global" 
  "DopingConcentration" "MaxTransDiff" 1)
(sdedr:define-refinement-placement "Ref.Pla.Global" 
  "Ref.Def.Global" (list "window" "Ref.Win.Global" ) )

(sdedr:define-refeval-window "Ref.Win.ni" 
  "Rectangle"  (position (- xi 0.05) 0 0) (position (+ xi 0.01) radius_sub 0))
(sdedr:define-refinement-size "Ref.Def.ni" 
  0.01 0.1 1 0.001 0.001 1 )
(sdedr:define-refinement-placement "Ref.Pla.ni" 
  "Ref.Def.ni" (list "window" "Ref.Win.ni" ) )

(sdedr:define-refeval-window "Ref.Win.MQW"
  "Rectangle"
  (position (+ xp 0.185) 0 0)
  (position (+ xp 0.315) radius_sub 0))
(sdedr:define-refinement-size "Ref.Def.MQW"
  0.003 0.05 1 0.0005 0.005 1)
(sdedr:define-refinement-placement "Ref.Pla.MQW"
  "Ref.Def.MQW" (list "window" "Ref.Win.MQW"))

(sdedr:offset-block "material" "GaN" "maxlevel" 4)

(sde:build-mesh "" "n@node@")
