"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography, Alert, AlertTitle } from "@mui/material";
import { IUser } from "../types/user/userTypes";
import { getUsers } from "../services/user/user";
import NavBar from "../components/NavBar";
import { SearchField } from "../components/SearchField";
import { LoadingState } from "../components/LoadingState";
import { UserCard } from "../components/UserCard";

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar usuarios"
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <Box>
      <NavBar />
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant="h3"
            textAlign="center"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Directorio de Usuarios
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Busca y explora información de usuarios
          </Typography>

          <SearchField
            searchValue={searchValue}
            onSearchValueChange={handleSearchValueChange}
          />
          {loading && <LoadingState />}

          {error && !loading && (
            <Alert severity="error" sx={{ borderRadius: "12px" }}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}

          {!loading && !error && filteredUsers.length === 0 && (
            <Alert severity="info" sx={{ borderRadius: "12px" }}>
              <AlertTitle>Sin resultados</AlertTitle>
              No se encontraron usuarios que coincidan con "{searchValue}"
            </Alert>
          )}

          {!loading && !error && filteredUsers.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {filteredUsers.length} usuario(s) encontrado(s)
              </Typography>
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
