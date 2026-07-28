const db = require('./db');

const petData = [
  {
    id: "KND-2026-001", name: "Oliver", species: "Dog", breed: "Golden Retriever", age: "2 years", ageGroup: "Young",
    gender: "Male", location: "San Francisco, CA", status: "Available",
    description: "Oliver is the quintessential golden boy. Joyous, incredibly affectionate, and always looking to please.",
    fee: "$250", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1000",
    gallery: ["https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600"],
    weight: "68 lbs", color: "Honey Golden", vaccinated: true, sterilized: true,
    medicalStatus: "Fully healthy, current on all boosters.",
    temperament: "Eager, social, calm indoors, energetic outdoors",
    favoriteFood: "Dehydrated beef liver & sweet potato", favoriteToy: "Chuckit! Ultra Ball",
    likes: ["Swimming in open water", "Belly scratches"], dislikes: ["High-velocity hair dryers"],
    energyLevel: "High", trainingLevel: "Advanced", availableSince: "2026-05-12",
    shelterName: "Bay Area Paws Sanctuary",
    rescueStory: "Oliver was pulled from an overcrowded rural municipal facility. He has flourished beautifully in our foster network.",
    routine: "7:00 AM - Morning walk and breakfast. 12:00 PM - Yard play session. 6:00 PM - Dinner followed by long structural walk."
  },
  {
    id: "KND-2026-002", name: "Cleo", species: "Cat", breed: "Persian Cat", age: "4 years", ageGroup: "Adult",
    gender: "Female", location: "Los Angeles, CA", status: "Available",
    description: "Cleo is regal, tranquil, and demands premium-tier window perches. She is a true conversationalist.",
    fee: "$150", image: "https://images.unsplash.com/photo-1614035030394-b6e5b01e0737?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "9.5 lbs", color: "Pure White", vaccinated: true, sterilized: true,
    medicalStatus: "Requires daily face grooming due to brachycephalic features.",
    temperament: "Independent, serene, quietly affectionate",
    favoriteFood: "Salmon pate with bonito flakes", favoriteToy: "Catit laser pointer mouse",
    likes: ["Sunbeam sleeping", "Soft brushings"], dislikes: ["Sudden loud auditory drops"],
    energyLevel: "Low", trainingLevel: "Basic", availableSince: "2026-06-01",
    shelterName: "Angels and Felines Rescue",
    rescueStory: "Rescued from an abandoned home. She has completely regained her spectacular silky coat and trusting nature.",
    routine: "6:30 AM - Wet food breakfast. 8:00 AM - Grooming ritual. 10:00 AM to 4:00 PM - Intermittent napping schedule."
  },
  {
    id: "KND-2026-003", name: "Milo", species: "Dog", breed: "Indie Dog", age: "1 year", ageGroup: "Young",
    gender: "Male", location: "San Francisco, CA", status: "Reserved",
    description: "Super intelligent, hyper-alert, and incredibly resilient. Milo learns commands in minutes.",
    fee: "$200", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "44 lbs", color: "Tan & White Accents", vaccinated: true, sterilized: true,
    medicalStatus: "Completely healthy. Highly robust immune metrics.",
    temperament: "Playful, highly loyal, excellent watch watchdog potential",
    favoriteFood: "Chicken broth over raw high-protein kibble", favoriteToy: "KONG Extreme rubber tire",
    likes: ["Agility tasks", "Learning abstract tricks"], dislikes: ["Leash tugging"],
    energyLevel: "Very High", trainingLevel: "Intermediate", availableSince: "2026-06-19",
    shelterName: "Bay Area Paws Sanctuary",
    rescueStory: "Found near an urban industrial corridor as an orphan puppy. Raised completely by socializers.",
    routine: "6:00 AM - Structured working breakfast. 9:00 AM - Intensive agility run. 6:30 PM - Dinner."
  },
  {
    id: "KND-2026-004", name: "Bumble", species: "Rabbit", breed: "Holland Lop", age: "8 months", ageGroup: "Puppy/Kitten",
    gender: "Male", location: "Seattle, WA", status: "Available",
    description: "Bumble is a cloud of pure delight. He loves executing high-energy hops when he's excited.",
    fee: "$75", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "3.1 lbs", color: "Broken Grey", vaccinated: true, sterilized: true,
    medicalStatus: "Perfect dental alignment monitored weekly.",
    temperament: "Curious, highly exploratory, chew-motivated",
    favoriteFood: "Fresh organic Timothy hay & romaine hearts", favoriteToy: "Willow twig balls",
    likes: ["Cardboard tunnels", "Forehead strokes"], dislikes: ["Sudden pickups from above"],
    energyLevel: "Medium", trainingLevel: "Basic (Litterbox trained)", availableSince: "2026-07-02",
    shelterName: "Pacific Small Animal Ally",
    rescueStory: "Surrendered due to an unexpected housing lease violation. Kept in pristine indoor environments.",
    routine: "7:00 AM - Fresh hay refill and morning greens. 5:00 PM - Pellets and behavior reward training."
  },
  {
    id: "KND-2026-005", name: "Mango", species: "Bird", breed: "Sun Conure", age: "5 years", ageGroup: "Adult",
    gender: "Female", location: "Miami, FL", status: "Available",
    description: "Vibrant, loud, incredibly intelligent. Mango loves sitting on shoulders and dancing to fast music.",
    fee: "$300", image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "120 grams", color: "Gradient Yellow-Red-Green", vaccinated: false, sterilized: false,
    medicalStatus: "Beak, feather, and nail diagnostic panel clean.",
    temperament: "Extroverted, affectionate, highly vocal",
    favoriteFood: "Sprouted seeds and fresh papaya chunks", favoriteToy: "Shredder piñatas and bell mirrors",
    likes: ["Classic rock music", "Shower misting sessions"], dislikes: ["The color neon green"],
    energyLevel: "High", trainingLevel: "Intermediate", availableSince: "2026-06-22",
    shelterName: "Avian Conservation Center",
    rescueStory: "Rescued from a multi-bird neglect intervention. She has overcome feather plucking completely due to optimized enrichment.",
    routine: "8:00 AM - Wake up, uncovered cage, fresh fruit bowl. 12:00 PM - Out of cage flight block."
  },
  {
    id: "KND-2026-006", name: "Pip", species: "Hamster", breed: "Syrian Hamster", age: "6 months", ageGroup: "Young",
    gender: "Female", location: "Seattle, WA", status: "Adopted",
    description: "An active night owl who runs miles on her wheel. Pip loves stuffing her cheeks with sweet pumpkin seeds.",
    fee: "$25", image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "140 grams", color: "Golden Cream", vaccinated: false, sterilized: false,
    medicalStatus: "Excellent condition.",
    temperament: "Gentle when handled slowly, active explorer",
    favoriteFood: "Raw sunflower seeds & broccoli florets", favoriteToy: "Niteangel Silent Runner Wheel",
    likes: ["Deep bedding to burrow", "Whimzee dog chews"], dislikes: ["Daytime disturbances"],
    energyLevel: "Medium", trainingLevel: "Basic", availableSince: "2026-07-10",
    shelterName: "Pacific Small Animal Ally",
    rescueStory: "Born inside a rescue foster home after a pregnant mother was extracted safely from a commercial warehouse store.",
    routine: "8:00 AM to 7:00 PM - Sleeping deeply in tunnels. 8:00 PM - Wakes up, wheel workouts begin."
  },
  {
    id: "KND-2026-007", name: "Luna", species: "Dog", breed: "Border Collie Mix", age: "3 years", ageGroup: "Adult",
    gender: "Female", location: "Denver, CO", status: "Available",
    description: "Hyper-focused, intense, and deeply synchronized with human body language. Needs an active outdoor lifestyle or job to do.",
    fee: "$225", image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "48 lbs", color: "Black & White Classic", vaccinated: true, sterilized: true,
    medicalStatus: "Tested clear for MDR1 mutation trait.",
    temperament: "Work-oriented, hyper-focused, incredibly sweet",
    favoriteFood: "Freeze-dried salmon treats", favoriteToy: "Frisbee Fastback",
    likes: ["Herding balls", "Learning complex sequence tasks"], dislikes: ["Boring flat walks"],
    energyLevel: "Extreme", trainingLevel: "Elite", availableSince: "2026-05-30",
    shelterName: "Mile High Border Rescue",
    rescueStory: "Picked up stray by animal control. Showed elite work potential, shifting her cleanly into sport rescue paths.",
    routine: "5:30 AM - Long run/frisbee fetch work. 12:00 PM - Sniffari scent tracking task. 6:00 PM - Dinner."
  },
  {
    id: "KND-2026-008", name: "Winston", species: "Cat", breed: "British Shorthair", age: "5 years", ageGroup: "Adult",
    gender: "Male", location: "New York, NY", status: "Available",
    description: "A total gentleman with thick cheeks and a dense plush coat. Enjoys low-key company and silent structural lounge rooms.",
    fee: "$175", image: "https://images.unsplash.com/photo-1574158622643-69d34d72650a?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "14 lbs", color: "Classic Blue Grey", vaccinated: true, sterilized: true,
    medicalStatus: "Slight history of crystals; requires structured urinary SO prescription food matrix.",
    temperament: "Stately, non-plused, comfortable being completely alone",
    favoriteFood: "Royal Canin Urinary SO wet gravy", favoriteToy: "Catnip-filled canvas kicker fish",
    likes: ["Sitting next to you", "Quiet jazz records"], dislikes: ["High-frequency operational vacuums"],
    energyLevel: "Low", trainingLevel: "Basic", availableSince: "2026-06-15",
    shelterName: "Metro Big Apple Alliance",
    rescueStory: "Owner checked into long term care and requested a premium foster setup to find Winston a calm apartment home.",
    routine: "7:30 AM - Prescription breakfast. 11:00 AM to 5:00 PM - Deep luxury cushion nap. 6:00 PM - Dinner."
  },
  {
    id: "KND-2026-009", name: "Bella", species: "Dog", breed: "French Bulldog", age: "6 years", ageGroup: "Mature",
    gender: "Female", location: "Miami, FL", status: "Available",
    description: "A comical, snorting little potato who wants nothing more than a soft duvet and constant eye contact.",
    fee: "$350", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "21 lbs", color: "Fawn with Black Mask", vaccinated: true, sterilized: true,
    medicalStatus: "Nares opened surgically to improve airway efficiency. Excessively healthy now.",
    temperament: "Affectionate, stubborn, highly entertaining clown",
    favoriteFood: "Gently cooked turkey and green beans", favoriteToy: "Plush squeaker donuts",
    likes: ["Sleeping under heavy blanketing", "Short walks to coffee spots"], dislikes: ["Ambient heat spikes over 80 degrees"],
    energyLevel: "Low to Medium", trainingLevel: "Intermediate", availableSince: "2026-07-01",
    shelterName: "Sunshine State Brachy Sanctuary",
    rescueStory: "Surrendered from a downsized environment. Bella has adjusted smoothly to domestic interior layouts.",
    routine: "8:00 AM - Breakfast. 8:30 AM - Short relief walk. 7:00 PM - Couch cuddle marathons."
  },
  {
    id: "KND-2026-010", name: "Felix", species: "Cat", breed: "Tuxedo Cat", age: "2 years", ageGroup: "Young",
    gender: "Male", location: "New York, NY", status: "Available",
    description: "Felix behaves like he's wearing a literal custom suit. Incredibly playful, active, and highly extroverted.",
    fee: "$100", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "11 lbs", color: "Jet Black and Crisp White", vaccinated: true, sterilized: true,
    medicalStatus: "FIV/FeLV negative. Teeth are perfectly white.",
    temperament: "Hyper-playful, mischievous, highly expressive",
    favoriteFood: "Freeze-dried minnows and duck shreds", favoriteToy: "Da Bird feather wand attachment",
    likes: ["Playing fetch with bands", "Sitting on keyboards mid-call"], dislikes: ["Closed room doors anywhere"],
    energyLevel: "High", trainingLevel: "Intermediate", availableSince: "2026-07-08",
    shelterName: "Metro Big Apple Alliance",
    rescueStory: "Rescued out of an empty commercial storage locker building. Handled constantly, turning him into an elite social cat.",
    routine: "6:00 AM - Energetic wake up sprint. 7:00 AM - Breakfast bowl. 9:00 PM - Midnight zoom runs."
  },
  {
    id: "KND-2026-011", name: "Penelope", species: "Rabbit", breed: "Rex Rabbit", age: "1 year", ageGroup: "Young",
    gender: "Female", location: "Denver, CO", status: "Available",
    description: "Penelope feels like literal premium velvet fabric. She has a gorgeous, inquisitive personality.",
    fee: "$80", image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "4.2 lbs", color: "Castor Velvet Brown", vaccinated: true, sterilized: true,
    medicalStatus: "GI tract working perfectly; strict grass fiber framework required.",
    temperament: "Calm, deeply sweet once settled, loves structure",
    favoriteFood: "Fresh cilantro stalks & organic red leaf lettuce", favoriteToy: "Oxbow structured chew houses",
    likes: ["Flattening out on soft area rugs", "Nose bridge rubs"], dislikes: ["Sudden loud bass tracks"],
    energyLevel: "Low to Medium", trainingLevel: "Basic", availableSince: "2026-06-28",
    shelterName: "Mile High Rescue Network",
    rescueStory: "Found safely inside a dynamic environment. Fully rehabilitated and socially prepared for home living.",
    routine: "6:30 AM - Morning greens array. 9:00 AM - Nap block inside quiet hide boxes."
  },
  {
    id: "KND-2026-012", name: "Zeus", species: "Bird", breed: "African Grey Parrot", age: "12 years", ageGroup: "Mature",
    gender: "Male", location: "Los Angeles, CA", status: "Available",
    description: "Zeus holds an interactive vocabulary of over 200 words. He needs a dedicated intellectual human partner.",
    fee: "$500", image: "https://images.unsplash.com/photo-1522856283749-6be33e154916?auto=format&fit=crop&q=80&w=1000",
    gallery: [], weight: "410 grams", color: "Slate Grey with Crimson Tail", vaccinated: false, sterilized: false,
    medicalStatus: "Pristine health record, microchipped.",
    temperament: "Highly intellectual, analytical, intensely loyal to core caretakers",
    favoriteFood: "Harrison's High Potency Coarse pellets", favoriteToy: "Stainless steel mechanical padlocks",
    likes: ["Solving geometric nut puzzles", "Mimicking microwave chimes"], dislikes: ["Sudden modifications to interior furniture locations"],
    energyLevel: "Medium", trainingLevel: "Advanced Cognitive", availableSince: "2026-05-20",
    shelterName: "Angels and Felines Rescue",
    rescueStory: "Outlived his previous elderly owner. Handled with profound care, his emotional baseline remains steady.",
    routine: "7:00 AM - Uncovered cage, morning greetings. 11:00 AM - Logic puzzle engagement."
  }
];

