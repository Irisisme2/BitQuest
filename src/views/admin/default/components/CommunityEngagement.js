import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Divider,
  Button,
  useColorModeValue,
  Stack,
  Select,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Flex,
  Progress,
} from '@chakra-ui/react';
import { FaThumbsUp, FaComment, FaHeart, FaLaugh, FaPlus } from 'react-icons/fa';
import Avatar1 from 'assets/img/avatars/avatar1.png';
import Avatar2 from 'assets/img/avatars/avatar2.png';
import Avatar3 from 'assets/img/avatars/avatar3.png';
import Avatar4 from 'assets/img/avatars/avatar4.png';
import Card from 'components/card/Card.js';

// Przykładowe dane dla guildStatus
const guildStatus = {
  name: 'Crypto Warriors',
  level: 5,
  achievements: [
    { title: 'Top Guild of the Month', date: '2024-08-01' },
    { title: 'Champion of the Arena', date: '2024-07-15' },
    { title: 'Guild Strategist Award', date: '2024-06-30' },
    { title: 'Master of Quests', date: '2024-06-01' },
  ],
  progress: [
    { category: 'Battle Victories', progress: 80 },
    { category: 'Raid Participation', progress: 60 },
    { category: 'Treasure Hunts', progress: 90 },
    { category: 'Quest Completes', progress: 70 },
  ],
  recentActivities: [
    { activity: 'Guild Battle Victory', date: '2024-08-28' },
    { activity: 'New Guild Member Joined', date: '2024-08-27' },
    { activity: 'Guild Treasure Hunt Completed', date: '2024-08-25' },
    { activity: 'Guild Raid Participation', date: '2024-08-24' },
  ],
};

// Przykładowe dane dla socialFeed
const socialFeed = [
  {
    id: 1,
    user: 'User123',
    content: 'Just completed a major quest! 🎉',
    date: '2024-08-28',
    avatar: Avatar1,
    comments: ['Awesome!', 'Congrats!'],
    reactions: { thumbsUp: 12, heart: 3, laugh: 2 },
  },
  {
    id: 2,
    user: 'PlayerOne',
    content: 'Check out my new NFT collection! 🌟',
    date: '2024-08-27',
    avatar: Avatar2,
    comments: ['Nice collection!', 'Wow!'],
    reactions: { thumbsUp: 20, heart: 5, laugh: 1 },
  },
  {
    id: 3,
    user: 'GamerGirl',
    content: 'Excited for the upcoming guild event! 🏆',
    date: '2024-08-26',
    avatar: Avatar3,
    comments: ['Can’t wait!', 'See you there!'],
    reactions: { thumbsUp: 8, heart: 2, laugh: 4 },
  },
  {
    id: 4,
    user: 'CryptoFan',
    content: 'Participated in a successful raid! 🚀',
    date: '2024-08-25',
    avatar: Avatar4,
    comments: ['Great job!', 'Awesome raid!'],
    reactions: { thumbsUp: 15, heart: 1, laugh: 0 },
  },
];

