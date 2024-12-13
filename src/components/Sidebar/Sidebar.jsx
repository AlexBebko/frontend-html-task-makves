import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const SidebarContainer = styled.div`
    width: ${({ $isOpened }) => ($isOpened ? '250px' : '80px')};
    min-height: 97vh;
    background-color: ${({ theme }) => theme.sidebarBackground};
    color: ${({ theme }) => theme.textColor};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: width 0.3s ease;
`;

const Header = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px;

    img {
        width: 40px;
        height: 40px;
        margin-right: ${({ $isOpened }) => ($isOpened ? '8px' : '0')};
        transition: margin-right 0.3s ease;
    }
    span {
        font-size: 1.2rem;
        font-weight: bold;
        color: ${({ theme }) => theme.logoColor};
        white-space: nowrap;
        opacity: ${({ $isOpened }) => ($isOpened ? '1' : '0')};
        transition: opacity 0.3s ease;
		cursor: default;
    }
    .toggle {
        position: absolute;
        right: ${({ $isOpened }) => ($isOpened ? '-10px' : '-30px')};
        width: 20px;
        height: 20px;

        background-color: ${({ theme, $isOpened }) => ($isOpened ? theme.activeButtonBackground : theme.buttonBackground)};
        padding: 1px;
        border-radius: 50%;
        margin-left: auto;
        cursor: pointer;

        transition: right 0.3s ease;

        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: ${({ theme }) => theme.textColor};
        }
    }
`;

const NavSection = styled.div`
    display: flex;
    flex-direction: column;
    .nav-item {
        height: 24px;
        margin: 8px 20px;
        padding: 10px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: ${({ theme }) => theme.textColor};
        background-color: transparent;
        transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;

        &:hover {
            background-color: ${({ theme }) => theme.hoverBackground};
            color: ${({ theme }) => theme.hoverTextColor};
        }

        &:active {
            background-color: ${({ theme }) => theme.activeBackground};
            color: ${({ theme }) => theme.activeTextColor};
        }

        span {
            margin-left: 8px;
            opacity: ${({ $isOpened }) => ($isOpened ? '1' : '0')};
            transition: opacity 0.3s ease;
        }
    }
`;

const Sidebar = ({ color }) => {
    const [$isOpened, setIsOpened] = useState(true);

    const themes = {
        light: {
            sidebarBackground: 'var(--color-sidebar-background-light-default)',
            hoverBackground: 'var(--color-sidebar-background-light-hover)',
            activeBackground: 'var(--color-sidebar-background-light-active)',
            textColor: 'var(--color-text-light-default)',
            hoverTextColor: 'var(--color-text-light-hover)',
            activeTextColor: 'var(--color-text-light-active)',
            logoColor: 'var(--color-text-logo-light-default)',
            buttonBackground: 'var(--color-button-background-light-default)',
            activeButtonBackground: 'var(--color-button-background-light-active)',
        },
        dark: {
            sidebarBackground: 'var(--color-sidebar-background-dark-default)',
            hoverBackground: 'var(--color-sidebar-background-dark-hover)',
            activeBackground: 'var(--color-sidebar-background-dark-active)',
            textColor: 'var(--color-text-dark-default)',
            hoverTextColor: 'var(--color-text-dark-hover)',
            activeTextColor: 'var(--color-text-dark-active)',
            logoColor: 'var(--color-text-logo-dark-default)',
            buttonBackground: 'var(--color-button-background-dark-default)',
            activeButtonBackground: 'var(--color-button-background-dark-active)',
        }
    };

    const theme = color === 'dark' ? themes.dark : themes.light;

    const goToRoute = (path) => {
        console.log(`going to "${path}"`);
    };

    const toggleSidebar = () => {
        setIsOpened((v) => !v);
    };

    return (
        <SidebarContainer theme={theme} $isOpened={$isOpened}>
            <Header theme={theme} $isOpened={$isOpened}>
                <img src={logo} alt="Logo" />
                <span>Technifly</span>
                <div className="toggle" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={$isOpened ? 'angle-left' : 'angle-right'} />
                </div>
            </Header>
            <NavSection theme={theme} $isOpened={$isOpened}>
                {routes.map((route) => (
                    <div key={route.title} className="nav-item" onClick={() => goToRoute(route.path)}>
                        <FontAwesomeIcon icon={route.icon} />
                        <span>{route.title}</span>
                    </div>
                ))}
            </NavSection>
            <NavSection theme={theme} $isOpened={$isOpened}>
                {bottomRoutes.map((route) => (
                    <div key={route.title} className="nav-item" onClick={() => goToRoute(route.path)}>
                        <FontAwesomeIcon icon={route.icon} />
                        <span>{route.title}</span>
                    </div>
                ))}
            </NavSection>
        </SidebarContainer>
    );
};

Sidebar.propTypes = {
    color: PropTypes.string.isRequired,
};

export default Sidebar;
