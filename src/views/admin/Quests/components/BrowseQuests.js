import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  Image,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  CheckboxGroup,
  Checkbox,
  Spinner,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card.js';
import SpyMissionIcon from 'assets/img/icons/SpyMissionIcon.png';
import PuzzleIcon from 'assets/img/icons/PuzzleIcon.png';
import DungeonEscapeIcon from 'assets/img/icons/DungeonEscapeIcon.png';
import RareDragonSkin from 'assets/img/icons/RareDragonSkin.png';
import QuestIcon from 'assets/img/icons/QuestIcon.png';
import TreasureHuntIcon from 'assets/img/icons/TreasureHuntIcon.png';
import CombatIcon from 'assets/img/icons/CombatIcon.png';
import MysteryoftheLostCityIcon from 'assets/img/icons/MysteryoftheLostCityIcon.png';
import MagicPotionQuestIcon from 'assets/img/icons/MagicPotionQuestIcon.png';
import ArtifactRecoveryIcon from 'assets/img/icons/ArtifactRecoveryIcon.png';
import ArenaChampionIcon from 'assets/img/icons/ArenaChampionIcon.png';
import EnchantedForestIcon from 'assets/img/icons/EnchantedForestIcon.png';
import FortressSiegeIcon from 'assets/img/icons/FortressSiegeIcon.png';
import SeaVoyageIcon from 'assets/img/icons/SeaVoyageIcon.png';
import HauntedHouseIcon from 'assets/img/icons/HauntedHouseIcon.png';
import CursedTreasureIcon from 'assets/img/icons/CursedTreasureIcon.png';

