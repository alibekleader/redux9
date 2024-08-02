import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['students']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="students">
              <Link to="students">Students</Link>
            </Menu.Item>
            <Menu.Item key="todo">
              <Link to="todo">Todo</Link>
            </Menu.Item>
            <Menu.Item key="teachers">
              <Link to="teachers">Teachers</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
