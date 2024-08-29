
// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Grid,
  Image,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { MdShowChart, MdAttachMoney, MdNotificationsActive, MdSportsEsports, MdFlag, MdCardGiftcard } from "react-icons/md"; 
import QuestTracker from "views/admin/default/components/QuestTracker";
import QuestProgress from "views/admin/default/components/QuestProgress";
import NFTAndCollectibles from "views/admin/default/components/NFTAndCollectibles";
import CommunityEngagement from "views/admin/default/components/CommunityEngagement";
import RecentRewards from "views/admin/default/components/RecentRewards";
import BTCFiAnalytics from "views/admin/default/components/BTCFiAnalytics";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import BTC from "assets/img/icons/BTC.png"
export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

<SimpleGrid
  columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
  gap="20px"
  mb="20px"
>
  {/* Total BTC Staked */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={
          <Image
            src={BTC} // Use the imported Bitcoin icon
            w="32px"
            h="32px"
            alt="Bitcoin Icon"
          />
        }
      />
    }
    name="Total BTC Staked"
    value="1.234 BTC" // Example value; replace with dynamic data if available
  />

  {/* BTC Staked in Quests */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={
          <Image
            src={BTC} // Use the imported Bitcoin icon
            w="32px"
            h="32px"
            alt="Bitcoin Icon"
          />
        }
      />
    }
    name="BTC Staked in Quests"
    value="0.567 BTC" // Example value; replace with dynamic data if available
  />

  {/* Total Earnings from Staking */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} // Finance-related icon
      />
    }
    name="Total Earnings from Staking"
    value="$12,345" // Example value; replace with dynamic data if available
  />

  {/* Active Quests */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={<Icon w="32px" h="32px" as={MdFlag} color={brandColor} />} // Icon representing active quests
      />
    }
    name="Active Quests"
    value="4"
  />

  {/* Notifications */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={<Icon w="32px" h="32px" as={MdNotificationsActive} color={brandColor} />} // Notification icon
      />
    }
    name="Notifications"
    value="3"
  />

  {/* Available Rewards */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={<Icon w="32px" h="32px" as={MdCardGiftcard} color={brandColor} />} // Rewards-related icon
      />
    }
    name="Available Rewards"
    value="2,345 Sats" // Example value; replace with dynamic data if available
  />
</SimpleGrid>
<Box p={4}>
      <Grid
        templateColumns="3fr 1fr"
        gap="20px"
        mb="20px"
      >
        <Box>
          <BTCFiAnalytics />
          <SimpleGrid gap="20px" mt="20px">
          <QuestTracker />
          <RecentRewards/>
          </SimpleGrid>
        </Box>
        <Box>
          <QuestProgress mb="20px" /> {/* Dodano margines dolny */}
          <SimpleGrid gap="20px" mt="20px">
            <NFTAndCollectibles />
            <MiniCalendar h="100%" minW="100%" selectRange={false} />
          </SimpleGrid>
        </Box>
      </Grid>
      <SimpleGrid mb="20px">
      <CommunityEngagement/>
      </SimpleGrid>
    </Box>
    </Box>
  );
}
