// Bananagrams letter distribution
const LETTER_DISTRIBUTION = {
    'A': 13, 'B': 3, 'C': 3, 'D': 6, 'E': 18, 'F': 3, 'G': 4, 'H': 3,
    'I': 12, 'J': 2, 'K': 2, 'L': 5, 'M': 3, 'N': 8, 'O': 11, 'P': 3,
    'Q': 2, 'R': 9, 'S': 6, 'T': 9, 'U': 6, 'V': 3, 'W': 3, 'X': 2,
    'Y': 3, 'Z': 2
};

// Scrabble points for visual reference (optional)
const LETTER_POINTS = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4,
    'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3,
    'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8,
    'Y': 4, 'Z': 10
};

// 365 Predefined letter sets - one for each day of the year
const LETTER_SETS = [
    // January (31 days)
    ['S', 'T', 'A', 'R', 'E', 'T', 'S', 'H'], // Day 1: STAR, STARS, HATS, TEARS, RATS, HASTE
    ['C', 'A', 'R', 'E', 'T', 'S', 'O', 'N'], // Day 2: CARE, CARES, STORE, NOTES, STONE
    ['P', 'L', 'A', 'N', 'T', 'E', 'R', 'S'], // Day 3: PLANT, PLANTS, ANTS, LANES
    ['G', 'R', 'O', 'W', 'T', 'H', 'S', 'E'], // Day 4: GROW, GROWTH, WEST, HOSE
    ['B', 'R', 'E', 'A', 'K', 'S', 'T', 'O'], // Day 5: BREAK, BREAKS, STORE, BOATS
    ['F', 'L', 'O', 'W', 'E', 'R', 'S', 'T'], // Day 6: FLOWER, FLOWERS, WEST, SLOW
    ['M', 'A', 'S', 'T', 'E', 'R', 'S', 'I'], // Day 7: MASTER, MASTERS, MIST, TIRES
    ['D', 'R', 'E', 'A', 'M', 'S', 'T', 'I'], // Day 8: DREAM, DREAMS, MIST, TIDES
    ['S', 'P', 'R', 'I', 'N', 'T', 'E', 'S'], // Day 9: PRINT, PRINTS, PINES, STEP
    ['C', 'L', 'E', 'A', 'R', 'S', 'T', 'O'], // Day 10: CLEAR, CLEARS, STORE, COAST
    ['H', 'E', 'A', 'R', 'T', 'S', 'O', 'N'], // Day 11: HEART, HEARTS, STONE, ANTS
    ['W', 'I', 'N', 'T', 'E', 'R', 'S', 'A'], // Day 12: WINTER, WINTERS, ANTS, WEARS
    ['L', 'I', 'G', 'H', 'T', 'E', 'R', 'S'], // Day 13: LIGHT, LIGHTS, TIRES
    ['S', 'H', 'A', 'R', 'E', 'D', 'O', 'T'], // Day 14: SHARE, SHARED, TOAD, HOSE
    ['T', 'R', 'A', 'I', 'N', 'S', 'E', 'D'], // Day 15: TRAIN, TRAINS, ANTS, DINES
    ['S', 'T', 'O', 'R', 'M', 'E', 'S', 'I'], // Day 16: STORM, STORMS, MIST, TIRES
    ['G', 'R', 'E', 'A', 'T', 'S', 'O', 'N'], // Day 17: GREAT, GREATS, STONE, ANTS
    ['F', 'R', 'E', 'S', 'H', 'T', 'O', 'P'], // Day 18: FRESH, FROST, SHOP, TOPS
    ['B', 'L', 'A', 'N', 'K', 'E', 'T', 'S'], // Day 19: BLANK, BLANKS, ANTS, BETS
    ['S', 'L', 'E', 'E', 'P', 'R', 'S', 'T'], // Day 20: SLEEP, SLEEPS, REST, STEP
    ['C', 'H', 'A', 'N', 'G', 'E', 'R', 'S'], // Day 21: CHANGE, CHANGES, RAGES
    ['S', 'T', 'R', 'E', 'A', 'M', 'S', 'I'], // Day 22: STREAM, STREAMS, MIST
    ['P', 'R', 'I', 'C', 'E', 'S', 'T', 'O'], // Day 23: PRICE, PRICES, STORE, POETS
    ['M', 'O', 'U', 'N', 'T', 'S', 'E', 'R'], // Day 24: MOUNT, MOUNTS, NOTES, RENTS
    ['S', 'T', 'A', 'M', 'P', 'E', 'R', 'S'], // Day 25: STAMP, STAMPS, RAMPS, MAPS
    ['C', 'O', 'U', 'N', 'T', 'E', 'R', 'S'], // Day 26: COUNT, COUNTS, NOTES, RENTS
    ['G', 'R', 'O', 'U', 'N', 'D', 'E', 'S'], // Day 27: GROUND, GROUNDS, DUNES
    ['S', 'I', 'L', 'V', 'E', 'R', 'T', 'S'], // Day 28: SILVER, SILVERS, TILES
    ['W', 'A', 'R', 'M', 'E', 'R', 'S', 'T'], // Day 29: WARM, WARMS, MASTER, REST
    ['B', 'R', 'I', 'G', 'H', 'T', 'E', 'S'], // Day 30: BRIGHT, BRIGHTS, TIRES
    ['F', 'R', 'O', 'Z', 'E', 'N', 'S', 'T'], // Day 31: FROZEN, FROST, NOTES, NEST

    // February (29 days - leap year included)
    ['S', 'P', 'R', 'I', 'N', 'G', 'S', 'T'], // Day 32: SPRING, SPRINGS, PINTS
    ['C', 'O', 'L', 'D', 'E', 'R', 'S', 'T'], // Day 33: COLDER, REST, DOES, TOES
    ['S', 'N', 'O', 'W', 'E', 'R', 'S', 'T'], // Day 34: SNOW, SNOWS, WEST, OWES
    ['B', 'L', 'O', 'O', 'M', 'S', 'E', 'R'], // Day 35: BLOOM, BLOOMS, ROOMS
    ['T', 'H', 'A', 'W', 'I', 'N', 'G', 'S'], // Day 36: THAW, THAWS, SWING, ANTS
    ['V', 'A', 'L', 'L', 'E', 'Y', 'S', 'T'], // Day 37: VALLEY, VALLEYS, LAST, YES
    ['M', 'E', 'L', 'T', 'I', 'N', 'G', 'S'], // Day 38: MELT, MELTS, STING, SLIM
    ['R', 'I', 'V', 'E', 'R', 'S', 'T', 'O'], // Day 39: RIVER, RIVERS, STORE, VEST
    ['S', 'O', 'F', 'T', 'E', 'R', 'N', 'S'], // Day 40: SOFTER, SNORE, NEST, TENS
    ['G', 'E', 'N', 'T', 'L', 'E', 'R', 'S'], // Day 41: GENTLE, GENTLER, NEST
    ['B', 'R', 'E', 'E', 'Z', 'E', 'S', 'T'], // Day 42: BREEZE, BREEZES, BEST, ZEST
    ['S', 'U', 'N', 'N', 'Y', 'D', 'A', 'E'], // Day 43: SUNNY, DUNE, DAYS, SANE
    ['C', 'L', 'O', 'U', 'D', 'S', 'E', 'R'], // Day 44: CLOUD, CLOUDS, SOURED
    ['M', 'I', 'S', 'T', 'Y', 'R', 'A', 'E'], // Day 45: MISTY, MIST, MATES, TRIES
    ['R', 'A', 'I', 'N', 'Y', 'D', 'E', 'S'], // Day 46: RAINY, RAINS, DAYS, SANDY
    ['W', 'A', 'R', 'M', 'T', 'H', 'E', 'S'], // Day 47: WARMTH, WARMS, HATES
    ['F', 'R', 'O', 'S', 'T', 'Y', 'E', 'R'], // Day 48: FROSTY, FROST, ROSY, REST
    ['S', 'H', 'I', 'N', 'E', 'R', 'S', 'T'], // Day 49: SHINE, SHINES, NEST, TIRES
    ['B', 'R', 'I', 'S', 'K', 'E', 'T', 'Y'], // Day 50: BRISK, RISKY, BEST, KITES
    ['C', 'R', 'I', 'S', 'P', 'E', 'R', 'T'], // Day 51: CRISP, CRISPER, REST
    ['S', 'T', 'E', 'A', 'M', 'Y', 'R', 'S'], // Day 52: STEAMY, STEAM, MAST, YEARS
    ['G', 'L', 'O', 'O', 'M', 'Y', 'E', 'R'], // Day 53: GLOOMY, GLOOM, ROOM, LYRE
    ['P', 'E', 'A', 'C', 'E', 'S', 'T', 'R'], // Day 54: PEACE, CARES, STORE, CAST
    ['Q', 'U', 'I', 'E', 'T', 'S', 'R', 'A'], // Day 55: QUIET, QUIETS, ANTS, STAR
    ['L', 'O', 'V', 'E', 'L', 'Y', 'S', 'T'], // Day 56: LOVELY, LOVES, LOST, YES
    ['S', 'W', 'E', 'E', 'T', 'R', 'S', 'A'], // Day 57: SWEET, SWEETS, RATS, WEARS
    ['H', 'A', 'P', 'P', 'Y', 'E', 'R', 'S'], // Day 58: HAPPY, HARP, PEARS, REPS
    ['K', 'I', 'N', 'D', 'L', 'Y', 'E', 'S'], // Day 59: KINDLY, KIND, YES, SLY
    ['C', 'H', 'E', 'E', 'R', 'S', 'T', 'Y'], // Day 60: CHEER, CHEERS, REST, YES

    // March (31 days)
    ['S', 'P', 'R', 'O', 'U', 'T', 'S', 'E'], // Day 61: SPROUT, SPROUTS, QUEST
    ['G', 'A', 'R', 'D', 'E', 'N', 'S', 'T'], // Day 62: GARDEN, GARDENS, NEST, ANTS
    ['S', 'E', 'E', 'D', 'S', 'T', 'O', 'R'], // Day 63: SEED, SEEDS, STORE, DOES
    ['G', 'R', 'E', 'E', 'N', 'S', 'T', 'Y'], // Day 64: GREEN, GREENS, NEST, YES
    ['B', 'U', 'D', 'D', 'I', 'N', 'G', 'S'], // Day 65: BUD, BUDS, DING, SINGS
    ['P', 'E', 'T', 'A', 'L', 'S', 'E', 'R'], // Day 66: PETAL, PETALS, LATER, EARS
    ['L', 'E', 'A', 'V', 'E', 'S', 'T', 'R'], // Day 67: LEAVE, LEAVES, REST, VEST
    ['B', 'R', 'A', 'N', 'C', 'H', 'E', 'S'], // Day 68: BRANCH, BRANCHES, CANES
    ['R', 'O', 'O', 'T', 'S', 'E', 'R', 'P'], // Day 69: ROOT, ROOTS, ROPE, SORE
    ['S', 'T', 'E', 'M', 'S', 'R', 'O', 'P'], // Day 70: STEM, STEMS, ROPE, PORES
    ['V', 'I', 'N', 'E', 'S', 'T', 'O', 'R'], // Day 71: VINE, VINES, STONE, RIOTS
    ['T', 'H', 'O', 'R', 'N', 'S', 'E', 'I'], // Day 72: THORN, THORNS, NOISE
    ['M', 'O', 'S', 'S', 'Y', 'E', 'R', 'T'], // Day 73: MOSSY, MOSS, REST, ROSY
    ['F', 'E', 'R', 'N', 'S', 'T', 'O', 'A'], // Day 74: FERN, FERNS, STONE, TOAST
    ['C', 'L', 'O', 'V', 'E', 'R', 'S', 'T'], // Day 75: CLOVER, CLOVERS, REST
    ['I', 'V', 'Y', 'G', 'R', 'O', 'W', 'S'], // Day 76: IVY, GROWS, ROWS, GORY
    ['B', 'A', 'R', 'K', 'E', 'D', 'T', 'S'], // Day 77: BARK, BARKED, DATES, BETS
    ['S', 'A', 'P', 'L', 'I', 'N', 'G', 'S'], // Day 78: SAP, SAPS, SLING, GAINS
    ['P', 'O', 'L', 'L', 'E', 'N', 'S', 'T'], // Day 79: POLLEN, LENS, STONE, PENS
    ['N', 'E', 'S', 'T', 'I', 'N', 'G', 'S'], // Day 80: NEST, NESTING, STING
    ['E', 'G', 'G', 'S', 'H', 'E', 'L', 'L'], // Day 81: EGGS, SHELL, LEGS, SELL
    ['H', 'A', 'T', 'C', 'H', 'E', 'R', 'S'], // Day 82: HATCH, HATCHER, CARES
    ['C', 'H', 'I', 'R', 'P', 'S', 'E', 'T'], // Day 83: CHIRP, CHIRPS, REST, TIPS
    ['T', 'W', 'I', 'G', 'S', 'E', 'R', 'T'], // Day 84: TWIG, TWIGS, REST, WREST
    ['B', 'I', 'R', 'D', 'S', 'O', 'N', 'G'], // Day 85: BIRD, BIRDS, SONG, DING
    ['W', 'I', 'N', 'G', 'S', 'E', 'T', 'P'], // Day 86: WING, WINGS, STEP, WEST
    ['F', 'E', 'A', 'T', 'H', 'E', 'R', 'S'], // Day 87: FEATHER, HEATS, RASH
    ['S', 'O', 'A', 'R', 'I', 'N', 'G', 'S'], // Day 88: SOAR, SOARING, RAINS
    ['F', 'L', 'I', 'G', 'H', 'T', 'S', 'E'], // Day 89: FLIGHT, FLIGHTS, SIGHT
    ['N', 'E', 'S', 'T', 'L', 'E', 'D', 'S'], // Day 90: NESTLE, NESTLED, LENS
    ['B', 'R', 'O', 'O', 'D', 'I', 'N', 'G'], // Day 91: BROOD, BROODING, DING

    // April (30 days)
    ['S', 'H', 'O', 'W', 'E', 'R', 'S', 'T'], // Day 92: SHOWER, SHOWERS, WORST
    ['D', 'R', 'I', 'Z', 'Z', 'L', 'E', 'S'], // Day 93: DRIZZLE, DRIZZLES, LIES
    ['P', 'U', 'D', 'D', 'L', 'E', 'S', 'R'], // Day 94: PUDDLE, PUDDLES, ELDER
    ['S', 'P', 'L', 'A', 'S', 'H', 'E', 'R'], // Day 95: SPLASH, LASHER, RASH
    ['U', 'M', 'B', 'R', 'E', 'L', 'L', 'A'], // Day 96: UMBRELLA, BALE, REAL
    ['W', 'E', 'T', 'N', 'E', 'S', 'S', 'R'], // Day 97: WET, WETNESS, REST, NEST
    ['D', 'A', 'M', 'P', 'E', 'R', 'S', 'T'], // Day 98: DAMP, DAMPER, REST, STAMP
    ['F', 'O', 'G', 'G', 'Y', 'E', 'R', 'S'], // Day 99: FOGGY, FOGY, GORE, ROSE
    ['M', 'U', 'D', 'D', 'Y', 'E', 'R', 'S'], // Day 100: MUDDY, MUD, DYES, RUDE
    ['S', 'P', 'R', 'I', 'N', 'K', 'L', 'E'], // Day 101: SPRINKLE, RINKS, SLINK
    ['B', 'L', 'O', 'S', 'S', 'O', 'M', 'S'], // Day 102: BLOSSOM, BLOSSOMS, MOSS
    ['C', 'H', 'E', 'R', 'R', 'Y', 'S', 'E'], // Day 103: CHERRY, CHEERS, HERS
    ['A', 'P', 'P', 'L', 'E', 'T', 'R', 'S'], // Day 104: APPLE, APPLES, TRAPS
    ['P', 'E', 'A', 'C', 'H', 'E', 'R', 'S'], // Day 105: PEACH, PEACHES, CARES
    ['P', 'L', 'U', 'M', 'S', 'E', 'R', 'T'], // Day 106: PLUM, PLUMS, REST, LURES
    ['B', 'E', 'R', 'R', 'Y', 'S', 'T', 'I'], // Day 107: BERRY, BERRIES, TIRES
    ['O', 'R', 'C', 'H', 'A', 'R', 'D', 'S'], // Day 108: ORCHARD, ORCHARDS, CORDS
    ['H', 'A', 'R', 'V', 'E', 'S', 'T', 'R'], // Day 109: HARVEST, HAVES, REST
    ['C', 'R', 'O', 'P', 'S', 'E', 'T', 'A'], // Day 110: CROP, CROPS, STORE, CAST
    ['F', 'I', 'E', 'L', 'D', 'S', 'R', 'O'], // Day 111: FIELD, FIELDS, SORE,IDOS
    ['P', 'L', 'O', 'W', 'E', 'R', 'S', 'D'], // Day 112: PLOW, PLOWS, WORDS, DOSE
    ['F', 'A', 'R', 'M', 'E', 'R', 'S', 'T'], // Day 113: FARM, FARMER, REST, STAR
    ['B', 'A', 'R', 'N', 'S', 'E', 'T', 'O'], // Day 114: BARN, BARNS, STONE, BATS
    ['T', 'R', 'A', 'C', 'T', 'O', 'R', 'S'], // Day 115: TRACTOR, TRACT, CARS
    ['S', 'I', 'L', 'O', 'S', 'T', 'E', 'R'], // Day 116: SILO, SILOS, REST, TIRES
    ['H', 'A', 'Y', 'S', 'T', 'A', 'C', 'K'], // Day 117: HAY, HAYS, STACK, CAST
    ['S', 'T', 'R', 'A', 'W', 'S', 'E', 'I'], // Day 118: STRAW, STRAWS, WIRES
    ['W', 'H', 'E', 'A', 'T', 'S', 'O', 'R'], // Day 119: WHEAT, WHEATS, STORE
    ['C', 'O', 'R', 'N', 'S', 'T', 'A', 'E'], // Day 120: CORN, CORNS, STONE, ANTS
    ['G', 'R', 'A', 'I', 'N', 'S', 'T', 'E'], // Day 121: GRAIN, GRAINS, STING

    // May (31 days)
    ['M', 'E', 'A', 'D', 'O', 'W', 'S', 'R'], // Day 122: MEADOW, MEADOWS, ROWS
    ['P', 'A', 'S', 'T', 'U', 'R', 'E', 'S'], // Day 123: PASTURE, PASTURES, RUST
    ['G', 'R', 'A', 'Z', 'I', 'N', 'G', 'S'], // Day 124: GRAZE, GRAZING, RAINS
    ['C', 'A', 'T', 'T', 'L', 'E', 'R', 'S'], // Day 125: CATTLE, LATTER, REST
    ['S', 'H', 'E', 'E', 'P', 'R', 'S', 'T'], // Day 126: SHEEP, SHEEP, REST, SEEP
    ['H', 'O', 'R', 'S', 'E', 'S', 'T', 'Y'], // Day 127: HORSE, HORSES, REST, YES
    ['M', 'A', 'R', 'E', 'S', 'T', 'I', 'O'], // Day 128: MARE, MARES, STORE, TOES
    ['F', 'O', 'A', 'L', 'S', 'E', 'R', 'T'], // Day 129: FOAL, FOALS, REST, FALSE
    ['C', 'O', 'L', 'T', 'S', 'E', 'R', 'A'], // Day 130: COLT, COLTS, REST, EARS
    ['S', 'T', 'A', 'B', 'L', 'E', 'S', 'R'], // Day 131: STABLE, STABLES, BALES
    ['B', 'R', 'I', 'D', 'L', 'E', 'S', 'T'], // Day 132: BRIDLE, BRIDLES, BEST
    ['S', 'A', 'D', 'D', 'L', 'E', 'S', 'R'], // Day 133: SADDLE, SADDLES, LASER
    ['R', 'E', 'I', 'N', 'S', 'T', 'O', 'E'], // Day 134: REIN, REINS, STONE, TOES
    ['H', 'O', 'O', 'F', 'S', 'T', 'E', 'R'], // Day 135: HOOF, HOOFS, REST, STORE
    ['G', 'A', 'L', 'L', 'O', 'P', 'S', 'E'], // Day 136: GALLOP, GALLOPS, POLES
    ['T', 'R', 'O', 'T', 'S', 'E', 'R', 'I'], // Day 137: TROT, TROTS, REST, TIRES
    ['C', 'A', 'N', 'T', 'E', 'R', 'S', 'I'], // Day 138: CANTER, CANTERS, NEST
    ['J', 'U', 'M', 'P', 'E', 'R', 'S', 'T'], // Day 139: JUMP, JUMPER, REST, REPS
    ['F', 'E', 'N', 'C', 'E', 'S', 'T', 'R'], // Day 140: FENCE, FENCES, REST, NEST
    ['P', 'A', 'D', 'D', 'O', 'C', 'K', 'S'], // Day 141: PADDOCK, PACKS, DOCKS
    ['R', 'A', 'N', 'C', 'H', 'E', 'R', 'S'], // Day 142: RANCH, RANCHER, CANES
    ['R', 'O', 'P', 'E', 'S', 'T', 'I', 'R'], // Day 143: ROPE, ROPES, REST, TIRES
    ['L', 'A', 'S', 'S', 'O', 'E', 'R', 'S'], // Day 144: LASSO, LASSOS, SORE, EARS
    ['C', 'O', 'W', 'B', 'O', 'Y', 'S', 'E'], // Day 145: COWBOY, COWBOYS, BOWS
    ['R', 'O', 'D', 'E', 'O', 'S', 'T', 'R'], // Day 146: RODEO, RODEOS, REST, DOSE
    ['A', 'R', 'E', 'N', 'A', 'S', 'T', 'O'], // Day 147: ARENA, ARENAS, STONE
    ['S', 'T', 'E', 'E', 'R', 'S', 'O', 'P'], // Day 148: STEER, STEERS, ROPE, SORE
    ['B', 'U', 'L', 'L', 'S', 'E', 'Y', 'R'], // Day 149: BULL, BULLS, YES, SLYLY
    ['H', 'E', 'R', 'D', 'S', 'M', 'E', 'N'], // Day 150: HERD, HERDS, DENSE, MESH
    ['P', 'A', 'S', 'T', 'O', 'R', 'E', 'S'], // Day 151: PASTOR, PASTURE, STORE
    ['G', 'R', 'A', 'S', 'S', 'E', 'D', 'Y'], // Day 152: GRASS, GRASSED, DAYS

    // June (30 days)
    ['S', 'U', 'M', 'M', 'E', 'R', 'S', 'T'], // Day 153: SUMMER, SUMMERS, REST
    ['S', 'U', 'N', 'N', 'Y', 'S', 'T', 'E'], // Day 154: SUNNY, SUNNIEST, NEST
    ['B', 'E', 'A', 'C', 'H', 'E', 'S', 'R'], // Day 155: BEACH, BEACHES, CARES
    ['O', 'C', 'E', 'A', 'N', 'S', 'T', 'R'], // Day 156: OCEAN, OCEANS, NEST, STAR
    ['W', 'A', 'V', 'E', 'S', 'T', 'O', 'R'], // Day 157: WAVE, WAVES, STORE, VEST
    ['S', 'U', 'R', 'F', 'E', 'R', 'S', 'T'], // Day 158: SURF, SURFER, REST, FUSE
    ['T', 'I', 'D', 'E', 'S', 'P', 'O', 'R'], // Day 159: TIDE, TIDES, ROPE, STORE
    ['S', 'A', 'N', 'D', 'Y', 'E', 'R', 'S'], // Day 160: SANDY, SAND, YES, READS
    ['S', 'H', 'E', 'L', 'L', 'S', 'E', 'T'], // Day 161: SHELL, SHELLS, LETS, BEST
    ['C', 'O', 'R', 'A', 'L', 'S', 'E', 'T'], // Day 162: CORAL, CORALS, REST, CAST
    ['C', 'R', 'A', 'B', 'S', 'E', 'T', 'O'], // Day 163: CRAB, CRABS, STORE, BOATS
    ['S', 'T', 'A', 'R', 'F', 'I', 'S', 'H'], // Day 164: STARFISH, STAR, FISH
    ['W', 'H', 'A', 'L', 'E', 'S', 'T', 'R'], // Day 165: WHALE, WHALES, REST, STAR
    ['D', 'O', 'L', 'P', 'H', 'I', 'N', 'S'], // Day 166: DOLPHIN, DOLPHINS, SLIP
    ['S', 'E', 'A', 'L', 'S', 'T', 'O', 'R'], // Day 167: SEAL, SEALS, STORE, LAST
    ['O', 'T', 'T', 'E', 'R', 'S', 'A', 'I'], // Day 168: OTTER, OTTERS, IRATE
    ['S', 'H', 'A', 'R', 'K', 'S', 'E', 'T'], // Day 169: SHARK, SHARKS, BEST, HATS
    ['S', 'T', 'I', 'N', 'G', 'R', 'A', 'Y'], // Day 170: STING, STINGRAY, RAINS
    ['J', 'E', 'L', 'L', 'Y', 'F', 'I', 'S'], // Day 171: JELLY, JELLIES, FLIES
    ['S', 'Q', 'U', 'I', 'D', 'S', 'E', 'R'], // Day 172: SQUID, SQUIDS, RIDES
    ['O', 'C', 'T', 'O', 'P', 'U', 'S', 'E'], // Day 173: OCTOPUS, CUPS, TOES, STEP
    ['C', 'L', 'A', 'M', 'S', 'E', 'R', 'T'], // Day 174: CLAM, CLAMS, REST, STEAM
    ['O', 'Y', 'S', 'T', 'E', 'R', 'S', 'A'], // Day 175: OYSTER, OYSTERS, ROAST
    ['S', 'H', 'R', 'I', 'M', 'P', 'S', 'E'], // Day 176: SHRIMP, SHRIMPS, PRIME
    ['L', 'O', 'B', 'S', 'T', 'E', 'R', 'S'], // Day 177: LOBSTER, LOBSTERS, BEST
    ['K', 'E', 'L', 'P', 'S', 'T', 'O', 'R'], // Day 178: KELP, KELPS, STORE, SLOPE
    ['A', 'L', 'G', 'A', 'E', 'S', 'T', 'R'], // Day 179: ALGAE, ALGAES, REST, AGES
    ['P', 'L', 'A', 'N', 'K', 'T', 'O', 'N'], // Day 180: PLANKTON, PLAN, KNOT
    ['R', 'E', 'E', 'F', 'S', 'T', 'O', 'R'], // Day 181: REEF, REEFS, STORE, REST
    ['L', 'A', 'G', 'O', 'O', 'N', 'S', 'T'], // Day 182: LAGOON, LAGOONS, LONG

    // July (31 days)
    ['F', 'I', 'R', 'E', 'W', 'O', 'R', 'K'], // Day 183: FIREWORK, FIRE, WORK
    ['S', 'P', 'A', 'R', 'K', 'L', 'E', 'S'], // Day 184: SPARKLE, SPARKLES, LEAP
    ['B', 'A', 'N', 'G', 'E', 'R', 'S', 'T'], // Day 185: BANG, BANGER, REST, RATS
    ['B', 'U', 'R', 'S', 'T', 'E', 'R', 'S'], // Day 186: BURST, BURSTER, REST
    ['R', 'O', 'C', 'K', 'E', 'T', 'S', 'A'], // Day 187: ROCKET, ROCKETS, COAST
    ['P', 'A', 'R', 'A', 'D', 'E', 'S', 'T'], // Day 188: PARADE, PARADES, DRAPES
    ['F', 'E', 'S', 'T', 'I', 'V', 'A', 'L'], // Day 189: FESTIVAL, FAST, VEIL
    ['C', 'E', 'L', 'E', 'B', 'R', 'A', 'T'], // Day 190: CELEBRATE, CRATE, ABLE
    ['B', 'A', 'R', 'B', 'E', 'C', 'U', 'E'], // Day 191: BARBECUE, BEAR, CRAB
    ['G', 'R', 'I', 'L', 'L', 'E', 'D', 'S'], // Day 192: GRILL, GRILLED, SLIDE
    ['P', 'I', 'C', 'N', 'I', 'C', 'S', 'E'], // Day 193: PICNIC, PICNICS, SINCE
    ['B', 'A', 'S', 'K', 'E', 'T', 'S', 'R'], // Day 194: BASKET, BASKETS, BREAK
    ['B', 'L', 'A', 'N', 'K', 'E', 'T', 'S'], // Day 195: BLANKET, BLANKETS, ANTS
    ['C', 'O', 'O', 'L', 'E', 'R', 'S', 'T'], // Day 196: COOLER, COOLERS, REST
    ['I', 'C', 'E', 'D', 'T', 'E', 'A', 'S'], // Day 197: ICED, ICE, TEAS, SEAT
    ['L', 'E', 'M', 'O', 'N', 'A', 'D', 'E'], // Day 198: LEMONADE, LEAN, DOME
    ['S', 'O', 'D', 'A', 'P', 'O', 'P', 'S'], // Day 199: SODA, SODAS, POPS, PODS
    ['J', 'U', 'I', 'C', 'E', 'S', 'T', 'R'], // Day 200: JUICE, JUICES, REST
    ['S', 'L', 'U', 'S', 'H', 'Y', 'E', 'R'], // Day 201: SLUSHY, SLUSH, YES, USHER
    ['P', 'O', 'P', 'S', 'I', 'C', 'L', 'E'], // Day 202: POPSICLE, POPS, SLICE
    ['S', 'U', 'N', 'S', 'C', 'R', 'E', 'E'], // Day 203: SUNSCREEN, SCENE, CURES
    ['T', 'A', 'N', 'N', 'E', 'D', 'S', 'R'], // Day 204: TAN, TANNED,DENS, REDS
    ['S', 'H', 'A', 'D', 'E', 'S', 'T', 'R'], // Day 205: SHADE, SHADES, REST, HATS
    ['U', 'M', 'B', 'R', 'E', 'L', 'L', 'A'], // Day 206: UMBRELLA, BARE, REAL
    ['H', 'A', 'T', 'S', 'U', 'N', 'E', 'R'], // Day 207: HAT, HATS, SUNTRAP, ERAS
    ['G', 'L', 'A', 'S', 'S', 'E', 'S', 'R'], // Day 208: GLASS, GLASSES, EARS
    ['S', 'W', 'I', 'M', 'S', 'U', 'I', 'T'], // Day 209: SWIM, SWIMS, SUIT, MIST
    ['T', 'R', 'U', 'N', 'K', 'S', 'E', 'T'], // Day 210: TRUNK, TRUNKS, NEST, RUST
    ['T', 'O', 'W', 'E', 'L', 'S', 'R', 'A'], // Day 211: TOWEL, TOWELS, LASER
    ['F', 'L', 'I', 'P', 'F', 'L', 'O', 'P'], // Day 212: FLIP, FLOP, FLIPFLOP
    ['S', 'A', 'N', 'D', 'A', 'L', 'S', 'E'], // Day 213: SANDAL, SANDALS, LANES

    // August (31 days)
    ['S', 'C', 'O', 'R', 'C', 'H', 'E', 'S'], // Day 214: SCORCH, SCORCHES, CHOSE
    ['S', 'W', 'E', 'L', 'T', 'E', 'R', 'S'], // Day 215: SWELTER, SWELTERS, REST
    ['B', 'L', 'A', 'Z', 'I', 'N', 'G', 'S'], // Day 216: BLAZE, BLAZING, GAINS
    ['T', 'O', 'R', 'R', 'I', 'D', 'E', 'S'], // Day 217: TORRID, RIDE, TIDES, DOES
    ['S', 'U', 'L', 'T', 'R', 'Y', 'E', 'S'], // Day 218: SULTRY, SLUR, TRUES, YES
    ['H', 'U', 'M', 'I', 'D', 'E', 'R', 'S'], // Day 219: HUMID, HUMIDER, RIDES
    ['S', 'T', 'I', 'F', 'L', 'I', 'N', 'G'], // Day 220: STIFLING, FLING, SILT
    ['M', 'U', 'G', 'G', 'Y', 'E', 'R', 'S'], // Day 221: MUGGY, MUG, GUYS, SURGE
    ['S', 'T', 'E', 'A', 'M', 'Y', 'R', 'S'], // Day 222: STEAMY, STEAM, MAST
    ['B', 'A', 'K', 'I', 'N', 'G', 'S', 'E'], // Day 223: BAKING, BANG, BIKES
    ['R', 'O', 'A', 'S', 'T', 'I', 'N', 'G'], // Day 224: ROAST, ROASTING, RAINS
    ['S', 'I', 'Z', 'Z', 'L', 'I', 'N', 'G'], // Day 225: SIZZLE, SIZZLING, ZING
    ['F', 'R', 'Y', 'I', 'N', 'G', 'S', 'E'], // Day 226: FRY, FRYING, FINGERS
    ['B', 'O', 'I', 'L', 'I', 'N', 'G', 'S'], // Day 227: BOIL, BOILING, LOGINS
    ['S', 'W', 'E', 'A', 'T', 'I', 'N', 'G'], // Day 228: SWEAT, SWEATING, STING
    ['P', 'A', 'R', 'C', 'H', 'E', 'D', 'S'], // Day 229: PARCH, PARCHED, DASH
    ['T', 'H', 'I', 'R', 'S', 'T', 'Y', 'E'], // Day 230: THIRSTY, FIRST, YES
    ['D', 'R', 'O', 'U', 'G', 'H', 'T', 'S'], // Day 231: DROUGHT, DROUGHTS, SHOUT
    ['A', 'R', 'I', 'D', 'N', 'E', 'S', 'S'], // Day 232: ARID, ARIDITY, NERDS
    ['D', 'U', 'S', 'T', 'Y', 'E', 'R', 'S'], // Day 233: DUSTY, DUST, YES, RUDE
    ['C', 'R', 'A', 'C', 'K', 'E', 'D', 'S'], // Day 234: CRACK, CRACKED, SACKED
    ['W', 'I', 'T', 'H', 'E', 'R', 'S', 'A'], // Day 235: WITHER, WITHERS, HEARS
    ['W', 'I', 'L', 'T', 'I', 'N', 'G', 'S'], // Day 236: WILT, WILTING, SLING
    ['D', 'R', 'O', 'O', 'P', 'I', 'N', 'G'], // Day 237: DROOP, DROOPING, DING
    ['S', 'H', 'R', 'I', 'V', 'E', 'L', 'S'], // Day 238: SHRIVEL, SHRIVELS, SLIVERS
    ['C', 'R', 'I', 'S', 'P', 'E', 'D', 'S'], // Day 239: CRISP, CRISPED, SPIDER
    ['S', 'E', 'A', 'R', 'E', 'D', 'T', 'S'], // Day 240: SEAR, SEARED, DATES, RATS
    ['B', 'U', 'R', 'N', 'E', 'D', 'T', 'S'], // Day 241: BURN, BURNED, TENDS, BETS
    ['S', 'C', 'A', 'L', 'D', 'E', 'D', 'S'], // Day 242: SCALD, SCALDED, ELMS
    ['B', 'L', 'I', 'S', 'T', 'E', 'R', 'S'], // Day 243: BLISTER, BLISTERS, BEST
    ['S', 'U', 'N', 'B', 'U', 'R', 'N', 'S'], // Day 244: SUNBURN, SUNBURNS, RUNS

    // September (30 days)
    ['A', 'U', 'T', 'U', 'M', 'N', 'S', 'E'], // Day 245: AUTUMN, AUTUMNS, ANTS
    ['F', 'A', 'L', 'L', 'I', 'N', 'G', 'S'], // Day 246: FALL, FALLING, SLING
    ['L', 'E', 'A', 'V', 'E', 'S', 'T', 'R'], // Day 247: LEAVES, LEAVE, REST
    ['C', 'R', 'I', 'S', 'P', 'E', 'R', 'T'], // Day 248: CRISP, CRISPER, REST
    ['C', 'O', 'O', 'L', 'E', 'R', 'S', 'T'], // Day 249: COOLER, COOL, REST, SCORE
    ['R', 'A', 'K', 'I', 'N', 'G', 'S', 'E'], // Day 250: RAKE, RAKING, RINGS
    ['S', 'W', 'E', 'E', 'P', 'I', 'N', 'G'], // Day 251: SWEEP, SWEEPING, SEEING
    ['P', 'I', 'L', 'I', 'N', 'G', 'S', 'E'], // Day 252: PILE, PILING, SLING
    ['H', 'E', 'A', 'P', 'I', 'N', 'G', 'S'], // Day 253: HEAP, HEAPING, SIGHING
    ['T', 'U', 'M', 'B', 'L', 'I', 'N', 'G'], // Day 254: TUMBLE, TUMBLING, GLEN
    ['C', 'R', 'U', 'N', 'C', 'H', 'E', 'S'], // Day 255: CRUNCH, CRUNCHES, SUCH
    ['R', 'U', 'S', 'T', 'L', 'I', 'N', 'G'], // Day 256: RUSTLE, RUSTLING, SLING
    ['B', 'R', 'O', 'W', 'N', 'E', 'D', 'S'], // Day 257: BROWN, BROWNED, OWNS
    ['G', 'O', 'L', 'D', 'E', 'N', 'S', 'T'], // Day 258: GOLDEN, LONG, DENTS, NEST
    ['A', 'M', 'B', 'E', 'R', 'S', 'T', 'I'], // Day 259: AMBER, AMBERS, TIRES
    ['O', 'R', 'A', 'N', 'G', 'E', 'S', 'T'], // Day 260: ORANGE, ORANGES, STORE
    ['R', 'U', 'S', 'S', 'E', 'T', 'S', 'A'], // Day 261: RUSSET, RUSSETS, EARS
    ['S', 'C', 'A', 'R', 'L', 'E', 'T', 'S'], // Day 262: SCARLET, SCARLETS, CAST
    ['C', 'R', 'I', 'M', 'S', 'O', 'N', 'E'], // Day 263: CRIMSON, CRIMSONS, NOSE
    ['M', 'A', 'R', 'O', 'O', 'N', 'S', 'E'], // Day 264: MAROON, MAROONS, SANE
    ['P', 'U', 'M', 'P', 'K', 'I', 'N', 'S'], // Day 265: PUMPKIN, PUMPKINS, SPUNK
    ['S', 'Q', 'U', 'A', 'S', 'H', 'E', 'S'], // Day 266: SQUASH, SQUASHES, HUES
    ['A', 'P', 'P', 'L', 'E', 'S', 'T', 'R'], // Day 267: APPLE, APPLES, REST
    ['C', 'I', 'D', 'E', 'R', 'S', 'T', 'O'], // Day 268: CIDER, CIDERS, STORE
    ['H', 'A', 'R', 'V', 'E', 'S', 'T', 'R'], // Day 269: HARVEST, VEST, HARES
    ['B', 'O', 'U', 'N', 'T', 'Y', 'E', 'S'], // Day 270: BOUNTY, BOUNTIFUL, YES
    ['M', 'I', 'G', 'R', 'A', 'T', 'E', 'S'], // Day 271: MIGRATE, MIGRATES, MATES
    ['F', 'L', 'O', 'C', 'K', 'I', 'N', 'G'], // Day 272: FLOCK, FLOCKING, LINGO
    ['S', 'O', 'U', 'T', 'H', 'E', 'R', 'N'], // Day 273: SOUTH, SOUTHERN, HORN
    ['W', 'I', 'N', 'T', 'E', 'R', 'E', 'D'], // Day 274: WINTER, WINTERED, WIRED

    // October (31 days)
    ['S', 'P', 'O', 'O', 'K', 'Y', 'E', 'R'], // Day 275: SPOOKY, SPOOK, YES, PORE
    ['E', 'E', 'R', 'I', 'E', 'S', 'T', 'R'], // Day 276: EERIE, EERIEST, REST
    ['H', 'A', 'U', 'N', 'T', 'E', 'D', 'S'], // Day 277: HAUNT, HAUNTED, DATES
    ['G', 'H', 'O', 'S', 'T', 'L', 'Y', 'E'], // Day 278: GHOST, GHOSTLY, LOST
    ['P', 'H', 'A', 'N', 'T', 'O', 'M', 'S'], // Day 279: PHANTOM, PHANTOMS, MOTHS
    ['S', 'P', 'E', 'C', 'T', 'R', 'A', 'L'], // Day 280: SPECTRAL, CAST, LEAP
    ['S', 'C', 'A', 'R', 'Y', 'E', 'R', 'S'], // Day 281: SCARY, SCARES, YES, CARS
    ['C', 'R', 'E', 'E', 'P', 'Y', 'E', 'R'], // Day 282: CREEPY, CREEP, YES, PEER
    ['G', 'R', 'I', 'M', 'E', 'R', 'S', 'T'], // Day 283: GRIM, GRIMES, REST, TIMER
    ['S', 'I', 'N', 'I', 'S', 'T', 'E', 'R'], // Day 284: SINISTER, SISTER, NEST
    ['M', 'A', 'C', 'A', 'B', 'R', 'E', 'S'], // Day 285: MACABRE, CARES, MACES
    ['M', 'O', 'R', 'B', 'I', 'D', 'E', 'S'], // Day 286: MORBID, RIDE, MODES, SOME
    ['G', 'H', 'A', 'S', 'T', 'L', 'Y', 'E'], // Day 287: GHASTLY, GASH, LAST
    ['G', 'R', 'U', 'E', 'S', 'O', 'M', 'E'], // Day 288: GRUESOME, ROGUE, SOME
    ['M', 'O', 'N', 'S', 'T', 'E', 'R', 'S'], // Day 289: MONSTER, MONSTERS, NEST
    ['G', 'O', 'B', 'L', 'I', 'N', 'S', 'E'], // Day 290: GOBLIN, GOBLINS, LOGINS
    ['Z', 'O', 'M', 'B', 'I', 'E', 'S', 'R'], // Day 291: ZOMBIE, ZOMBIES, ROSE
    ['V', 'A', 'M', 'P', 'I', 'R', 'E', 'S'], // Day 292: VAMPIRE, VAMPIRES, RIME
    ['W', 'E', 'R', 'E', 'W', 'O', 'L', 'F'], // Day 293: WEREWOLF, LOWER, WERE
    ['F', 'A', 'N', 'G', 'S', 'E', 'R', 'T'], // Day 294: FANG, FANGS, REST, SNARE
    ['C', 'L', 'A', 'W', 'S', 'E', 'R', 'T'], // Day 295: CLAW, CLAWS, REST, SCALE
    ['T', 'A', 'L', 'O', 'N', 'S', 'E', 'R'], // Day 296: TALON, TALONS, SORE, NEST
    ['W', 'I', 'T', 'C', 'H', 'E', 'S', 'R'], // Day 297: WITCH, WITCHES, REST
    ['C', 'A', 'U', 'L', 'D', 'R', 'O', 'N'], // Day 298: CAULDRON, CLAD, ROUND
    ['B', 'R', 'O', 'O', 'M', 'S', 'T', 'E'], // Day 299: BROOM, BROOMS, STORM
    ['S', 'P', 'E', 'L', 'L', 'S', 'E', 'R'], // Day 300: SPELL, SPELLS, EELS, SEER
    ['P', 'O', 'T', 'I', 'O', 'N', 'S', 'E'], // Day 301: POTION, POTIONS, SNOOP
    ['C', 'O', 'S', 'T', 'U', 'M', 'E', 'S'], // Day 302: COSTUME, COSTUMES, MOUSE
    ['M', 'A', 'S', 'K', 'E', 'D', 'R', 'S'], // Day 303: MASK, MASKED, DESK, MARS
    ['T', 'R', 'I', 'C', 'K', 'S', 'E', 'R'], // Day 304: TRICK, TRICKS, REST
    ['T', 'R', 'E', 'A', 'T', 'S', 'R', 'I'], // Day 305: TREAT, TREATS, IRATE

    // November (30 days)
    ['T', 'H', 'A', 'N', 'K', 'S', 'E', 'R'], // Day 306: THANKS, SNAKE, REST, HANK
    ['F', 'E', 'A', 'S', 'T', 'I', 'N', 'G'], // Day 307: FEAST, FEASTING, STING
    ['T', 'U', 'R', 'K', 'E', 'Y', 'S', 'R'], // Day 308: TURKEY, TURKEYS, RUSE
    ['S', 'T', 'U', 'F', 'F', 'I', 'N', 'G'], // Day 309: STUFFING, FUSING, STING
    ['G', 'R', 'A', 'V', 'Y', 'E', 'R', 'S'], // Day 310: GRAVY, GRAVIES, YES
    ['C', 'R', 'A', 'N', 'B', 'E', 'R', 'Y'], // Day 311: CRANBERRY, CRANE, BARE
    ['P', 'I', 'E', 'S', 'R', 'E', 'T', 'A'], // Day 312: PIE, PIES, REST, TIERS
    ['P', 'O', 'T', 'A', 'T', 'O', 'E', 'S'], // Day 313: POTATO, POTATOES, ATOP
    ['S', 'W', 'E', 'E', 'T', 'P', 'O', 'T'], // Day 314: SWEET, POTATO, WEST, POET
    ['C', 'O', 'R', 'N', 'B', 'R', 'E', 'A'], // Day 315: CORN, CORNBREAD, CANE
    ['R', 'O', 'L', 'L', 'S', 'T', 'E', 'R'], // Day 316: ROLL, ROLLS, REST, STORE
    ['B', 'U', 'T', 'T', 'E', 'R', 'S', 'A'], // Day 317: BUTTER, BUTTERS, RATS
    ['S', 'A', 'U', 'C', 'E', 'S', 'T', 'R'], // Day 318: SAUCE, SAUCES, REST, CAST
    ['C', 'A', 'S', 'S', 'E', 'R', 'O', 'L'], // Day 319: CASSEROLE, CASE, SORE
    ['Y', 'A', 'M', 'S', 'E', 'R', 'T', 'O'], // Day 320: YAM, YAMS, REST, STORE
    ['P', 'E', 'C', 'A', 'N', 'S', 'T', 'R'], // Day 321: PECAN, PECANS, REST, CAST
    ['W', 'A', 'L', 'N', 'U', 'T', 'S', 'E'], // Day 322: WALNUT, WALNUTS, ANTS
    ['C', 'H', 'E', 'S', 'T', 'N', 'U', 'T'], // Day 323: CHESTNUT, CHEST, HUNT
    ['H', 'A', 'Z', 'E', 'L', 'N', 'U', 'T'], // Day 324: HAZELNUT, HAZEL, NEAT
    ['A', 'L', 'M', 'O', 'N', 'D', 'S', 'E'], // Day 325: ALMOND, ALMONDS, DEALS
    ['G', 'A', 'T', 'H', 'E', 'R', 'S', 'I'], // Day 326: GATHER, GATHERS, IRATE
    ['F', 'A', 'M', 'I', 'L', 'Y', 'E', 'S'], // Day 327: FAMILY, FAMILIES, FLIES
    ['B', 'L', 'E', 'S', 'S', 'E', 'D', 'R'], // Day 328: BLESS, BLESSED, ELDER
    ['G', 'R', 'A', 'T', 'E', 'F', 'U', 'L'], // Day 329: GRATEFUL, GRATE, FUEL
    ['P', 'L', 'E', 'N', 'T', 'Y', 'F', 'U'], // Day 330: PLENTY, PENT, FUEL, YET
    ['A', 'B', 'U', 'N', 'D', 'A', 'N', 'T'], // Day 331: ABUNDANT, BAND, TUNA
    ['S', 'H', 'A', 'R', 'I', 'N', 'G', 'S'], // Day 332: SHARE, SHARING, RAINS
    ['C', 'A', 'R', 'I', 'N', 'G', 'S', 'E'], // Day 333: CARE, CARING, RINGS
    ['K', 'I', 'N', 'D', 'N', 'E', 'S', 'S'], // Day 334: KIND, KINDNESS, DENS
    ['G', 'E', 'N', 'E', 'R', 'O', 'U', 'S'], // Day 335: GENEROUS, ROGUES, NOSE

    // December (31 days)
    ['W', 'I', 'N', 'T', 'R', 'Y', 'E', 'S'], // Day 336: WINTRY, WINTER, YES
    ['S', 'N', 'O', 'W', 'F', 'A', 'L', 'L'], // Day 337: SNOWFALL, SNOW, FALLS
    ['B', 'L', 'I', 'Z', 'Z', 'A', 'R', 'D'], // Day 338: BLIZZARD, LIZARD, DRIZZLE
    ['F', 'R', 'O', 'S', 'T', 'Y', 'E', 'R'], // Day 339: FROSTY, FROST, ROSY
    ['I', 'C', 'I', 'C', 'L', 'E', 'S', 'R'], // Day 340: ICICLE, ICICLES, SLICE
    ['S', 'L', 'E', 'D', 'D', 'I', 'N', 'G'], // Day 341: SLED, SLEDDING, DING
    ['S', 'K', 'A', 'T', 'I', 'N', 'G', 'S'], // Day 342: SKATE, SKATING, GAINS
    ['S', 'K', 'I', 'I', 'N', 'G', 'S', 'E'], // Day 343: SKI, SKIING, KINGS, SIGN
    ['T', 'O', 'B', 'O', 'G', 'G', 'A', 'N'], // Day 344: TOBOGGAN, BOAT, BATON
    ['S', 'N', 'O', 'W', 'M', 'A', 'N', 'S'], // Day 345: SNOWMAN, SNOWMANS, OWNS
    ['C', 'A', 'R', 'O', 'L', 'S', 'E', 'R'], // Day 346: CAROL, CAROLS, SORE
    ['J', 'I', 'N', 'G', 'L', 'E', 'S', 'R'], // Day 347: JINGLE, JINGLES, SLING
    ['M', 'E', 'R', 'R', 'Y', 'E', 'S', 'T'], // Day 348: MERRY, MERRIER, REST
    ['J', 'O', 'L', 'L', 'Y', 'E', 'R', 'S'], // Day 349: JOLLY, JOLLIER, YES
    ['F', 'E', 'S', 'T', 'I', 'V', 'E', 'R'], // Day 350: FESTIVE, FEST, VEST
    ['W', 'R', 'E', 'A', 'T', 'H', 'S', 'I'], // Day 351: WREATH, WREATHS, IRATE
    ['G', 'A', 'R', 'L', 'A', 'N', 'D', 'S'], // Day 352: GARLAND, GARLANDS, DARN
    ['T', 'I', 'N', 'S', 'E', 'L', 'R', 'Y'], // Day 353: TINSEL, LISTEN, YES
    ['O', 'R', 'N', 'A', 'M', 'E', 'N', 'T'], // Day 354: ORNAMENT, MEANT, NEAT
    ['T', 'R', 'I', 'M', 'M', 'I', 'N', 'G'], // Day 355: TRIM, TRIMMING, MINT
    ['S', 'T', 'O', 'C', 'K', 'I', 'N', 'G'], // Day 356: STOCKING, STOCK, KINGS
    ['C', 'H', 'I', 'M', 'N', 'E', 'Y', 'S'], // Day 357: CHIMNEY, CHIMNEYS, MINE
    ['C', 'A', 'N', 'D', 'L', 'E', 'S', 'R'], // Day 358: CANDLE, CANDLES, LENS
    ['M', 'I', 'S', 'T', 'L', 'E', 'T', 'O'], // Day 359: MISTLETOE, MOIST, SMILE
    ['H', 'O', 'L', 'L', 'Y', 'E', 'R', 'S'], // Day 360: HOLLY, HOLLIES, YES
    ['B', 'E', 'L', 'L', 'S', 'T', 'O', 'R'], // Day 361: BELL, BELLS, REST, STORE
    ['S', 'A', 'N', 'T', 'A', 'C', 'L', 'A'], // Day 362: SANTA, CLAUS, ANTS, SALT
    ['R', 'E', 'I', 'N', 'D', 'E', 'E', 'R'], // Day 363: REINDEER, DEER, RIND
    ['S', 'L', 'E', 'I', 'G', 'H', 'T', 'S'], // Day 364: SLEIGH, SLEIGHS, SIGHT
    ['G', 'I', 'F', 'T', 'S', 'R', 'E', 'A']  // Day 365: GIFT, GIFTS, REST, IRATE
];

