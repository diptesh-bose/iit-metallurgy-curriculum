export interface Course {
  code: string;
  title: string;
  credits: number;
  description: string;
  topics: string[];
  references: { institution: string; course?: string; resource?: string }[];
  type: "core" | "elective" | "lab" | "project";
}

export interface Semester {
  semester: number;
  year: number;
  theme: string;
  courses: Course[];
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  subTopics: string[];
  globalLabs: { institution: string; lab: string; focus: string }[];
  openProblems: string[];
  keyPapers: string[];
}

export const curriculumData: Semester[] = [
  {
    semester: 1,
    year: 1,
    theme: "Foundations of Science & Engineering",
    courses: [
      {
        code: "MA101",
        title: "Mathematics I — Calculus & Linear Algebra",
        credits: 4,
        description:
          "Multivariable calculus, vector spaces, matrix theory, eigenvalues. Foundation for tensor analysis in materials science.",
        topics: [
          "Differential calculus, partial derivatives",
          "Multiple integrals, vector calculus",
          "Linear algebra, matrices, determinants",
          "Eigenvalue problems",
          "Introduction to tensors",
          "Series expansions, Taylor & Fourier",
        ],
        references: [
          { institution: "MIT", course: "18.02 Multivariable Calculus" },
          { institution: "Stanford", course: "MATH 51 Linear Algebra" },
          { institution: "IIT Bombay", course: "MA 105 Calculus" },
        ],
        type: "core",
      },
      {
        code: "PH101",
        title: "Engineering Physics",
        credits: 4,
        description:
          "Classical mechanics, electromagnetism, quantum introduction. Underpins understanding of atomic & electronic structure of materials.",
        topics: [
          "Newtonian & Lagrangian mechanics",
          "Waves, oscillations, resonance",
          "Electrostatics & magnetostatics",
          "Maxwell's equations",
          "Special relativity basics",
          "Wave-particle duality, Bohr model",
          "Introduction to quantum mechanics",
        ],
        references: [
          { institution: "MIT", course: "8.01 Classical Mechanics" },
          { institution: "Caltech", course: "Ph1a Classical Mechanics" },
          { institution: "IIT Delhi", course: "PH101 Physics I" },
        ],
        type: "core",
      },
      {
        code: "CH101",
        title: "Chemistry of Materials",
        credits: 3,
        description:
          "Atomic structure, chemical bonding, thermodynamics fundamentals, periodic trends relevant to materials.",
        topics: [
          "Atomic structure, quantum numbers",
          "Chemical bonding: ionic, covalent, metallic, van der Waals",
          "Periodic table trends for engineers",
          "Chemical equilibrium & thermodynamics basics",
          "Electrochemistry & corrosion preview",
          "Organic & polymer chemistry introduction",
        ],
        references: [
          { institution: "MIT", course: "3.091 Intro to Solid-State Chemistry" },
          { institution: "Cambridge", course: "NST Part IA Chemistry" },
          { institution: "IIT Kharagpur", course: "CH10001 Chemistry" },
        ],
        type: "core",
      },
      {
        code: "ME101",
        title: "Engineering Graphics & Design",
        credits: 2,
        description:
          "Technical drawing, CAD fundamentals, geometric tolerancing — essential for materials processing and design.",
        topics: [
          "Orthographic projections, sectional views",
          "Isometric drawing",
          "Computer-aided drafting (AutoCAD/SolidWorks basics)",
          "Geometric dimensioning & tolerancing (GD&T)",
          "Assembly drawings",
        ],
        references: [
          { institution: "IIT Madras", course: "ME1100 Engineering Drawing" },
          { institution: "MIT", course: "2.007 Design Studio" },
        ],
        type: "core",
      },
      {
        code: "HS101",
        title: "English Communication & Technical Writing",
        credits: 2,
        description:
          "Academic writing, technical reports, presentation skills for engineers.",
        topics: [
          "Technical report writing",
          "Scientific paper structure",
          "Oral presentation techniques",
          "Data visualization & graphs",
          "Peer review basics",
        ],
        references: [
          { institution: "MIT", resource: "MIT OpenCourseWare Writing" },
          { institution: "Stanford", course: "PWR 1 Writing & Rhetoric" },
        ],
        type: "core",
      },
    ],
  },
  {
    semester: 2,
    year: 1,
    theme: "Quantitative Methods & Materials Introduction",
    courses: [
      {
        code: "MA102",
        title: "Mathematics II — ODE, PDE & Numerical Methods",
        credits: 4,
        description:
          "Differential equations governing heat transfer, diffusion, and stress. Numerical methods for materials simulations.",
        topics: [
          "Ordinary differential equations",
          "Laplace transforms",
          "Partial differential equations (heat, wave, Laplace)",
          "Numerical methods: finite difference, finite element basics",
          "Optimization: gradient descent, convex methods",
          "Probability & statistics for experimental data",
        ],
        references: [
          { institution: "MIT", course: "18.03 Differential Equations" },
          { institution: "ETH Zurich", course: "401-0363 Analysis III" },
          { institution: "IIT Roorkee", course: "MA-102 Mathematics II" },
        ],
        type: "core",
      },
      {
        code: "MT101",
        title: "Introduction to Materials Science",
        credits: 3,
        description:
          "The central science connecting structure–processing–property–performance. Survey of all material classes.",
        topics: [
          "The materials science tetrahedron",
          "Atomic bonding types and properties",
          "Crystal structures: FCC, BCC, HCP",
          "Crystallographic notation (Miller indices)",
          "Material classes: metals, ceramics, polymers, composites, semiconductors",
          "Materials in society: sustainability, circular economy",
          "Brief history: Stone Age → advanced materials",
        ],
        references: [
          { institution: "MIT", course: "3.012 Fundamentals of Materials Science" },
          { institution: "Cambridge", course: "Materials Science IA" },
          { institution: "UCSB", course: "MATRL 100A" },
          { institution: "IIT Bombay", course: "MM101 Introduction to Materials" },
        ],
        type: "core",
      },
      {
        code: "PH102",
        title: "Quantum Mechanics & Statistical Physics",
        credits: 4,
        description:
          "Schrödinger equation, quantum states, statistical mechanics — the quantum foundation of materials properties.",
        topics: [
          "Schrödinger equation: particle in a box, harmonic oscillator",
          "Hydrogen atom, atomic orbitals",
          "Pauli exclusion principle, spin",
          "Many-electron atoms, Hund's rules",
          "Boltzmann distribution, partition functions",
          "Fermi–Dirac & Bose–Einstein statistics",
          "Introduction to band theory",
        ],
        references: [
          { institution: "MIT", course: "8.04 Quantum Physics I" },
          { institution: "Caltech", course: "Ph12b Statistical Mechanics" },
          { institution: "IIT Bombay", course: "PH 302 Quantum Mechanics" },
        ],
        type: "core",
      },
      {
        code: "MT102L",
        title: "Materials Characterization Laboratory I",
        credits: 2,
        description:
          "Hands-on: optical microscopy, hardness testing, basic diffraction, sample preparation.",
        topics: [
          "Sample preparation: cutting, mounting, polishing, etching",
          "Optical microscopy: brightfield, darkfield, polarized light",
          "Vickers, Brinell, Rockwell hardness testing",
          "Grain size measurement (ASTM standards)",
          "Introduction to X-ray diffraction (Bragg's law)",
        ],
        references: [
          { institution: "IIT Kanpur", resource: "MT Lab Manual" },
          { institution: "MIT", course: "3.014 Materials Laboratory" },
        ],
        type: "lab",
      },
      {
        code: "CS101",
        title: "Programming for Engineers",
        credits: 3,
        description:
          "Python programming, data analysis, scientific computing — essential for modern materials informatics.",
        topics: [
          "Python fundamentals, data types, control flow",
          "NumPy, SciPy for scientific computing",
          "Matplotlib, Seaborn for data visualization",
          "Pandas for data manipulation",
          "Introduction to machine learning (scikit-learn)",
          "Materials data: AFLOW, Materials Project API",
        ],
        references: [
          { institution: "MIT", course: "6.0001 Introduction to CS" },
          { institution: "Stanford", course: "CS106A Programming Methodology" },
          { institution: "IIT Bombay", course: "CS 101 Computer Programming" },
        ],
        type: "core",
      },
    ],
  },
  {
    semester: 3,
    year: 2,
    theme: "Crystallography, Thermodynamics & Structure",
    courses: [
      {
        code: "MT201",
        title: "Crystallography & Crystal Defects",
        credits: 4,
        description:
          "Deep dive into crystal symmetry, space groups, reciprocal lattice, point and line defects governing properties.",
        topics: [
          "Crystal systems, Bravais lattices, crystal symmetry",
          "Point groups, space groups, crystallographic notation",
          "Reciprocal lattice and Brillouin zones",
          "Point defects: vacancies, interstitials, substitutionals",
          "Kröger–Vink notation",
          "Dislocations: edge, screw, mixed; Burgers vector",
          "Stacking faults, grain boundaries, twin boundaries",
          "Surface energy and reconstruction",
        ],
        references: [
          { institution: "MIT", course: "3.012 Fundamentals of Materials" },
          { institution: "Cambridge", resource: "DoITPoMS Teaching & Learning Packages" },
          { institution: "ETH Zurich", course: "327-0302 Crystal Chemistry" },
          { institution: "IIT Madras", course: "MM2010 Crystallography" },
        ],
        type: "core",
      },
      {
        code: "MT202",
        title: "Thermodynamics of Materials",
        credits: 4,
        description:
          "Chemical thermodynamics: free energy, phase stability, solution models, CALPHAD approach.",
        topics: [
          "Laws of thermodynamics, entropy, enthalpy, Gibbs free energy",
          "Chemical potential, activity, fugacity",
          "Binary & multicomponent solution models (ideal, regular, subregular)",
          "Stability criteria, spinodal decomposition",
          "Ellingham diagrams, oxide stability",
          "Electrochemical thermodynamics, Pourbaix diagrams",
          "Introduction to CALPHAD method",
          "Computational thermodynamics with Thermo-Calc / FactSage",
        ],
        references: [
          { institution: "MIT", course: "3.012 Structure & Properties" },
          { institution: "RWTH Aachen", course: "Materials Thermodynamics" },
          { institution: "KTH Stockholm", resource: "CALPHAD tutorials" },
          { institution: "IIT Bombay", course: "MM 201 Thermodynamics of Materials" },
        ],
        type: "core",
      },
      {
        code: "MT203",
        title: "X-Ray Diffraction & Electron Microscopy",
        credits: 3,
        description:
          "Diffraction theory, structure determination, SEM, TEM — the eyes of a metallurgist.",
        topics: [
          "X-ray generation, Bragg diffraction, structure factor",
          "Powder diffraction: Debye–Scherrer, Rietveld refinement",
          "Phase identification, residual stress measurement",
          "Electron–matter interaction",
          "Scanning Electron Microscopy (SEM): SE, BSE, EBSD, EDS",
          "Transmission Electron Microscopy (TEM): bright/dark field, HRTEM, SAED",
          "STEM, EELS, EDX mapping",
          "Synchrotron X-ray and neutron diffraction",
        ],
        references: [
          { institution: "MIT", course: "3.014 Materials Laboratory" },
          { institution: "Oxford", resource: "Practical Electron Microscopy in Materials Science" },
          { institution: "Cambridge", resource: "DoITPoMS Diffraction" },
          { institution: "IIT Kharagpur", course: "MM20004 Diffraction Methods" },
        ],
        type: "core",
      },
      {
        code: "MT204",
        title: "Phase Diagrams & Phase Transformations I",
        credits: 3,
        description:
          "Binary and ternary phase diagrams, lever rule, solidification, solid-state transformations.",
        topics: [
          "Gibbs phase rule, unary systems",
          "Binary isomorphous, eutectic, peritectic, monotectic systems",
          "Ternary phase diagrams: isothermal sections, liquidus projections",
          "Solidification: nucleation theory (classical & CNT)",
          "Solidification microstructures: dendrites, segregation",
          "Solid-state transformations: TTT and CCT diagrams",
          "Fe–C system in detail: microstructures, heat treatment",
        ],
        references: [
          { institution: "MIT", course: "3.022 Microstructural Evolution" },
          { institution: "UIUC", course: "MSE 401 Thermodynamics" },
          { institution: "IISc Bangalore", course: "MS 202 Phase Diagrams" },
          { institution: "IIT Kanpur", course: "MT 301 Phase Transformations" },
        ],
        type: "core",
      },
      {
        code: "MT205L",
        title: "Characterization Laboratory II",
        credits: 2,
        description:
          "Advanced microscopy, EDS, EBSD, XRD phase identification exercises.",
        topics: [
          "SEM operation and image interpretation",
          "EDS quantitative analysis",
          "EBSD pole figures and orientation maps",
          "XRD phase identification using JCPDS database",
          "Rietveld refinement with GSAS / FullProf",
        ],
        references: [
          { institution: "IIT Madras", resource: "MM Lab II Manual" },
          { institution: "NIST", resource: "ICDD PDF Database training" },
        ],
        type: "lab",
      },
    ],
  },
  {
    semester: 4,
    year: 2,
    theme: "Kinetics, Mechanical & Transport Properties",
    courses: [
      {
        code: "MT301",
        title: "Kinetics of Materials Processes",
        credits: 4,
        description:
          "Diffusion, nucleation & growth, reaction kinetics governing microstructure evolution.",
        topics: [
          "Fick's laws, diffusion mechanisms, diffusion coefficients",
          "Diffusion in multiphase systems, uphill diffusion",
          "Classical nucleation theory, heterogeneous nucleation",
          "Growth kinetics: interface-controlled vs. diffusion-controlled",
          "Coarsening (Ostwald ripening), grain growth",
          "Precipitation kinetics: JMAK equation",
          "Spinodal decomposition kinetics",
          "Phase field modeling introduction",
        ],
        references: [
          { institution: "MIT", course: "3.021 Introduction to Modeling" },
          { institution: "Stanford", course: "MATSCI 203 Kinetics" },
          { institution: "ETH Zurich", course: "327-0311 Kinetics of Phase Transformations" },
          { institution: "IIT Bombay", course: "MM 302 Kinetics" },
        ],
        type: "core",
      },
      {
        code: "MT302",
        title: "Mechanical Behavior of Materials",
        credits: 4,
        description:
          "Elasticity, plasticity, fracture, fatigue, and creep — from atomistic origins to engineering design.",
        topics: [
          "Stress and strain tensors, elastic constants",
          "Anisotropic elasticity, Voigt notation",
          "Plastic deformation: slip systems, Schmid's law",
          "Dislocation mechanics: glide, climb, jog/kink",
          "Strengthening mechanisms: solid solution, precipitation, grain boundary, work hardening",
          "Fracture mechanics: Griffith criterion, Irwin's K_IC, J-integral",
          "Fatigue: S–N curves, Paris law, crack closure",
          "Creep: mechanisms, Larson–Miller parameter",
          "Superplasticity",
        ],
        references: [
          { institution: "MIT", course: "3.22 Mechanical Behavior of Materials" },
          { institution: "Cambridge", resource: "Hull & Bacon: Introduction to Dislocations" },
          { institution: "Stanford", course: "MATSCI 212 Defects" },
          { institution: "IIT Madras", course: "MM3010 Mechanical Metallurgy" },
        ],
        type: "core",
      },
      {
        code: "MT303",
        title: "Transport Phenomena in Materials Processing",
        credits: 3,
        description:
          "Heat transfer, fluid mechanics, and mass transport in casting, welding, and processing operations.",
        topics: [
          "Momentum transport: viscosity, Navier–Stokes equations",
          "Heat transfer: conduction, convection, radiation in metallurgy",
          "Stefan problem: moving boundary solidification",
          "Mass transport in liquids, gases, and solids",
          "Dimensionless numbers: Re, Pr, Sc, Bi",
          "Coupled transport: Soret effect, Dufour effect",
          "CFD basics: finite volume method",
          "Application: ladle metallurgy, casting, thin-film deposition",
        ],
        references: [
          { institution: "MIT", course: "3.185 Transport Phenomena in Materials" },
          { institution: "Carnegie Mellon", course: "27-301 Microstructure" },
          { institution: "IIT Roorkee", course: "MT-302 Transport Phenomena" },
        ],
        type: "core",
      },
      {
        code: "MT304",
        title: "Electronic & Magnetic Properties of Materials",
        credits: 3,
        description:
          "Band theory, semiconductors, dielectrics, ferroelectrics, and magnetic phenomena from a quantum perspective.",
        topics: [
          "Free electron model, density of states",
          "Band theory of solids, metals vs. semiconductors vs. insulators",
          "Intrinsic/extrinsic semiconductors, p–n junctions, MOSFETs",
          "Dielectric properties, polarization mechanisms, ferroelectrics",
          "Piezoelectricity, pyroelectricity",
          "Magnetic phenomena: diamagnetism, paramagnetism, ferromagnetism",
          "Exchange interaction, magnetic domains, hysteresis",
          "Spintronics introduction, magnetic recording",
          "Superconductivity: BCS theory, Meissner effect",
        ],
        references: [
          { institution: "MIT", course: "3.024 Electronic, Optical & Magnetic Properties" },
          { institution: "Caltech", course: "APh114 Electronic Materials" },
          { institution: "NUS Singapore", course: "MSE2101 Electronic Properties" },
          { institution: "IIT Bombay", course: "MM 404 Electronic Properties" },
        ],
        type: "core",
      },
      {
        code: "MT305L",
        title: "Mechanical Testing Laboratory",
        credits: 2,
        description:
          "Tensile, hardness, impact, fatigue, and creep testing with data analysis.",
        topics: [
          "Universal testing machine operation",
          "Tensile test: stress–strain curve analysis",
          "Charpy/Izod impact testing",
          "Fatigue testing: rotating bending, load cycling",
          "Creep test setup and analysis",
          "Fractography: SEM analysis of fracture surfaces",
        ],
        references: [
          { institution: "IIT Kanpur", resource: "Mechanical Testing Lab Manual" },
          { institution: "ASTM International", resource: "Standard Test Methods" },
        ],
        type: "lab",
      },
    ],
  },
  {
    semester: 5,
    year: 3,
    theme: "Extractive Metallurgy & Materials Processing",
    courses: [
      {
        code: "MT401",
        title: "Extractive Metallurgy",
        credits: 4,
        description:
          "Pyrometallurgy, hydrometallurgy, electrometallurgy — from ore to pure metal. Industrial processes and sustainability.",
        topics: [
          "Ore mineralogy, mineral processing: comminution, flotation, gravity separation",
          "Pyrometallurgy: roasting, smelting, converting, refining",
          "Blast furnace iron making, basic oxygen furnace steelmaking",
          "Direct reduced iron (DRI), electric arc furnace",
          "Hydrometallurgy: leaching, solvent extraction, electrowinning",
          "Electrometallurgy: Hall–Héroult (aluminium), electrolytic refining",
          "Secondary metallurgy: ladle furnace, vacuum degassing (RH, VD)",
          "Sustainability: CO₂ emissions, green steel, hydrogen reduction",
          "Life cycle assessment in metallurgy",
        ],
        references: [
          { institution: "MIT", course: "3.044 Materials Processing" },
          { institution: "Delft University", course: "MT3450 Extractive Metallurgy" },
          { institution: "UNSW Sydney", course: "MINE4430 Extractive Metallurgy" },
          { institution: "IIT Kharagpur", course: "MM30007 Extractive Metallurgy" },
        ],
        type: "core",
      },
      {
        code: "MT402",
        title: "Phase Transformations II & Microstructure Engineering",
        credits: 4,
        description:
          "Martensitic transformations, bainite, ordering, precipitation, and engineering of microstructures for properties.",
        topics: [
          "Martensitic transformation: crystallography (KS, NW relations), thermodynamics",
          "Bainitic transformation, lower/upper bainite",
          "Ordering transformations: L1₂, B2, L1₀ structures",
          "Precipitation hardening: GP zones, metastable phases",
          "Spinodal decomposition in metal alloys",
          "Recrystallization and grain growth: static, dynamic, meta-dynamic",
          "Texture evolution during deformation and annealing",
          "CALPHAD-guided alloy design",
          "Computational microstructure prediction: MICRESS, OpenPhase",
        ],
        references: [
          { institution: "Cambridge", resource: "Bhadeshia & Honeycombe: Steels" },
          { institution: "MIT", course: "3.022 Microstructural Evolution" },
          { institution: "Max-Planck-Institut für Eisenforschung", resource: "MPIE Phase Transformation Lectures" },
          { institution: "IISc Bangalore", course: "MS 303 Phase Transformations II" },
        ],
        type: "core",
      },
      {
        code: "MT403",
        title: "Metal Forming & Manufacturing Processes",
        credits: 3,
        description:
          "Deformation processing: rolling, forging, drawing, extrusion, additive manufacturing.",
        topics: [
          "Plasticity theory: yield criteria (Tresca, von Mises), flow rules",
          "Slab analysis, upper bound theorem",
          "Rolling: hot, cold, temper rolling; roll force and torque",
          "Forging: open die, closed die, isothermal",
          "Drawing and extrusion: wiredrawing, hydrostatic extrusion",
          "Sheet metal forming: deep drawing, stretch forming, springback",
          "Powder metallurgy: compaction, sintering, HIP",
          "Additive manufacturing: SLM, EBM, DED for metals",
          "Process modelling: FEM with DEFORM, Abaqus",
        ],
        references: [
          { institution: "MIT", course: "2.002 Mechanics & Materials II" },
          { institution: "Ohio State University", course: "MSE 750 Metal Forming" },
          { institution: "RWTH Aachen", course: "Forming Technology" },
          { institution: "IIT Bombay", course: "MM 501 Metal Forming" },
        ],
        type: "core",
      },
      {
        code: "MT404",
        title: "Corrosion Science & Engineering",
        credits: 3,
        description:
          "Electrochemical corrosion, forms of corrosion, protection strategies, coatings and inhibitors.",
        topics: [
          "Electrochemical thermodynamics: Nernst equation, Pourbaix diagrams",
          "Electrode kinetics: Butler–Volmer equation, Tafel slopes",
          "Passivity and active–passive transitions",
          "Forms of corrosion: galvanic, crevice, pitting, intergranular, stress corrosion cracking",
          "Hydrogen embrittlement and liquid metal embrittlement",
          "High-temperature oxidation: Wagner theory, protective oxides",
          "Corrosion protection: coatings, cathodic/anodic protection, inhibitors",
          "Corrosion testing standards (ASTM G5, G61, G102)",
        ],
        references: [
          { institution: "MIT", course: "3.044 Materials Processing" },
          { institution: "Imperial College London", course: "Corrosion Engineering" },
          { institution: "Ohio State", course: "MSE 630 Corrosion" },
          { institution: "IIT Madras", course: "MM4010 Corrosion Engineering" },
        ],
        type: "core",
      },
      {
        code: "MT405L",
        title: "Processing & Metallography Laboratory",
        credits: 2,
        description:
          "Heat treatment, casting, forging, microstructural analysis of processed materials.",
        topics: [
          "Annealing, normalizing, quenching, tempering of steels",
          "Case hardening: carburizing, nitriding",
          "Investment casting, sand casting practice",
          "Powder sintering: cold press + sinter",
          "Microstructural analysis after processing",
        ],
        references: [
          { institution: "IIT Roorkee", resource: "Metallurgy Lab III Manual" },
          { institution: "ASM International", resource: "Metallography Handbook" },
        ],
        type: "lab",
      },
    ],
  },
  {
    semester: 6,
    year: 3,
    theme: "Advanced Materials & Engineering Applications",
    courses: [
      {
        code: "MT501",
        title: "Ferrous Metallurgy & Steels",
        credits: 3,
        description:
          "Comprehensive treatment of steels: alloy design, heat treatment, special steels, advanced high-strength steels.",
        topics: [
          "Classification of steels: plain carbon, low-alloy, tool, stainless",
          "Role of alloying elements (Mn, Cr, Ni, Mo, V, Nb, Ti)",
          "Heat treatment: full annealing, spheroidizing, normalizing, Q&T",
          "Hardenability: Jominy test, Grossmann H-factors",
          "Advanced High Strength Steels (AHSS): DP, TRIP, TWIP, martensitic",
          "Maraging steels and ultra-high strength steels",
          "Stainless steels: austenitic, ferritic, martensitic, duplex, PH",
          "Weld metallurgy of steels",
          "Steels for extreme environments: creep, cryogenic, nuclear",
        ],
        references: [
          { institution: "Cambridge", resource: "Bhadeshia & Honeycombe: Steels (3rd ed)" },
          { institution: "POSTECH Korea", course: "MSE411 Steel Metallurgy" },
          { institution: "RWTH Aachen", course: "Steel Metallurgy" },
          { institution: "IIT Kharagpur", course: "MM40010 Physical Metallurgy of Steels" },
        ],
        type: "core",
      },
      {
        code: "MT502",
        title: "Non-Ferrous Alloys & Light Metals",
        credits: 3,
        description:
          "Al, Ti, Ni, Cu, Mg alloys: metallurgy, processing, heat treatment, aerospace and automotive applications.",
        topics: [
          "Aluminium alloys: wrought (2xxx–7xxx series), cast, heat treatment, age hardening",
          "Titanium alloys: α, α+β, β alloys; Ti-6Al-4V, Ti-3Al-2.5V",
          "Nickel superalloys: γ/γ′ structure, single crystal turbine blades",
          "Copper alloys: brasses, bronzes, cupronickel, beryllium copper",
          "Magnesium alloys: AZ, ZK series, corrosion challenges",
          "Refractory metals: W, Mo, Ta, Nb — processing and applications",
          "Shape memory alloys: NiTi, Cu-based",
          "High entropy alloys (HEAs): concepts, design, properties",
        ],
        references: [
          { institution: "MIT", course: "3.044 Materials Processing" },
          { institution: "University of Birmingham", resource: "Light Alloys (Polmear)" },
          { institution: "Tohoku University", resource: "Superalloy Research Publications" },
          { institution: "IIT Madras", course: "MM5030 Non-Ferrous Metallurgy" },
        ],
        type: "core",
      },
      {
        code: "MT503",
        title: "Ceramics & Glasses",
        credits: 3,
        description:
          "Oxide and non-oxide ceramics, glass science, processing, and applications in energy, electronics, and structural use.",
        topics: [
          "Crystal chemistry of ceramics: ABO₃, spinel, garnet structures",
          "Defect chemistry and ionic conductivity",
          "Mechanical properties: brittle fracture, Weibull statistics, toughening mechanisms",
          "Glass science: silicate network theory, viscosity, glass-ceramics",
          "Ceramic processing: sol-gel, CVD, sintering, tape casting",
          "Advanced structural ceramics: Al₂O₃, ZrO₂, Si₃N₄, SiC",
          "Functional ceramics: piezoelectrics (PZT), ferroelectrics, NTC/PTC",
          "Thermal barrier coatings (YSZ)",
          "Refractory ceramics for steelmaking",
        ],
        references: [
          { institution: "MIT", course: "3.091 Intro to Solid-State Chemistry" },
          { institution: "Imperial College London", course: "Materials for Energy" },
          { institution: "NIMS Japan", resource: "Advanced Ceramics Research" },
          { institution: "IIT Kanpur", course: "MT 502 Ceramic Materials" },
        ],
        type: "core",
      },
      {
        code: "MT504",
        title: "Composite Materials",
        credits: 3,
        description:
          "Fibre-reinforced composites, MMCs, CMCs — design, analysis, processing, failure modes.",
        topics: [
          "Classification: PMC, MMC, CMC, natural composites",
          "Fibre types: glass, carbon, aramid, natural fibres",
          "Rule of mixtures, Halpin–Tsai equations",
          "Laminate theory: CLT, failure criteria (Tsai–Wu, Hashin)",
          "Processing: hand layup, RTM, autoclave, filament winding, pultrusion",
          "Metal matrix composites: SiCp/Al, whisker-reinforced",
          "Ceramic matrix composites: C/C, SiC/SiC for turbines",
          "Interface science: fibre–matrix bonding, sizing",
          "Non-destructive testing of composites: UT, thermography, CT",
        ],
        references: [
          { institution: "MIT", course: "16.20 Structural Mechanics" },
          { institution: "NASA Langley", resource: "Composite Design Guidelines" },
          { institution: "DLR Germany", resource: "Composite Structures Research" },
          { institution: "IIT Bombay", course: "AE 405 Composite Materials" },
        ],
        type: "core",
      },
      {
        code: "MT505",
        title: "Elective I — Biomaterials / Energy Materials / Nanomaterials",
        credits: 3,
        description:
          "Student chooses one specialization track for deep-dive study.",
        topics: [
          "TRACK A — Biomaterials: biocompatibility, metallic implants, biodegradable polymers, tissue engineering scaffolds",
          "TRACK B — Energy Materials: Li-ion batteries, solid-state electrolytes, fuel cells, thermoelectrics, solar cell materials",
          "TRACK C — Nanomaterials: synthesis routes, quantum confinement, carbon nanotubes, graphene, 2D materials, nanomedicine",
        ],
        references: [
          { institution: "MIT", course: "20.462J Molecular Principles of Biomaterials" },
          { institution: "Stanford", course: "MATSCI 152 Energy Materials" },
          { institution: "ETH Zurich", course: "327-2131 Nanomaterials" },
          { institution: "IIT Bombay", course: "MM 605 Nanomaterials" },
        ],
        type: "elective",
      },
    ],
  },
  {
    semester: 7,
    year: 4,
    theme: "Computational Materials Science & Specialization",
    courses: [
      {
        code: "MT601",
        title: "Computational Materials Science",
        credits: 4,
        description:
          "DFT, molecular dynamics, Monte Carlo, CALPHAD, phase field, and machine learning for materials.",
        topics: [
          "Density Functional Theory (DFT): Kohn–Sham equations, exchange-correlation functionals",
          "Pseudopotentials, plane wave basis; VASP, Quantum ESPRESSO, CP2K",
          "Molecular Dynamics (MD): interatomic potentials, LAMMPS, GROMACS",
          "Monte Carlo methods: Metropolis, kinetic MC",
          "CALPHAD: thermodynamic databases, Thermo-Calc, Pandat",
          "Phase field method: Allen–Cahn, Cahn–Hilliard equations",
          "Machine learning potentials: GAP, NNP, MACE, CHGNet",
          "Materials informatics: feature engineering, graph neural networks",
          "High-throughput screening: AFLOW, Materials Project, NOMAD",
          "Active learning and Bayesian optimization for alloy design",
        ],
        references: [
          { institution: "MIT", course: "3.320 Atomistic Computer Modelling of Materials" },
          { institution: "Stanford", course: "MATSCI 236 Computational Materials" },
          { institution: "ETH Zurich", course: "327-2125 Computational Materials Science" },
          { institution: "IIT Bombay", course: "MM 601 Computational Materials" },
        ],
        type: "core",
      },
      {
        code: "MT602",
        title: "Welding Metallurgy & Joining Technology",
        credits: 3,
        description:
          "Physics of welding, HAZ microstructure, residual stresses, advanced joining for aerospace and nuclear.",
        topics: [
          "Welding processes: SMAW, GMAW, GTAW, SAW, PAW, laser, EBW",
          "Heat source models: Gaussian, Goldak double-ellipsoid",
          "Solidification in welds: columnar-to-equiaxed transition",
          "Heat-affected zone (HAZ): microstructure and properties",
          "Residual stresses: origin, measurement (neutron diffraction, hole drilling)",
          "Weld defects and NDT: radiography, UT phased array",
          "Friction stir welding: microstructure, process parameters",
          "Brazing, soldering, adhesive bonding",
          "Welding of advanced materials: Ni superalloys, Ti alloys, dissimilar metals",
        ],
        references: [
          { institution: "Ohio State University", course: "WE 751 Welding Metallurgy" },
          { institution: "Osaka University", resource: "JWRI Welding Research Institute" },
          { institution: "TWI Cambridge", resource: "Welding Technology Publications" },
          { institution: "IIT Madras", course: "MM6020 Welding Metallurgy" },
        ],
        type: "core",
      },
      {
        code: "MT603",
        title: "Surface Engineering & Coatings",
        credits: 3,
        description:
          "Surface treatments, PVD, CVD, thermal spray, hard coatings for wear and high temperature.",
        topics: [
          "Surface characterization: XPS, AES, SIMS, AFM",
          "Physical Vapour Deposition (PVD): sputtering, evaporation, arc deposition",
          "Chemical Vapour Deposition (CVD): APCVD, LPCVD, PECVD",
          "Thermal spray: APS, HVOF, cold spray",
          "Hard coatings: TiN, TiAlN, DLC, nanocomposite coatings",
          "Thermal barrier coatings (TBC) for turbines",
          "Electroplating, electroless plating, anodizing",
          "Ion implantation and plasma nitriding",
          "Wear mechanisms: adhesive, abrasive, erosive, tribology",
        ],
        references: [
          { institution: "MIT", course: "3.042 Materials Project Lab" },
          { institution: "Linköping University", resource: "Thin Film Group Publications" },
          { institution: "Forschungszentrum Jülich", resource: "TBC Research" },
          { institution: "IIT Delhi", course: "MT606 Surface Engineering" },
        ],
        type: "core",
      },
      {
        code: "MT604",
        title: "Elective II",
        credits: 3,
        description:
          "Advanced elective from department pool.",
        topics: [
          "Nuclear Materials: radiation damage, swelling, materials for fission/fusion",
          "Semiconductor Materials & Devices: Si, GaAs, wide-bandgap, 2DEG",
          "Biomaterials Engineering: implants, tissue scaffolds, drug delivery carriers",
          "Advanced Characterization: APT, synchrotron XRD, in-situ TEM",
          "Materials for Extreme Environments: high entropy alloys for aerospace",
        ],
        references: [
          { institution: "MIT", course: "22.14 Materials in Nuclear Engineering" },
          { institution: "Stanford", course: "MATSCI 308 Semiconductor Materials" },
          { institution: "IIT Bombay", resource: "Department Elective Pool" },
        ],
        type: "elective",
      },
      {
        code: "MT605",
        title: "B.Tech. Project — Phase I",
        credits: 4,
        description:
          "Independent research project under faculty supervision. Literature review, problem formulation, experimental/computational plan.",
        topics: [
          "Literature review using Web of Science, Scopus",
          "Research methodology and hypothesis formulation",
          "Experimental design or computational workflow planning",
          "Safety training: laboratory and chemical safety",
          "Mid-semester progress report and presentation",
        ],
        references: [
          { institution: "All IITs", resource: "B.Tech. Project Guidelines" },
          { institution: "MIT", resource: "UROP (Undergraduate Research Opportunity Program)" },
        ],
        type: "project",
      },
    ],
  },
  {
    semester: 8,
    year: 4,
    theme: "Research, Industry & Professional Practice",
    courses: [
      {
        code: "MT701",
        title: "Alloy Design & Materials Genome Initiative",
        credits: 3,
        description:
          "Integrated Computational Materials Engineering (ICME), materials genome, accelerated alloy development.",
        topics: [
          "ICME framework: linking scales from electrons to components",
          "Materials Genome Initiative (MGI): high-throughput experimentation",
          "Alloy design strategies: thermodynamic + kinetic + property targets",
          "Principal component alloys vs. multi-principal-element alloys",
          "Bayesian optimization in alloy design",
          "Industry case studies: CALPHAD-guided aeroengine alloy development",
          "Digital twin concepts for materials & processes",
          "Standards and certification for new alloys (ASTM, ISO)",
        ],
        references: [
          { institution: "MIT", course: "3.044 Materials Processing" },
          { institution: "Georgia Tech", resource: "ICME Center Publications" },
          { institution: "Ames Laboratory", resource: "Materials Genome Initiative" },
          { institution: "IIT Bombay", course: "MM 701 Alloy Design" },
        ],
        type: "core",
      },
      {
        code: "MT702",
        title: "Materials Failure Analysis & Reliability",
        credits: 3,
        description:
          "Root cause analysis, reliability engineering, NDT, materials qualification for safety-critical applications.",
        topics: [
          "Failure analysis methodology: fishbone, fault tree",
          "Case studies: aircraft crashes, bridge failures, biomedical device failures",
          "Reliability concepts: Weibull distribution, FMEA",
          "Non-destructive testing: UT, RT, ET, PT, MT, AE",
          "Fitness for service assessment (API 579)",
          "Fracture mechanics in failure analysis",
          "Creep and fatigue life prediction models",
          "Materials qualification and certification",
        ],
        references: [
          { institution: "MIT", course: "3.22 Mechanical Behavior" },
          { institution: "ASM International", resource: "ASM Handbook Vol. 11 Failure Analysis" },
          { institution: "TU Delft", course: "Failure of Materials" },
          { institution: "IIT Kanpur", course: "MT 702 Failure Analysis" },
        ],
        type: "core",
      },
      {
        code: "MT703",
        title: "Materials for Energy & Sustainability",
        credits: 3,
        description:
          "Energy storage, conversion, and sustainable materials — the grand challenge of the 21st century.",
        topics: [
          "Li-ion batteries: cathodes, anodes, electrolytes, SEI layer",
          "Solid-state batteries: oxide and sulfide electrolytes",
          "Fuel cells: PEMFC, SOFC — materials challenges",
          "Photovoltaics: c-Si, thin films (CIGS, CdTe), perovskites",
          "Thermoelectrics: ZT optimization, skutterudites, half-Heuslers",
          "Hydrogen storage: metal hydrides, MOFs",
          "Green steel and low-carbon metallurgy",
          "Circular economy, materials recycling, urban mining",
          "Life cycle assessment (LCA) in materials selection",
        ],
        references: [
          { institution: "MIT", course: "3.C27 Solar Cells" },
          { institution: "Stanford", course: "MATSCI 152 Energy Materials" },
          { institution: "Imperial College London", course: "Materials for Energy" },
          { institution: "IISc Bangalore", course: "MS 702 Energy Materials" },
        ],
        type: "core",
      },
      {
        code: "MT704",
        title: "Elective III — Industry / Research Track",
        credits: 3,
        description:
          "Advanced industrial or research-focused elective.",
        topics: [
          "Iron & Steel Technology (for industry track)",
          "Advanced Manufacturing: Industry 4.0, digital manufacturing",
          "Nanoscale Materials for Electronics",
          "Geomaterials & Mining Engineering",
          "Entrepreneurship & IP in Materials Innovation",
        ],
        references: [
          { institution: "IITs", resource: "Industry-Academia Elective Pool" },
          { institution: "World Steel Association", resource: "Steel Technology Courses" },
        ],
        type: "elective",
      },
      {
        code: "MT705",
        title: "B.Tech. Project — Phase II",
        credits: 6,
        description:
          "Completion of independent research project. Experimental/computational work, analysis, thesis writing, viva voce.",
        topics: [
          "Full experimental execution or computational campaign",
          "Data analysis, statistical significance testing",
          "Thesis writing: IMRaD structure",
          "Conference paper / journal submission (encouraged)",
          "Public viva voce defense",
          "Industrial internship reflection (if applicable)",
        ],
        references: [
          { institution: "All IITs", resource: "B.Tech. Thesis Guidelines" },
          { institution: "MIT", resource: "UROP Final Report Standards" },
        ],
        type: "project",
      },
    ],
  },
];

