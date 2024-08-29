import { Box, SimpleGrid } from "@chakra-ui/react";
import BrowseQuests from "views/admin/Quests/components/BrowseQuests";

import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        spacing={{ base: "20px", xl: "20px" }}>
        <BrowseQuests/>
      </SimpleGrid>
    </Box>
  );
}