// Game state
let gameState = {
    letters: [],
    grid: Array(10).fill(null).map(() => Array(10).fill(null)),
    letterBank: [],
    words: [],
    gridSize: 10
};

// Initialize game
function initGame() {
    gameState.letters = generateRandomLetters(8);
    gameState.letterBank = [...gameState.letters];
    gameState.grid = Array(10).fill(null).map(() => Array(10).fill(null));
    gameState.words = [];

    createGrid();
    renderLetterBank();
    updateStats();
    clearValidationResults();
}

// Generate letters from predefined sets that can form words
function generateRandomLetters(count) {
    // Pick a random letter set from the predefined sets
    const randomSetIndex = Math.floor(Math.random() * LETTER_SETS.length);
    const selectedSet = [...LETTER_SETS[randomSetIndex]];

    // Shuffle the letters for variety
    for (let i = selectedSet.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedSet[i], selectedSet[j]] = [selectedSet[j], selectedSet[i]];
    }

    return selectedSet;
}

// Create the grid
function createGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';

    for (let row = 0; row < gameState.gridSize; row++) {
        for (let col = 0; col < gameState.gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Add drop event listeners
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('drop', handleDrop);
            cell.addEventListener('dragleave', handleDragLeave);
            cell.addEventListener('click', handleCellClick);

            gridElement.appendChild(cell);
        }
    }
}

