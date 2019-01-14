import React from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import {
    Face as User, Assignment as Project, Settings as Industry, Assessment, AttachMoney as Report, List as Category,
    SupervisorAccount as Company, Build as Skill, AspectRatio as Pages, Home, Book as Blog, Notifications
} from '@material-ui/icons';

const MyMenu = () => (
    <MuiThemeProvider>
        <div>
            <MenuItemLink
                primaryText="Companies"
                to="/company"
                leftIcon={<Company color="action"/>}
            />
            <MenuItemLink
                primaryText="Professionals"
                to="/professional"
                leftIcon={<User color="action"/>}
            />
            <MenuItemLink
                primaryText="Skills"
                to="/skill"
                leftIcon={<Skill color="action"/>}
            />
            <MenuItemLink
                primaryText="Industries"
                to="/industry"
                leftIcon={<Industry color="action"/>}
            />
            <MenuItemLink
                primaryText="Categories"
                to="/category"
                leftIcon={<Category color="action"/>}
            />
            <MenuItemLink
                primaryText="Assessments"
                to="/assessment"
                leftIcon={<Assessment color="action"/>}
            />
            <MenuItemLink
                primaryText="Projects"
                to="/project"
                leftIcon={<Project color="action"/>}
            />
            <MenuItemLink
            primaryText="Reports"
            to="/report"
            leftIcon={<Report color="action"/>}
            />
            <MenuItemLink
                primaryText="Pages"
                to="/page"
                leftIcon={<Pages color="action"/>}
            />
            <MenuItem
                className={'submenu'}
                primaryText="Homepage"
                rightIcon={<ArrowDropRight style={{ right: '50px' }}/>}
                leftIcon={<Home color="action"/>}
                menuItems={[
                    <MenuItemLink
                        primaryText="Job Areas"
                        to="/job-areas"
                    />,
                    <MenuItemLink
                        primaryText="Our Features"
                        to="/our-features"
                    />,
                    <MenuItemLink
                        primaryText="How It Works"
                        to="/how-it-work"
                    />,
                    <MenuItemLink
                        primaryText="Testimonials"
                        to="/testimonials"
                    />,
                ]}
            />
            <MenuItem
                className={'submenu'}
                primaryText="Blog"
                rightIcon={<ArrowDropRight style={{ right: '50px' }}/>}
                leftIcon={<Blog color="action"/>}
                menuItems={[
                    <MenuItemLink
                        primaryText="Articles"
                        to="/article"
                    />,
                    <MenuItemLink
                        primaryText="Comments"
                        to="/comment"
                    />,
                    <MenuItemLink
                        primaryText="Tags"
                        to="/tag"
                    />,
                    <MenuItemLink
                        primaryText="Categories"
                        to="/blogCategory"
                    />,
                ]}
            />
            <MenuItemLink
                primaryText="Notifications"
                to="/notification"
                leftIcon={<Notifications color="action"/>}
            />
        </div>
    </MuiThemeProvider>
);

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(MyMenu));