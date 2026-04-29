export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: "job" | "scholarship";
  description: string;
  deadline: string;
  location: string;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  category: string;
  pages: number;
  downloads: number;
  updatedAt: string;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  questionCount: number;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  attempts: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "Junior Software Engineer",
    organization: "Netsol Technologies",
    type: "job",
    description:
      "Join a leading IT services company as a junior developer working with modern web technologies. Competitive salary with full benefits package.",
    deadline: "May 15, 2026",
    location: "Lahore, Pakistan",
    tags: ["Full-Time", "On-Site", "Tech"],
    image: "https://picsum.photos/seed/netsol-dev/800/500",
    featured: true,
  },
  {
    id: "opp-2",
    title: "HEC Indigenous Scholarship 2026",
    organization: "Higher Education Commission",
    type: "scholarship",
    description:
      "Fully funded scholarship for Pakistani students pursuing MS/PhD in local universities. Covers tuition, stipend, and research allowance.",
    deadline: "June 30, 2026",
    location: "Nationwide",
    tags: ["Fully Funded", "Graduate", "HEC"],
    image: "https://picsum.photos/seed/hec-scholar/800/500",
    featured: true,
  },
  {
    id: "opp-3",
    title: "Marketing Intern",
    organization: "Telenor Pakistan",
    type: "job",
    description:
      "6-month paid internship in the digital marketing division. Hands-on experience with campaign analytics, social media strategy, and brand management.",
    deadline: "May 20, 2026",
    location: "Islamabad, Pakistan",
    tags: ["Internship", "Paid", "Marketing"],
    image: "https://picsum.photos/seed/telenor-mkt/800/500",
  },
  {
    id: "opp-4",
    title: "Chevening Scholarship UK",
    organization: "British Council",
    type: "scholarship",
    description:
      "The UK government's global scholarship programme for future leaders. Covers tuition, living expenses, and flights for a one-year masters degree.",
    deadline: "November 2, 2026",
    location: "United Kingdom",
    tags: ["Fully Funded", "International", "Masters"],
    image: "https://picsum.photos/seed/chevening-uk/800/500",
    featured: true,
  },
  {
    id: "opp-5",
    title: "Data Analyst",
    organization: "Jazz (Mobilink)",
    type: "job",
    description:
      "Analyze subscriber behavior and network data to drive strategic decisions. Requires SQL proficiency and experience with visualization tools.",
    deadline: "May 25, 2026",
    location: "Islamabad, Pakistan",
    tags: ["Full-Time", "Analytics", "Telecom"],
    image: "https://picsum.photos/seed/jazz-data/800/500",
  },
  {
    id: "opp-6",
    title: "DAAD Research Grant",
    organization: "German Academic Exchange Service",
    type: "scholarship",
    description:
      "Research grants for doctoral candidates and young academics at German universities. Monthly stipend of 1,200 EUR plus travel and insurance.",
    deadline: "October 15, 2026",
    location: "Germany",
    tags: ["Research", "Doctoral", "Europe"],
    image: "https://picsum.photos/seed/daad-grant/800/500",
  },
  {
    id: "opp-7",
    title: "UI/UX Designer",
    organization: "Careem",
    type: "job",
    description:
      "Design intuitive ride-hailing and delivery experiences for millions of users across the Middle East. Figma expertise required.",
    deadline: "June 5, 2026",
    location: "Lahore, Pakistan",
    tags: ["Full-Time", "Design", "Remote-Friendly"],
    image: "https://picsum.photos/seed/careem-ux/800/500",
  },
  {
    id: "opp-8",
    title: "Turkish Government Scholarship",
    organization: "YTB Turkey",
    type: "scholarship",
    description:
      "Full scholarship covering tuition, accommodation, health insurance, and monthly stipend for undergraduate and graduate programs in Turkey.",
    deadline: "February 20, 2027",
    location: "Turkey",
    tags: ["Fully Funded", "All Levels", "International"],
    image: "https://picsum.photos/seed/turkey-schol/800/500",
  },
];

export const notes: Note[] = [
  {
    id: "note-1",
    title: "Complete CSS & NTS Guide",
    subject: "General Knowledge",
    category: "CSS/PMS",
    pages: 142,
    downloads: 3847,
    updatedAt: "April 12, 2026",
  },
  {
    id: "note-2",
    title: "English Grammar & Composition",
    subject: "English",
    category: "Entry Test",
    pages: 89,
    downloads: 5213,
    updatedAt: "March 28, 2026",
  },
  {
    id: "note-3",
    title: "Quantitative Reasoning Shortcuts",
    subject: "Mathematics",
    category: "GAT/NTS",
    pages: 64,
    downloads: 2891,
    updatedAt: "April 5, 2026",
  },
  {
    id: "note-4",
    title: "Pakistan Studies Key Points",
    subject: "Pak Studies",
    category: "CSS/PMS",
    pages: 118,
    downloads: 4102,
    updatedAt: "April 18, 2026",
  },
  {
    id: "note-5",
    title: "Analytical Reasoning Practice",
    subject: "Logical Reasoning",
    category: "GAT/NTS",
    pages: 76,
    downloads: 1934,
    updatedAt: "March 15, 2026",
  },
  {
    id: "note-6",
    title: "Current Affairs Compendium 2026",
    subject: "Current Affairs",
    category: "CSS/PMS",
    pages: 203,
    downloads: 7621,
    updatedAt: "April 22, 2026",
  },
];