// Render letter bank
function renderLetterBank() {
    const letterBankElement = document.getElementById('letter-bank');
    letterBankElement.innerHTML = '';

    gameState.letterBank.forEach((letter, index) => {
        const tile = createLetterTile(letter, index);
        letterBankElement.appendChild(tile);
    });
}

// Create a letter tile
function createLetterTile(letter, index) {
    const tile = document.createElement('div');
    tile.className = 'letter-tile';
    tile.draggable = true;
    tile.textContent = letter;
    tile.dataset.letter = letter;
    tile.dataset.index = index;

    // Add points indicator
    const points = document.createElement('span');
    points.className = 'points';
    points.textContent = LETTER_POINTS[letter];
    tile.appendChild(points);

    // Add drag event listeners
    tile.addEventListener('dragstart', handleDragStart);
    tile.addEventListener('dragend', handleDragEnd);

    return tile;
}

// Drag and drop handlers
let draggedElement = null;
let draggedFrom = null;

function handleDragStart(e) {
    draggedElement = e.target;
    draggedElement.classList.add('dragging');

    // Check if dragging from grid or letter bank
    if (e.target.parentElement.classList.contains('cell')) {
        draggedFrom = {
            type: 'grid',
            row: parseInt(e.target.parentElement.dataset.row),
            col: parseInt(e.target.parentElement.dataset.col)
        };
    } else {
        draggedFrom = {
            type: 'bank',
            index: parseInt(e.target.dataset.index)
        };
    }

    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    draggedElement.classList.remove('dragging');
    draggedElement = null;
    draggedFrom = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const cell = e.target.classList.contains('cell') ? e.target : e.target.closest('.cell');
    if (cell && !cell.querySelector('.letter-tile')) {
        cell.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const cell = e.target.classList.contains('cell') ? e.target : e.target.closest('.cell');
    if (cell) {
        cell.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();

    const cell = e.target.classList.contains('cell') ? e.target : e.target.closest('.cell');
    if (!cell) return;

    cell.classList.remove('drag-over');

    // Check if cell is already occupied
    if (cell.querySelector('.letter-tile')) {
        return;
    }

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const letter = draggedElement.dataset.letter;

    // Remove from previous location
    if (draggedFrom.type === 'grid') {
        gameState.grid[draggedFrom.row][draggedFrom.col] = null;
        const oldCell = document.querySelector(`.cell[data-row="${draggedFrom.row}"][data-col="${draggedFrom.col}"]`);
        if (oldCell) {
            oldCell.classList.remove('occupied');
        }
    } else if (draggedFrom.type === 'bank') {
        const index = gameState.letterBank.indexOf(letter);
        if (index > -1) {
            gameState.letterBank.splice(index, 1);
        }
    }

    // Add to new location
    gameState.grid[row][col] = letter;
    cell.classList.add('occupied');

    // Move the tile
    draggedElement.remove();
    const newTile = createLetterTile(letter, -1);
    cell.appendChild(newTile);

    updateStats();
    clearValidationResults();
}

// Handle clicking on a cell to return letter to bank
function handleCellClick(e) {
    const cell = e.target.classList.contains('cell') ? e.target : e.target.closest('.cell');
    if (!cell) return;

    const tile = cell.querySelector('.letter-tile');
    if (!tile) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const letter = gameState.grid[row][col];

    // Remove from grid
    gameState.grid[row][col] = null;
    cell.classList.remove('occupied');
    tile.remove();

    // Add back to letter bank
    gameState.letterBank.push(letter);
    renderLetterBank();
    updateStats();
    clearValidationResults();
}

// Update game statistics
function updateStats() {
    const placedCount = gameState.letters.length - gameState.letterBank.length;
    document.getElementById('placed-count').textContent = `${placedCount}/${gameState.letters.length}`;
    document.getElementById('letter-count').textContent = gameState.letters.length;
}

// Find all words on the grid
function findWords() {
    const words = [];

    // Find horizontal words
    for (let row = 0; row < gameState.gridSize; row++) {
        let word = '';
        let positions = [];

        for (let col = 0; col < gameState.gridSize; col++) {
            if (gameState.grid[row][col]) {
                word += gameState.grid[row][col];
                positions.push({ row, col });
            } else {
                if (word.length > 1) {
                    words.push({ word, positions, direction: 'horizontal' });
                }
                word = '';
                positions = [];
            }
        }

        if (word.length > 1) {
            words.push({ word, positions, direction: 'horizontal' });
        }
    }

    // Find vertical words
    for (let col = 0; col < gameState.gridSize; col++) {
        let word = '';
        let positions = [];

        for (let row = 0; row < gameState.gridSize; row++) {
            if (gameState.grid[row][col]) {
                word += gameState.grid[row][col];
                positions.push({ row, col });
            } else {
                if (word.length > 1) {
                    words.push({ word, positions, direction: 'vertical' });
                }
                word = '';
                positions = [];
            }
        }

        if (word.length > 1) {
            words.push({ word, positions, direction: 'vertical' });
        }
    }

    return words;
}

// Check if a word is valid using dictionary API
async function checkWordInDictionary(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        return response.ok;
    } catch (error) {
        console.error(`Error checking word "${word}":`, error);
        // If API fails, assume word is valid to not block gameplay
        return true;
    }
}

// Validate words with dictionary check
async function validateWords() {
    const words = findWords();
    gameState.words = words;

    // Check if all letters are placed
    if (gameState.letterBank.length > 0) {
        displayValidationResults(words, false, 'Not all letters have been placed on the board.');
        return;
    }

    // Check if all letters are connected
    if (!areAllLettersConnected()) {
        displayValidationResults(words, false, 'All letters must be connected in a single group.');
        return;
    }

    // Show loading state
    displayValidationResults(words, true, '', true);

    // Check each word against dictionary
    const wordValidations = await Promise.all(
        words.map(async (wordObj) => ({
            ...wordObj,
            isValid: await checkWordInDictionary(wordObj.word)
        }))
    );

    // Count valid words
    const validWords = wordValidations.filter(w => w.isValid);
    document.getElementById('word-count').textContent = validWords.length;

    displayValidationResults(wordValidations, true);
}

// Check if all letters on the grid are connected
function areAllLettersConnected() {
    // Find all occupied cells
    const occupiedCells = [];
    for (let row = 0; row < gameState.gridSize; row++) {
        for (let col = 0; col < gameState.gridSize; col++) {
            if (gameState.grid[row][col]) {
                occupiedCells.push({ row, col });
            }
        }
    }

    if (occupiedCells.length === 0) return false;
    if (occupiedCells.length === 1) return true;

    // BFS to check connectivity
    const visited = new Set();
    const queue = [occupiedCells[0]];
    visited.add(`${occupiedCells[0].row},${occupiedCells[0].col}`);

    while (queue.length > 0) {
        const { row, col } = queue.shift();

        // Check adjacent cells
        const adjacent = [
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 },
            { row, col: col + 1 }
        ];

        for (const adj of adjacent) {
            if (adj.row >= 0 && adj.row < gameState.gridSize &&
                adj.col >= 0 && adj.col < gameState.gridSize &&
                gameState.grid[adj.row][adj.col] &&
                !visited.has(`${adj.row},${adj.col}`)) {

                visited.add(`${adj.row},${adj.col}`);
                queue.push(adj);
            }
        }
    }

    return visited.size === occupiedCells.length;
}

