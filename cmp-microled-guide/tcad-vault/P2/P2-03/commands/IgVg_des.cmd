# ============================================================
# P2 Mg Calibration
# Purpose:
#   Find Mg concentration required to obtain target hole density
#   p = 3e17 cm^-3 in p-GaN at 300 K
# ============================================================

File {
        Grid=       "@tdr@"
        Parameter=  "@parameter@"
        Current=    "@plot@"
        Plot=       "@tdrdat@"
        Output=     "@log@"
}

Electrode {
        { Name=source Voltage=0.0 }
        { Name=gate   Voltage=0.0 }
}

Physics {
        DefaultParametersFromFile

        Temperature = 300

        Fermi

        IncompleteIonization

        EffectiveIntrinsicDensity (
                NoBandGapNarrowing
        )
}

Plot {
        eDensity
        hDensity

        DopingConcentration
        AcceptorConcentration

        pMagnesiumActiveConcentration
        pMagnesiumMinusConcentration

        SpaceCharge
        Potential

        ConductionBandEnergy
        ValenceBandEnergy

        eQuasiFermiEnergy
        hQuasiFermiEnergy
}

Math {
        ExtendedPrecision

        Iterations=100

        ErrRef(electron)=1e8
        ErrRef(hole)=1e8

        -CheckUndefinedModels
}

Solve {

        # Electrostatic equilibrium
        Coupled(
                Iterations=1000
                LineSearchDamping=1e-4
        ) {
                Poisson
        }

        # Carrier equilibrium
        Coupled(
                Iterations=100
        ) {
                Poisson
                Electron
                Hole
        }
}
