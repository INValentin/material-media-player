import React, { useEffect, useRef, useState } from 'react'
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import Container from "@mui/material/Container"
import MusicNoteRounded from '@mui/icons-material/MusicNoteRounded'
import Button from '@mui/material/Button'
import PlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck'
import { usePlaylist } from './usePlaylist'
import { usePlayer } from './usePlayer'


const PlayList = () => {
  const { currentIndex, changeCurrentTrack, tracks, addTracks } = usePlaylist()
  const { player, onTrackChange, onPlay } = usePlayer()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const inputElement = inputRef.current
  }, [])

  const handleAddTracks = () => {
    const audioPlayer = new Audio()
    const newTracks = [
      ...(inputRef.current?.files || [])
    ].filter(file => !!player.canPlayType(file.type) && !tracks.some(tr => tr.name === file.name))
    // console.log({ newTracks })
    addTracks(newTracks, "end")
  }

  const handlePlayTrack = (index: number) => {
    player.src = ""
    onTrackChange(tracks[index])
    onPlay()
    changeCurrentTrack(index)
  }

  return (
    <Container maxWidth="md">
      <Box>
        <Divider />
        <List>
          <Stack spacing={2} mb={1} justifyContent="space-between" direction="row">
            <ListSubheader>Playlist</ListSubheader>
            <Button component="label" startIcon={<PlaylistAddCheck />}>
              Add Audio
              <input onChange={handleAddTracks} ref={inputRef} hidden type="file" multiple />
            </Button>
          </Stack>
          <Divider />
          {tracks.map((track, i) => (
            <>
              <ListItem key={track.name} onClick={() => handlePlayTrack(i)} selected={i === currentIndex} divider button>
                <ListItemAvatar>
                  <Avatar>
                    <MusicNoteRounded />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>{track.name}</ListItemText>
              </ListItem>
            </>
          ))}
        </List>
        {tracks.length === 0 && <Typography color="text.secondary" variant='h6' textAlign="center">
          No tracks on playlist
        </Typography>}

      </Box>
    </Container>
  )
}

export default PlayList