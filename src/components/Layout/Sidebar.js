import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 280;

const menuSections = [
  {
    title: 'Genel',
    items: [
      { name: 'Ana Sayfa', path: '/' },
      { name: 'Kimlik Doğrulama', path: '/authentication' },
    ]
  },
  {
    title: 'İşlemler',
    items: [
      { name: 'Siparişler', path: '/orders' },
      { name: 'Para Çekme', path: '/withdrawals' },
    ]
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          mt: 8,
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          API Dokümantasyonu
        </Typography>
      </Box>
      
      {menuSections.map((section, index) => (
        <React.Fragment key={index}>
          <Typography
            variant="overline"
            sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}
          >
            {section.title}
          </Typography>
          <List>
            {section.items.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    },
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
        </React.Fragment>
      ))}
    </Drawer>
  );
};

export default Sidebar;