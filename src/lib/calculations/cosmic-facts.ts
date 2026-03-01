import type { CosmicFact } from "@/lib/types";
import { VOYAGER_REFERENCE } from "@/lib/constants/world-rates";

export const COSMIC_FACTS: CosmicFact[] = [
  {
    text: "Light from the Sun takes 8 minutes and 20 seconds to reach you.",
    source: "NASA",
  },
  {
    text: "There are more stars in the universe than grains of sand on every beach on Earth.",
    source: "Carl Sagan",
  },
  {
    text: "A teaspoon of neutron star would weigh about 6 billion tons.",
    source: "NASA",
  },
  {
    text: "The Milky Way and Andromeda galaxies will collide in about 4.5 billion years.",
    source: "NASA",
  },
  {
    text: "You are made of star stuff. Every atom in your body was forged in a star.",
    source: "Carl Sagan",
  },
  {
    text: "Space is completely silent. There is no medium for sound to travel through.",
    source: "NASA",
  },
  {
    text: "One day on Venus is longer than one year on Venus.",
    source: "NASA",
  },
  {
    text: "The Great Red Spot on Jupiter is a storm that has been raging for over 350 years.",
    source: "NASA",
  },
  {
    text: "If you could fly a plane to Pluto, the trip would take more than 800 years.",
    source: "NASA",
  },
  {
    text: "Olympus Mons on Mars is the tallest volcano in the solar system — nearly 3x the height of Everest.",
    source: "NASA",
  },
  {
    text: "The observable universe is 93 billion light-years in diameter.",
    source: "NASA",
  },
  {
    text: "Saturn would float in a bathtub. Its density is less than water.",
    source: "NASA",
  },
  {
    text: "There is a planet made of diamonds — 55 Cancri e — twice the size of Earth.",
    source: "Yale University",
  },
  {
    text: "Neutron stars can spin at 600 rotations per second.",
    source: "NASA",
  },
  {
    text: "The footprints on the Moon will be there for 100 million years — there's no wind to blow them away.",
    source: "NASA",
  },
  {
    text: "Earth's rotation is gradually slowing. Days were once only 6 hours long.",
    source: "NASA",
  },
  {
    text: "A photon of light takes 100,000 years to travel from the Sun's core to its surface, then just 8 minutes to reach Earth.",
    source: "NASA",
  },
  {
    text: "There are more possible iterations of a game of chess than atoms in the observable universe.",
    source: "Shannon Number",
  },
  {
    text: "Astronauts on the ISS witness 16 sunrises and 16 sunsets every day.",
    source: "NASA",
  },
  {
    text: "The cosmic microwave background radiation is the oldest light in the universe, from 380,000 years after the Big Bang.",
    source: "NASA",
  },
];

export function getRandomCosmicFact(): CosmicFact {
  // Use today's date as seed for consistency within a day
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % COSMIC_FACTS.length;
  return COSMIC_FACTS[index];
}

export function getVoyagerDistance(now: Date = new Date()): number {
  const msElapsed = now.getTime() - VOYAGER_REFERENCE.referenceDate.getTime();
  const yearsElapsed = msElapsed / (365.25 * 24 * 60 * 60 * 1000);
  return VOYAGER_REFERENCE.au + VOYAGER_REFERENCE.auPerYear * yearsElapsed;
}

// AU per second for ticking
export function getVoyagerRate(): number {
  return VOYAGER_REFERENCE.auPerYear / (365.25 * 24 * 3600);
}
