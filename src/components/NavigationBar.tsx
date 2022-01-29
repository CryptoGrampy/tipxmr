import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '~/img/logo.png'
import Image from "next/image"
import { Stack } from "@mui/material"

export default function NavigationBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Image src={Logo} width={110} height={22} />
                    <Stack direction="row" >
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Sign Up</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