export const researchAreas: ResearchArea[] = [
  {
    id: "high-entropy-alloys",
    title: "High Entropy Alloys & Compositionally Complex Alloys",
    description:
      "Multi-principal-element alloys with near-equimolar compositions exhibiting extraordinary combinations of strength, ductility, and radiation resistance.",
    subTopics: [
      "Thermodynamic stability and phase selection",
      "Mechanical properties: deformation mechanisms, TWIP/TRIP in HEAs",
      "Refractory HEAs for high-temperature applications",
      "Radiation damage resistance for nuclear applications",
      "Computational screening of HEA composition space",
      "In-situ deformation studies in SEM/TEM",
      "Additive manufacturing of HEAs",
    ],
    globalLabs: [
      { institution: "MIT", lab: "Prof. C.A. Schuh — Materials Research Lab", focus: "Grain boundary engineering in HEAs" },
      { institution: "Ohio State University", lab: "Prof. Michael Mills — Center for Electron Microscopy", focus: "STEM characterization of HEAs" },
      { institution: "Max-Planck-Institut für Eisenforschung (MPIE)", lab: "Alloy Design Department", focus: "CALPHAD-guided HEA design" },
      { institution: "IISc Bangalore", lab: "Prof. Surendra Kumar Makineni", focus: "Atom probe tomography of HEAs" },
      { institution: "IIT Bombay", lab: "Prof. Rajesh Prasad", focus: "Deformation mechanisms in HEAs" },
      { institution: "University of Tennessee Knoxville", lab: "Prof. Easo George (Oak Ridge)", focus: "CrMnFeCoNi Cantor alloy" },
      { institution: "Tohoku University", lab: "Institute for Materials Research", focus: "Multi-principal element alloys" },
    ],
    openProblems: [
      "Predictive thermodynamic models for phase stability in >5 component systems",
      "Bridging atomistic simulations to macro-scale mechanical response",
      "Radiation damage tolerance mechanisms",
      "Cost-effective processing routes for industrial deployment",
      "Fatigue and creep life prediction in HEAs",
    ],
    keyPapers: [
      "Cantor et al. (2004) — First HEA paper (Acta Materialia)",
      "Yeh et al. (2004) — Multi-principal element alloys concept",
      "Gludovatz et al. (2014) — CrMnFeCoNi fracture toughness (Science)",
      "Li et al. (2016) — TWIP+TRIP HEA (Nature)",
      "George et al. (2019) — Review of HEAs (Nature Reviews Materials)",
    ],
  },
  {
    id: "computational-alloy-design",
    title: "Computational Alloy Design & Materials Informatics",
    description:
      "Machine learning, DFT, and CALPHAD integrated with high-throughput experiments to accelerate alloy and materials discovery.",
    subTopics: [
      "Machine learning potentials (GAP, NNP, MACE)",
      "Graph neural networks for property prediction",
      "Active learning and Bayesian optimization",
      "High-throughput DFT databases (Materials Project, AFLOW, OQMD)",
      "CALPHAD extrapolation to new composition spaces",
      "Digital twin for alloy development",
      "Generative AI for novel crystal structure prediction",
    ],
    globalLabs: [
      { institution: "MIT", lab: "Sholl & Rosen Group / DMSE Computation", focus: "ML potentials, DFT" },
      { institution: "Lawrence Berkeley National Lab", lab: "Materials Project", focus: "High-throughput DFT database" },
      { institution: "Carnegie Mellon University", lab: "Prof. Brent Fultz / Rollett", focus: "Phase transformations modeling" },
      { institution: "University of Cambridge", lab: "Prof. Gábor Csányi — Machine Learning Potentials", focus: "GAP potentials" },
      { institution: "NOMAD Laboratory (Berlin / Hamburg)", lab: "Big-Data Analytics in Materials Science", focus: "Repository and ML" },
      { institution: "IIT Bombay", lab: "Prof. Abhijit Chatterjee", focus: "Kinetic Monte Carlo, rare events" },
      { institution: "IIT Madras", lab: "Prof. Abhik Choudhury", focus: "Phase field modelling" },
    ],
    openProblems: [
      "Universal, transferable interatomic potentials across the periodic table",
      "Uncertainty quantification in ML-predicted properties",
      "Integrating synthesis constraints into computational screening",
      "Inverse design: from target properties to composition and processing",
      "Explainability in ML materials models",
    ],
    keyPapers: [
      "Curtarolo et al. (2013) — AFLOW high-throughput framework (Comput. Mater. Sci.)",
      "Behler & Parrinello (2007) — Neural network potentials (PRL)",
      "Bartók et al. (2010) — GAP potentials (PRL)",
      "Jain et al. (2013) — Materials Project (APL Materials)",
      "Chen et al. (2022) — M3GNet universal potential (Nature Computational Science)",
    ],
  },
  {
    id: "additive-manufacturing",
    title: "Additive Manufacturing of Metals",
    description:
      "Selective laser melting, electron beam melting, directed energy deposition — microstructure-process-property relationships in 3D-printed metals.",
    subTopics: [
      "Process physics: melt pool dynamics, solidification, residual stress",
      "Microstructure evolution: columnar grains, cellular substructure",
      "Defect formation: porosity, hot cracking, lack-of-fusion",
      "Post-processing: HIP, heat treatment, surface finishing",
      "Alloy design for AM: printability, new AM-specific alloys",
      "In-situ monitoring and process control",
      "Multi-material and functionally graded materials",
      "Topology optimization + AM: bioinspired lightweight structures",
    ],
    globalLabs: [
      { institution: "MIT Lincoln Laboratory / DMSE", lab: "Additive Manufacturing Group", focus: "Process-microstructure" },
      { institution: "Fraunhofer ILT Aachen", lab: "Laser Technology Institute", focus: "SLM process development" },
      { institution: "Lawrence Livermore National Lab", lab: "Materials Engineering Division", focus: "Multi-scale modeling of AM" },
      { institution: "ETH Zurich", lab: "Prof. Ralph Spolenak — PVD & AM Thin Films", focus: "In-situ characterization" },
      { institution: "IIT Bombay", lab: "Prof. Ramesh Singh — Manufacturing Lab", focus: "Laser AM process control" },
      { institution: "IIT Madras", lab: "Prof. Sathyanarayanan Chandrasekaran", focus: "AM for biomedical implants" },
      { institution: "TU Delft", lab: "Aerospace AM Group", focus: "Ti-6Al-4V for aerospace AM" },
    ],
    openProblems: [
      "Predicting and controlling residual stress and distortion",
      "Real-time defect detection and closed-loop process control",
      "Designing new alloys specifically optimized for AM solidification",
      "Certification and qualification pathways for AM parts",
      "Fatigue life prediction with AM-induced defects",
    ],
    keyPapers: [
      "Murr et al. (2012) — Metal fabrication by additive manufacturing (J. Mater. Sci. Technol.)",
      "DebRoy et al. (2018) — AM of metallic components (Progress in Materials Science)",
      "King et al. (2014) — Observation of keyhole mode laser melting (IJAMT)",
      "Martin et al. (2017) — Grain refinement in Al alloys for AM (Nature)",
      "Carroll et al. (2015) — Anisotropic tensile behavior of Ti-6Al-4V (Acta Mater.)",
    ],
  },
  {
    id: "battery-materials",
    title: "Battery Materials & Electrochemical Energy Storage",
    description:
      "Materials challenges for next-generation batteries: solid-state, Li-S, Na-ion, multivalent — enabling the energy transition.",
    subTopics: [
      "Cathode materials: NMC, LFP, high-Ni, Li-rich layered oxides",
      "Anode materials: graphite, Si, Li metal, hard carbon",
      "Solid electrolytes: oxide (LLZO), sulfide (Li₆PS₅Cl), polymer",
      "Solid electrolyte interphase (SEI) formation and stability",
      "Sodium-ion batteries: Prussian blue analogues, layered oxides",
      "Lithium-sulfur batteries: polysulfide shuttle mitigation",
      "Multivalent batteries: Mg²⁺, Zn²⁺, Ca²⁺ ion insertion",
      "In-situ/operando characterization: synchrotron XRD, neutron, NMR",
      "Battery degradation and lifetime prediction (digital twin)",
    ],
    globalLabs: [
      { institution: "Stanford University", lab: "Prof. Yi Cui — Nanoscale Electrochemical Energy", focus: "Si anode, Li metal" },
      { institution: "MIT", lab: "Prof. Yet-Ming Chiang — Yet2 Lab", focus: "Flow batteries, solid electrolytes" },
      { institution: "Argonne National Lab", lab: "ReCell Center / Joint Center for Energy Storage", focus: "Battery materials" },
      { institution: "Samsung SDI / KAIST Korea", lab: "Energy Materials Research", focus: "Solid-state batteries" },
      { institution: "University of Oxford", lab: "Prof. Clare Grey — Inorganic Chemistry", focus: "NMR of battery materials" },
      { institution: "IISc Bangalore", lab: "Prof. Premkumar Senguttuvan", focus: "Na-ion and multivalent batteries" },
      { institution: "IIT Madras", lab: "Prof. Tata Narasinga Rao", focus: "Li-ion electrode materials" },
    ],
    openProblems: [
      "Suppressing Li dendrite growth in solid-state batteries",
      "Improving sulfide electrolyte air stability and manufacturability",
      "Understanding capacity fade mechanisms at the atomic scale",
      "Cost-effective, cobalt-free high-energy-density cathodes",
      "Fast charging without lithium plating",
    ],
    keyPapers: [
      "Goodenough & Park (2013) — Li-ion batteries (JACS)",
      "Armand & Tarascon (2008) — Building better batteries (Nature)",
      "Janek & Zeier (2016) — Solid-state electrolytes (Nature Energy)",
      "Liu et al. (2021) — Lithium metal batteries (Nat. Rev. Mater.)",
      "Zhao et al. (2020) — Designing solid-state electrolytes (Joule)",
    ],
  },
  {
    id: "2d-materials",
    title: "2D Materials & Heterostructures",
    description:
      "Graphene, TMDs, h-BN, MXenes, and van der Waals heterostructures for electronics, sensors, and energy applications.",
    subTopics: [
      "Graphene: synthesis (CVD, exfoliation), band structure, functionalization",
      "Transition Metal Dichalcogenides (TMDs): MoS₂, WS₂, WSe₂ — direct bandgap",
      "MXenes: synthesis by selective etching, energy storage applications",
      "Hexagonal boron nitride (h-BN): insulating substrate, tunnel barrier",
      "Van der Waals heterostructures: Moiré superlattices, twistronics",
      "Scalable synthesis: CVD, ALD, MBE of 2D materials",
      "Device applications: FETs, photodetectors, flexible electronics",
    ],
    globalLabs: [
      { institution: "MIT", lab: "Prof. Pablo Jarillo-Herrero — Twistronics", focus: "Moiré physics, superconductivity" },
      { institution: "Manchester University", lab: "National Graphene Institute (Geim & Novoselov)", focus: "Graphene and vdW heterostructures" },
      { institution: "Columbia University", lab: "Prof. James Hone — Nanomechanics", focus: "2D material mechanics" },
      { institution: "Drexel University", lab: "Prof. Yury Gogotsi — MXenes", focus: "MXene synthesis and energy storage" },
      { institution: "IIT Bombay", lab: "Prof. Arnab Bhattacharya", focus: "2D semiconductors, CVD graphene" },
      { institution: "IIT Delhi", lab: "Prof. Bikas Sahoo", focus: "Magnetic 2D materials" },
      { institution: "TIFR Mumbai", lab: "Department of Condensed Matter", focus: "Quantum transport in 2D materials" },
    ],
    openProblems: [
      "Wafer-scale defect-free CVD growth of single-crystal 2D materials",
      "Controlled Moiré engineering at large scale",
      "Integration of 2D materials with CMOS processes",
      "Stability of MXenes in ambient and aqueous environments",
      "Mechanical properties and strain engineering in TMD heterostructures",
    ],
    keyPapers: [
      "Novoselov et al. (2004) — Graphene discovery (Science)",
      "Mak et al. (2010) — Atomically thin MoS₂ (PRL)",
      "Naguib et al. (2011) — MXene discovery (Adv. Mater.)",
      "Cao et al. (2018) — Unconventional superconductivity in twisted bilayer graphene (Nature)",
      "Geim & Grigorieva (2013) — Van der Waals heterostructures review (Nature)",
    ],
  },
  {
    id: "green-metallurgy",
    title: "Green Metallurgy & Sustainable Materials Processing",
    description:
      "Decarbonization of metals industry, hydrogen-based reduction, electrolytic steelmaking, circular economy of metals.",
    subTopics: [
      "Hydrogen-based direct reduction of iron (H-DRI)",
      "Electrolytic iron production (MOE — Molten Oxide Electrolysis)",
      "Carbon capture and utilization in steelmaking",
      "Recycling and urban mining: scrap-based EAF metallurgy",
      "Slag valorization and zero-waste metallurgy",
      "Bio-metallurgy: biomass reductants, bioleaching",
      "Water footprint reduction in hydrometallurgy",
      "LCA and material flow analysis for metals",
    ],
    globalLabs: [
      { institution: "MIT", lab: "Prof. Antoine Allanore — Electrochemical Processing", focus: "Molten oxide electrolysis" },
      { institution: "KTH Royal Institute of Technology", lab: "HYBRIT Project Partner", focus: "H₂-DRI for fossil-free steel" },
      { institution: "RWTH Aachen", lab: "BFI / Steel Institute", focus: "Low-CO₂ steelmaking" },
      { institution: "Delft University", lab: "Materials Science & Engineering", focus: "Secondary metallurgy, recycling" },
      { institution: "IIT Bombay", lab: "Prof. Dipak Mazumdar", focus: "Ladle metallurgy and process modeling" },
      { institution: "IIT Kharagpur", lab: "Prof. S. Misra", focus: "Blast furnace modeling" },
      { institution: "CSIR-NML Jamshedpur", lab: "Process Metallurgy Division", focus: "Indian steel industry research" },
    ],
    openProblems: [
      "Cost-competitive H₂ production at scale for H-DRI",
      "Scale-up of molten oxide electrolysis for tonnage production",
      "Closed-loop recycling of multi-material automotive scrap",
      "Real-time digital monitoring of blast furnace internals",
      "Low-temperature processing routes for refractory metals",
    ],
    keyPapers: [
      "Allanore et al. (2013) — Molten oxide electrolysis for steel (Nature)",
      "Vogl et al. (2018) — Assessment of H₂-DRI (J. Clean. Prod.)",
      "Bataille et al. (2018) — Decarbonizing industry (Nature Climate Change)",
      "HYBRIT SSAB (2021) — First fossil-free steel production demonstration",
      "Reuter et al. (2019) — Challenges of recycling complex products (Nat. Rev. Mater.)",
    ],
  },
];
