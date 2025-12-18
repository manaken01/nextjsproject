"use client";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { IUser } from "../types/user/userTypes";
import { useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationCityIcon from "@mui/icons-material/LocationCity";

interface IUserCardProps {
  user?: IUser;
}

export const UserCard = ({ user }: IUserCardProps) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/users/${user?.id}`);
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: "12px",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon color="primary" />
            <Typography variant="h6" component="div">
              {user?.name}
            </Typography>
          </Box>
          <Chip label={`@${user?.username}`} size="small" color="primary" />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <EmailIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <LocationCityIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {user?.address.city}
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleViewDetails}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  );
};
