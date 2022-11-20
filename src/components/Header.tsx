import IconButton from "@mui/material/IconButton"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"

import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from "@mui/icons-material/AccountCircle"
import Brightness4 from "@mui/icons-material/Brightness4"
import Brightness7 from "@mui/icons-material/Brightness7"
import { useTheme } from "@mui/material"
import { useToggleTheme } from "../App"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import ArrowRight from "@mui/icons-material/ArrowRight"
import ArrowLeft from "@mui/icons-material/ArrowLeft"


function ToggleTheme() {
    const theme = useTheme()
    const themeToggle = useToggleTheme()

    const isLightMode = theme.palette.mode === "light"
    return (
        <Box>
            <IconButton size="large" onClick={themeToggle.toggleTheme} color="inherit">
                {isLightMode ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
        </Box>
    )
}

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Stack flexGrow={1} direction="row">
                        <Button
                            variant="outlined"
                            onClick={() => navigate(location.pathname === "/" ? "/playlist" : "/")}
                            color="inherit"
                        >
                            {location.pathname === "/" ? <>{"Playlist "} <ArrowRight /></> : <><ArrowLeft /> {" Player"}</>}
                        </Button>
                    </Stack>

                    <ToggleTheme />
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    )
}

export default Header