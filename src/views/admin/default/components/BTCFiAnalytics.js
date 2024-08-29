import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
  useColorModeValue,
  Select,
  Button,
  FormLabel,
  Input,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaBitcoin } from 'react-icons/fa'; 
import BTC from 'assets/img/icons/BTC.png'; 
import RareDragonSkin from 'assets/img/icons/RareDragonSkin.png';
import Diamond from 'assets/img/icons/Diamond.png';


const sampleStakingData = [
  { month: 'Jan', earnings: 0.05, pool: 'BTC Savings Account' },
  { month: 'Feb', earnings: 0.07, pool: 'BTC Liquidity Pool' },
  { month: 'Mar', earnings: 0.10, pool: 'BTC Lending Pool' },
  { month: 'Apr', earnings: 0.12, pool: 'BTC Savings Account' },
  { month: 'May', earnings: 0.15, pool: 'BTC Liquidity Pool' },
  { month: 'Jun', earnings: 0.18, pool: 'BTC Lending Pool' },
];

const sampleGrowthData = [
  { date: '2024-01', value: 0.5 },
  { date: '2024-02', value: 0.55 },
  { date: '2024-03', value: 0.6 },
  { date: '2024-04', value: 0.65 },
  { date: '2024-05', value: 0.7 },
  { date: '2024-06', value: 0.75 },
];

// Mock data fetch function
const fetchData = (startDate, endDate) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stakingData: sampleStakingData,
        growthData: sampleGrowthData,
      });
    }, 1000);
  });
};

const BTCFiAnalytics = () => {
  const [selectedPool, setSelectedPool] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-06-30' });
  const [selectedMetric, setSelectedMetric] = useState('Earnings');
  const [stakingData, setStakingData] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchData(dateRange.start, dateRange.end);
      setStakingData(data.stakingData);
      setGrowthData(data.growthData);
      setLoading(false);
    };

    loadData();
  }, [dateRange]);

  const handleExport = () => {
    // Function to export data
    alert('Export functionality is not implemented yet.');
  };

  const filteredStakingData = selectedPool === 'All' ? stakingData : stakingData.filter(d => d.pool === selectedPool);

  return (
    <VStack spacing="4" align="start">
      {/* Staking Performance Card */}
      <Card boxShadow="md" bg={cardBg}>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          Staking Performance
        </Text>
        
        {/* Date Range Picker */}
        <HStack spacing="4" mb="4">
          <Box>
            <FormLabel htmlFor="start-date">Start Date</FormLabel>
            <Input
              id="start-date"
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="end-date">End Date</FormLabel>
            <Input
              id="end-date"
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </Box>
        </HStack>
        
        {/* Pool Selector */}
        <HStack mb="4">
          <FormLabel htmlFor="pool-select" mb="0">
            Select Pool:
          </FormLabel>
          <Select
            id="pool-select"
            value={selectedPool}
            onChange={(e) => setSelectedPool(e.target.value)}
          >
            <option value="All">All Pools</option>
            <option value="BTC Savings Account">BTC Savings Account</option>
            <option value="BTC Liquidity Pool">BTC Liquidity Pool</option>
            <option value="BTC Lending Pool">BTC Lending Pool</option>
          </Select>
        </HStack>
        
        {/* Metric Selector */}
        <HStack mb="4">
          <FormLabel htmlFor="metric-select" mb="0">
            Select Metric:
          </FormLabel>
          <Select
            id="metric-select"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            <option value="Earnings">Earnings</option>
            <option value="ROI">ROI</option>
            <option value="Historical">Historical</option>
          </Select>
        </HStack>
        
        {/* Loading Spinner */}
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <HStack spacing="4" align="start">
            <Box flex="1">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredStakingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="earnings" stroke="#4A90E2" dot={{ fill: '#4A90E2' }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
            <Box flex="1">
              <VStack spacing="4" align="start">
                <Stat>
                  <StatLabel>Total Staked BTC</StatLabel>
                  <StatNumber>0.75 BTC</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" /> 0.15 BTC from last month
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Total Earnings</StatLabel>
                  <StatNumber>0.70 BTC</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" /> 0.10 BTC from last month
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Average Earnings</StatLabel>
                  <StatNumber>0.12 BTC</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" /> 0.02 BTC from last month
                  </StatHelpText>
                </Stat>
              </VStack>
            </Box>
          </HStack>
        )}
      </Card>

      <Divider my="4" />

      {/* Asset Growth Card */}
      <Card boxShadow="md" bg={cardBg}>
        <Text fontSize="lg" fontWeight="bold" mb="4">
          Asset Growth
        </Text>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#F5A623" dot={{ fill: '#F5A623' }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Divider my="4" />

      
      {/* Modal for Detailed View */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reward Details</ModalHeader>
          <ModalBody>
            <Text fontWeight="bold">BTC Reward</Text>
            <Text color="gray.500">0.05 BTC</Text>
            <Text color="gray.400" fontSize="sm">Received on 2024-06-30</Text>
            <Text mt="4">Details about the reward...</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr="3" onClick={() => setModalOpen(false)}>
              Close
            </Button>
            <Button variant="outline" onClick={handleExport}>
              Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default BTCFiAnalytics;
