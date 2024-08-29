import React, { useState } from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  Divider,
  Image,
  Badge,
  useColorModeValue,
  Button,
  Tooltip,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card.js';

// Import icons
import BTC from 'assets/img/icons/BTC.png';
import RareDragonSkin from 'assets/img/icons/RareDragonSkin.png';
import MysticElixir from 'assets/img/icons/MysticElixir.png';

// Sample data for rewards
const sampleRewards = [
  {
    id: '1',
    type: 'BTC',
    amount: '0.0015 BTC',
    timestamp: '2024-08-28 14:35',
    description: 'Completed the Dragon Slayer Challenge.',
    rarity: 'High',
    icon: BTC, // Use imported BTC icon
    link: 'https://bitcoin.org', // Link for more information
  },
  {
    id: '2',
    type: 'NFT',
    amount: 'Rare Dragon Skin',
    timestamp: '2024-08-27 09:20',
    description: 'Unlocked Rare Dragon Skin NFT.',
    rarity: 'Legendary',
    icon: RareDragonSkin, // Use imported NFT icon
    link: 'https://nft.example.com', // Link for more information
  },
  {
    id: '3',
    type: 'Item',
    amount: 'Mystic Elixir',
    timestamp: '2024-08-26 17:45',
    description: 'Received Mystic Elixir for completing a quest.',
    rarity: 'Medium',
    icon: MysticElixir, // Use imported Item icon
    link: 'https://item.example.com', // Link for more information
  },
  // Add more rewards as needed
];

const RecentRewards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReward, setSelectedReward] = useState(null);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Call useColorModeValue at the top level
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRewardClick = (reward) => {
    setSelectedReward(reward);
    onOpen();
  };

  const handleClaimReward = (reward) => {
    // Mock claiming functionality
    if (claimedRewards.includes(reward.id)) {
      toast({
        title: 'Already Claimed',
        description: `You have already claimed ${reward.amount}.`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setClaimedRewards([...claimedRewards, reward.id]);
    toast({
      title: 'Reward Claimed',
      description: `You have claimed ${reward.amount}.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose(); // Close the modal after claiming
  };

  const filteredRewards = sampleRewards.filter((reward) =>
    reward.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card p="4" >
      <VStack spacing="4" align="start">
        <HStack mb="4" spacing="4" align="center">
          <Input
            placeholder="Search rewards..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="md"
          />
          <IconButton
            icon={<SearchIcon />}
            aria-label="Search rewards"
            onClick={() => {}}
          />
        </HStack>

        {filteredRewards.map((reward) => (
          <Card
            key={reward.id}
            p="4"
            boxShadow="sm"
            bg={cardBg}
            _hover={{ boxShadow: 'md', transform: 'scale(1.02)' }}
            transition="all 0.3s ease"
          >
            <HStack spacing="4">
              <Image src={reward.icon} boxSize="50px" alt={reward.type} borderRadius="md" />
              <VStack align="start" spacing="1" flex="1">
                <HStack spacing="2">
                  <Text fontSize="md" fontWeight="bold">
                    {reward.amount}
                  </Text>
                  <Badge colorScheme={reward.type === 'BTC' ? 'yellow' : reward.type === 'NFT' ? 'purple' : 'teal'}>
                    {reward.type}
                  </Badge>
                </HStack>
                <Text fontSize="sm" color={textColor}>
                  {reward.description}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {reward.timestamp}
                </Text>
                <Flex mt="2" align="center" gap="2">
                  <Text fontSize="xs" color="gray.600">
                    Rarity: <strong>{reward.rarity}</strong>
                  </Text>
                  <Link href={reward.link} isExternal>
                    <Button size="sm" colorScheme="blue">
                      View Details
                    </Button>
                  </Link>
                </Flex>
              </VStack>
            </HStack>
            <Divider my="2" />
            <HStack spacing="2" justify="end">
              <Tooltip label="Claim Reward" aria-label="Claim Reward Tooltip">
                <Button
                  size="sm"
                  colorScheme="green"
                  variant="outline"
                  onClick={() => handleClaimReward(reward)}
                  isDisabled={claimedRewards.includes(reward.id)}
                >
                  {claimedRewards.includes(reward.id) ? 'Claimed' : 'Claim'}
                </Button>
              </Tooltip>
              <Tooltip label="Share Reward" aria-label="Share Reward Tooltip">
                <Button size="sm" colorScheme="teal" variant="outline">
                  Share
                </Button>
              </Tooltip>
              <Button
                size="sm"
                colorScheme="teal"
                onClick={() => handleRewardClick(reward)}
              >
                More Info
              </Button>
            </HStack>
          </Card>
        ))}
      </VStack>

      {/* Modal for detailed reward view */}
      {selectedReward && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedReward.type} Reward Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={selectedReward.icon} boxSize="100px" alt={selectedReward.type} mb="4" />
              <Text fontSize="lg" fontWeight="bold">
                {selectedReward.amount}
              </Text>
              <Text fontSize="md" color="gray.600">
                {selectedReward.description}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Timestamp: {selectedReward.timestamp}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Rarity: {selectedReward.rarity}
              </Text>
              <Link href={selectedReward.link} isExternal>
                <Button mt="4" colorScheme="blue">
                  View More Details
                </Button>
              </Link>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" onClick={() => handleClaimReward(selectedReward)}>
                Claim Reward
              </Button>
              <Button ml="3" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default RecentRewards;