const insert = db.prepare(`
  INSERT OR REPLACE INTO pets (
    id, name, species, breed, age, ageGroup, gender, location, status, description, fee,
    image, gallery, weight, color, vaccinated, sterilized, medicalStatus, temperament,
    favoriteFood, favoriteToy, likes, dislikes, energyLevel, trainingLevel, availableSince,
    shelterName, rescueStory, routine
  ) VALUES (
    @id, @name, @species, @breed, @age, @ageGroup, @gender, @location, @status, @description, @fee,
    @image, @gallery, @weight, @color, @vaccinated, @sterilized, @medicalStatus, @temperament,
    @favoriteFood, @favoriteToy, @likes, @dislikes, @energyLevel, @trainingLevel, @availableSince,
    @shelterName, @rescueStory, @routine
  )
`);

const seedAll = db.withTransaction((pets) => {
  for (const pet of pets) {
    insert.run({
      ...pet,
      gallery: JSON.stringify(pet.gallery || []),
      likes: JSON.stringify(pet.likes || []),
      dislikes: JSON.stringify(pet.dislikes || []),
      vaccinated: pet.vaccinated ? 1 : 0,
      sterilized: pet.sterilized ? 1 : 0
    });
  }
});

seedAll(petData);
console.log(`Seeded ${petData.length} pets into kindred.db`);