export const tests: Test[] = [
  {
    id: "test-1",
    title: "General Knowledge MCQs",
    subject: "General Knowledge",
    questionCount: 30,
    duration: "25 min",
    difficulty: "Intermediate",
    attempts: 12483,
  },
  {
    id: "test-2",
    title: "English Vocabulary & Grammar",
    subject: "English",
    questionCount: 40,
    duration: "35 min",
    difficulty: "Beginner",
    attempts: 9217,
  },
  {
    id: "test-3",
    title: "Quantitative Aptitude",
    subject: "Mathematics",
    questionCount: 25,
    duration: "30 min",
    difficulty: "Advanced",
    attempts: 6834,
  },
  {
    id: "test-4",
    title: "Pakistan Current Affairs 2026",
    subject: "Current Affairs",
    questionCount: 20,
    duration: "15 min",
    difficulty: "Intermediate",
    attempts: 15692,
  },
];

export const quizQuestions: Record<string, Question[]> = {
  "test-1": [
    {
      id: "q1",
      text: "Which Pakistani city is known as the 'City of Gardens'?",
      options: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
      correctIndex: 1,
    },
    {
      id: "q2",
      text: "The United Nations was founded in which year?",
      options: ["1942", "1945", "1948", "1950"],
      correctIndex: 1,
    },
    {
      id: "q3",
      text: "What is the currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Ringgit"],
      correctIndex: 2,
    },
    {
      id: "q4",
      text: "The Karakoram Highway connects Pakistan with which country?",
      options: ["India", "Afghanistan", "China", "Iran"],
      correctIndex: 2,
    },
    {
      id: "q5",
      text: "Who wrote 'The Republic'?",
      options: ["Aristotle", "Socrates", "Plato", "Homer"],
      correctIndex: 2,
    },
  ],
  "test-2": [
    {
      id: "q1",
      text: "Choose the correct synonym of 'Ephemeral':",
      options: ["Eternal", "Transient", "Durable", "Permanent"],
      correctIndex: 1,
    },
    {
      id: "q2",
      text: "Identify the correct sentence:",
      options: [
        "He don't know nothing",
        "He doesn't know anything",
        "He don't know anything",
        "He doesn't know nothing",
      ],
      correctIndex: 1,
    },
    {
      id: "q3",
      text: "The antonym of 'Benevolent' is:",
      options: ["Kind", "Generous", "Malevolent", "Charitable"],
      correctIndex: 2,
    },
    {
      id: "q4",
      text: "Choose the correctly spelled word:",
      options: ["Accomodate", "Accommodate", "Acommodate", "Acomodate"],
      correctIndex: 1,
    },
    {
      id: "q5",
      text: "'A piece of cake' is an idiom meaning:",
      options: [
        "Something expensive",
        "Something very easy",
        "A cooking recipe",
        "A birthday party",
      ],
      correctIndex: 1,
    },
  ],
  "test-3": [
    {
      id: "q1",
      text: "If 3x + 7 = 22, what is x?",
      options: ["3", "4", "5", "6"],
      correctIndex: 2,
    },
    {
      id: "q2",
      text: "What is 15% of 240?",
      options: ["32", "34", "36", "38"],
      correctIndex: 2,
    },
    {
      id: "q3",
      text: "A train travels 180 km in 3 hours. What is its speed?",
      options: ["50 km/h", "55 km/h", "60 km/h", "65 km/h"],
      correctIndex: 2,
    },
    {
      id: "q4",
      text: "The LCM of 12 and 18 is:",
      options: ["24", "36", "48", "72"],
      correctIndex: 1,
    },
    {
      id: "q5",
      text: "If a shirt costs Rs. 800 after a 20% discount, what was the original price?",
      options: ["Rs. 960", "Rs. 1000", "Rs. 1050", "Rs. 1100"],
      correctIndex: 1,
    },
  ],
  "test-4": [
    {
      id: "q1",
      text: "Who is the current Chief Justice of Pakistan (as of 2026)?",
      options: [
        "Justice Qazi Faez Isa",
        "Justice Yahya Afridi",
        "Justice Mansoor Ali Shah",
        "Justice Munib Akhtar",
      ],
      correctIndex: 1,
    },
    {
      id: "q2",
      text: "Which country hosted the 2026 FIFA World Cup?",
      options: ["Qatar", "USA/Canada/Mexico", "Saudi Arabia", "Australia"],
      correctIndex: 1,
    },
    {
      id: "q3",
      text: "Pakistan's total area in square kilometers is approximately:",
      options: ["696,096", "796,096", "881,913", "956,096"],
      correctIndex: 2,
    },
    {
      id: "q4",
      text: "The CPEC is a part of which larger initiative?",
      options: [
        "ASEAN Free Trade",
        "Belt and Road Initiative",
        "Trans-Pacific Partnership",
        "EU Trade Agreement",
      ],
      correctIndex: 1,
    },
    {
      id: "q5",
      text: "Which Pakistani won the Nobel Prize in Physics?",
      options: [
        "Dr. Abdul Qadeer Khan",
        "Dr. Abdus Salam",
        "Dr. Atta-ur-Rahman",
        "Dr. Samar Mubarakmand",
      ],
      correctIndex: 1,
    },
  ],
};
