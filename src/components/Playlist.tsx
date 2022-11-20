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
import Slide, { SlideProps } from "@mui/material/Slide"
import Container from "@mui/material/Container"
import MusicNoteRounded from '@mui/icons-material/MusicNoteRounded'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import PlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck'
import Delete from '@mui/icons-material/Delete'
import { usePlaylist } from './usePlaylist'
import { usePlayer } from './usePlayer'

import {
  Droppable,
  DragDropContext,
  OnDragEndResponder,
  Draggable
} from "react-beautiful-dnd"


const PlayList = () => {
  const { currentIndex, removeTrack, playNext, moveTrack, changeCurrentIndex, tracks, addTracks } = usePlaylist()
  const { player, onTrackChange, onPlay } = usePlayer()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [removeTrackIndex, setRemoveTrackIndex] = useState<number | undefined>(undefined)

  const handleAddTracks = () => {
    const newTracks = [
      ...(inputRef.current?.files || [])
    ].filter(file => !!player.canPlayType(file.type) && !tracks.some(tr => tr.name === file.name))
    addTracks(newTracks, "end")
  }

  const handlePlayTrack = (index: number) => {
    player.src = ""
    onTrackChange(tracks[index])
    onPlay()
    changeCurrentIndex(index)
  }

  const handleDelete = (ev: React.MouseEvent, index: number) => {
    ev.preventDefault()
    ev.stopPropagation()
    setRemoveTrackIndex(index)
  }

  const handleRemoveTrack = () => {
    if (removeTrackIndex === undefined) return
    removeTrack(removeTrackIndex)
    
    if (removeTrackIndex === currentIndex) {
      playNext()
    }
    setRemoveTrackIndex(undefined)
  }

  const dragEndHandler: OnDragEndResponder = ({ destination, source }) => {
    // console.log({ destination, source })
    if (!destination) return
    moveTrack(source.index, destination.index)
    if (removeTrackIndex && removeTrackIndex === source.index) {
      setRemoveTrackIndex(destination.index)
    }
  }

  return (
    <Container maxWidth="md">

      <Snackbar
        autoHideDuration={5000}
        open={(removeTrackIndex !== undefined)}
        action={
          <Button
            color="inherit"
            onClick={() => setRemoveTrackIndex(undefined)}>
            Undo
          </Button>
        }
        TransitionComponent={(props: SlideProps) => <Slide {...props} direction="up" />}
        onClose={handleRemoveTrack}
        message={removeTrackIndex !== undefined && `(REMOVE): ${tracks[removeTrackIndex].name.slice(0,40)}..`} />
      <Box>
        <Divider />
        <Stack spacing={2} my={1} justifyContent="space-between" direction="row">
          <ListSubheader>Playlist</ListSubheader>
          <Button component="label" startIcon={<PlaylistAddCheck />}>
            Add Audio
            <input onChange={handleAddTracks} ref={inputRef} hidden type="file" multiple />
          </Button>
        </Stack>
        <Divider />
        <DragDropContext onDragEnd={dragEndHandler}>
          <Droppable droppableId='playlist-id'>
            {(provided) => <List ref={provided.innerRef} {...provided.droppableProps} >
              {tracks.map((track, i) => (
                <Draggable key={track.name} draggableId={track.name} index={i}>
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={snapshot.isDragging ? { background: "rgb(235,235,235)", color: "#333" } : {}}
                      onClick={() => handlePlayTrack(i)}
                      selected={i === currentIndex}
                      divider
                      button={false}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <MusicNoteRounded />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText sx={{ flexGrow: 1 }}>{track.name}</ListItemText>
                      <IconButton onClick={(ev) => handleDelete(ev, i)} color="error">
                        <Delete />
                      </IconButton>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

            </List>
            }
          </Droppable>
        </DragDropContext>
        {tracks.length === 0 && <Typography color="text.secondary" variant='h6' textAlign="center">
          No tracks on playlist
        </Typography>}

      </Box>
    </Container>
  )
}

export default PlayList