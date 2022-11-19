
import CardMedia from "@mui/material/CardMedia"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { useTheme } from "@mui/material"

import PlayCircle from "@mui/icons-material/PlayCircle"
import SkipNext from "@mui/icons-material/SkipNext"
import SkipPrevious from "@mui/icons-material/SkipPrevious"
// import VolumeDown from "@mui/icons-material/VolumeDown"
// import VolumeUp from "@mui/icons-material/VolumeUp"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"

import candyImage from "../assets/candy.png"
import React, { useEffect, useState } from "react"


const Player = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const theme = useTheme()

    const handleShowVolume = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleHideVolume = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        console.log(anchorEl)
    }, [anchorEl])

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ maxWidth: 600, maxHeight: 400, m: 2 }} >
                <Card sx={{ boxShadow: theme.shadows[10], background: "primary.main" }}>
                    <CardContent>
                        <Box sx={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "space-between",
                            height: "100%"
                        }}>
                            <Box sx={{ display: "flex", gap: ".5rem", flexDirection: "column" }}>

                                <Typography variant="h6">
                                    Audio Player
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    - Wave Winds -
                                </Typography>
                                <Divider />
                                <Typography variant="caption" component="p" color="text.warning">
                                    You Just Didn't Like Me That Much
                                </Typography>

                                <Divider />
                                <Stack direction="row" alignItems={"center"} spacing={2}>
                                    <Typography variant="caption">00:00</Typography>
                                    <Slider />
                                    <Typography variant="caption">03:42</Typography>
                                </Stack>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "0px solid",
                                    borderColor: theme.palette.primary.main,
                                    borderRadius: theme.shape.borderRadius,
                                    padding: ".25rem",
                                    maxWidth: "fit-content"
                                }}>

                                    <IconButton size="large">
                                        <SkipPrevious />
                                    </IconButton>
                                    <IconButton size="large">
                                        <PlayCircle sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                    <IconButton size="large">
                                        <SkipNext />
                                    </IconButton>
                                    <IconButton
                                        aria-controls="volume-menu"
                                        onClick={handleShowVolume} size="large">
                                        <VolumeUpRounded />
                                    </IconButton>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleHideVolume}
                                    sx={{ width: 200, }} 
                                >
                                    {/* <MenuItem> */}
                                    <Stack sx={{px: 1}}>
                                        <Slider sx={{width: 70, mx: 1 }} color="secondary" />
                                    </Stack>
                                    {/* </MenuItem> */}
                                    {/* <Stack spacing={2} direction="row" alignItems="center">
                                        <IconButton size="small">
                                            <VolumeDown />
                                        </IconButton>
                                        <IconButton size="small">
                                            <VolumeUp />
                                        </IconButton>
                                    </Stack> */}
                                </Menu>
                            </Box>
                            <Box sx={{
                                background: "error",
                                padding: ".5rem",
                                height: 200,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: theme.shadows[4]
                            }}>
                                <CardMedia
                                    image={candyImage}
                                    component="img"
                                    sx={{
                                        boderRadius: theme.shape.borderRadius,
                                        border: "0px solid",
                                        height: 150, maxWidth: 100
                                    }}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}


export default Player