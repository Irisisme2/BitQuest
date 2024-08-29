import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Divider,
  Badge,
  Tag,
  Progress,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import BTC from 'assets/img/icons/BTC.png';
import RareDragonSkin from 'assets/img/icons/RareDragonSkin.png';
import NFTItem from 'assets/img/icons/NFTItem.png';
import QuestIcon from 'assets/img/icons/QuestIcon.png';

// Sample data
const activeQuests = [
  {
    name: 'Dragon Slayer',
    progress: 60,
    timeRemaining: '2 days',
    description: 'Defeat the dragon and claim your reward. Special bonus: 0.01 BTC for each dragon defeated.',
    financialImplication: 'Increased BTC earnings based on performance in the dragon battle.',
    stages: [
      { stage: 'Stage 1', description: 'Find the dragon lair', completed: true },
      { stage: 'Stage 2', description: 'Defeat the dragon', completed: false },
    ],
    icon: RareDragonSkin,
  },
  {
    name: 'Treasure Hunt',
    progress: 80,
    timeRemaining: '5 hours',
    description: 'Find the hidden treasure in the ancient ruins. Reward: Rare NFT.',
    financialImplication: 'Potential for high-value NFT rewards that can be traded for BTC.',
    stages: [
      { stage: 'Stage 1', description: 'Locate the ruins', completed: true },
      { stage: 'Stage 2', description: 'Uncover the treasure', completed: false },
    ],
    icon: NFTItem,
  },
];

const completedQuests = [
  {
    name: 'Goblin Invasion',
    reward: '100 Gold, 0.05 BTC',
    completionDate: '2024-08-15',
    achievements: ['Heroic'],
    financialImplication: 'Earned BTC directly and additional in-game currency.',
    icon: BTC,
  },
  {
    name: 'Mystic Orb Collection',
    reward: '500 XP, 0.03 BTC',
    completionDate: '2024-07-20',
    achievements: ['Master Collector'],
    financialImplication: 'XP for character development and BTC as a financial reward.',
    icon: BTC,
  },
];

const upcomingQuests = [
  {
    name: 'Legendary Artifact',
    startDate: '2024-09-01',
    description: 'Search for the legendary artifact and become a legend. Special Event: Increased BTC stakes.',
    financialImplication: 'Potentially high BTC rewards based on stakes and performance.',
    icon: QuestIcon,
  },
  {
    name: 'Ancient Ruins Exploration',
    startDate: '2024-09-10',
    description: 'Explore the ancient ruins and uncover lost secrets. Bonus: Rare collectibles.',
    financialImplication: 'Rare collectibles that can be traded for BTC or used to increase in-game assets.',
    icon: QuestIcon,
  },
];

const QuestTracker = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const progressBarColor = useColorModeValue('teal', 'cyan');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedQuest, setSelectedQuest] = React.useState(null);

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest);
    onOpen();
  };

  const QuestItem = ({ quest, type }) => (
    <Box mb="4" p="4" borderWidth="1px" borderRadius="md" borderColor="gray.200" bg="gray.50">
      <HStack spacing="4" mb="2">
        <Image boxSize="50px" src={quest.icon} alt={`${quest.name} Icon`} borderRadius="full" />
        <Box flex="1">
          <Text fontWeight="bold">{quest.name}</Text>
          {type === 'active' && (
            <>
              <Text color={textColor} mb="2">{quest.description}</Text>
              <HStack spacing="2" mb="2">
                <Tag colorScheme="blue">{quest.timeRemaining}</Tag>
                <Tag colorScheme="green">{quest.progress}% Complete</Tag>
              </HStack>
              <Progress value={quest.progress} colorScheme={progressBarColor} size="sm" mb="2" />
              <Text color="gray.500" fontSize="sm" mb="2">
                Financial Implication: {quest.financialImplication}
              </Text>
              <Accordion allowToggle>
                {quest.stages.map((stage, index) => (
                  <AccordionItem key={index}>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {stage.stage}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb="4">
                      <Text color={textColor}>{stage.description}</Text>
                      <Text color="gray.500" fontSize="sm">
                        {stage.completed ? 'Completed' : 'Not Completed'}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
          {type === 'completed' && (
            <>
              <Text color={textColor}>Reward: {quest.reward}</Text>
              <Text color={textColor}>Completion Date: {quest.completionDate}</Text>
              <HStack spacing="2" mt="2">
                {quest.achievements.map((achievement, i) => (
                  <Badge key={i} colorScheme="purple">
                    {achievement}
                  </Badge>
                ))}
              </HStack>
              <Text color="gray.500" fontSize="sm" mt="2">
                Financial Implication: {quest.financialImplication}
              </Text>
            </>
          )}
          {type === 'upcoming' && (
            <>
              <Text color={textColor}>Starts on: {quest.startDate}</Text>
              <Text color={textColor} mb="2">
                {quest.description}
              </Text>
              <Text color="gray.500" fontSize="sm">
                Financial Implication: {quest.financialImplication}
              </Text>
              <Button colorScheme="blue" mt="4" onClick={() => handleQuestClick(quest)}>
                Add to Calendar
              </Button>
            </>
          )}
        </Box>
      </HStack>
    </Box>
  );

  return (
    <VStack spacing="4" align="start">
      {/* Active Quests Card */}
      <Card  boxShadow="md" bg={cardBg}>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          Active Quests
        </Text>
        {activeQuests.map((quest, index) => (
          <QuestItem key={index} quest={quest} type="active" />
        ))}
      </Card>

      <Divider my="4" />

      {/* Completed Quests Card */}
      <Card boxShadow="md" bg={cardBg}>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          Completed Quests
        </Text>
        {completedQuests.map((quest, index) => (
          <QuestItem key={index} quest={quest} type="completed" />
        ))}
      </Card>

      <Divider my="4" />

      {/* Upcoming Quests Card */}
      <Card  boxShadow="md">
        <Text fontSize="lg" fontWeight="bold" mb="4">
          Upcoming Quests
        </Text>
        {upcomingQuests.map((quest, index) => (
          <QuestItem key={index} quest={quest} type="upcoming" />
        ))}
      </Card>

      {/* Quest Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quest Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedQuest && (
              <Box p="4" borderWidth="1px" borderRadius="md" >
                <HStack spacing="4" mb="2">
                  <Image boxSize="50px" src={selectedQuest.icon} alt={`${selectedQuest.name} Icon`} borderRadius="full" />
                  <Box flex="1">
                    <Text fontWeight="bold">{selectedQuest.name}</Text>
                    <Text color={textColor} mb="2">{selectedQuest.description}</Text>
                    <Text color="gray.500" fontSize="sm" mb="2">
                      Financial Implication: {selectedQuest.financialImplication}
                    </Text>
                    {selectedQuest.stages && (
                      <Accordion allowToggle>
                        {selectedQuest.stages.map((stage, index) => (
                          <AccordionItem key={index}>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                {stage.stage}
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb="4">
                              <Text color={textColor}>{stage.description}</Text>
                              <Text color="gray.500" fontSize="sm">
                                {stage.completed ? 'Completed' : 'Not Completed'}
                              </Text>
                            </AccordionPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </Box>
                </HStack>
                <Button colorScheme="blue" mt="4">
                  Add to Calendar
                </Button>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default QuestTracker;