// Display validation results
function displayValidationResults(words, success, errorMessage = '', isLoading = false) {
    const resultsElement = document.getElementById('validation-results');
    resultsElement.classList.remove('hidden');

    let html = '<h3>Validation Results</h3>';

    if (!success) {
        html += `<p class="error">${errorMessage}</p>`;
    } else if (isLoading) {
        html += `<p>Checking words against dictionary...</p>`;
    } else {
        const validWords = words.filter(w => w.isValid !== false);
        const invalidWords = words.filter(w => w.isValid === false);

        if (invalidWords.length === 0) {
            html += `<p class="success">All letters are connected! You formed ${validWords.length} valid word${validWords.length !== 1 ? 's' : ''}!</p>`;
        } else {
            html += `<p class="success">All letters are connected!</p>`;
            html += `<p class="error">${invalidWords.length} invalid word${invalidWords.length !== 1 ? 's' : ''} found. Try rearranging your letters!</p>`;
        }
    }

    if (words.length > 0 && !isLoading) {
        html += '<div class="word-list">';
        words.forEach(({ word, direction, isValid }) => {
            const validClass = isValid === false ? 'invalid' : '';
            const statusIcon = isValid === false ? '❌' : '✓';
            const statusText = isValid === false ? 'not in dictionary' : direction;

            html += `<div class="word-item ${validClass}">
                <span class="word">${word} ${statusIcon}</span>
                <span class="status">(${statusText})</span>
            </div>`;
        });
        html += '</div>';
    }

    resultsElement.innerHTML = html;
}

function clearValidationResults() {
    const resultsElement = document.getElementById('validation-results');
    resultsElement.innerHTML = '';
    resultsElement.classList.add('hidden');
}

// Clear the board
function clearBoard() {
    // Return all letters to bank
    for (let row = 0; row < gameState.gridSize; row++) {
        for (let col = 0; col < gameState.gridSize; col++) {
            if (gameState.grid[row][col]) {
                gameState.letterBank.push(gameState.grid[row][col]);
                gameState.grid[row][col] = null;
            }
        }
    }

    // Re-render everything
    createGrid();
    renderLetterBank();
    updateStats();
    clearValidationResults();
}

// Event listeners
document.getElementById('new-game').addEventListener('click', initGame);
document.getElementById('validate').addEventListener('click', validateWords);
document.getElementById('clear-board').addEventListener('click', clearBoard);

// Initialize the game on page load
window.addEventListener('DOMContentLoaded', initGame);
