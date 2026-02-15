export interface Question {
  id: string;
  text: string;
  answer: string;
  image: string;
  funFact?: string;
  acceptedAnswers?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  difficulty: "easy" | "medium" | "hard";
  isNew: boolean;
  isPopular: boolean;
  isAfterDark: boolean;
  categoryImage: string;
  questions: {
    200: Question[];
    400: Question[];
    600: Question[];
  };
}

export const POINTS = [200, 400, 600] as const;

export const CATEGORY_LIBRARY: Category[] = [
  // ============ SCIENCE ============
  {
    id: "science",
    name: "Science",
    icon: "Atom",
    difficulty: "medium",
    isNew: false,
    isPopular: true,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "sci-200-1", text: "What planet is known as the Red Planet?", answer: "Mars", image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=400&fit=crop", funFact: "Mars gets its red color from iron oxide (rust) on its surface." },
        { id: "sci-200-2", text: "What gas do plants absorb from the atmosphere?", answer: "Carbon dioxide", image: "https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=600&h=400&fit=crop", funFact: "A single large tree can absorb up to 48 pounds of CO2 per year." },
        { id: "sci-200-3", text: "How many bones are in the adult human body?", answer: "206", image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&h=400&fit=crop" },
        { id: "sci-200-4", text: "What is the chemical formula for water?", answer: "H2O", image: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=600&h=400&fit=crop" },
        { id: "sci-200-5", text: "What force keeps us on the ground?", answer: "Gravity", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "sci-400-1", text: "What is the chemical symbol for gold?", answer: "Au", image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=400&fit=crop", funFact: "Au comes from the Latin word 'aurum' meaning 'shining dawn.'" },
        { id: "sci-400-2", text: "What is the powerhouse of the cell?", answer: "Mitochondria", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop" },
        { id: "sci-400-3", text: "What element has the atomic number 1?", answer: "Hydrogen", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop" },
        { id: "sci-400-4", text: "What type of rock is formed from cooled lava?", answer: "Igneous", image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=600&h=400&fit=crop" },
        { id: "sci-400-5", text: "What planet has the most moons in our solar system?", answer: "Saturn", image: "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=600&h=400&fit=crop", funFact: "Saturn has over 140 known moons." },
      ],
      600: [
        { id: "sci-600-1", text: "What particle is responsible for giving mass to other particles?", answer: "Higgs boson", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop", funFact: "The Higgs boson was confirmed at CERN in 2012." },
        { id: "sci-600-2", text: "What is the most abundant element in the universe?", answer: "Hydrogen", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop" },
        { id: "sci-600-3", text: "What phenomenon explains why light bends when entering water?", answer: "Refraction", image: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?w=600&h=400&fit=crop" },
        { id: "sci-600-4", text: "What is the name of the boundary between Earth's crust and mantle?", answer: "Mohorovičić discontinuity (Moho)", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop", acceptedAnswers: ["Moho", "Mohorovicic discontinuity"] },
        { id: "sci-600-5", text: "What is Schrödinger's thought experiment about?", answer: "A cat that is both alive and dead until observed", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop", acceptedAnswers: ["Schrödinger's cat", "quantum superposition"] },
      ],
    },
  },

  // ============ HISTORY ============
  {
    id: "history",
    name: "History",
    icon: "Landmark",
    difficulty: "medium",
    isNew: false,
    isPopular: true,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "his-200-1", text: "In what year did World War II end?", answer: "1945", image: "https://images.unsplash.com/photo-1580130775562-0ef92da028de?w=600&h=400&fit=crop" },
        { id: "his-200-2", text: "Who was the first President of the United States?", answer: "George Washington", image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=600&h=400&fit=crop" },
        { id: "his-200-3", text: "What ship sank on its maiden voyage in 1912?", answer: "Titanic", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop" },
        { id: "his-200-4", text: "What wall divided East and West Berlin?", answer: "Berlin Wall", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop" },
        { id: "his-200-5", text: "Who painted the ceiling of the Sistine Chapel?", answer: "Michelangelo", image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "his-400-1", text: "Who was the first emperor of Rome?", answer: "Augustus", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop", acceptedAnswers: ["Augustus", "Octavian"] },
        { id: "his-400-2", text: "What event started on July 14, 1789?", answer: "The French Revolution (Storming of the Bastille)", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", acceptedAnswers: ["French Revolution", "Storming of the Bastille"] },
        { id: "his-400-3", text: "What ancient trade route connected China to the Mediterranean?", answer: "The Silk Road", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop" },
        { id: "his-400-4", text: "Who discovered penicillin?", answer: "Alexander Fleming", image: "https://images.unsplash.com/photo-1584308666982-507c565a45f4?w=600&h=400&fit=crop" },
        { id: "his-400-5", text: "What year did the Apollo 11 moon landing take place?", answer: "1969", image: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "his-600-1", text: "What ancient civilization built Machu Picchu?", answer: "The Inca", image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop", acceptedAnswers: ["Inca", "Incas"] },
        { id: "his-600-2", text: "What treaty ended World War I?", answer: "Treaty of Versailles", image: "https://images.unsplash.com/photo-1580130775562-0ef92da028de?w=600&h=400&fit=crop" },
        { id: "his-600-3", text: "Who was the last Pharaoh of Egypt?", answer: "Cleopatra VII", image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&h=400&fit=crop", acceptedAnswers: ["Cleopatra", "Cleopatra VII"] },
        { id: "his-600-4", text: "What was the name of the Manhattan Project's first nuclear test?", answer: "Trinity", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop" },
        { id: "his-600-5", text: "Which empire was ruled by Suleiman the Magnificent?", answer: "Ottoman Empire", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ POP CULTURE ============
  {
    id: "pop-culture",
    name: "Pop Culture",
    icon: "Tv",
    difficulty: "easy",
    isNew: false,
    isPopular: true,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1586899028174-e7098604235b?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "pop-200-1", text: "What band released the album 'Abbey Road'?", answer: "The Beatles", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop" },
        { id: "pop-200-2", text: "What superhero is known as the 'Man of Steel'?", answer: "Superman", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
        { id: "pop-200-3", text: "What Disney movie features a character named Elsa?", answer: "Frozen", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop" },
        { id: "pop-200-4", text: "Who is the lead singer of Maroon 5?", answer: "Adam Levine", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" },
        { id: "pop-200-5", text: "What streaming platform is known for 'Stranger Things'?", answer: "Netflix", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "pop-400-1", text: "Who directed the film 'Inception'?", answer: "Christopher Nolan", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
        { id: "pop-400-2", text: "What reality show features the Kardashian family?", answer: "Keeping Up with the Kardashians", image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=400&fit=crop" },
        { id: "pop-400-3", text: "What is the name of Taylor Swift's 2020 surprise album?", answer: "Folklore", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop" },
        { id: "pop-400-4", text: "What movie franchise features a character called 'The Dude'?", answer: "The Big Lebowski", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
        { id: "pop-400-5", text: "What animated sitcom has been on the air since 1989?", answer: "The Simpsons", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "pop-600-1", text: "What TV show features the fictional land of Westeros?", answer: "Game of Thrones", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop" },
        { id: "pop-600-2", text: "What is the name of Beyoncé's visual album released in 2016?", answer: "Lemonade", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" },
        { id: "pop-600-3", text: "What 2019 film became the highest-grossing movie of all time?", answer: "Avengers: Endgame", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop", funFact: "It surpassed Avatar until Avatar's 2021 re-release." },
        { id: "pop-600-4", text: "Who created the Marvel Cinematic Universe?", answer: "Kevin Feige", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&h=400&fit=crop" },
        { id: "pop-600-5", text: "What South Korean film won Best Picture at the 2020 Oscars?", answer: "Parasite", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ GEOGRAPHY ============
  {
    id: "geography",
    name: "Geography",
    icon: "Globe",
    difficulty: "easy",
    isNew: false,
    isPopular: true,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "geo-200-1", text: "What is the capital of Japan?", answer: "Tokyo", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop" },
        { id: "geo-200-2", text: "What is the largest continent?", answer: "Asia", image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=400&fit=crop" },
        { id: "geo-200-3", text: "What ocean is the largest?", answer: "Pacific Ocean", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop" },
        { id: "geo-200-4", text: "What country is shaped like a boot?", answer: "Italy", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop" },
        { id: "geo-200-5", text: "What is the smallest country in the world?", answer: "Vatican City", image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "geo-400-1", text: "What is the longest river in Africa?", answer: "Nile River", image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&h=400&fit=crop", acceptedAnswers: ["Nile", "The Nile"] },
        { id: "geo-400-2", text: "What country has the most natural lakes?", answer: "Canada", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&h=400&fit=crop" },
        { id: "geo-400-3", text: "What desert is the largest hot desert in the world?", answer: "Sahara Desert", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop", acceptedAnswers: ["Sahara"] },
        { id: "geo-400-4", text: "What two countries share the longest international border?", answer: "USA and Canada", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop" },
        { id: "geo-400-5", text: "What is the highest waterfall in the world?", answer: "Angel Falls", image: "https://images.unsplash.com/photo-1432405972618-c6b0cfba5e5a?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "geo-600-1", text: "Which country has the most time zones?", answer: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", funFact: "France has 12 time zones due to its overseas territories." },
        { id: "geo-600-2", text: "What is the driest continent on Earth?", answer: "Antarctica", image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=400&fit=crop" },
        { id: "geo-600-3", text: "What country is home to the world's largest reef system?", answer: "Australia", image: "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=600&h=400&fit=crop" },
        { id: "geo-600-4", text: "What is the only country that spans four hemispheres?", answer: "Kiribati", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop" },
        { id: "geo-600-5", text: "What European microstate is entirely surrounded by Italy?", answer: "San Marino", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop", funFact: "San Marino claims to be the oldest republic in the world, founded in 301 AD." },
      ],
    },
  },

  // ============ TECHNOLOGY ============
  {
    id: "technology",
    name: "Technology",
    icon: "Cpu",
    difficulty: "medium",
    isNew: false,
    isPopular: true,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "tec-200-1", text: "What does 'HTTP' stand for?", answer: "HyperText Transfer Protocol", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop" },
        { id: "tec-200-2", text: "What company makes the iPhone?", answer: "Apple", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop" },
        { id: "tec-200-3", text: "What does 'Wi-Fi' allow you to do?", answer: "Connect to the internet wirelessly", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop" },
        { id: "tec-200-4", text: "What is the most popular search engine?", answer: "Google", image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop" },
        { id: "tec-200-5", text: "What does 'USB' stand for?", answer: "Universal Serial Bus", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "tec-400-1", text: "Who co-founded Apple Inc. alongside Steve Wozniak?", answer: "Steve Jobs", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop" },
        { id: "tec-400-2", text: "What does 'AI' stand for in technology?", answer: "Artificial Intelligence", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop" },
        { id: "tec-400-3", text: "What year was the first iPhone released?", answer: "2007", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop" },
        { id: "tec-400-4", text: "What programming language is named after a type of coffee?", answer: "Java", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop" },
        { id: "tec-400-5", text: "What company owns Instagram and WhatsApp?", answer: "Meta", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop", acceptedAnswers: ["Meta", "Facebook"] },
      ],
      600: [
        { id: "tec-600-1", text: "What programming language was created by Brendan Eich in 10 days?", answer: "JavaScript", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop" },
        { id: "tec-600-2", text: "What does 'GPU' stand for?", answer: "Graphics Processing Unit", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=400&fit=crop" },
        { id: "tec-600-3", text: "What technology underpins Bitcoin?", answer: "Blockchain", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop" },
        { id: "tec-600-4", text: "What was the name of the first programmable computer?", answer: "ENIAC", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop", funFact: "ENIAC weighed about 30 tons and took up 1,800 square feet." },
        { id: "tec-600-5", text: "What does 'API' stand for?", answer: "Application Programming Interface", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ SPORTS ============
  {
    id: "sports",
    name: "Sports",
    icon: "Trophy",
    difficulty: "easy",
    isNew: false,
    isPopular: true,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "spo-200-1", text: "How many players are on a standard soccer team?", answer: "11", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop" },
        { id: "spo-200-2", text: "What sport uses a puck?", answer: "Ice hockey", image: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=600&h=400&fit=crop", acceptedAnswers: ["Hockey", "Ice hockey"] },
        { id: "spo-200-3", text: "How many points is a touchdown worth in American football?", answer: "6", image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&h=400&fit=crop" },
        { id: "spo-200-4", text: "What color card is shown for a serious foul in soccer?", answer: "Red", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop" },
        { id: "spo-200-5", text: "What sport is played at Wimbledon?", answer: "Tennis", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "spo-400-1", text: "In what sport would you perform a 'slam dunk'?", answer: "Basketball", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop" },
        { id: "spo-400-2", text: "What is the highest individual score in a cricket innings?", answer: "400 (Brian Lara)", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop", acceptedAnswers: ["400"] },
        { id: "spo-400-3", text: "What country hosted the 2016 Summer Olympics?", answer: "Brazil", image: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=600&h=400&fit=crop" },
        { id: "spo-400-4", text: "Who holds the record for most Grand Slam tennis titles (men)?", answer: "Novak Djokovic", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop" },
        { id: "spo-400-5", text: "What sport is known as 'the beautiful game'?", answer: "Soccer (Football)", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop", acceptedAnswers: ["Soccer", "Football"] },
      ],
      600: [
        { id: "spo-600-1", text: "What country has won the most FIFA World Cups?", answer: "Brazil", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop", funFact: "Brazil has won 5 FIFA World Cups." },
        { id: "spo-600-2", text: "What is the only Grand Slam tennis tournament played on clay?", answer: "French Open (Roland Garros)", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop", acceptedAnswers: ["French Open", "Roland Garros"] },
        { id: "spo-600-3", text: "What boxer was known as 'The Greatest'?", answer: "Muhammad Ali", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop" },
        { id: "spo-600-4", text: "What marathon distance in miles is 42.195 kilometers?", answer: "26.2 miles", image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&h=400&fit=crop", acceptedAnswers: ["26.2", "26.2 miles"] },
        { id: "spo-600-5", text: "What is the only team sport to have been played on the Moon?", answer: "Golf (not a team sport — trick question!)", image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&h=400&fit=crop", funFact: "Alan Shepard hit two golf balls on the Moon in 1971." },
      ],
    },
  },

  // ============ MUSIC ============
  {
    id: "music",
    name: "Music",
    icon: "Music",
    difficulty: "easy",
    isNew: false,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "mus-200-1", text: "What instrument has 88 keys?", answer: "Piano", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&h=400&fit=crop" },
        { id: "mus-200-2", text: "What genre is associated with Bob Marley?", answer: "Reggae", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" },
        { id: "mus-200-3", text: "How many strings does a standard guitar have?", answer: "6", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=400&fit=crop" },
        { id: "mus-200-4", text: "What is the highest female singing voice?", answer: "Soprano", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" },
        { id: "mus-200-5", text: "What country is K-pop from?", answer: "South Korea", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "mus-400-1", text: "Which artist is known as the 'Queen of Pop'?", answer: "Madonna", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" },
        { id: "mus-400-2", text: "What band performed 'Bohemian Rhapsody'?", answer: "Queen", image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&h=400&fit=crop" },
        { id: "mus-400-3", text: "What music festival takes place in the California desert?", answer: "Coachella", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
        { id: "mus-400-4", text: "What instrument does a DJ typically use?", answer: "Turntable", image: "https://images.unsplash.com/photo-1571266028243-3716f02d1a78?w=600&h=400&fit=crop", acceptedAnswers: ["Turntable", "Turntables", "Decks"] },
        { id: "mus-400-5", text: "Who wrote the classical piece 'Für Elise'?", answer: "Beethoven", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "mus-600-1", text: "What is the longest-running #1 single in US chart history?", answer: "Old Town Road by Lil Nas X", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop", acceptedAnswers: ["Old Town Road"] },
        { id: "mus-600-2", text: "What rapper's real name is Marshall Mathers?", answer: "Eminem", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" },
        { id: "mus-600-3", text: "What is the musical term for gradually getting louder?", answer: "Crescendo", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop" },
        { id: "mus-600-4", text: "What was the name of the 'Club 27' member who was the vocalist of Nirvana?", answer: "Kurt Cobain", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" },
        { id: "mus-600-5", text: "What music genre originated in the Bronx in the 1970s?", answer: "Hip hop", image: "https://images.unsplash.com/photo-1571266028243-3716f02d1a78?w=600&h=400&fit=crop", acceptedAnswers: ["Hip hop", "Hip-hop", "Rap"] },
      ],
    },
  },

  // ============ MOVIES ============
  {
    id: "movies",
    name: "Movies",
    icon: "Film",
    difficulty: "easy",
    isNew: true,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "mov-200-1", text: "What film won Best Picture at the 2020 Oscars?", answer: "Parasite", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
        { id: "mov-200-2", text: "What wizard school does Harry Potter attend?", answer: "Hogwarts", image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=600&h=400&fit=crop" },
        { id: "mov-200-3", text: "Who plays Iron Man in the MCU?", answer: "Robert Downey Jr.", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
        { id: "mov-200-4", text: "What animated movie features a clownfish named Nemo?", answer: "Finding Nemo", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop" },
        { id: "mov-200-5", text: "What movie franchise features a character named 'Neo'?", answer: "The Matrix", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "mov-400-1", text: "Who played the Joker in 'The Dark Knight'?", answer: "Heath Ledger", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&h=400&fit=crop" },
        { id: "mov-400-2", text: "What 1994 film tells the story of a man on a park bench?", answer: "Forrest Gump", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
        { id: "mov-400-3", text: "What director is known for 'Pulp Fiction' and 'Kill Bill'?", answer: "Quentin Tarantino", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
        { id: "mov-400-4", text: "What animated studio made 'Spirited Away'?", answer: "Studio Ghibli", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop" },
        { id: "mov-400-5", text: "What actor plays Jack Sparrow?", answer: "Johnny Depp", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "mov-600-1", text: "What is the highest-grossing film of all time (unadjusted)?", answer: "Avatar", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
        { id: "mov-600-2", text: "What Stanley Kubrick film features the HAL 9000 computer?", answer: "2001: A Space Odyssey", image: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=600&h=400&fit=crop" },
        { id: "mov-600-3", text: "What is the name of the fictional metal in the Marvel universe?", answer: "Vibranium", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
        { id: "mov-600-4", text: "Who directed 'Schindler's List'?", answer: "Steven Spielberg", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
        { id: "mov-600-5", text: "What 1999 film has the famous line 'I see dead people'?", answer: "The Sixth Sense", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ FOOD & DRINK ============
  {
    id: "food-drink",
    name: "Food & Drink",
    icon: "UtensilsCrossed",
    difficulty: "easy",
    isNew: true,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "foo-200-1", text: "What country is sushi originally from?", answer: "Japan", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop" },
        { id: "foo-200-2", text: "What fruit is used to make wine?", answer: "Grapes", image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&h=400&fit=crop" },
        { id: "foo-200-3", text: "What Italian dish is made of dough, sauce, and cheese?", answer: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop" },
        { id: "foo-200-4", text: "What spice gives curry its yellow color?", answer: "Turmeric", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop" },
        { id: "foo-200-5", text: "What bean is chocolate made from?", answer: "Cacao bean", image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&h=400&fit=crop", acceptedAnswers: ["Cacao", "Cocoa"] },
      ],
      400: [
        { id: "foo-400-1", text: "What grain is used to make traditional Italian risotto?", answer: "Arborio rice", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop", acceptedAnswers: ["Rice", "Arborio"] },
        { id: "foo-400-2", text: "What country does the cocktail 'Mojito' originate from?", answer: "Cuba", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop" },
        { id: "foo-400-3", text: "What is the main ingredient in guacamole?", answer: "Avocado", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=400&fit=crop" },
        { id: "foo-400-4", text: "What Japanese drink is made from fermented rice?", answer: "Sake", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop" },
        { id: "foo-400-5", text: "What pastry is a croissant?", answer: "Viennoiserie (puff pastry)", image: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=600&h=400&fit=crop", acceptedAnswers: ["Puff pastry", "Viennoiserie", "Laminated dough"] },
      ],
      600: [
        { id: "foo-600-1", text: "What is the Scoville scale used to measure?", answer: "Spiciness of peppers", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop", acceptedAnswers: ["Spiciness", "Heat of peppers", "Spicy heat"] },
        { id: "foo-600-2", text: "What bacteria is responsible for turning milk into yogurt?", answer: "Lactobacillus", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop" },
        { id: "foo-600-3", text: "What French cooking term means 'everything in its place'?", answer: "Mise en place", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" },
        { id: "foo-600-4", text: "What is the world's most expensive spice by weight?", answer: "Saffron", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop" },
        { id: "foo-600-5", text: "What is umami?", answer: "The fifth basic taste (savory)", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop", acceptedAnswers: ["Fifth taste", "Savory taste"] },
      ],
    },
  },

  // ============ ART ============
  {
    id: "art",
    name: "Art",
    icon: "Palette",
    difficulty: "hard",
    isNew: false,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "art-200-1", text: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci", image: "https://images.unsplash.com/photo-1423742774270-6884aac775fa?w=600&h=400&fit=crop" },
        { id: "art-200-2", text: "What famous painting shows a starry night sky over a village?", answer: "The Starry Night", image: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=600&h=400&fit=crop" },
        { id: "art-200-3", text: "What primary colors are mixed to make green?", answer: "Blue and yellow", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop" },
        { id: "art-200-4", text: "What is a sculpture made from clay called before it's fired?", answer: "Greenware", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop" },
        { id: "art-200-5", text: "What country is the Louvre museum in?", answer: "France", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "art-400-1", text: "What art movement is Salvador Dalí associated with?", answer: "Surrealism", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=400&fit=crop" },
        { id: "art-400-2", text: "Who painted 'The Persistence of Memory' with melting clocks?", answer: "Salvador Dalí", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=400&fit=crop" },
        { id: "art-400-3", text: "What technique uses small dots to create an image?", answer: "Pointillism", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop" },
        { id: "art-400-4", text: "Who is famous for painting Campbell's Soup cans?", answer: "Andy Warhol", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=400&fit=crop" },
        { id: "art-400-5", text: "What Japanese art form involves folding paper?", answer: "Origami", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "art-600-1", text: "What museum houses Vermeer's 'Girl with a Pearl Earring'?", answer: "Mauritshuis", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=400&fit=crop" },
        { id: "art-600-2", text: "What art movement was a reaction against traditional artistic values, emerging during WWI?", answer: "Dadaism", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=400&fit=crop", acceptedAnswers: ["Dada", "Dadaism"] },
        { id: "art-600-3", text: "Who created the sculpture 'The Thinker'?", answer: "Auguste Rodin", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop", acceptedAnswers: ["Rodin"] },
        { id: "art-600-4", text: "What Renaissance technique creates the illusion of depth on a flat surface?", answer: "Linear perspective", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop", acceptedAnswers: ["Perspective", "Linear perspective"] },
        { id: "art-600-5", text: "What painter cut off part of his own ear?", answer: "Vincent van Gogh", image: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=600&h=400&fit=crop", acceptedAnswers: ["Van Gogh"] },
      ],
    },
  },

  // ============ SPACE ============
  {
    id: "space",
    name: "Space",
    icon: "Rocket",
    difficulty: "medium",
    isNew: true,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "spa-200-1", text: "What is the closest star to Earth?", answer: "The Sun", image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=600&h=400&fit=crop" },
        { id: "spa-200-2", text: "How many planets are in our solar system?", answer: "8", image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=600&h=400&fit=crop" },
        { id: "spa-200-3", text: "What is the name of Earth's natural satellite?", answer: "The Moon", image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&h=400&fit=crop" },
        { id: "spa-200-4", text: "What planet is known for its rings?", answer: "Saturn", image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=400&fit=crop" },
        { id: "spa-200-5", text: "Who was the first person in space?", answer: "Yuri Gagarin", image: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "spa-400-1", text: "How many moons does Mars have?", answer: "2", image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=400&fit=crop", funFact: "They're named Phobos and Deimos (Fear and Dread)." },
        { id: "spa-400-2", text: "What is a light-year a measure of?", answer: "Distance", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop" },
        { id: "spa-400-3", text: "What planet is closest to the Sun?", answer: "Mercury", image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=600&h=400&fit=crop" },
        { id: "spa-400-4", text: "What space agency launched the Hubble telescope?", answer: "NASA", image: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=600&h=400&fit=crop" },
        { id: "spa-400-5", text: "What dwarf planet was reclassified from a planet in 2006?", answer: "Pluto", image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "spa-600-1", text: "What is the Great Red Spot on Jupiter?", answer: "A giant storm", image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=400&fit=crop", funFact: "The storm is bigger than Earth and has been raging for over 350 years." },
        { id: "spa-600-2", text: "What is the name of the boundary where our solar system ends?", answer: "Heliopause", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop" },
        { id: "spa-600-3", text: "What phenomenon occurs when a massive star collapses in on itself?", answer: "Black hole", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop", acceptedAnswers: ["Black hole", "Supernova then black hole"] },
        { id: "spa-600-4", text: "What is cosmic microwave background radiation?", answer: "Residual heat from the Big Bang", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop", acceptedAnswers: ["Leftover radiation from the Big Bang", "CMB"] },
        { id: "spa-600-5", text: "What is the Roche limit?", answer: "The distance within which a moon would be torn apart by tidal forces", image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ ANIMALS ============
  {
    id: "animals",
    name: "Animals",
    icon: "Bug",
    difficulty: "easy",
    isNew: false,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "ani-200-1", text: "What is the fastest land animal?", answer: "Cheetah", image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&h=400&fit=crop" },
        { id: "ani-200-2", text: "What is the largest animal on Earth?", answer: "Blue whale", image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&h=400&fit=crop" },
        { id: "ani-200-3", text: "What animal is known as 'man's best friend'?", answer: "Dog", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop" },
        { id: "ani-200-4", text: "How many legs does a spider have?", answer: "8", image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&h=400&fit=crop" },
        { id: "ani-200-5", text: "What animal has black and white stripes?", answer: "Zebra", image: "https://images.unsplash.com/photo-1526095179574-86e545346ae6?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "ani-400-1", text: "How many hearts does an octopus have?", answer: "3", image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=600&h=400&fit=crop" },
        { id: "ani-400-2", text: "What is a group of lions called?", answer: "A pride", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=400&fit=crop", acceptedAnswers: ["Pride"] },
        { id: "ani-400-3", text: "What bird can fly backwards?", answer: "Hummingbird", image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&h=400&fit=crop" },
        { id: "ani-400-4", text: "What is the only continent where giraffes live in the wild?", answer: "Africa", image: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600&h=400&fit=crop" },
        { id: "ani-400-5", text: "What ocean animal has the most venomous sting?", answer: "Box jellyfish", image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "ani-600-1", text: "What is the only mammal capable of true flight?", answer: "Bat", image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&h=400&fit=crop" },
        { id: "ani-600-2", text: "What animal has the longest migration?", answer: "Arctic tern", image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&h=400&fit=crop", funFact: "Arctic terns migrate about 44,000 miles per year." },
        { id: "ani-600-3", text: "What is the term for an animal that eats both plants and meat?", answer: "Omnivore", image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&h=400&fit=crop" },
        { id: "ani-600-4", text: "What deep-sea fish has a bioluminescent lure on its head?", answer: "Anglerfish", image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&h=400&fit=crop" },
        { id: "ani-600-5", text: "What is the only animal that can't jump?", answer: "Elephant", image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ MATHEMATICS ============
  {
    id: "math",
    name: "Mathematics",
    icon: "Calculator",
    difficulty: "hard",
    isNew: false,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "mat-200-1", text: "What is the value of Pi to two decimal places?", answer: "3.14", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-200-2", text: "What is 7 × 8?", answer: "56", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-200-3", text: "How many sides does a hexagon have?", answer: "6", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-200-4", text: "What is the square root of 144?", answer: "12", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-200-5", text: "What is 15% of 200?", answer: "30", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "mat-400-1", text: "What is the only even prime number?", answer: "2", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-400-2", text: "What is the Fibonacci sequence starting numbers?", answer: "0, 1, 1, 2, 3, 5, 8...", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-400-3", text: "What does the 'i' represent in complex numbers?", answer: "The square root of -1", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-400-4", text: "What is the formula for the area of a circle?", answer: "πr²", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-400-5", text: "What theorem states a² + b² = c² in right triangles?", answer: "Pythagorean theorem", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop", acceptedAnswers: ["Pythagoras", "Pythagorean theorem"] },
      ],
      600: [
        { id: "mat-600-1", text: "What mathematician proved Fermat's Last Theorem?", answer: "Andrew Wiles", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-600-2", text: "What is Euler's identity equation?", answer: "e^(iπ) + 1 = 0", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop", funFact: "It's often called the most beautiful equation in mathematics." },
        { id: "mat-600-3", text: "What branch of mathematics deals with rates of change?", answer: "Calculus", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-600-4", text: "What is a number that can only be divided by 1 and itself?", answer: "Prime number", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop" },
        { id: "mat-600-5", text: "What does 'googol' refer to in mathematics?", answer: "10^100 (1 followed by 100 zeros)", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop", acceptedAnswers: ["10 to the power of 100"] },
      ],
    },
  },

  // ============ VIDEO GAMES ============
  {
    id: "gaming",
    name: "Video Games",
    icon: "Gamepad2",
    difficulty: "easy",
    isNew: true,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "gam-200-1", text: "What plumber is Nintendo's mascot?", answer: "Mario", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
        { id: "gam-200-2", text: "What block-building game was created by Mojang?", answer: "Minecraft", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
        { id: "gam-200-3", text: "What game has players drop from a Battle Bus?", answer: "Fortnite", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
        { id: "gam-200-4", text: "What color is Pac-Man?", answer: "Yellow", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
        { id: "gam-200-5", text: "What is the name of Link's princess in The Legend of Zelda?", answer: "Zelda", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "gam-400-1", text: "What game features the phrase 'The cake is a lie'?", answer: "Portal", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
        { id: "gam-400-2", text: "What FPS franchise includes 'Modern Warfare'?", answer: "Call of Duty", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
        { id: "gam-400-3", text: "What RPG features the character 'Geralt of Rivia'?", answer: "The Witcher", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
        { id: "gam-400-4", text: "What console did Sony release in 2020?", answer: "PlayStation 5", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop", acceptedAnswers: ["PS5", "PlayStation 5"] },
        { id: "gam-400-5", text: "What game has you surviving against Creepers?", answer: "Minecraft", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "gam-600-1", text: "What is the best-selling video game of all time?", answer: "Minecraft", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop", funFact: "Minecraft has sold over 300 million copies worldwide." },
        { id: "gam-600-2", text: "What FromSoftware game won Game of the Year 2022?", answer: "Elden Ring", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
        { id: "gam-600-3", text: "What game was the first to popularize battle royale?", answer: "PlayerUnknown's Battlegrounds (PUBG)", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop", acceptedAnswers: ["PUBG", "PlayerUnknown's Battlegrounds"] },
        { id: "gam-600-4", text: "What is the name of the AI companion in Halo?", answer: "Cortana", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
        { id: "gam-600-5", text: "What indie game features a character named 'The Knight' in Hallownest?", answer: "Hollow Knight", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ MYTHOLOGY ============
  {
    id: "mythology",
    name: "Mythology",
    icon: "Swords",
    difficulty: "hard",
    isNew: false,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1608376630927-313b8a6e5b5c?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "myt-200-1", text: "Who is the Greek god of the sea?", answer: "Poseidon", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop" },
        { id: "myt-200-2", text: "What Norse god wields a hammer called Mjolnir?", answer: "Thor", image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&h=400&fit=crop" },
        { id: "myt-200-3", text: "Who is the Greek goddess of wisdom?", answer: "Athena", image: "https://images.unsplash.com/photo-1608376630927-313b8a6e5b5c?w=600&h=400&fit=crop" },
        { id: "myt-200-4", text: "What creature has the head of a bull and body of a man?", answer: "Minotaur", image: "https://images.unsplash.com/photo-1608376630927-313b8a6e5b5c?w=600&h=400&fit=crop" },
        { id: "myt-200-5", text: "What is the name of the Greek underworld?", answer: "Hades", image: "https://images.unsplash.com/photo-1608376630927-313b8a6e5b5c?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "myt-400-1", text: "What creature has the body of a lion and head of a human?", answer: "Sphinx", image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&h=400&fit=crop" },
        { id: "myt-400-2", text: "Who stole fire from the gods and gave it to humans?", answer: "Prometheus", image: "https://images.unsplash.com/photo-1608376630927-313b8a6e5b5c?w=600&h=400&fit=crop" },
        { id: "myt-400-3", text: "What is the food of the Greek gods?", answer: "Ambrosia", image: "https://images.unsplash.com/photo-1608376630927-313b8a6e5b5c?w=600&h=400&fit=crop" },
        { id: "myt-400-4", text: "Who is the Norse god of mischief?", answer: "Loki", image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&h=400&fit=crop" },
        { id: "myt-400-5", text: "What hero killed Medusa?", answer: "Perseus", image: "https://images.unsplash.com/photo-1608376630927-313b8a6e5b5c?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "myt-600-1", text: "In Norse mythology, what is Ragnarök?", answer: "The end of the world / final battle of the gods", image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&h=400&fit=crop", acceptedAnswers: ["End of the world", "Twilight of the gods"] },
        { id: "myt-600-2", text: "What river must the dead cross to reach the Greek underworld?", answer: "River Styx", image: "https://images.unsplash.com/photo-1608376630927-313b8a6e5b5c?w=600&h=400&fit=crop", acceptedAnswers: ["Styx"] },
        { id: "myt-600-3", text: "What is the world tree in Norse mythology?", answer: "Yggdrasil", image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&h=400&fit=crop" },
        { id: "myt-600-4", text: "What Egyptian god has the head of a jackal?", answer: "Anubis", image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&h=400&fit=crop" },
        { id: "myt-600-5", text: "What Greek hero had to complete 12 labors?", answer: "Heracles (Hercules)", image: "https://images.unsplash.com/photo-1608376630927-313b8a6e5b5c?w=600&h=400&fit=crop", acceptedAnswers: ["Heracles", "Hercules"] },
      ],
    },
  },

  // ============ BUSINESS ============
  {
    id: "business",
    name: "Business",
    icon: "Briefcase",
    difficulty: "medium",
    isNew: false,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "bus-200-1", text: "What does CEO stand for?", answer: "Chief Executive Officer", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop" },
        { id: "bus-200-2", text: "What is the currency used in Japan?", answer: "Yen", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop" },
        { id: "bus-200-3", text: "What does 'IPO' stand for?", answer: "Initial Public Offering", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
        { id: "bus-200-4", text: "What company is the world's largest e-commerce platform?", answer: "Amazon", image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=600&h=400&fit=crop" },
        { id: "bus-200-5", text: "What is the stock market indicator for the top 500 US companies?", answer: "S&P 500", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "bus-400-1", text: "What company has the ticker symbol AAPL?", answer: "Apple", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
        { id: "bus-400-2", text: "Who founded Amazon?", answer: "Jeff Bezos", image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=600&h=400&fit=crop" },
        { id: "bus-400-3", text: "What business model charges a recurring fee for access?", answer: "Subscription model", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop" },
        { id: "bus-400-4", text: "What is the term for a company valued at over $1 billion?", answer: "Unicorn", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
        { id: "bus-400-5", text: "What social media company went public in 2012?", answer: "Facebook", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "bus-600-1", text: "What economic term describes two consecutive quarters of negative GDP growth?", answer: "Recession", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
        { id: "bus-600-2", text: "What is the 'invisible hand' concept by Adam Smith?", answer: "Self-regulating nature of the marketplace", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop" },
        { id: "bus-600-3", text: "What does 'EBITDA' stand for?", answer: "Earnings Before Interest, Taxes, Depreciation, and Amortization", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
        { id: "bus-600-4", text: "What Japanese management philosophy focuses on continuous improvement?", answer: "Kaizen", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop" },
        { id: "bus-600-5", text: "What company was the first to reach a $3 trillion market cap?", answer: "Apple", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ LANGUAGES ============
  {
    id: "languages",
    name: "Languages",
    icon: "Languages",
    difficulty: "medium",
    isNew: true,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "lan-200-1", text: "What is the most spoken language in the world by native speakers?", answer: "Mandarin Chinese", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop" },
        { id: "lan-200-2", text: "What language is 'Bonjour' from?", answer: "French", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop" },
        { id: "lan-200-3", text: "What language do people speak in Brazil?", answer: "Portuguese", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop" },
        { id: "lan-200-4", text: "How many letters are in the English alphabet?", answer: "26", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop" },
        { id: "lan-200-5", text: "What script is used to write Japanese?", answer: "Hiragana, Katakana, and Kanji", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "lan-400-1", text: "What language is 'Danke' a word from?", answer: "German", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop" },
        { id: "lan-400-2", text: "What is the most widely spoken language in the world (including second language speakers)?", answer: "English", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop" },
        { id: "lan-400-3", text: "What dead language was used by ancient Romans?", answer: "Latin", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop" },
        { id: "lan-400-4", text: "What language family does Spanish belong to?", answer: "Romance languages", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop" },
        { id: "lan-400-5", text: "What is the official language of Egypt?", answer: "Arabic", image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "lan-600-1", text: "What constructed language was created by L.L. Zamenhof in 1887?", answer: "Esperanto", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop" },
        { id: "lan-600-2", text: "What is the study of the origin of words called?", answer: "Etymology", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop" },
        { id: "lan-600-3", text: "What language isolate is spoken in the Basque Country?", answer: "Basque (Euskara)", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop", acceptedAnswers: ["Basque", "Euskara"] },
        { id: "lan-600-4", text: "What writing system reads right to left?", answer: "Arabic (and Hebrew)", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop", acceptedAnswers: ["Arabic", "Hebrew"] },
        { id: "lan-600-5", text: "How many tones does Mandarin Chinese have?", answer: "4 (plus a neutral tone)", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop", acceptedAnswers: ["4", "5"] },
      ],
    },
  },

  // ============ LITERATURE ============
  {
    id: "literature",
    name: "Literature",
    icon: "BookOpen",
    difficulty: "hard",
    isNew: false,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "lit-200-1", text: "Who wrote '1984'?", answer: "George Orwell", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
        { id: "lit-200-2", text: "What Shakespeare play features star-crossed lovers?", answer: "Romeo and Juliet", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
        { id: "lit-200-3", text: "Who wrote the Harry Potter series?", answer: "J.K. Rowling", image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=600&h=400&fit=crop" },
        { id: "lit-200-4", text: "What book begins with 'It was the best of times, it was the worst of times'?", answer: "A Tale of Two Cities", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
        { id: "lit-200-5", text: "Who wrote 'The Great Gatsby'?", answer: "F. Scott Fitzgerald", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "lit-400-1", text: "What novel begins with 'Call me Ishmael'?", answer: "Moby-Dick", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
        { id: "lit-400-2", text: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
        { id: "lit-400-3", text: "What dystopian novel features the 'Ministry of Truth'?", answer: "1984", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
        { id: "lit-400-4", text: "Who is the author of 'The Lord of the Rings'?", answer: "J.R.R. Tolkien", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
        { id: "lit-400-5", text: "What Charles Dickens novel features the character Ebenezer Scrooge?", answer: "A Christmas Carol", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "lit-600-1", text: "Which author created the fictional county of Yoknapatawpha?", answer: "William Faulkner", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
        { id: "lit-600-2", text: "What is the longest novel ever written?", answer: "In Search of Lost Time by Marcel Proust", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop", acceptedAnswers: ["In Search of Lost Time", "À la recherche du temps perdu"] },
        { id: "lit-600-3", text: "Who wrote 'One Hundred Years of Solitude'?", answer: "Gabriel García Márquez", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
        { id: "lit-600-4", text: "What literary device uses exaggeration for emphasis?", answer: "Hyperbole", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop" },
        { id: "lit-600-5", text: "What 20th-century novel features a character named Gregor Samsa who turns into an insect?", answer: "The Metamorphosis by Franz Kafka", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop", acceptedAnswers: ["The Metamorphosis"] },
      ],
    },
  },

  // ============ TV SHOWS ============
  {
    id: "tv-shows",
    name: "TV Shows",
    icon: "Monitor",
    difficulty: "easy",
    isNew: true,
    isPopular: true,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "tv-200-1", text: "What show follows six friends living in New York City?", answer: "Friends", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
        { id: "tv-200-2", text: "What animated show is set in Springfield?", answer: "The Simpsons", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop" },
        { id: "tv-200-3", text: "What show features a chemistry teacher turned drug lord?", answer: "Breaking Bad", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
        { id: "tv-200-4", text: "What office comedy is set at Dunder Mifflin?", answer: "The Office", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
        { id: "tv-200-5", text: "What Netflix series is set in the 1980s with supernatural events?", answer: "Stranger Things", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "tv-400-1", text: "What HBO show is known for dragons and the Iron Throne?", answer: "Game of Thrones", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop" },
        { id: "tv-400-2", text: "What show features a time-looping detective named Rust Cohle?", answer: "True Detective", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
        { id: "tv-400-3", text: "What animated show for adults is set in Bikini Bottom?", answer: "SpongeBob SquarePants", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop" },
        { id: "tv-400-4", text: "What Korean survival drama became Netflix's most-watched show?", answer: "Squid Game", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
        { id: "tv-400-5", text: "What sitcom features characters Sheldon, Leonard, and Penny?", answer: "The Big Bang Theory", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "tv-600-1", text: "What show's final episode was the most-watched in US TV history?", answer: "M*A*S*H", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
        { id: "tv-600-2", text: "What showrunner created 'Lost' and 'Watchmen'?", answer: "Damon Lindelof", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
        { id: "tv-600-3", text: "What is the longest-running primetime scripted TV show in the US?", answer: "The Simpsons", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop" },
        { id: "tv-600-4", text: "What anthology series created by Ryan Murphy focuses on true crime stories?", answer: "American Crime Story", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
        { id: "tv-600-5", text: "What show features the Targaryen civil war known as the 'Dance of the Dragons'?", answer: "House of the Dragon", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ TRAVEL ============
  {
    id: "travel",
    name: "Travel",
    icon: "Plane",
    difficulty: "easy",
    isNew: false,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "tra-200-1", text: "What is the most visited city in the world?", answer: "Bangkok", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=400&fit=crop" },
        { id: "tra-200-2", text: "What famous landmark is in Paris?", answer: "Eiffel Tower", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop" },
        { id: "tra-200-3", text: "What country is home to the Great Wall?", answer: "China", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop" },
        { id: "tra-200-4", text: "What island nation is known for its beaches and coral reefs?", answer: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop" },
        { id: "tra-200-5", text: "What US city is known as 'Sin City'?", answer: "Las Vegas", image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "tra-400-1", text: "What ancient wonder is located in Giza, Egypt?", answer: "The Great Pyramid", image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&h=400&fit=crop" },
        { id: "tra-400-2", text: "What country is home to Angkor Wat?", answer: "Cambodia", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=400&fit=crop" },
        { id: "tra-400-3", text: "What European city is known as the 'City of Canals'?", answer: "Venice", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop" },
        { id: "tra-400-4", text: "What country is home to the Taj Mahal?", answer: "India", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop" },
        { id: "tra-400-5", text: "What is the busiest airport in the world by passenger traffic?", answer: "Hartsfield-Jackson Atlanta", image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop", acceptedAnswers: ["Atlanta", "Hartsfield-Jackson"] },
      ],
      600: [
        { id: "tra-600-1", text: "What country has the most UNESCO World Heritage Sites?", answer: "Italy", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop" },
        { id: "tra-600-2", text: "What is the longest commercial flight route in the world?", answer: "Singapore to New York (Newark)", image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop" },
        { id: "tra-600-3", text: "What remote island is home to giant stone statues called Moai?", answer: "Easter Island (Rapa Nui)", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop", acceptedAnswers: ["Easter Island", "Rapa Nui"] },
        { id: "tra-600-4", text: "What African country is home to the Serengeti?", answer: "Tanzania", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop" },
        { id: "tra-600-5", text: "What is the deepest lake in the world?", answer: "Lake Baikal", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop", funFact: "Lake Baikal in Russia holds about 20% of the world's unfrozen freshwater." },
      ],
    },
  },

  // ============ FASHION ============
  {
    id: "fashion",
    name: "Fashion",
    icon: "Shirt",
    difficulty: "medium",
    isNew: false,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "fas-200-1", text: "What Italian brand is known for its interlocking 'G' logo?", answer: "Gucci", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
        { id: "fas-200-2", text: "What color is traditionally worn by brides in Western weddings?", answer: "White", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
        { id: "fas-200-3", text: "What type of fabric is denim?", answer: "Cotton twill", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", acceptedAnswers: ["Cotton", "Cotton twill"] },
        { id: "fas-200-4", text: "What shoe brand has a swoosh logo?", answer: "Nike", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop" },
        { id: "fas-200-5", text: "What French fashion house is known for Chanel No. 5?", answer: "Chanel", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "fas-400-1", text: "What designer is known as the 'King of Fashion'?", answer: "Karl Lagerfeld", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
        { id: "fas-400-2", text: "What fashion week is considered the most prestigious?", answer: "Paris Fashion Week", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop" },
        { id: "fas-400-3", text: "What luxury brand has a monogram with 'LV'?", answer: "Louis Vuitton", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
        { id: "fas-400-4", text: "What fabric is produced by silkworms?", answer: "Silk", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
        { id: "fas-400-5", text: "What Swedish fast-fashion brand has stores worldwide?", answer: "H&M", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "fas-600-1", text: "What fashion magazine is known as 'the Bible of fashion'?", answer: "Vogue", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
        { id: "fas-600-2", text: "What Japanese designer is known for avant-garde fashion with irregular shapes?", answer: "Rei Kawakubo (Comme des Garçons)", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", acceptedAnswers: ["Rei Kawakubo", "Comme des Garcons"] },
        { id: "fas-600-3", text: "What is the term for a fashion collection shown between main seasons?", answer: "Resort (or Cruise) collection", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", acceptedAnswers: ["Resort", "Cruise"] },
        { id: "fas-600-4", text: "What supermodel was the first to earn $10 million a year?", answer: "Claudia Schiffer", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
        { id: "fas-600-5", text: "What material is cashmere made from?", answer: "Cashmere goat hair", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", acceptedAnswers: ["Goat hair", "Goat wool"] },
      ],
    },
  },

  // ============ MEMES & INTERNET ============
  {
    id: "memes",
    name: "Memes & Internet",
    icon: "Laugh",
    difficulty: "easy",
    isNew: true,
    isPopular: true,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "mem-200-1", text: "What does 'LOL' stand for?", answer: "Laugh Out Loud", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
        { id: "mem-200-2", text: "What video platform is known for short-form vertical videos?", answer: "TikTok", image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop" },
        { id: "mem-200-3", text: "What is a GIF?", answer: "A short, looping animated image", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
        { id: "mem-200-4", text: "What social media app features disappearing stories?", answer: "Snapchat", image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop" },
        { id: "mem-200-5", text: "What does the internet slang 'FOMO' mean?", answer: "Fear of Missing Out", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "mem-400-1", text: "What meme features a distracted boyfriend looking at another woman?", answer: "Distracted Boyfriend", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
        { id: "mem-400-2", text: "What early internet dance was associated with the song 'Gangnam Style'?", answer: "The horse-riding dance", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
        { id: "mem-400-3", text: "What 2010 meme features a poorly drawn face expressing rage?", answer: "Rage Comics", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
        { id: "mem-400-4", text: "What cryptocurrency started as a meme featuring a Shiba Inu?", answer: "Dogecoin", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop" },
        { id: "mem-400-5", text: "What does 'AMA' stand for on Reddit?", answer: "Ask Me Anything", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "mem-600-1", text: "What viral internet challenge involved dumping ice water on your head?", answer: "ALS Ice Bucket Challenge", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop", acceptedAnswers: ["Ice Bucket Challenge"] },
        { id: "mem-600-2", text: "What year was Reddit founded?", answer: "2005", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
        { id: "mem-600-3", text: "What was the first video uploaded to YouTube?", answer: "Me at the zoo", image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop" },
        { id: "mem-600-4", text: "What internet-born word describes embarrassing secondhand cringe?", answer: "Cringe", image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&h=400&fit=crop" },
        { id: "mem-600-5", text: "What 2021 event saw Reddit users drive up the stock price of GameStop?", answer: "GameStop short squeeze", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ PSYCHOLOGY ============
  {
    id: "psychology",
    name: "Psychology",
    icon: "Brain",
    difficulty: "medium",
    isNew: false,
    isPopular: false,
    isAfterDark: false,
    categoryImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "psy-200-1", text: "What is the fear of spiders called?", answer: "Arachnophobia", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
        { id: "psy-200-2", text: "What does IQ stand for?", answer: "Intelligence Quotient", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
        { id: "psy-200-3", text: "What are the 'Big Five' personality traits?", answer: "Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop", acceptedAnswers: ["OCEAN"] },
        { id: "psy-200-4", text: "What chemical in the brain is associated with happiness?", answer: "Serotonin", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
        { id: "psy-200-5", text: "What is the 'fight or flight' response?", answer: "The body's stress response to perceived danger", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "psy-400-1", text: "Who is considered the father of psychoanalysis?", answer: "Sigmund Freud", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
        { id: "psy-400-2", text: "What phenomenon describes people being less likely to help when others are present?", answer: "Bystander effect", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
        { id: "psy-400-3", text: "What is Maslow's hierarchy's top level?", answer: "Self-actualization", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
        { id: "psy-400-4", text: "What learning theory involves rewarding desired behaviors?", answer: "Operant conditioning", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
        { id: "psy-400-5", text: "What bias makes people favor information confirming their beliefs?", answer: "Confirmation bias", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "psy-600-1", text: "What famous experiment studied obedience using fake electric shocks?", answer: "Milgram experiment", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
        { id: "psy-600-2", text: "What cognitive bias describes overestimating your own abilities?", answer: "Dunning-Kruger effect", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
        { id: "psy-600-3", text: "What theory suggests cognitive dissonance causes mental discomfort?", answer: "Leon Festinger's cognitive dissonance theory", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop", acceptedAnswers: ["Cognitive dissonance"] },
        { id: "psy-600-4", text: "What is the 'Spotlight Effect'?", answer: "Overestimating how much others notice your appearance or behavior", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
        { id: "psy-600-5", text: "What Stanford experiment studied the psychology of prison roles?", answer: "Stanford prison experiment", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ AFTER DARK: SPICY TRUTHS ============
  {
    id: "spicy-truths",
    name: "Spicy Truths",
    icon: "Flame",
    difficulty: "easy",
    isNew: true,
    isPopular: false,
    isAfterDark: true,
    categoryImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "spi-200-1", text: "What dating app uses a swipe-right mechanic?", answer: "Tinder", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
        { id: "spi-200-2", text: "What is the term for sending flirty messages?", answer: "Sexting", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
        { id: "spi-200-3", text: "What cocktail is known as a 'liquid courage'?", answer: "Any alcoholic drink (common answer: whiskey/tequila shot)", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop" },
        { id: "spi-200-4", text: "What does 'Netflix and chill' actually mean?", answer: "A euphemism for a hookup", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" },
        { id: "spi-200-5", text: "What dating term means disappearing without explanation?", answer: "Ghosting", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "spi-400-1", text: "What 1990s board game asks players to reveal embarrassing truths?", answer: "Truth or Dare", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
        { id: "spi-400-2", text: "What is 'benching' in modern dating?", answer: "Keeping someone as a backup option", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
        { id: "spi-400-3", text: "What romantic comedy cliché involves running through an airport?", answer: "The grand gesture / airport chase", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop" },
        { id: "spi-400-4", text: "What is 'love bombing' in a relationship?", answer: "Overwhelming someone with excessive affection early on", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
        { id: "spi-400-5", text: "What famous dating show features a rose ceremony?", answer: "The Bachelor", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "spi-600-1", text: "What is the 'walk of shame'?", answer: "Walking home the morning after a one-night stand", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
        { id: "spi-600-2", text: "What is the Kinsey Scale?", answer: "A scale measuring sexual orientation from 0 (exclusively heterosexual) to 6 (exclusively homosexual)", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
        { id: "spi-600-3", text: "What country invented the Kama Sutra?", answer: "India", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop" },
        { id: "spi-600-4", text: "What classic party game involves spinning a bottle?", answer: "Spin the Bottle", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
        { id: "spi-600-5", text: "What is 'breadcrumbing' in dating?", answer: "Sending occasional flirty messages to keep someone interested without commitment", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ AFTER DARK: PARTY CONFESSIONS ============
  {
    id: "party-confessions",
    name: "Party Confessions",
    icon: "PartyPopper",
    difficulty: "easy",
    isNew: true,
    isPopular: false,
    isAfterDark: true,
    categoryImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "par-200-1", text: "What drinking game involves bouncing a ball into cups?", answer: "Beer Pong", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
        { id: "par-200-2", text: "What party game has players act out words without speaking?", answer: "Charades", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
        { id: "par-200-3", text: "What is the traditional drink for a toast at midnight on New Year's?", answer: "Champagne", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop" },
        { id: "par-200-4", text: "What card game is played with the phrase 'Cards Against ___'?", answer: "Humanity", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
        { id: "par-200-5", text: "What is a 'keg stand'?", answer: "Doing a handstand on a beer keg while drinking from it", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "par-400-1", text: "What drinking game involves guessing if the next card is higher or lower?", answer: "High or Low (Hi-Lo)", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop", acceptedAnswers: ["High or Low", "Hi-Lo"] },
        { id: "par-400-2", text: "What is the most famous college party movie of the 2000s?", answer: "Animal House (or Superbad)", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop", acceptedAnswers: ["Animal House", "Superbad"] },
        { id: "par-400-3", text: "What does 'BYOB' stand for?", answer: "Bring Your Own Beer/Booze", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
        { id: "par-400-4", text: "In the game 'Never Have I Ever,' what happens if you HAVE done the thing?", answer: "You drink", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
        { id: "par-400-5", text: "What is a 'hangover cure' that supposedly involves drinking more alcohol?", answer: "Hair of the dog", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop" },
      ],
      600: [
        { id: "par-600-1", text: "What is the 'Freshman Fifteen'?", answer: "Weight gain (about 15 pounds) in the first year of college", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
        { id: "par-600-2", text: "What reality show is set in a party house in New Jersey?", answer: "Jersey Shore", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
        { id: "par-600-3", text: "What is a 'body shot' at a party?", answer: "Drinking a shot off someone's body", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop" },
        { id: "par-600-4", text: "What Las Vegas rule means 'What happens here stays here'?", answer: "What happens in Vegas stays in Vegas", image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&h=400&fit=crop" },
        { id: "par-600-5", text: "What game has players flip a cup upside down after drinking?", answer: "Flip Cup", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
      ],
    },
  },

  // ============ AFTER DARK: AFTER DARK TRIVIA ============
  {
    id: "after-dark-trivia",
    name: "After Dark Trivia",
    icon: "Moon",
    difficulty: "medium",
    isNew: true,
    isPopular: false,
    isAfterDark: true,
    categoryImage: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&h=300&fit=crop",
    questions: {
      200: [
        { id: "adt-200-1", text: "What is the most common first-date activity?", answer: "Going out for dinner/drinks", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=400&fit=crop" },
        { id: "adt-200-2", text: "What is the legal drinking age in most of Europe?", answer: "18", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop" },
        { id: "adt-200-3", text: "What Las Vegas strip is famous for nightlife?", answer: "The Strip (Las Vegas Boulevard)", image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&h=400&fit=crop" },
        { id: "adt-200-4", text: "What 2009 comedy involves a bachelor party gone wrong in Vegas?", answer: "The Hangover", image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&h=400&fit=crop" },
        { id: "adt-200-5", text: "What is the traditional bachelorette party accessory that's usually pink?", answer: "Sash (or tiara/veil)", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop" },
      ],
      400: [
        { id: "adt-400-1", text: "What is a 'wingman' at a party?", answer: "A friend who helps you meet someone you're attracted to", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=400&fit=crop" },
        { id: "adt-400-2", text: "What does 'Dutch courage' refer to?", answer: "Confidence gained from drinking alcohol", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop" },
        { id: "adt-400-3", text: "What fashion item is traditionally thrown at weddings?", answer: "The bouquet (and garter)", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=400&fit=crop" },
        { id: "adt-400-4", text: "What is 'cuffing season'?", answer: "The time in fall/winter when people seek relationships to avoid being single during the cold months", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=400&fit=crop" },
        { id: "adt-400-5", text: "What French word means a discreet love affair?", answer: "Liaison", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=400&fit=crop", acceptedAnswers: ["Liaison", "Affaire"] },
      ],
      600: [
        { id: "adt-600-1", text: "What is 'the ick' in modern dating?", answer: "A sudden feeling of disgust or turn-off toward someone you were dating", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=400&fit=crop" },
        { id: "adt-600-2", text: "What ancient Roman festival was known for its wild partying?", answer: "Bacchanalia (or Saturnalia)", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop", acceptedAnswers: ["Bacchanalia", "Saturnalia"] },
        { id: "adt-600-3", text: "What cocktail is traditionally made with tequila, lime, and salt?", answer: "Margarita", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop" },
        { id: "adt-600-4", text: "What psychological phenomenon makes someone more attractive when they're surrounded by friends?", answer: "The cheerleader effect", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=400&fit=crop" },
        { id: "adt-600-5", text: "What does 'situationship' mean?", answer: "A romantic relationship that's undefined or lacking commitment", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=400&fit=crop" },
      ],
    },
  },
];
