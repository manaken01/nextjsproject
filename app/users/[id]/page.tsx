"use client";

import  { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { IUser } from "@/app/types/user/userTypes";
import { getUserById } from "@/app/services/user/user";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoadingState } from "@/app/components/LoadingState";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = params.id as string;

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el usuario");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUser();
    }
  }, [userId]);

  const handleBack = () => {
    router.push("/users");
  };

  if (loading) return <Container maxWidth="md" sx={{ mt: 4 }}><LoadingState /></Container>;
  if (error || !user) return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Alert severity="error">{error || "Usuario no encontrado"}</Alert>
      <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>Volver</Button>
    </Container>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Volver
      </Button>

      <Card sx={{ borderRadius: "16px", p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          {user.name}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Nombre completo</Typography>
          <Typography variant="body1">{user.name}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Email</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Teléfono</Typography>
          <Typography variant="body1">{user.phone}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Website</Typography>
          <Typography variant="body1">{user.website}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>Compañía</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Nombre</Typography>
          <Typography variant="body1">{user.company.name}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>Dirección</Typography>
        <Typography variant="body1">
          {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
        </Typography>
      </Card>
    </Container>
  );
}