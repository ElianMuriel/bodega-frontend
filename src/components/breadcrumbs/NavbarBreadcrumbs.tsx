import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));
function getCurrentPageName(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return 'Home';
  // Capitaliza la última parte
  return parts[parts.length - 1]
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const currentPage = getCurrentPageName(location.pathname);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dashboard</Typography>
      <Typography
        variant="body1"
        sx={{ color: 'text.primary', fontWeight: 600 }}
      >
        {currentPage}
      </Typography>
    </StyledBreadcrumbs>
  );
}

