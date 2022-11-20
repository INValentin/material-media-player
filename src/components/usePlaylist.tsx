import React, { useEffect, useMemo, useRef, useState } from 'react'

type Position = number | "start" | "end"

interface PlaylistAPI {
  tracks: File[]
  currentIndex: number
  addTrack: (track: File, pos: Position) => void
  addTracks: (newTracks: File[], pos: Position) => void
  removeTrack: (index: number) => void
  moveTrack: (fromIndex: number, toIndex: number) => void
  changeCurrentIndex: (pos: Position) => void
  playNext: () => void
  playPrev: () => void
}

const PlaylistContext = React.createContext({} as PlaylistAPI)

export const usePlaylist = () => {
  return React.useContext(PlaylistContext)
}

const PlaylistProvider = ({ children }: { children: React.ReactNode }) => {
  const [tracks, setTracks] = useState<File[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  const changeCurrentIndex = (pos: Position) => {
    if (typeof pos === "string") {
      pos === "start" && setCurrentIndex(0)
      pos === "end" && setCurrentIndex(tracks.length - 1)
    } else {
      if (tracks.length <= pos) {
        setCurrentIndex(0)
      } else if (pos < 0) {
        setCurrentIndex(tracks.length - 1)
      } else {
        setCurrentIndex(pos)
      }
    }
  }

  const playNext = () => {
    changeCurrentIndex(currentIndex + 1)
  }

  const playPrev = () => {
    changeCurrentIndex(currentIndex - 1)
  }

  const addTrack = (track: File, pos: Position) => {
    if (pos === "start") {
      return setTracks([track, ...tracks])
    } else if (pos === "end") {
      return setTracks([...tracks, track])
    }

    const newTracks = [...tracks]
    newTracks.splice(pos, 0, track)
    setTracks(newTracks)
  }

  const addTracks = (newTracks: File[], pos: Position) => {
    if (pos === "start") {
      return setTracks([...newTracks, ...tracks])
    } else if (pos === "end") {
      return setTracks([...tracks, ...newTracks])
    }

    const tracksCopy = [...tracks]
    tracksCopy.splice(pos, 0, ...newTracks)
    setTracks(tracksCopy)
  }

  const removeTrack = (index: number) => {
    setTracks(tracks.filter((_t, i) => i !== index))
  }

  const moveTrack = (fromIndex: number, toIndex: number) => {
    const newTracks = [...tracks]
    const track = newTracks.splice(fromIndex, 1)[0]
    newTracks.splice(toIndex, 0, track)
    setTracks(newTracks)
  }

  const playlistAPI = {
    tracks,
    currentIndex,
    addTrack,
    removeTrack,
    moveTrack,
    changeCurrentIndex,
    playNext,
    playPrev,
    addTracks
  }

  return <PlaylistContext.Provider value={playlistAPI}>
    {children}
  </PlaylistContext.Provider>
}


export default PlaylistProvider