import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  Divider,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 280;
const drawerCollapsedWidth = 80;

const menuSections = [
  {
    title: 'General',
    items: [
      { name: 'Home', path: '/' },
      { name: 'Access URLs', path: '#access-urls' },
      { name: 'Authentication', path: '#authentication' }
    ]
  },
  {
    title: 'Operations',
    items: [
      { name: 'All Orders', path: '#orders' },
      { name: 'All Withdrawals', path: '#withdrawals' },

    ]
  },
  {
    title: 'Payments Methods',
    items: [
      { 
        name: 'H2H payment', 
        path: '/payment-operations-1',
        filter: [
          'order-save', 
          'order-status', 
          'order-sms',
          'withdrawal-save',
          'withdrawal-status/:transaction_id'
        ]
      },
      { 
        name: 'iframe(Pop-up) payment', 
        path: '/payment-operations-2',
        filter: [
          'generate-url',
          'order-status',
          'withdrawal-status/:transaction_id'
        ]
      }
    ]
  },
  {
    title: 'Reports',
    items: [
      { name: 'Order Reports', path: '#reports' },
      { name: 'Withdrawal Reports', path: '#withdrawal-reports' }
    ]
  },
  {
    title: 'Balance',
    items: [
      { name: 'Balance', path: '#balance' }
    ]
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');
  const [openMerchantInfo, setOpenMerchantInfo] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (location.pathname === '/payment-operations-1') {
      setActiveSection('payment-operations-1');
    } else if (location.pathname === '/' && !location.hash) {
      setActiveSection('home');
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/payment-operations-1') {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
          }
        });

        if (window.scrollY === 0 && location.pathname === '/') {
          setActiveSection('home');
        } else if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setActiveSection(hash.substring(1));
      const element = document.querySelector(hash);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [location]);

  const handleNavigation = (path, filter) => {
    if (path === '/') {
      navigate(path);
      setActiveSection('home');
      window.sessionStorage.removeItem('endpointFilter');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/payment-operations-1') {
      navigate(path);
      setActiveSection('payment-operations-1');
      window.sessionStorage.setItem('endpointFilter', JSON.stringify(filter));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/payment-operations-2') {
      navigate(path);
      setActiveSection('payment-operations-2');
      window.sessionStorage.setItem('endpointFilter', JSON.stringify(filter));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.startsWith('#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(path);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          setActiveSection(path.substring(1));
          window.sessionStorage.removeItem('endpointFilter');
        }
      }, 100);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
          }
        });

        if (window.scrollY === 0) {
          setActiveSection('home');
        } else if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    if (location.hash) {
      setActiveSection(location.hash.substring(1));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, location.hash]);

  const handleMerchantInfoClick = () => {
    setOpenMerchantInfo(!openMerchantInfo);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCollapseSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <IconButton 
        onClick={handleToggleSidebar} 
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1200, display: isMobile ? 'block' : 'none' }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isSidebarOpen}
        onClose={handleToggleSidebar}
        sx={{ 
          width: isSidebarCollapsed ? drawerCollapsedWidth : drawerWidth,
          minWidth: isSidebarCollapsed ? drawerCollapsedWidth : drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isSidebarCollapsed ? drawerCollapsedWidth : drawerWidth,
            minWidth: isSidebarCollapsed ? drawerCollapsedWidth : drawerWidth,
            boxSizing: 'border-box',
            mt: '64px',
            height: 'calc(100% - 64px)',
            zIndex: 1100,
            overflowY: 'auto'
          },
        }}
      >
        <Box sx={{ 
          position: 'sticky',
          top: 0,
          backgroundColor: 'background.paper',
          zIndex: 1,
          p: 2 
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'primary.main',
              cursor: 'pointer'
            }}
            onClick={() => handleNavigation('/')}
          >
            API Documentation
          </Typography>
          <IconButton onClick={handleCollapseSidebar} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        
        {menuSections.map((section, index) => (
          <React.Fragment key={index}>
            <Typography
              variant="overline"
              sx={{ 
                px: 2, 
                py: 1, 
                display: 'block', 
                color: 'text.secondary',
                position: 'sticky',
                top: 64,
                backgroundColor: 'background.paper',
                zIndex: 1
              }}
            >
              {section.title}
            </Typography>
            <List>
              {section.items.map((item) => (
                <React.Fragment key={item.path}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={
                        item.path === '/' 
                          ? activeSection === 'home'
                          : activeSection === item.path.substring(1)
                      }
                      onClick={
                        item.subItems 
                          ? handleMerchantInfoClick 
                          : () => handleNavigation(item.path, item.filter)
                      }
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
                      <ListItemText 
                        primary={item.name}
                        sx={{
                          '& .MuiTypography-root': {
                            fontWeight: (item.path === '/' && activeSection === 'home') || 
                                      activeSection === item.path.substring(1) 
                                ? 'bold' 
                                : 'normal',
                          }
                        }}
                      />
                      {item.subItems && (
                        openMerchantInfo ? <ExpandLess /> : <ExpandMore />
                      )}
                    </ListItemButton>
                  </ListItem>
                  {item.subItems && (
                    <Collapse in={openMerchantInfo} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem) => (
                          <ListItemButton
                            key={subItem.path}
                            selected={activeSection === subItem.path.substring(1)}
                            onClick={() => handleNavigation(subItem.path)}
                            sx={{
                              pl: 4,
                              '&.Mui-selected': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: 'primary.dark',
                                },
                              },
                            }}
                          >
                            <ListItemText 
                              primary={subItem.name}
                              sx={{
                                '& .MuiTypography-root': {
                                  fontWeight: activeSection === subItem.path.substring(1)
                                    ? 'bold'
                                    : 'normal',
                                }
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
          </React.Fragment>
        ))}
      </Drawer>
    </>
  );
};

export default Sidebar;