const CommunityEngagement = () => {
  const [feedFilter, setFeedFilter] = useState('All');
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleFilterChange = (e) => {
    setFeedFilter(e.target.value);
  };

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      socialFeed.push({
        id: socialFeed.length + 1,
        user: 'CurrentUser',
        content: newPost,
        date: new Date().toISOString().split('T')[0],
        avatar: Avatar1,
        comments: [],
        reactions: { thumbsUp: 0, heart: 0, laugh: 0 },
      });
      setNewPost('');
      toast({
        title: 'Post added.',
        description: "Your new post has been added to the feed.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddComment = () => {
    if (selectedPost !== null && newComment.trim()) {
      const updatedFeed = socialFeed.map(post => {
        if (post.id === selectedPost) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      });
      socialFeed.splice(0, socialFeed.length, ...updatedFeed);
      setNewComment('');
      setSelectedPost(null);
      toast({
        title: 'Comment added.',
        description: "Your comment has been added.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReaction = (postId, type) => {
    const updatedFeed = socialFeed.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [type]: post.reactions[type] + 1,
          },
        };
      }
      return post;
    });
    socialFeed.splice(0, socialFeed.length, ...updatedFeed);
  };

  const filteredFeed = feedFilter === 'All'
    ? socialFeed
    : socialFeed.filter(post => post.content.includes(feedFilter));

  return (
    <VStack spacing="20px" align="stretch">
      {/* Guild Status */}
      <Card bg={cardBg}  shadow="md" p="4">
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          Guild Status
        </Text>
        <VStack spacing="4" align="stretch">
          <Box>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Guild: {guildStatus.name}
            </Text>
            <HStack spacing="4" mt="2">
              <Badge colorScheme="blue">Level {guildStatus.level}</Badge>
              {guildStatus.achievements.map((ach, index) => (
                <Badge key={index} colorScheme="green">{ach.title}</Badge>
              ))}
            </HStack>
          </Box>
          <Divider />
          <Box>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Recent Activities
            </Text>
            <VStack spacing="2" align="stretch">
              {guildStatus.recentActivities.map((activity, index) => (
                <HStack key={index} spacing="4">
                  <Text color={textColor}>
                    {activity.activity}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    - {activity.date}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>
          <Divider />
          <Card>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Guild Progress
            </Text>
            <Stack spacing="4" mt="4">
              {guildStatus.progress.map((progress, index) => (
                <Box key={index}>
                  <Text>{progress.category}</Text>
                  <Progress value={progress.progress} size="sm" colorScheme="green" mt="2" />
                  <Text textAlign="right" fontSize="sm" color="gray.500">{progress.progress}%</Text>
                </Box>
              ))}
            </Stack>
          </Card>
        </VStack>
      </Card>

      {/* Social Feed */}
      <Card bg={cardBg} shadow="md" p="4">
        <HStack justify="space-between">
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            Social Feed
          </Text>
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
            Add Post
          </Button>
        </HStack>
        <Select mt="2" onChange={handleFilterChange} value={feedFilter}>
          <option value="All">All</option>
          <option value="Quest">Quest</option>
          <option value="NFT">NFT</option>
          <option value="Event">Event</option>
        </Select>
        <VStack spacing="4" align="stretch" mt="4">
          {filteredFeed.map(post => (
            <Box key={post.id} p="4" borderWidth="1px"  borderColor="gray.200" bg="gray.50">
              <HStack spacing="4">
                <Avatar src={post.avatar} name={post.user} size="lg" />
                <VStack align="start" spacing="1">
                  <Text fontWeight="bold" color={textColor}>
                    {post.user}
                  </Text>
                  <Text color={textColor}>
                    {post.content}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {post.date}
                  </Text>
                  <HStack spacing="4">
                    <IconButton
                      aria-label="Like"
                      icon={<FaThumbsUp />}
                      variant="outline"
                      onClick={() => handleReaction(post.id, 'thumbsUp')}
                    />
                    <IconButton
                      aria-label="Heart"
                      icon={<FaHeart />}
                      variant="outline"
                      onClick={() => handleReaction(post.id, 'heart')}
                    />
                    <IconButton
                      aria-label="Laugh"
                      icon={<FaLaugh />}
                      variant="outline"
                      onClick={() => handleReaction(post.id, 'laugh')}
                    />
                  </HStack>
                  <VStack spacing="2" align="start" mt="2">
                    {post.comments.map((comment, index) => (
                      <Text key={index} fontSize="sm" color="gray.600">
                        - {comment}
                      </Text>
                    ))}
                  </VStack>
                  <HStack spacing="2">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment();
                        }
                      }}
                    />
                    <Button colorScheme="blue" onClick={handleAddComment}>
                      Add Comment
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Card>

      {/* Modal for Adding Post */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="4">
              <Textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={handlePostChange}
              />
              <Button colorScheme="blue" onClick={handleAddPost}>
                Post
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default CommunityEngagement;

