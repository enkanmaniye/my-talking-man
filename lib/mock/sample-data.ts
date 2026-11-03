/**
 * Stage 1 layout data only. Nothing here is real, and every screen using it
 * shows a "Sample data" badge. Replace each export with a real service in its
 * stage. Never import this from `services/`, `features/` or `app/api/`.
 */

export const sampleNeeds = [
  { label: "Hunger", value: 70 },
  { label: "Energy", value: 55 },
  { label: "Happiness", value: 80 },
  { label: "Health", value: 90 },
  { label: "Hygiene", value: 65 },
  { label: "Social", value: 45 },
] as const;

export const sampleMessages = [
  { id: "1", from: "user", text: "How was your day?" },
  { id: "2", from: "character", text: "Long, but better now. What about yours?" },
  { id: "3", from: "user", text: "I finally finished that book." },
] as const;

export const sampleGames = [
  { id: "memory", name: "Memory Match", description: "Pair the cards before time runs out." },
] as const;

export const shopCategories = {
  food: [
    { id: "pancakes", name: "Pancakes", price: 15 },
    { id: "ramen", name: "Ramen", price: 25 },
    { id: "salad", name: "Garden salad", price: 12 },
  ],
  clothes: [
    { id: "tee", name: "Plain T-shirt", price: 40 },
    { id: "jacket", name: "Denim jacket", price: 120 },
    { id: "pajamas", name: "Pajamas", price: 60 },
  ],
  furniture: [
    { id: "sofa", name: "Sofa", price: 300 },
    { id: "lamp", name: "Floor lamp", price: 90 },
    { id: "rug", name: "Round rug", price: 75 },
  ],
} as const;

export const samplePersonality = [
  { left: "Romantic", right: "Cold", value: 70 },
  { left: "Humorous", right: "Serious", value: 60 },
  { left: "Sarcastic", right: "Sincere", value: 35 },
  { left: "Talkative", right: "Quiet", value: 50 },
] as const;

export const sampleTopics = [
  { name: "Science and technology", preference: "Likes" },
  { name: "Sports", preference: "Neutral" },
  { name: "Politics", preference: "Dislikes" },
] as const;
