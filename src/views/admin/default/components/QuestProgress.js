import React, { useState } from "react";
import {
  Box,
  Progress,
  Text,
  VStack,
  Divider,
  HStack,
  Tag,
  Tooltip,
  Icon,
  Button,
  useColorModeValue,
  Collapse,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import { MdCheckCircle, MdCancel, MdInfo } from "react-icons/md";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip } from "recharts";
import Card from "components/card/Card.js"; // Ensure this path is correct for your project

const QuestProgress = () => {
  // Example data
  const quests = [
    {
      name: "Dragon Slayer Challenge",
      progress: 65, // Percentage
      milestones: [
        { name: "Defeat the Fire Dragon", completed: true, description: "Slayed the Fire Dragon in the Ember Mountains." },
        { name: "Collect Dragon Scales", completed: true, description: "Gathered 10 Dragon Scales from the Fire Dragon." },
        { name: "Forge the Dragon Sword", completed: false, description: "Create the Dragon Sword using the collected scales." },
        { name: "Defend the Kingdom", completed: false, description: "Use the Dragon Sword to protect the kingdom from invaders." },
        { name: "Claim the Dragon's Treasure", completed: false, description: "Retrieve the treasure from the Dragon's lair." },
      ],
    },
    {
      name: "Ancient Ruins Expedition",
      progress: 50,
      milestones: [
        { name: "Find the Entrance", completed: true, description: "Discovered the hidden entrance to the Ancient Ruins." },
        { name: "Decode the Ancient Script", completed: true, description: "Deciphered the script on the ruins' walls." },
        { name: "Navigate the Traps", completed: true, description: "Successfully navigated through the traps inside the ruins." },
        { name: "Retrieve the Lost Artifact", completed: false, description: "Find the ancient artifact rumored to be hidden inside." },
        { name: "Escape the Ruins", completed: false, description: "Escape the ruins safely with the artifact." },
      ],
    },
    // Add more quests if needed
  ];

  // State for modal visibility
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle modal open
  const openModal = (milestone) => {
    setSelectedMilestone(milestone);
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMilestone(null);
  };

  // Colors for the PieChart
  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#FF7F50'];

  // Color scheme for the progress bar
  const progressBarBg = useColorModeValue("gray.100", "gray.700");
  const progressBarColor = useColorModeValue("teal", "blue");

  return (
    <VStack spacing="20px" align="start">
      {quests.map((quest, index) => (
        <Card key={index}  bg="white">
          <Text fontSize="lg" fontWeight="bold" mb="2">
            {quest.name}
          </Text>
          <Progress
            value={quest.progress}
            colorScheme={progressBarColor}
            bg={progressBarBg}
            size="md"
            mb="2"
          />
          <Text fontSize="sm" color="gray.600" mb="2">
            Progress: {quest.progress}%
          </Text>
          <Box mb="4">
            <Text fontSize="sm" fontWeight="semibold" mb="1">
              Milestones:
            </Text>
            {quest.milestones.map((milestone, idx) => (
              <HStack
                key={idx}
                spacing="2"
                align="center"
                mb="1"
              >
                <Tooltip
                  label={milestone.description}
                  aria-label="Milestone description"
                >
                  <Icon
                    as={milestone.completed ? MdCheckCircle : MdCancel}
                    color={milestone.completed ? "green.500" : "red.500"}
                    cursor="pointer"
                  />
                </Tooltip>
                <Text fontSize="sm" color={milestone.completed ? "green.600" : "red.600"}>
                  {milestone.name}
                </Text>
                <Button
                  size="sm"
                  variant="link"
                  onClick={() => openModal(milestone)}
                >
                  <Icon as={MdInfo} color="blue.500" />
                </Button>
              </HStack>
            ))}
          </Box>
          <Divider my="2" />
          <Text fontSize="sm" fontWeight="semibold" mb="2">
            Quest Summary
          </Text>
          <PieChart width={200} height={200}>
            <Pie
              data={[
                { name: "Completed", value: quest.milestones.filter(m => m.completed).length },
                { name: "Remaining", value: quest.milestones.filter(m => !m.completed).length }
              ]}
              cx={100}
              cy={100}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </Card>
      ))}
      
      {/* Modal for milestone details */}
      {selectedMilestone && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedMilestone.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="4">{selectedMilestone.description}</Text>
              {/* You can add more details or interactive content here */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
};

export default QuestProgress;