// Przykładowe dane dla questów
const quests = [
  {
    id: 1,
    title: 'Dragon Slayer',
    description: 'Defeat the dragon and claim your reward!',
    difficulty: 'Hard',
    reward: 'NFT',
    startDate: '2024-08-30',
    endDate: '2024-09-30',
    type: 'Combat',
    tags: ['Epic', 'High Risk'],
    icon: RareDragonSkin,
    rewardsInBTC: 0.5,
    steps: [
      'Prepare your equipment.',
      'Travel to the dragon’s lair.',
      'Defeat the dragon in combat.',
      'Claim your reward from the quest master.',
    ],
    details: 'This quest requires you to defeat a powerful dragon that has been terrorizing the village. Make sure you are well-prepared for a challenging battle.',
  },
  {
    id: 2,
    title: 'Treasure Hunt',
    description: 'Find hidden treasures scattered across the map.',
    difficulty: 'Medium',
    reward: 'BTC',
    startDate: '2024-09-01',
    endDate: '2024-09-15',
    type: 'Adventure',
    tags: ['Fun', 'Exploration'],
    icon: TreasureHuntIcon,
    rewardsInBTC: 0.2,
    steps: [
      'Obtain the treasure map.',
      'Follow the clues across the map.',
      'Uncover hidden treasures.',
      'Return to claim your reward.',
    ],
    details: 'Embark on an adventure to find hidden treasures. Use the map and clues to guide you to your destination.',
  },
  {
    id: 3,
    title: 'Puzzle Challenge',
    description: 'Solve the intricate puzzles to advance.',
    difficulty: 'Easy',
    reward: 'Rare Items',
    startDate: '2024-08-29',
    endDate: '2024-09-05',
    type: 'Puzzle',
    tags: ['Brain Teaser', 'Casual'],
    icon: PuzzleIcon,
    rewardsInBTC: 0.05,
    steps: [
      'Receive the first puzzle.',
      'Solve the puzzle within the time limit.',
      'Receive the next puzzle.',
      'Complete all puzzles to win the quest.',
    ],
    details: 'Test your problem-solving skills with a series of challenging puzzles. Complete them all to earn rare items.',
  },
  {
    id: 4,
    title: 'Combat Training',
    description: 'Prepare for battle by completing training missions.',
    difficulty: 'Medium',
    reward: 'NFT',
    startDate: '2024-09-02',
    endDate: '2024-09-20',
    type: 'Combat',
    tags: ['Training', 'Skill Building'],
    icon: CombatIcon,
    rewardsInBTC: 0.1,
    steps: [
      'Complete basic combat drills.',
      'Participate in mock battles.',
      'Upgrade your skills with advanced missions.',
      'Receive a special NFT upon completion.',
    ],
    details: 'Enhance your combat abilities through a series of training missions. Successful completion will earn you an NFT.',
  },
  {
    id: 5,
    title: 'Mystery of the Lost City',
    description: 'Uncover the secrets of an ancient city lost in time.',
    difficulty: 'Hard',
    reward: 'NFT',
    startDate: '2024-09-05',
    endDate: '2024-10-05',
    type: 'Adventure',
    tags: ['Exploration', 'Epic'],
    icon: MysteryoftheLostCityIcon,
    rewardsInBTC: 0.7,
    steps: [
      'Travel to the Lost City.',
      'Solve ancient riddles.',
      'Discover hidden chambers.',
      'Uncover the city’s secrets and claim your NFT.',
    ],
    details: 'Venture into the Lost City and unravel its mysteries. This challenging quest will test your exploration and problem-solving skills.',
  },
  {
    id: 6,
    title: 'Magic Potion Quest',
    description: 'Collect rare ingredients and brew a powerful potion.',
    difficulty: 'Easy',
    reward: 'Rare Items',
    startDate: '2024-09-10',
    endDate: '2024-09-25',
    type: 'Puzzle',
    tags: ['Crafting', 'Casual'],
    icon: MagicPotionQuestIcon,
    rewardsInBTC: 0.03,
    steps: [
      'Gather rare ingredients from different locations.',
      'Follow the potion recipe carefully.',
      'Brew the potion in a magical cauldron.',
      'Deliver the potion to the quest giver to claim your reward.',
    ],
    details: 'Collect and craft a powerful potion. This quest requires you to gather ingredients and brew the potion correctly.',
  },
  {
    id: 7,
    title: 'Dungeon Escape',
    description: 'Navigate through a perilous dungeon to escape.',
    difficulty: 'Medium',
    reward: 'BTC',
    startDate: '2024-09-15',
    endDate: '2024-09-30',
    type: 'Combat',
    tags: ['Survival', 'High Risk'],
    icon: DungeonEscapeIcon,
    rewardsInBTC: 0.25,
    steps: [
      'Enter the dungeon and avoid traps.',
      'Defeat dungeon monsters.',
      'Find the exit and escape.',
      'Claim your BTC reward from the quest master.',
    ],
    details: 'Survive the dangers of the dungeon and find your way out. This quest is filled with traps and monsters to challenge your survival skills.',
  },
  {
    id: 8,
    title: 'Spy Mission',
    description: 'Complete covert operations and gather intel.',
    difficulty: 'Hard',
    reward: 'NFT',
    startDate: '2024-09-20',
    endDate: '2024-10-10',
    type: 'Adventure',
    tags: ['Stealth', 'Epic'],
    icon: SpyMissionIcon,
    rewardsInBTC: 0.6,
    steps: [
      'Infiltrate the enemy base.',
      'Gather critical intelligence.',
      'Evade capture and escape safely.',
      'Report back to complete the mission.',
    ],
    details: 'Undertake a series of stealth missions to gather crucial information. Your success will be rewarded with a valuable NFT.',
  },
  {
    id: 9,
    title: 'Artifact Recovery',
    description: 'Recover ancient artifacts from dangerous places.',
    difficulty: 'Medium',
    reward: 'BTC',
    startDate: '2024-09-25',
    endDate: '2024-10-05',
    type: 'Adventure',
    tags: ['Exploration', 'High Risk'],
    icon: ArtifactRecoveryIcon,
    rewardsInBTC: 0.4,
    steps: [
      'Identify locations with hidden artifacts.',
      'Navigate through dangers to reach the artifacts.',
      'Retrieve and secure the artifacts.',
      'Return to claim your BTC reward.',
    ],
    details: 'Embark on an adventure to recover valuable artifacts. Each artifact is guarded by challenges and dangers.',
  },
  {
    id: 10,
    title: 'Arena Champion',
    description: 'Compete in the arena and prove your skills.',
    difficulty: 'Hard',
    reward: 'NFT',
    startDate: '2024-10-01',
    endDate: '2024-10-20',
    type: 'Combat',
    tags: ['Competitive', 'Epic'],
    icon: ArenaChampionIcon,
    rewardsInBTC: 0.8,
    steps: [
      'Enter the arena and participate in battles.',
      'Defeat opponents to advance through ranks.',
      'Achieve the champion status.',
      'Receive your NFT and recognition.',
    ],
    details: 'Show off your combat skills in the arena. Compete against others and strive to become the champion.',
  },
  {
    id: 11,
    title: 'Enchanted Forest',
    description: 'Explore the enchanted forest and complete magical tasks.',
    difficulty: 'Easy',
    reward: 'Rare Items',
    startDate: '2024-08-25',
    endDate: '2024-09-15',
    type: 'Puzzle',
    tags: ['Magic', 'Casual'],
    icon: EnchantedForestIcon,
    rewardsInBTC: 0.02,
    steps: [
      'Explore the forest and interact with magical creatures.',
      'Complete tasks assigned by forest inhabitants.',
      'Solve puzzles to find hidden treasures.',
      'Return to claim your rare items.',
    ],
    details: 'Venture into the Enchanted Forest to complete magical tasks. Solve puzzles and find treasures hidden within.',
  },
  {
    id: 12,
    title: 'Fortress Siege',
    description: 'Lead a siege against a fortified fortress.',
    difficulty: 'Hard',
    reward: 'NFT',
    startDate: '2024-09-10',
    endDate: '2024-10-01',
    type: 'Combat',
    tags: ['Strategic', 'High Risk'],
    icon: FortressSiegeIcon,
    rewardsInBTC: 0.55,
    steps: [
      'Assemble your team for the siege.',
      'Plan and execute the attack on the fortress.',
      'Overcome defenses and capture the fortress.',
      'Collect your NFT reward from the victorious siege.',
    ],
    details: 'Lead a strategic siege against a heavily fortified fortress. Success requires careful planning and execution.',
  },
  {
    id: 13,
    title: 'Sea Voyage',
    description: 'Embark on a sea voyage and discover uncharted islands.',
    difficulty: 'Medium',
    reward: 'BTC',
    startDate: '2024-09-05',
    endDate: '2024-09-25',
    type: 'Adventure',
    tags: ['Exploration', 'Fun'],
    icon: SeaVoyageIcon,
    rewardsInBTC: 0.35,
    steps: [
      'Set sail on your sea voyage.',
      'Navigate through uncharted waters.',
      'Discover and explore new islands.',
      'Return to port to claim your BTC reward.',
    ],
    details: 'Embark on a thrilling sea voyage to discover new islands. Navigate and explore uncharted territories to earn your reward.',
  },
  {
    id: 14,
    title: 'Haunted House',
    description: 'Survive the night in a haunted house and uncover its secrets.',
    difficulty: 'Medium',
    reward: 'Rare Items',
    startDate: '2024-09-15',
    endDate: '2024-10-05',
    type: 'Puzzle',
    tags: ['Mystery', 'Casual'],
    icon: HauntedHouseIcon,
    rewardsInBTC: 0.07,
    steps: [
      'Enter the haunted house at night.',
      'Solve mysteries and avoid supernatural threats.',
      'Uncover the secrets hidden within.',
      'Escape safely and receive your rare items.',
    ],
    details: 'Survive a night in a haunted house filled with mysteries and supernatural occurrences. Uncover its secrets and claim your reward.',
  },
  {
    id: 15,
    title: 'Cursed Treasure',
    description: 'Find and lift the curse from a hidden treasure.',
    difficulty: 'Hard',
    reward: 'NFT',
    startDate: '2024-09-25',
    endDate: '2024-10-20',
    type: 'Adventure',
    tags: ['Epic', 'High Risk'],
    icon: CursedTreasureIcon,
    rewardsInBTC: 0.75,
    steps: [
      'Locate the hidden treasure.',
      'Solve the curse’s puzzle to lift it.',
      'Retrieve the treasure safely.',
      'Claim your NFT reward from the quest master.',
    ],
    details: 'Find and lift the curse from a hidden treasure. This challenging quest will test your problem-solving and exploration skills.',
  },
];


