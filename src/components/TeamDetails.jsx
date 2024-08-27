import React, { useState } from 'react';
import usersData from "../../src/users";
import UserCard from './UserCard';
import { Grid, TextField, Container, Pagination, Box, Typography, MenuItem, FormControl, InputLabel, Select, Checkbox, FormControlLabel } from '@mui/material';

const users = usersData.users;
function TeamDetails() {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [available, setAvailable] = useState(false);
  const [page, setPage] = useState(1);
  const [team, setTeam] = useState([]);
  const usersPerPage = 20;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    filterUsers(event.target.value, domain, gender, available);
  };

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
    filterUsers(search, event.target.value, gender, available);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    filterUsers(search, domain, event.target.value, available);
  };

  const handleAvailabilityChange = (event) => {
    setAvailable(event.target.checked);
    filterUsers(search, domain, gender, event.target.checked);
  };

  const filterUsers = (search, domain, gender, available) => {
    const query = search.toLowerCase();
    const filtered = users.filter(user => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(query);
      const matchesDomain = domain ? user.domain === domain : true;
      const matchesGender = gender ? user.gender === gender : true;
      const matchesAvailability = available ? user.available === available : true;
      return matchesSearch && matchesDomain && matchesGender && matchesAvailability;
    });
    setFilteredUsers(filtered);
    setPage(1); // Reset to first page on new filter
  };

  const handleSelectUser = (user) => {
    if (team.some(teamMember => teamMember.id === user.id)) {
      setTeam(team.filter(teamMember => teamMember.id !== user.id));
    } else if (!team.some(teamMember => teamMember.domain === user.domain)) {
      setTeam([...team, user]);
    }
  };

  const displayedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);
  return (
    <Container>
    <h1>User Management</h1>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
      />
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Domain</InputLabel>
            <Select value={domain} onChange={handleDomainChange}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              {/* Add more domains as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select value={gender} onChange={handleGenderChange}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              {/* Add more genders as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={<Checkbox checked={available} onChange={handleAvailabilityChange} />}
            label="Available"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {displayedUsers.map(user => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <UserCard user={user} onSelect={handleSelectUser} isSelected={team.some(teamMember => teamMember.id === user.id)} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(filteredUsers.length / usersPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
      <Box mt={4}>
        <Typography variant="h3">Selected Team</Typography>
        <Grid container spacing={2}>
          {team.map(user => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <UserCard user={user} onSelect={handleSelectUser} isSelected />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default TeamDetails;
