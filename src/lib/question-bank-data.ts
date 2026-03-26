export interface QuestionItem {
  id: number;
  subject: string;
  topic: string;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  marks: number;
  year: number;
}

export const QUESTION_BANK: QuestionItem[] = [
  // ===== Mathematics AA HL =====
  { id: 1, subject: "Mathematics AA HL", topic: "Calculus", question: "Find the derivative of f(x) = x³ sin(2x) using the product rule.", difficulty: "medium", marks: 6, year: 2023 },
  { id: 2, subject: "Mathematics AA HL", topic: "Calculus", question: "Evaluate the integral ∫₀¹ x²eˣ dx using integration by parts.", difficulty: "hard", marks: 8, year: 2022 },
  { id: 3, subject: "Mathematics AA HL", topic: "Calculus", question: "Find the volume of revolution when y = √x is rotated about the x-axis from x = 0 to x = 4.", difficulty: "medium", marks: 6, year: 2023 },
  { id: 4, subject: "Mathematics AA HL", topic: "Statistics & Probability", question: "Given P(A) = 0.4, P(B) = 0.5, and P(A ∩ B) = 0.2, find P(A | B).", difficulty: "easy", marks: 3, year: 2022 },
  { id: 5, subject: "Mathematics AA HL", topic: "Statistics & Probability", question: "A continuous random variable X has pdf f(x) = kx(1−x) for 0 ≤ x ≤ 1. Find the value of k and E(X).", difficulty: "hard", marks: 7, year: 2023 },
  { id: 6, subject: "Mathematics AA HL", topic: "Number & Algebra", question: "Prove by mathematical induction that 1 + 2 + 3 + ... + n = n(n+1)/2 for all positive integers n.", difficulty: "medium", marks: 6, year: 2022 },
  { id: 7, subject: "Mathematics AA HL", topic: "Number & Algebra", question: "Find the sum of the geometric series 3 + 6 + 12 + ... + 3072.", difficulty: "easy", marks: 4, year: 2023 },
  { id: 8, subject: "Mathematics AA HL", topic: "Functions", question: "Sketch the graph of f(x) = (x² − 4)/(x − 1), identifying all asymptotes and intercepts.", difficulty: "hard", marks: 8, year: 2022 },
  { id: 9, subject: "Mathematics AA HL", topic: "Functions", question: "Find the inverse of f(x) = (2x + 3)/(x − 1) and state its domain.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 10, subject: "Mathematics AA HL", topic: "Geometry & Trigonometry", question: "Solve 2sin²θ − sinθ − 1 = 0 for 0 ≤ θ ≤ 2π.", difficulty: "medium", marks: 5, year: 2022 },

  // ===== Mathematics AA SL =====
  { id: 11, subject: "Mathematics AA SL", topic: "Calculus", question: "Find the equation of the tangent line to y = x² − 3x + 2 at the point where x = 2.", difficulty: "easy", marks: 4, year: 2023 },
  { id: 12, subject: "Mathematics AA SL", topic: "Calculus", question: "Find the area enclosed between y = x² and y = 2x.", difficulty: "medium", marks: 6, year: 2022 },
  { id: 13, subject: "Mathematics AA SL", topic: "Functions", question: "Solve the equation log₂(x) + log₂(x − 2) = 3.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 14, subject: "Mathematics AA SL", topic: "Statistics & Probability", question: "A bag contains 5 red and 3 blue balls. Two balls are drawn without replacement. Find the probability both are red.", difficulty: "easy", marks: 3, year: 2022 },
  { id: 15, subject: "Mathematics AA SL", topic: "Number & Algebra", question: "Find the 10th term and the sum of the first 10 terms of the arithmetic sequence 3, 7, 11, 15, ...", difficulty: "easy", marks: 4, year: 2023 },
  { id: 16, subject: "Mathematics AA SL", topic: "Geometry & Trigonometry", question: "In triangle ABC, a = 8, b = 5, and C = 60°. Find side c using the cosine rule.", difficulty: "medium", marks: 5, year: 2022 },

  // ===== Mathematics AI HL =====
  { id: 17, subject: "Mathematics AI HL", topic: "Statistics & Probability", question: "A dataset has values 12, 15, 18, 22, 25, 30, 35. Perform a χ² goodness-of-fit test at the 5% level to test if the data is uniformly distributed.", difficulty: "hard", marks: 8, year: 2023 },
  { id: 18, subject: "Mathematics AI HL", topic: "Functions", question: "A population of bacteria grows according to P(t) = 200e^(0.03t). Find the time when the population reaches 1000.", difficulty: "medium", marks: 5, year: 2022 },
  { id: 19, subject: "Mathematics AI HL", topic: "Calculus", question: "A rectangular box with no lid has volume 32 cm³. Find the dimensions that minimize the surface area.", difficulty: "hard", marks: 7, year: 2023 },
  { id: 20, subject: "Mathematics AI HL", topic: "Number & Algebra", question: "Use the binomial theorem to expand (2 + x)⁵ and find the coefficient of x³.", difficulty: "medium", marks: 5, year: 2022 },
  { id: 21, subject: "Mathematics AI HL", topic: "Geometry & Trigonometry", question: "Find the area of a triangle with vertices A(1,2), B(4,6), and C(7,1) using the cross product method.", difficulty: "medium", marks: 5, year: 2023 },

  // ===== Mathematics AI SL =====
  { id: 22, subject: "Mathematics AI SL", topic: "Statistics & Probability", question: "The heights of students are normally distributed with mean 170 cm and standard deviation 8 cm. Find the probability a student is taller than 180 cm.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 23, subject: "Mathematics AI SL", topic: "Number & Algebra", question: "Convert the decimal number 156 to binary.", difficulty: "easy", marks: 3, year: 2022 },
  { id: 24, subject: "Mathematics AI SL", topic: "Functions", question: "A car depreciates by 15% each year. If it costs $25,000 new, find its value after 5 years.", difficulty: "easy", marks: 4, year: 2023 },
  { id: 25, subject: "Mathematics AI SL", topic: "Geometry & Trigonometry", question: "Find the volume and surface area of a cone with radius 5 cm and height 12 cm.", difficulty: "easy", marks: 4, year: 2022 },
  { id: 26, subject: "Mathematics AI SL", topic: "Calculus", question: "Find the maximum value of f(x) = −2x² + 12x − 10 using differentiation.", difficulty: "medium", marks: 5, year: 2023 },

  // ===== Physics HL =====
  { id: 27, subject: "Physics HL", topic: "Mechanics", question: "A projectile is launched at 45° with initial velocity 20 m/s. Calculate the maximum height and range.", difficulty: "easy", marks: 4, year: 2022 },
  { id: 28, subject: "Physics HL", topic: "Mechanics", question: "A 2 kg block on a 30° incline has μ = 0.3. Find the acceleration and the normal force.", difficulty: "medium", marks: 6, year: 2023 },
  { id: 29, subject: "Physics HL", topic: "Mechanics", question: "Derive the expression for the moment of inertia of a uniform rod about its center.", difficulty: "hard", marks: 8, year: 2022 },
  { id: 30, subject: "Physics HL", topic: "Waves", question: "Explain the conditions required for total internal reflection and calculate the critical angle for glass (n = 1.5) to air.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 31, subject: "Physics HL", topic: "Waves", question: "Two speakers emit sound of frequency 680 Hz in phase. Explain the interference pattern observed.", difficulty: "medium", marks: 6, year: 2022 },
  { id: 32, subject: "Physics HL", topic: "Electricity & Magnetism", question: "Derive the expression for the magnetic field at the center of a circular loop carrying current I.", difficulty: "hard", marks: 8, year: 2023 },
  { id: 33, subject: "Physics HL", topic: "Electricity & Magnetism", question: "A parallel plate capacitor has plates of area 0.02 m² separated by 2 mm. Calculate its capacitance.", difficulty: "easy", marks: 3, year: 2022 },
  { id: 34, subject: "Physics HL", topic: "Thermal Physics", question: "Explain the difference between isothermal and adiabatic processes using p-V diagrams.", difficulty: "medium", marks: 6, year: 2023 },
  { id: 35, subject: "Physics HL", topic: "Circular Motion", question: "A car travels around a banked curve of radius 50 m at 20 m/s. Calculate the required banking angle for no friction.", difficulty: "medium", marks: 5, year: 2022 },
  { id: 36, subject: "Physics HL", topic: "Atomic & Nuclear Physics", question: "Calculate the energy released in the fusion reaction ²H + ³H → ⁴He + ¹n. Given masses: ²H = 2.014, ³H = 3.016, ⁴He = 4.003, ¹n = 1.009 u.", difficulty: "hard", marks: 7, year: 2023 },
  { id: 37, subject: "Physics HL", topic: "Energy Production", question: "Compare the advantages and disadvantages of nuclear fission and solar energy as power sources.", difficulty: "medium", marks: 6, year: 2022 },
  { id: 38, subject: "Physics HL", topic: "Measurements & Uncertainties", question: "A student measures the period of a pendulum as 2.04 ± 0.02 s. Calculate the percentage uncertainty in g if g = 4π²L/T².", difficulty: "medium", marks: 5, year: 2023 },

  // ===== Physics SL =====
  { id: 39, subject: "Physics SL", topic: "Mechanics", question: "A ball is thrown vertically upward with speed 15 m/s. Find the maximum height and total time of flight.", difficulty: "easy", marks: 4, year: 2023 },
  { id: 40, subject: "Physics SL", topic: "Mechanics", question: "State and explain Newton's three laws of motion with examples.", difficulty: "easy", marks: 4, year: 2022 },
  { id: 41, subject: "Physics SL", topic: "Waves", question: "Describe the difference between transverse and longitudinal waves, giving one example of each.", difficulty: "easy", marks: 3, year: 2023 },
  { id: 42, subject: "Physics SL", topic: "Thermal Physics", question: "Calculate the energy required to raise the temperature of 500 g of water from 20°C to 100°C. (c = 4200 J/kg·K)", difficulty: "easy", marks: 3, year: 2022 },
  { id: 43, subject: "Physics SL", topic: "Electricity & Magnetism", question: "Three resistors of 2 Ω, 4 Ω, and 6 Ω are connected in parallel. Find the total resistance.", difficulty: "medium", marks: 4, year: 2023 },
  { id: 44, subject: "Physics SL", topic: "Atomic & Nuclear Physics", question: "Explain the concept of half-life and calculate the fraction of a radioactive sample remaining after 3 half-lives.", difficulty: "medium", marks: 5, year: 2022 },

  // ===== Chemistry HL =====
  { id: 45, subject: "Chemistry HL", topic: "Organic Chemistry", question: "Draw the structural formula and name the product of the reaction between ethene and HBr. Explain the mechanism.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 46, subject: "Chemistry HL", topic: "Organic Chemistry", question: "Compare SN1 and SN2 mechanisms, including the effect of substrate structure and solvent polarity.", difficulty: "hard", marks: 8, year: 2022 },
  { id: 47, subject: "Chemistry HL", topic: "Stoichiometry", question: "25.0 cm³ of 0.100 mol/dm³ NaOH neutralizes 20.0 cm³ of HCl. Calculate the concentration of HCl.", difficulty: "easy", marks: 3, year: 2023 },
  { id: 48, subject: "Chemistry HL", topic: "Atomic Structure", question: "Explain why the first ionization energy of oxygen is less than that of nitrogen.", difficulty: "medium", marks: 5, year: 2022 },
  { id: 49, subject: "Chemistry HL", topic: "Periodicity", question: "Explain the trend in electronegativity across Period 3 and down Group 17.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 50, subject: "Chemistry HL", topic: "Bonding", question: "Using VSEPR theory, predict the shape and bond angles of SF₆, IF₅, and XeF₄.", difficulty: "hard", marks: 7, year: 2022 },
  { id: 51, subject: "Chemistry HL", topic: "Energetics", question: "Use Hess's law to calculate the enthalpy of formation of methane given standard combustion enthalpies.", difficulty: "hard", marks: 7, year: 2023 },
  { id: 52, subject: "Chemistry HL", topic: "Kinetics", question: "Explain how temperature affects reaction rate using the Maxwell-Boltzmann distribution.", difficulty: "medium", marks: 5, year: 2022 },
  { id: 53, subject: "Chemistry HL", topic: "Equilibrium", question: "For the reaction N₂ + 3H₂ ⇌ 2NH₃, explain the effect of increasing pressure and temperature on the equilibrium position.", difficulty: "medium", marks: 6, year: 2023 },
  { id: 54, subject: "Chemistry HL", topic: "Acids & Bases", question: "Calculate the pH of a 0.050 mol/dm³ solution of ethanoic acid (Ka = 1.8 × 10⁻⁵).", difficulty: "medium", marks: 5, year: 2022 },
  { id: 55, subject: "Chemistry HL", topic: "Redox", question: "Balance the following redox equation in acidic solution: MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺", difficulty: "medium", marks: 5, year: 2023 },

  // ===== Chemistry SL =====
  { id: 56, subject: "Chemistry SL", topic: "Stoichiometry", question: "Calculate the mass of CO₂ produced when 10 g of CaCO₃ reacts completely with excess HCl.", difficulty: "easy", marks: 3, year: 2023 },
  { id: 57, subject: "Chemistry SL", topic: "Atomic Structure", question: "Write the electron configuration of Fe and Fe³⁺.", difficulty: "easy", marks: 3, year: 2022 },
  { id: 58, subject: "Chemistry SL", topic: "Bonding", question: "Draw Lewis structures for CO₂, H₂O, and NH₃. Predict their shapes.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 59, subject: "Chemistry SL", topic: "Energetics", question: "Define exothermic and endothermic reactions and sketch their enthalpy profile diagrams.", difficulty: "easy", marks: 4, year: 2022 },
  { id: 60, subject: "Chemistry SL", topic: "Kinetics", question: "List and explain four factors that affect the rate of a chemical reaction.", difficulty: "easy", marks: 4, year: 2023 },
  { id: 61, subject: "Chemistry SL", topic: "Acids & Bases", question: "Distinguish between strong and weak acids, giving one example of each.", difficulty: "easy", marks: 3, year: 2022 },

  // ===== Biology HL =====
  { id: 62, subject: "Biology HL", topic: "Genetics", question: "Explain the process of DNA replication, including the roles of helicase, primase, and DNA polymerase III.", difficulty: "hard", marks: 8, year: 2022 },
  { id: 63, subject: "Biology HL", topic: "Genetics", question: "A cross between two heterozygous tall pea plants (Tt × Tt) is performed. Draw a Punnett square and state the expected phenotype ratio.", difficulty: "easy", marks: 4, year: 2023 },
  { id: 64, subject: "Biology HL", topic: "Cell Biology", question: "Compare and contrast the structure of prokaryotic and eukaryotic cells.", difficulty: "medium", marks: 6, year: 2022 },
  { id: 65, subject: "Biology HL", topic: "Cell Biology", question: "Explain the fluid mosaic model of membrane structure and the functions of membrane proteins.", difficulty: "medium", marks: 6, year: 2023 },
  { id: 66, subject: "Biology HL", topic: "Molecular Biology", question: "Describe the process of transcription in eukaryotic cells, including the role of RNA polymerase.", difficulty: "medium", marks: 6, year: 2022 },
  { id: 67, subject: "Biology HL", topic: "Ecology", question: "Explain the carbon cycle, including the processes of photosynthesis, respiration, and combustion.", difficulty: "medium", marks: 6, year: 2023 },
  { id: 68, subject: "Biology HL", topic: "Evolution & Biodiversity", question: "Outline the evidence for evolution from fossil records, comparative anatomy, and molecular biology.", difficulty: "hard", marks: 8, year: 2022 },
  { id: 69, subject: "Biology HL", topic: "Human Physiology", question: "Describe the structure and function of the nephron in the human kidney.", difficulty: "hard", marks: 7, year: 2023 },
  { id: 70, subject: "Biology HL", topic: "Nucleic Acids", question: "Compare the structure of DNA and RNA, including differences in sugar, bases, and strandedness.", difficulty: "easy", marks: 4, year: 2022 },
  { id: 71, subject: "Biology HL", topic: "Metabolism", question: "Outline the light-dependent reactions of photosynthesis, including photolysis and chemiosmosis.", difficulty: "hard", marks: 8, year: 2023 },

  // ===== Biology SL =====
  { id: 72, subject: "Biology SL", topic: "Cell Biology", question: "Draw and label the ultrastructure of an animal cell.", difficulty: "easy", marks: 4, year: 2023 },
  { id: 73, subject: "Biology SL", topic: "Molecular Biology", question: "Describe the role of enzymes as biological catalysts, including the lock-and-key model.", difficulty: "easy", marks: 4, year: 2022 },
  { id: 74, subject: "Biology SL", topic: "Genetics", question: "Explain the difference between mitosis and meiosis in terms of purpose and outcome.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 75, subject: "Biology SL", topic: "Ecology", question: "Define and give examples of producers, consumers, and decomposers in an ecosystem.", difficulty: "easy", marks: 3, year: 2022 },
  { id: 76, subject: "Biology SL", topic: "Human Physiology", question: "Outline the process of gas exchange in the human lungs.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 77, subject: "Biology SL", topic: "Evolution & Biodiversity", question: "Explain natural selection using the example of antibiotic resistance in bacteria.", difficulty: "medium", marks: 5, year: 2022 },

  // ===== Economics HL =====
  { id: 78, subject: "Economics HL", topic: "Macroeconomics", question: "Evaluate the effectiveness of expansionary fiscal policy in reducing unemployment.", difficulty: "hard", marks: 10, year: 2023 },
  { id: 79, subject: "Economics HL", topic: "Macroeconomics", question: "Using the AD/AS model, explain the consequences of demand-pull inflation.", difficulty: "medium", marks: 6, year: 2022 },
  { id: 80, subject: "Economics HL", topic: "Microeconomics", question: "Explain how price discrimination allows firms to increase total revenue, using diagrams.", difficulty: "hard", marks: 8, year: 2023 },
  { id: 81, subject: "Economics HL", topic: "Microeconomics", question: "Define price elasticity of demand (PED) and explain two factors that affect it.", difficulty: "easy", marks: 4, year: 2022 },
  { id: 82, subject: "Economics HL", topic: "International Economics", question: "Evaluate the impact of a tariff on domestic consumers, producers, and government revenue.", difficulty: "hard", marks: 8, year: 2023 },
  { id: 83, subject: "Economics HL", topic: "International Economics", question: "Explain the difference between a trade deficit and a current account deficit.", difficulty: "medium", marks: 5, year: 2022 },
  { id: 84, subject: "Economics HL", topic: "Development Economics", question: "Discuss the role of foreign direct investment (FDI) in promoting economic development.", difficulty: "hard", marks: 8, year: 2023 },
  { id: 85, subject: "Economics HL", topic: "Development Economics", question: "Distinguish between economic growth and economic development.", difficulty: "easy", marks: 4, year: 2022 },

  // ===== Economics SL =====
  { id: 86, subject: "Economics SL", topic: "Microeconomics", question: "Using a supply and demand diagram, explain the effect of a subsidy on market equilibrium.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 87, subject: "Economics SL", topic: "Microeconomics", question: "Define and explain the concept of market failure with two examples.", difficulty: "easy", marks: 4, year: 2022 },
  { id: 88, subject: "Economics SL", topic: "Macroeconomics", question: "Explain the circular flow of income model for a two-sector economy.", difficulty: "easy", marks: 4, year: 2023 },
  { id: 89, subject: "Economics SL", topic: "International Economics", question: "Explain two advantages and two disadvantages of free trade.", difficulty: "medium", marks: 5, year: 2022 },
  { id: 90, subject: "Economics SL", topic: "Development Economics", question: "Explain how the Human Development Index (HDI) is measured and its limitations.", difficulty: "medium", marks: 5, year: 2023 },

  // ===== History HL =====
  { id: 91, subject: "History HL", topic: "Causes of Wars", question: "Evaluate the relative importance of long-term and short-term causes of World War I.", difficulty: "hard", marks: 10, year: 2023 },
  { id: 92, subject: "History HL", topic: "Causes of Wars", question: "To what extent was the Treaty of Versailles responsible for the outbreak of World War II?", difficulty: "hard", marks: 10, year: 2022 },
  { id: 93, subject: "History HL", topic: "Effects of Wars", question: "Analyze the social and economic effects of World War II on two countries.", difficulty: "hard", marks: 10, year: 2023 },
  { id: 94, subject: "History HL", topic: "Authoritarian States", question: "Compare the methods used by Hitler and Stalin to establish and maintain their power.", difficulty: "hard", marks: 10, year: 2022 },
  { id: 95, subject: "History HL", topic: "Cold War", question: "Evaluate the significance of the Cuban Missile Crisis in the context of the Cold War.", difficulty: "medium", marks: 8, year: 2023 },
  { id: 96, subject: "History HL", topic: "Rights & Protest", question: "Analyze the impact of the Civil Rights Movement on legislation in the United States.", difficulty: "medium", marks: 8, year: 2022 },

  // ===== English A HL =====
  { id: 97, subject: "English A HL", topic: "Readers, Writers & Texts", question: "Analyze how the narrative perspective shapes meaning in a novel you have studied.", difficulty: "hard", marks: 10, year: 2023 },
  { id: 98, subject: "English A HL", topic: "Readers, Writers & Texts", question: "Discuss the role of the unreliable narrator in shaping reader interpretation.", difficulty: "hard", marks: 10, year: 2022 },
  { id: 99, subject: "English A HL", topic: "Time & Space", question: "How does the use of setting contribute to the development of themes in a literary work you have studied?", difficulty: "medium", marks: 8, year: 2023 },
  { id: 100, subject: "English A HL", topic: "Intertextuality", question: "Examine the ways in which one text references or responds to another. What effect does this create?", difficulty: "hard", marks: 10, year: 2022 },

  // ===== English A SL =====
  { id: 101, subject: "English A SL", topic: "Readers, Writers & Texts", question: "How does the author use symbolism to convey meaning in a text you have studied?", difficulty: "medium", marks: 8, year: 2023 },
  { id: 102, subject: "English A SL", topic: "Time & Space", question: "Discuss how the structure of a text contributes to its overall meaning.", difficulty: "medium", marks: 8, year: 2022 },
  { id: 103, subject: "English A SL", topic: "Intertextuality", question: "Compare the treatment of a common theme in two texts you have studied.", difficulty: "medium", marks: 8, year: 2023 },

  // ===== Computer Science HL =====
  { id: 104, subject: "Computer Science HL", topic: "System Fundamentals", question: "Explain the fetch-decode-execute cycle of the CPU, including the role of each register.", difficulty: "medium", marks: 6, year: 2023 },
  { id: 105, subject: "Computer Science HL", topic: "Computer Organization", question: "Compare the von Neumann and Harvard architectures, stating advantages of each.", difficulty: "medium", marks: 5, year: 2022 },
  { id: 106, subject: "Computer Science HL", topic: "Networks", question: "Explain the purpose of the OSI model and describe the function of three layers.", difficulty: "medium", marks: 6, year: 2023 },
  { id: 107, subject: "Computer Science HL", topic: "Computational Thinking", question: "Write pseudocode for a binary search algorithm and explain its time complexity.", difficulty: "medium", marks: 6, year: 2022 },
  { id: 108, subject: "Computer Science HL", topic: "Abstract Data Structures", question: "Compare linked lists and arrays in terms of memory allocation, insertion, and access time.", difficulty: "hard", marks: 7, year: 2023 },
  { id: 109, subject: "Computer Science HL", topic: "Abstract Data Structures", question: "Explain how a binary search tree works. Describe insertion and in-order traversal.", difficulty: "hard", marks: 8, year: 2022 },
  { id: 110, subject: "Computer Science HL", topic: "Resource Management", question: "Explain the concept of virtual memory and how paging works.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 111, subject: "Computer Science HL", topic: "Control", question: "Explain the difference between centralized and distributed computing, with one advantage of each.", difficulty: "easy", marks: 4, year: 2022 },

  // ===== Computer Science SL =====
  { id: 112, subject: "Computer Science SL", topic: "System Fundamentals", question: "Define primary memory and secondary memory, giving one example of each.", difficulty: "easy", marks: 3, year: 2023 },
  { id: 113, subject: "Computer Science SL", topic: "Computer Organization", question: "Explain the difference between RAM and ROM.", difficulty: "easy", marks: 3, year: 2022 },
  { id: 114, subject: "Computer Science SL", topic: "Networks", question: "Explain the difference between a LAN and a WAN, giving one example of each.", difficulty: "easy", marks: 3, year: 2023 },
  { id: 115, subject: "Computer Science SL", topic: "Computational Thinking", question: "Trace the following algorithm for the input [5, 2, 8, 1, 9] and identify the sorting method used.", difficulty: "medium", marks: 5, year: 2022 },
];