const BrowseQuests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState([]);
  const [reward, setReward] = useState([]);
  const [type, setType] = useState([]);
  const [tags, setTags] = useState([]);
  const [sortOption, setSortOption] = useState('relevance');
  const [filteredQuests, setFilteredQuests] = useState(quests);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 8;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedQuest, setSelectedQuest] = useState(null);

  useEffect(() => {
    filterAndSortQuests();
  }, [searchQuery, difficulty, reward, type, tags, sortOption, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
    setCurrentPage(1);
  };

  const handleRewardChange = (value) => {
    setReward(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value) => {
    setType(value);
    setCurrentPage(1);
  };

  const handleTagsChange = (value) => {
    setTags(value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const filterAndSortQuests = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = quests
        .filter(quest =>
          quest.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (difficulty.length ? difficulty.includes(quest.difficulty) : true) &&
          (reward.length ? reward.includes(quest.reward) : true) &&
          (type.length ? type.includes(quest.type) : true) &&
          (tags.length ? tags.some(tag => quest.tags.includes(tag)) : true)
        )
        .sort((a, b) => {
          switch (sortOption) {
            case 'popularity':
              return b.startDate.localeCompare(a.startDate); // Placeholder sort
            case 'newest':
              return new Date(b.startDate) - new Date(a.startDate);
            case 'relevance':
            default:
              return a.title.localeCompare(b.title);
          }
        });
      
      // Paginacja
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setFilteredQuests(filtered.slice(startIndex, endIndex));
      setLoading(false);
    }, 500); // Symulacja opóźnienia ładowania
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest);
    onOpen();
  };

  const handleAcceptQuest = () => {
    // Funkcja do obsługi przyjęcia questa (np. aktualizacja stanu lub wysłanie żądania do backendu)
    console.log('Quest accepted:', selectedQuest);
    onClose();
  };

  return (
    <Card>
      <Heading mb={4}>Browse Quests</Heading>

      {/* Search and Filters */}
      <Stack spacing={4} mb={6}>
        <Flex align="center" gap={4}>
          <Input
            placeholder="Search quests..."
            value={searchQuery}
            onChange={handleSearchChange}
            width="full"
            variant="outline"
            size="lg"
          />
          <IconButton
            icon={<SearchIcon />}
            aria-label="Search"
            onClick={() => filterAndSortQuests()}
          />
        </Flex>

        <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
          <Select placeholder="Filter by Difficulty" onChange={(e) => handleDifficultyChange([...e.target.selectedOptions].map(option => option.value))} multiple width="auto">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </Select>

          <Select placeholder="Filter by Reward" onChange={(e) => handleRewardChange([...e.target.selectedOptions].map(option => option.value))} multiple width="auto">
            <option value="BTC">BTC</option>
            <option value="NFT">NFT</option>
            <option value="Rare Items">Rare Items</option>
          </Select>

          <Select placeholder="Filter by Type" onChange={(e) => handleTypeChange([...e.target.selectedOptions].map(option => option.value))} multiple width="auto">
            <option value="Adventure">Adventure</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Combat">Combat</option>
          </Select>

          <CheckboxGroup onChange={(value) => handleTagsChange(value)} spacing={4}>
            <Checkbox value="Epic">Epic</Checkbox>
            <Checkbox value="Fun">Fun</Checkbox>
            <Checkbox value="Brain Teaser">Brain Teaser</Checkbox>
            <Checkbox value="Training">Training</Checkbox>
            <Checkbox value="High Risk">High Risk</Checkbox>
            <Checkbox value="Exploration">Exploration</Checkbox>
            <Checkbox value="Casual">Casual</Checkbox>
            <Checkbox value="Skill Building">Skill Building</Checkbox>
          </CheckboxGroup>

          <Select placeholder="Sort by" onChange={handleSortChange} width="auto">
            <option value="relevance">Relevance</option>
            <option value="popularity">Popularity</option>
            <option value="newest">Newest</option>
          </Select>
        </Flex>
      </Stack>

      {/* Quest Previews */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }} gap={6}>
        {loading ? (
          <Flex align="center" justify="center" height="200px">
            <Spinner size="xl" />
          </Flex>
        ) : filteredQuests.length > 0 ? (
          filteredQuests.map((quest) => (
            <Box
              key={quest.id}
              borderWidth={1}
              borderRadius="md"
              bg="white"
              p={4}
              onClick={() => handleQuestClick(quest)}
              cursor="pointer"
              boxShadow="md"
              transition="all 0.3s ease"
              _hover={{ boxShadow: 'lg', transform: 'scale(1.02)' }}
            >
              <VStack spacing={2} align="center" justify="center">
                <Image
                  boxSize="400px"
                  height="400px"
                  width="460px"
                  objectFit="cover"
                  src={quest.icon}
                  alt={quest.title}
                />
                <Heading size="md" textAlign="center">{quest.title}</Heading>
                <Text noOfLines={2} textAlign="center">{quest.description}</Text>
              </VStack>
            </Box>
          ))
        ) : (
          <Text>No quests found</Text>
        )}
      </Grid>

      {/* Pagination */}
      <Flex justify="center" mt={6}>
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <Text mx={4}>{currentPage}</Text>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={filteredQuests.length < itemsPerPage}>
          Next
        </Button>
      </Flex>

      {/* Quest Details Modal */}
      {selectedQuest && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedQuest.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image boxSize="200px" objectFit="cover" src={selectedQuest.icon} alt={selectedQuest.title} mb={4} />
              <Text mb={4}>{selectedQuest.description}</Text>
              <Text><strong>Difficulty:</strong> {selectedQuest.difficulty}</Text>
              <Text><strong>Reward:</strong> {selectedQuest.reward}</Text>
              <Text><strong>Reward in BTC:</strong> {selectedQuest.rewardsInBTC} BTC</Text>
              <Text><strong>Start Date:</strong> {new Date(selectedQuest.startDate).toLocaleDateString()}</Text>
              <Text><strong>End Date:</strong> {new Date(selectedQuest.endDate).toLocaleDateString()}</Text>
              <Divider my={4} />
              <Text><strong>Details:</strong></Text>
              <Text mb={4}>{selectedQuest.details}</Text>
              <Text><strong>Steps to complete:</strong></Text>
              <Stack spacing={2} mb={4}>
                {selectedQuest.steps.map((step, index) => (
                  <Text key={index}>- {step}</Text>
                ))}
              </Stack>
              <Button colorScheme="teal" onClick={handleAcceptQuest}>
                Accept Quest
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default BrowseQuests;