import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  useColorModeValue,
  Select,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from '@chakra-ui/react';
import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft2 from 'assets/img/nfts/Nft2.png';
import Nft3 from 'assets/img/nfts/Nft3.png';
import Nft4 from 'assets/img/nfts/Nft4.png';
import Nft5 from 'assets/img/nfts/Nft5.png';
import Nft6 from 'assets/img/nfts/Nft6.png';
import BTC from 'assets/img/icons/BTC.png'; // Ikona BTC
import { SearchIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card.js';

const nftData = [
  { id: 2, name: 'Ancient Relic', image: Nft1, description: 'An ancient relic from a forgotten era.', value: '0.18', date: '2024-06-20', owner: '0x456...def' },
  { id: 3, name: 'Golden Sword', image: Nft3, description: 'A golden sword with legendary status.', value: '0.35', date: '2024-05-15', owner: '0x789...ghi' },
  { id: 4, name: 'Enchanted Armor', image: Nft4, description: 'Armor imbued with magical properties.', value: '0.22', date: '2024-08-01', owner: '0xabc...jkl' },
  { id: 5, name: 'Rare Potion', image: Nft5, description: 'A potion with rare and powerful effects.', value: '0.10', date: '2024-08-10', owner: '0xdef...mno' },
  { id: 6, name: 'Mystic Amulet', image: Nft6, description: 'An amulet with mystical powers.', value: '0.30', date: '2024-08-20', owner: '0xghi...pqr' },
];

const marketplaceActivity = [
  { type: 'Sale', item: 'Mystic Dragon', price: '0.25 BTC', date: '2024-08-25' },
  { type: 'Listing', item: 'Ancient Relic', price: '0.18 BTC', date: '2024-08-24' },
  { type: 'Trade', item: 'Golden Sword', price: '0.35 BTC', date: '2024-08-23' },
  { type: 'Sale', item: 'Enchanted Armor', price: '0.22 BTC', date: '2024-08-22' },
];

const NFTAndCollectibles = () => {
  const [selectedNft, setSelectedNft] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const { isOpen: isNftOpen, onOpen: onNftOpen, onClose: onNftClose } = useDisclosure();
  const { isOpen: isActivityOpen, onOpen: onActivityOpen, onClose: onActivityClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const filteredNfts = nftData
    .filter(nft => filter === 'All' || nft.date.includes(filter))
    .filter(nft => nft.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'value') return parseFloat(b.value) - parseFloat(a.value);
      return 0;
    });

  const handleNftClick = (nft) => {
    setSelectedNft(nft);
    onNftOpen();
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    onActivityOpen();
  };

  return (
    <Card p="4" boxShadow="md" bg={cardBg} w="440px">
    <VStack spacing="4" align="start" w="full">
      {/* Filter and Sort */}
      <HStack spacing="4" mb="4" w="full" align="center">
        <FormControl>
          <FormLabel htmlFor="filter">Filter by Date</FormLabel>
          <Select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Select Date Range">
            <option value="All">All</option>
            <option value="2024-07">July 2024</option>
            <option value="2024-08">August 2024</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="sort">Sort by</FormLabel>
          <Select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} placeholder="Select Sorting">
            <option value="name">Name</option>
            <option value="value">Value</option>
          </Select>
        </FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input placeholder="Search NFT" value={search} onChange={(e) => setSearch(e.target.value)} />
        </InputGroup>
      </HStack>

      {/* NFT Inventory Card */}
      <Box p="4"  boxShadow="md" bg={cardBg} w="400px">
        <Text fontSize="lg" fontWeight="bold" mb="4">
          NFT Inventory
        </Text>
        <VStack spacing="4" align="center">
          {filteredNfts.map((nft) => (
            <Box
              key={nft.id}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              cursor="pointer"
              onClick={() => handleNftClick(nft)}
              w="full"
              h="200px"
              position="relative"
              bg="gray.100"
              align="center"
            >
              <Image
                src={nft.image}
                alt={nft.name}
                objectFit="cover"
                w="full"
                h="180px"
              />
              <Box
                position="absolute"
                bottom="0"
                left="0"
                p="2"
                bg="rgba(0, 0, 0, 0.6)"
                color="white"
                width="full"
                textAlign="center"
                fontWeight="bold"
                fontSize="sm"
              >
                {nft.name}
              </Box>
              
            </Box>
            
          ))}
        </VStack>

      </Box>

      <Divider my="4" />

      {/* Marketplace Activity Card */}
      <Card p="4"  boxShadow="md" bg={cardBg} w="400px">
        <Text fontSize="lg" fontWeight="bold" mb="4">
          Marketplace Activity
        </Text>
        <VStack spacing="2">
          {marketplaceActivity.map((activity, index) => (
            <Box
              key={index}
              p="4"
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.200"
              bg="gray.50"
              cursor="pointer"
              onClick={() => handleActivityClick(activity)}
              w="full"
            >
              <HStack justify="space-between">
                <Text fontWeight="bold">{activity.type}</Text>
                <HStack spacing="1">
                  <Image src={BTC} alt="BTC Icon" boxSize="16px" />
                  <Text color={textColor}>{activity.price}</Text>
                </HStack>
              </HStack>
              <Text color="gray.500" fontSize="sm">{activity.item}</Text>
              <Text color="gray.400" fontSize="sm">{activity.date}</Text>
            </Box>
          ))}
        </VStack>
      </Card>

      {/* NFT Details Modal */}
      <Modal isOpen={isNftOpen} onClose={onNftClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>NFT Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedNft && (
              <Box p="4" borderWidth="1px" borderRadius="md" borderColor="gray.200" bg="gray.50">
                <Image src={selectedNft.image} alt={selectedNft.name} mb="4" />
                <Text fontSize="lg" fontWeight="bold" mb="2">
                  {selectedNft.name}
                </Text>
                <Text color={textColor} mb="2">
                  {selectedNft.description}
                </Text>
                <HStack spacing="1" mb="2">
                  <Image src={BTC} alt="BTC Icon" boxSize="20px" />
                  <Text fontSize="lg" fontWeight="bold">
                    {selectedNft.value} BTC
                  </Text>
                </HStack>
                <Text color="gray.500" mb="2">Owner: {selectedNft.owner}</Text>
                <Text color="gray.400" mb="4">Date Added: {selectedNft.date}</Text>
                <HStack spacing="4">
                  <Button colorScheme="blue" onClick={() => alert('Purchase feature coming soon!')}>
                    Purchase
                  </Button>
                  <Button colorScheme="green" onClick={() => alert('Sell feature coming soon!')}>
                    Sell
                  </Button>
                </HStack>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Marketplace Activity Details Modal */}
      <Modal isOpen={isActivityOpen} onClose={onActivityClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Marketplace Activity Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedActivity && (
              <Box p="4" borderWidth="1px" borderRadius="md" borderColor="gray.200" bg="gray.50">
                <Text fontSize="lg" fontWeight="bold" mb="2">
                  {selectedActivity.type} - {selectedActivity.item}
                </Text>
                <HStack spacing="1" mb="2">
                  <Image src={BTC} alt="BTC Icon" boxSize="20px" />
                  <Text fontSize="lg" fontWeight="bold">
                    {selectedActivity.price}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  Date: {selectedActivity.date}
                </Text>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
    </Card>
  );
};

export default NFTAndCollectibles;
