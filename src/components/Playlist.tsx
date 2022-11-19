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
import MusicNoteRounded from '@mui/icons-material/MusicNoteRounded'
import Button from '@mui/material/Button'
import PlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck'
import { usePlaylist } from './usePlaylist'
import { usePlayer } from './usePlayer'


const PlayList = () => {
  const { currentIndex, tracks, addTracks } = usePlaylist()
  const { duration, log, onTrackChange, onPlay } = usePlayer()
  const [nlog, setNlog] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const inputElement = inputRef.current
    // inputElement?.setAttribute("webkitdirectory", "true")
  }, [])

  const handleAddTracks = () => {
    const audioPlayer = new Audio()
    const newTracks = [
      ...(inputRef.current?.files || [])
    ].filter(t => !Boolean(audioPlayer.canPlayType(t.type)))
    addTracks(newTracks, "end")
  }

  const handlePlayTrack = (index: number) => {
    alert("add track")
    setNlog("add track - " + index)
    onTrackChange(tracks[index])
    onPlay()
  }

  return (

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
            <ListItem onClick={() => handlePlayTrack(i)} selected={i === currentIndex} divider button key={Math.random()}>
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
      {<p>{log}</p>}
      <p>NLOG:</p>
      <p>{nlog} -- {duration}</p>
      {tracks.length === 0 && <Typography color="text.secondary" variant='h6' textAlign="center">
        No tracks on playlist
      </Typography>}

    </Box>
  )
}

export default PlayList